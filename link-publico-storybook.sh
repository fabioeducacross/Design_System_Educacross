#!/bin/bash

# 🌐 Script para Criar Link Público do Storybook
# Usa localtunnel para expor o Storybook em uma URL pública

set -e

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║       STORYBOOK - GERADOR DE LINK PÚBLICO                 ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

STORYBOOK_PORT=6006

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório raiz do projeto${NC}"
    echo "   (onde está o package.json)"
    exit 1
fi

echo -e "${CYAN}📦 Verificando dependências...${NC}"

# Verificar pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm não encontrado. Instalando...${NC}"
    npm install -g pnpm
fi

# Verificar localtunnel
if ! command -v lt &> /dev/null; then
    echo -e "${YELLOW}⚠️  localtunnel não encontrado. Instalando...${NC}"
    npm install -g localtunnel
fi

echo -e "${GREEN}✅ Dependências OK${NC}"
echo ""

# Verificar se já existe Storybook rodando
if lsof -Pi :$STORYBOOK_PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Porta $STORYBOOK_PORT já está em uso${NC}"
    echo -e "${CYAN}   Usando Storybook existente...${NC}"
else
    echo -e "${CYAN}🔨 Buildando pacotes necessários...${NC}"
    pnpm --filter=@fabioeducacross/ui build > /dev/null 2>&1 || true
    
    echo -e "${CYAN}🚀 Iniciando Storybook em background...${NC}"
    nohup pnpm --filter=@educacross/storybook dev > /tmp/storybook.log 2>&1 &
    STORYBOOK_PID=$!
    echo -e "${GREEN}   PID do Storybook: $STORYBOOK_PID${NC}"
    
    # Salvar PID para limpeza
    echo $STORYBOOK_PID > /tmp/storybook.pid
    
    echo -e "${YELLOW}   Aguardando Storybook inicializar...${NC}"
    
    # Aguardar até que o Storybook esteja pronto (máximo 60 segundos)
    TIMEOUT=60
    ELAPSED=0
    while ! curl -s http://localhost:$STORYBOOK_PORT > /dev/null 2>&1; do
        if [ $ELAPSED -ge $TIMEOUT ]; then
            echo -e "${RED}❌ Timeout: Storybook não iniciou em ${TIMEOUT}s${NC}"
            echo -e "${YELLOW}   Verificar logs em: /tmp/storybook.log${NC}"
            exit 1
        fi
        sleep 2
        ELAPSED=$((ELAPSED + 2))
        echo -ne "${CYAN}   Aguardando... ${ELAPSED}s/${TIMEOUT}s\r${NC}"
    done
    echo -e "\n${GREEN}✅ Storybook iniciado!${NC}"
fi

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${PURPLE}🌐 Criando túnel público...${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Criar túnel com localtunnel
echo -e "${YELLOW}⏳ Aguarde enquanto criamos seu link público...${NC}"
echo ""

# Tentar múltiplas vezes se necessário
MAX_RETRIES=3
RETRY=0
URL=""

while [ $RETRY -lt $MAX_RETRIES ] && [ -z "$URL" ]; do
    if [ $RETRY -gt 0 ]; then
        echo -e "${YELLOW}   Tentativa $((RETRY + 1))/${MAX_RETRIES}...${NC}"
    fi
    
    # Limpar log anterior
    rm -f /tmp/localtunnel.log
    
    # Executar localtunnel e capturar a URL
    timeout 15 lt --port $STORYBOOK_PORT 2>&1 | tee /tmp/localtunnel.log &
    LT_PID=$!
    echo $LT_PID > /tmp/localtunnel.pid
    
    # Aguardar URL ser gerada (máximo 15 segundos)
    for i in {1..15}; do
        sleep 1
        if [ -f /tmp/localtunnel.log ]; then
            URL=$(grep -oP 'your url is: \K.*' /tmp/localtunnel.log | head -1)
            if [ -n "$URL" ]; then
                break
            fi
            URL=$(grep -oP 'https://[a-z0-9-]+\.loca\.lt' /tmp/localtunnel.log | head -1)
            if [ -n "$URL" ]; then
                break
            fi
        fi
    done
    
    if [ -z "$URL" ]; then
        kill $LT_PID 2>/dev/null || true
        RETRY=$((RETRY + 1))
        sleep 2
    fi
done

if [ -z "$URL" ]; then
    echo -e "${RED}❌ Não foi possível obter a URL do túnel após ${MAX_RETRIES} tentativas${NC}"
    echo -e "${YELLOW}   Verificar logs em: /tmp/localtunnel.log${NC}"
    echo ""
    echo -e "${CYAN}📖 Consulte LINK_PUBLICO_STORYBOOK.md para métodos alternativos${NC}"
    cat /tmp/localtunnel.log
    exit 1
fi

echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ LINK PÚBLICO CRIADO COM SUCESSO!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}🔗 Seu Storybook está disponível em:${NC}"
echo ""
echo -e "   ${PURPLE}$URL${NC}"
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📋 Informações Importantes:${NC}"
echo ""
echo -e "   • ${CYAN}Link público:${NC} $URL"
echo -e "   • ${CYAN}Link local:${NC} http://localhost:$STORYBOOK_PORT"
echo -e "   • ${CYAN}Navegue até:${NC} Foundations → CSS Explorer"
echo ""
echo -e "${YELLOW}⚠️  Nota de Segurança:${NC}"
echo -e "   O link público expõe seu Storybook na internet."
echo -e "   Qualquer pessoa com o link pode acessar."
echo -e "   O túnel permanece ativo enquanto este script estiver rodando."
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}💡 Dicas de Uso:${NC}"
echo -e "   1. Abra o link em qualquer navegador"
echo -e "   2. Na primeira vez, pode pedir para clicar em 'Continue'"
echo -e "   3. Navegue: Foundations → CSS Explorer"
echo -e "   4. Explore os 280+ tokens e 50+ classes!"
echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}🛑 Para Parar:${NC}"
echo -e "   Pressione ${RED}Ctrl+C${NC} para fechar o túnel e parar o Storybook"
echo ""
echo -e "${CYAN}Mantendo túnel ativo...${NC}"
echo -e "${CYAN}Pressione Ctrl+C para sair${NC}"
echo ""

# Manter o script rodando e exibir logs
trap cleanup EXIT INT TERM

cleanup() {
    echo ""
    echo -e "${YELLOW}🧹 Limpando...${NC}"
    
    # Matar localtunnel
    if [ -f /tmp/localtunnel.pid ]; then
        LT_PID=$(cat /tmp/localtunnel.pid)
        kill $LT_PID 2>/dev/null || true
        rm /tmp/localtunnel.pid
    fi
    
    # Matar Storybook (opcional - comentado para manter rodando)
    # if [ -f /tmp/storybook.pid ]; then
    #     STORYBOOK_PID=$(cat /tmp/storybook.pid)
    #     kill $STORYBOOK_PID 2>/dev/null || true
    #     rm /tmp/storybook.pid
    # fi
    
    echo -e "${GREEN}✅ Túnel fechado${NC}"
    echo -e "${CYAN}   Storybook ainda rodando em http://localhost:$STORYBOOK_PORT${NC}"
    echo ""
}

# Seguir logs do localtunnel
tail -f /tmp/localtunnel.log 2>/dev/null || sleep infinity
