# Configuração do Servidor Figma Local para MCP

## Visão Geral

O servidor Figma local permite que assistentes IA (como Claude) acessem designs diretamente do Figma Desktop através do Model Context Protocol (MCP).

## Pré-requisitos

1. **Figma Desktop** instalado
2. **Plugin Figma MCP** instalado e ativo
3. **Arquivo Figma aberto** no Desktop

## Configuração do Plugin

### 1. Instalar Plugin no Figma

O servidor local geralmente é fornecido por:
- Plugin oficial Figma (se disponível)
- Plugin MCP customizado da comunidade
- Ou servidor standalone que conecta via Figma API local

**URL do arquivo**: `https://www.figma.com/design/mouf1Vc5WyhnDoYNBM1rWn/Educa-Guidelines-1.0`

### 2. Porta Padrão

O servidor MCP local geralmente roda em:
```
http://127.0.0.1:3845/mcp
```

### 3. Verificar se o Servidor Está Ativo

```bash
# Testar conexão
curl http://127.0.0.1:3845/mcp

# Ou via PowerShell
Invoke-WebRequest -Uri "http://127.0.0.1:3845/mcp" -Method GET
```

## Alternativas ao Servidor Local

Se o servidor local não estiver disponível, há 3 opções:

### Opção A: Figma REST API (Recomendado)

Use a API REST oficial do Figma:

```typescript
const FIGMA_TOKEN = "figd_..."; // Token pessoal
const FILE_KEY = "mouf1Vc5WyhnDoYNBM1rWn";
const NODE_ID = "822-8191";

const response = await fetch(
  `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${NODE_ID}`,
  {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  }
);
```

**Como obter token:**
1. Acesse https://www.figma.com/settings
2. Scroll até "Personal Access Tokens"
3. Clique "Generate new token"
4. Copie o token (começa com `figd_`)

### Opção B: Figma Webhooks

Configure webhooks para receber notificações de mudanças:

```json
{
  "event_type": "FILE_UPDATE",
  "file_key": "mouf1Vc5WyhnDoYNBM1rWn",
  "endpoint": "https://seu-servidor.com/webhook"
}
```

### Opção C: Figma Dev Mode API

Se você tem acesso ao Dev Mode, pode usar a API expandida:

```typescript
const response = await fetch(
  `https://api.figma.com/v1/files/${FILE_KEY}/dev_resources`,
  {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  }
);
```

## Configuração para Este Projeto

### 1. Arquivo .env

```env
# Escolha uma opção:

# Opção 1: Servidor Local (se disponível)
FIGMA_MODE=local
FIGMA_LOCAL_URL=http://127.0.0.1:3845/mcp

# Opção 2: API REST (recomendado se servidor local não funcionar)
FIGMA_MODE=api
FIGMA_TOKEN=figd_seu_token_aqui
FIGMA_API_URL=https://api.figma.com/v1

# Configurações comuns
FIGMA_FILE_KEY=mouf1Vc5WyhnDoYNBM1rWn
FIGMA_NODE_ID=822-8191
```

### 2. Script de Teste Atualizado

Já criamos o script de teste em `scripts/test-figma-local.ts`.

Para usar a API REST em vez do servidor local, use:

```bash
# Configurar token no .env primeiro
pnpm sync:figma
```

## Troubleshooting

### Servidor local não responde

**Sintoma:**
```
❌ Servidor local não está respondendo
💡 Verifique se o Figma está aberto e o plugin está ativo
```

**Soluções:**
1. Verifique se Figma Desktop está aberto
2. Verifique se o plugin MCP está instalado e ativo
3. Tente reiniciar o Figma Desktop
4. **Alternativa:** Use a API REST do Figma (mais confiável)

### Como usar API REST em vez do servidor local

Edite `.env`:
```env
FIGMA_MODE=api
FIGMA_TOKEN=seu_token_aqui
```

Execute:
```bash
pnpm sync:figma
```

### Token de acesso

Para obter um token de acesso ao Figma:
1. Acesse: https://www.figma.com/settings
2. Na seção "Personal Access Tokens"
3. Clique em "Generate new token"
4. Dê um nome (ex: "Design System Educacross")
5. Clique em "Create token"
6. Copie o token (começa com `figd_`)
7. Adicione ao `.env`: `FIGMA_TOKEN=figd_...`

**⚠️ Importante:**
- Nunca compartilhe seu token
- Nunca commite o arquivo `.env`
- O token já está no `.gitignore`

## Próximos Passos

1. ✅ Configure o `.env` com suas credenciais
2. ✅ Execute `pnpm figma:test` para testar
3. ✅ Se falhar, use a API REST com token pessoal
4. ✅ Execute `pnpm sync:figma` para sincronizar tokens

## Recursos

- [Figma REST API Docs](https://www.figma.com/developers/api)
- [Figma Webhooks](https://www.figma.com/developers/api#webhooks)
- [Model Context Protocol](https://modelcontextprotocol.io/)
