#!/bin/bash

# 🎨 Script de Visualização do CSS Explorer
# Execute este script para ver o CSS Explorer no Storybook

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║          CSS EXPLORER - SCRIPT DE VISUALIZAÇÃO            ║"
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

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório raiz do projeto${NC}"
    echo "   (onde está o package.json)"
    exit 1
fi

echo -e "${CYAN}📦 Verificando dependências...${NC}"
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm não encontrado. Instalando...${NC}"
    npm install -g pnpm
fi

echo -e "${CYAN}🔨 Buildando pacotes necessários...${NC}"
pnpm --filter=@fabioeducacross/ui build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro no build do pacote UI${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Build completo!${NC}"
echo ""
echo -e "${PURPLE}🚀 Iniciando Storybook...${NC}"
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  Abrirá em: ${GREEN}http://localhost:6006${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📍 Navegue até: ${BLUE}Foundations → CSS Explorer${NC}"
echo ""
echo -e "${CYAN}🎯 Você verá 3 opções:${NC}"
echo -e "   1. ${PURPLE}Token Explorer${NC}     - Explore 280+ tokens CSS"
echo -e "   2. ${PURPLE}Class Playground${NC}   - Teste 50+ classes Tailwind"
echo -e "   3. ${PURPLE}CSS Explorer Completo${NC} - Ambos juntos"
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}💡 Dica:${NC} Use ${YELLOW}Ctrl+C${NC} para parar o Storybook"
echo ""

# Aguardar 2 segundos
sleep 2

# Iniciar Storybook
pnpm storybook

# Se o Storybook foi fechado
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Storybook encerrado${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "Para ver novamente, execute:"
echo -e "  ${YELLOW}./ver-css-explorer.sh${NC}"
echo ""
