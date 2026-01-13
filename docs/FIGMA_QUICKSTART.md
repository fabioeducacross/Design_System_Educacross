# 🎨 Configuração MCP + Figma - Quick Start

## ⚡ Setup Rápido (5 minutos)

### 1. Configurar Credenciais

```bash
# Copiar exemplo
cp .env.example .env
```

Editar `.env` com suas credenciais:
- **FIGMA_TOKEN**: [Gerar token aqui](https://www.figma.com/settings) → Personal Access Tokens
- **FIGMA_FILE_KEY**: Copiar da URL do Figma (`figma.com/file/ABC123/...` → `ABC123`)

### 2. Testar Conexão

```bash
pnpm sync:figma
```

✅ **Sucesso** = Tokens sincronizados de `packages/ui/src/tokens/`

### 3. Configurar Claude Desktop (Opcional)

**Windows:**
```powershell
copy .vscode\mcp-config.json "$env:APPDATA\Claude\claude_desktop_config.json"
```

**Mac:**
```bash
cp .vscode/mcp-config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Reinicie o Claude Desktop → Verifique ícone 🔌

## 📋 Comandos

| Comando | Descrição |
|---------|-----------|
| `pnpm sync:figma` | Sincroniza tokens uma vez |
| `pnpm sync:figma:watch` | Sincroniza automaticamente (30s) |
| `pnpm figma:server` | Inicia servidor MCP local |

## 💬 Usar com Claude

Depois de conectado:

```
"Compare o Button do Figma com o código"
"Extraia os tokens de cores do Figma"
"Qual a diferença entre o spacing no design vs código?"
```

## 📚 Documentação Completa

Ver [FIGMA_MCP_SETUP.md](./FIGMA_MCP_SETUP.md)

## 🔧 Troubleshooting

**Erro: Token não encontrado**
```bash
# Verifique se .env existe
cat .env
```

**Erro: File not found**
- Verifique se o File Key está correto (sem `/` ou caracteres extras)

**Token expirado**
- Gere novo token no Figma Settings
- Atualize no `.env`

---

✨ **Pronto!** Agora você pode sincronizar designs do Figma com o código.
