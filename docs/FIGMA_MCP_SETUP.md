# Guia de Configuração - MCP + Figma Local

## 1. Configuração Inicial

### Instalar dependências
```bash
pnpm install
```

### Criar arquivo .env
```bash
cp .env.example .env
```

### Configurar credenciais do Figma

1. **Obter Token de Acesso**
   - Acesse [Figma Settings](https://www.figma.com/settings)
   - Vá em **Personal Access Tokens**
   - Clique em **Generate new token**
   - Copie o token gerado

2. **Obter File Key**
   - Abra seu arquivo no Figma
   - Copie a URL: `https://www.figma.com/file/ABC123XYZ/Design-System`
   - O File Key é: `ABC123XYZ` (parte entre `/file/` e o próximo `/`)

3. **Editar .env**
   ```env
   FIGMA_TOKEN=figd_sua-token-aqui
   FIGMA_FILE_KEY=ABC123XYZ
   ```

## 2. Testar Conexão

```bash
# Sincronizar tokens do Figma
pnpm sync:figma
```

**Output esperado:**
```
🎨 Educacross Design System - Sincronização Figma
==================================================
🔄 Conectando ao Figma...
✅ Arquivo carregado: Design System Educacross
📥 Buscando variáveis do Figma...
✅ Variáveis carregadas: 150 variáveis
📦 Processando coleção: Light
📦 Processando coleção: Dark
💾 Tokens salvos: Light.tokens.json
💾 Tokens salvos: Dark.tokens.json
==================================================
✨ Sincronização concluída com sucesso!
```

## 3. Usar MCP com Claude/AI

### Opção A: Claude Desktop

1. Copie a configuração:
   ```bash
   # Windows
   copy .vscode\mcp-config.json "%APPDATA%\Claude\claude_desktop_config.json"
   
   # Mac
   cp .vscode/mcp-config.json ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. Reinicie o Claude Desktop

3. Verifique se os servidores estão conectados (ícone 🔌 no canto inferior)

### Opção B: VS Code (se suportado)

A configuração já está em `.vscode/mcp-config.json`

## 4. Comandos Disponíveis

```bash
# Sincronizar tokens uma vez
pnpm sync:figma

# Modo watch (sincroniza automaticamente a cada 30s)
pnpm sync:figma:watch

# Iniciar servidor MCP local
pnpm figma:server
```

## 5. Usar com Claude

Depois de conectado, você pode pedir ao Claude:

```
"Compare o componente Button do Figma com o código implementado"

"Extraia todas as cores do design system no Figma"

"Sincronize os tokens de tipografia do Figma"

"Qual a diferença entre o spacing definido no Figma e o implementado?"
```

## 6. Ferramentas MCP Disponíveis

O servidor expõe:

- ✅ **get_figma_component** - Busca componente específico
- ✅ **compare_design_vs_code** - Compara design vs implementação
- ✅ **extract_tokens** - Extrai tokens (cores, spacing, typography)

## 7. Estrutura de Tokens

```
packages/ui/src/tokens/
├── Light.tokens.json       # Tokens tema claro
├── Light.variables.json    # Variáveis Figma (claro)
├── Dark.tokens.json        # Tokens tema escuro
├── Dark.variables.json     # Variáveis Figma (escuro)
└── index.ts               # Exportações TypeScript
```

## 8. Workflow Recomendado

1. **Designer atualiza Figma** → Componentes e tokens
2. **Developer sincroniza** → `pnpm sync:figma`
3. **Build aplica** → `pnpm build`
4. **Storybook reflete** → `pnpm storybook`

## 9. Troubleshooting

### Erro: "FIGMA_TOKEN não encontrado"
```bash
# Verifique se o .env existe
cat .env

# Se não, copie do exemplo
cp .env.example .env
# Depois edite com suas credenciais
```

### Erro: "File not found"
```bash
# Verifique o File Key
# URL: https://www.figma.com/file/ABC123/Design
# Key correto: ABC123
```

### Token expirado
```bash
# Gere novo token no Figma Settings
# Atualize no .env
```

## 10. Segurança

⚠️ **IMPORTANTE:**
- Nunca commite o arquivo `.env` (já está no .gitignore)
- Tokens do Figma são sensíveis - trate como senhas
- Use variáveis de ambiente em CI/CD

## Próximos Passos

- [ ] Configurar GitHub Actions para sync automático
- [ ] Criar webhook do Figma para push de mudanças
- [ ] Adicionar validação de tokens vs implementação
- [ ] Integrar com pipeline de testes visuais
