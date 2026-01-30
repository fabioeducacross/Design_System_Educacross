# 🎨 Como Ver o CSS Explorer

## 🚀 Início Rápido

### Opção 1: Executar Localmente (Recomendado)

```bash
# 1. Navegar até o diretório do projeto
cd /caminho/para/Design_System_Educacross

# 2. Instalar dependências (se necessário)
pnpm install

# 3. Iniciar o Storybook
pnpm storybook

# 4. Abrir no navegador
# O Storybook abrirá automaticamente em http://localhost:6006
```

### Opção 2: Build e Preview

```bash
# Build do Storybook
pnpm --filter=@educacross/storybook build

# Servir o build estático
npx http-server apps/storybook/storybook-static -p 6006
```

## 📍 Localização no Storybook

Uma vez que o Storybook estiver rodando, navegue até:

```
Foundations → CSS Explorer
```

Você verá 3 variações da story:

### 1. 🎨 Token Explorer

**URL Direta:** `http://localhost:6006/?path=/story/foundations-css-explorer--token-explorer-story`

**O que você verá:**

```
┌─────────────────────────────────────────────────────────────┐
│  Token Explorer                                              │
│  Explore todas as variáveis CSS do Design System            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [🎨 Todos] [🎨 Cores] [✍️ Fontes] [⭕ Raios] ...           │
│                                                              │
│  [Buscar token ou valor...                              ]   │
│                                                              │
│  Exibindo 175 de 280 tokens                                 │
│                                                              │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │ 🟣 Swatch    │ 🟢 Swatch    │ 🟠 Swatch    │            │
│  │ --color-pr...│ --color-su...│ --legend-... │            │
│  │ #6e63e8      │ #28c76f      │ #ff9f43      │            │
│  └──────────────┴──────────────┴──────────────┘            │
│                                                              │
│  [mais tokens em grid responsivo...]                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Funcionalidades Interativas:**
- ✅ Clique em qualquer token para **copiar o nome**
- ✅ Use os **filtros** para ver apenas cores, fontes, raios, etc.
- ✅ **Busque** por nome ou valor (ex: "primary" ou "#6e63e8")
- ✅ Veja **preview visual** de cada token

### 2. 🎭 Class Playground

**URL Direta:** `http://localhost:6006/?path=/story/foundations-css-explorer--class-playground-story`

**O que você verá:**

```
┌─────────────────────────────────────────────────────────────┐
│  Class Playground                                            │
│  Explore classes Tailwind CSS com preview interativo        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Categoria: [Background Colors           ▼]                 │
│  Classe:    [Primary                     ▼]                 │
│                                                              │
│  Código:                               [Copiar]             │
│  ┌────────────────────────────────────────────┐             │
│  │ <div className="bg-primary               │             │
│  │   text-primary-foreground">              │             │
│  │   Conteúdo                               │             │
│  │ </div>                                   │             │
│  └────────────────────────────────────────────┘             │
│                                                              │
│  ╔════════════════════════════════════════╗                 │
│  ║  PREVIEW                               ║                 │
│  ║  ┌──────────────────────────────────┐  ║                 │
│  ║  │ Card de Exemplo [ROXO]           │  ║                 │
│  ║  │ Preview da classe aplicada       │  ║                 │
│  ║  │ [Botão Primário] [Botão Sec...]  │  ║                 │
│  ║  └──────────────────────────────────┘  ║                 │
│  ╚════════════════════════════════════════╝                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Funcionalidades Interativas:**
- ✅ Selecione **categoria** (Background Colors, Legend Colors, Text Colors, etc.)
- ✅ Selecione **classe** dentro da categoria
- ✅ Veja **preview ao vivo** em 3 variações (Card, Texto, Grid)
- ✅ **Copie o snippet** de código pronto para usar

### 3. 📋 CSS Explorer Completo

**URL Direta:** `http://localhost:6006/?path=/story/foundations-css-explorer--combined`

Mostra ambos Token Explorer e Class Playground na mesma página, separados por um divisor.

## 🎯 O Que Testar

### Validação de Tokens

1. **Abra o Token Explorer**
2. **Filtre por "color"**
3. **Busque por "primary-500"**
4. **Verifique**: Swatch deve ser roxo (#6E63E8) ✅
5. **Clique no token**: Deve copiar `--color-primary-500`

### Validação de Legend Colors

1. **Abra o Token Explorer**
2. **Busque por "legend-basic"**
3. **Verifique**: Swatch deve ser **LARANJA** (#FF9F43) ⚠️ **NÃO amarelo!**
4. **Outros legend colors**:
   - `--legend-advanced`: Roxo #6E63E8
   - `--legend-proficient`: Verde #28C76F
   - `--legend-below-basic`: Vermelho #EA5455
   - `--legend-not-completed`: Cinza #B4B7BD
   - `--legend-in-progress`: Ciano #00CFE8

### Testar Class Playground

1. **Selecione categoria**: "Legend Colors (Proficiência)"
2. **Selecione classe**: "Basic"
3. **Veja preview**: Deve ter fundo LARANJA com texto branco
4. **Copie snippet**: Deve copiar código com `bg-legend-basic text-white`
5. **Teste outras categorias**: Typography, Spacing, Shadows, etc.

## 📸 Screenshots de Referência

### Token Explorer
![Token Explorer mostrando swatches coloridos de tokens CSS em grid]

**Deve mostrar:**
- Barra de filtros com ícones (🎨, ✍️, ⭕, etc.)
- Campo de busca
- Contagem de tokens (ex: "Exibindo 175 de 280 tokens")
- Grid de cards com swatches coloridos
- Nomes dos tokens em roxo (ex: `--color-primary-500`)
- Valores em cinza (ex: `#6e63e8`)

### Class Playground
![Class Playground com dropdowns e preview de card]

**Deve mostrar:**
- Dropdown de categorias (à esquerda)
- Dropdown de classes
- Box de código com snippet
- Botão "Copiar"
- Preview grande com card colorido
- Preview com texto
- Preview com grid de elementos

## 🐛 Troubleshooting

### Storybook não inicia

```bash
# Limpar cache
pnpm --filter=@educacross/storybook clean

# Rebuildar pacotes
pnpm --filter=@fabioeducacross/ui build

# Tentar novamente
pnpm storybook
```

### Tokens não aparecem

```bash
# Verificar se CSS foi gerado
ls -lh packages/ui/dist/styles.css

# Se não existir, buildar
pnpm --filter=@fabioeducacross/ui build
```

### Story não carrega (spinner infinito)

1. Abra DevTools (F12)
2. Veja Console para erros
3. Verifique Network para requests falhando
4. Tente recarregar a página (Ctrl+R ou Cmd+R)

### Preview não mostra cores corretas

1. Verifique se está usando o tema correto (Light/Dark toggle no topo)
2. Confirme que `packages/ui/src/styles.css` tem os tokens
3. Use inspector do navegador (F12) para verificar CSS aplicado

## 📚 Documentação Adicional

Para mais detalhes técnicos, veja:
- `apps/storybook/stories/foundations/CSS_EXPLORER.md` - Documentação completa
- `apps/storybook/stories/foundations/css-manifest.ts` - Manifest de classes
- `apps/storybook/stories/foundations/CssExplorer.stories.tsx` - Código fonte

## 🎥 Demo em Vídeo (Caso Necessário)

Se você quiser gravar um vídeo demo:

```bash
# 1. Iniciar Storybook
pnpm storybook

# 2. Gravar com seu software favorito mostrando:
#    - Navegação até Foundations → CSS Explorer
#    - Uso dos filtros no Token Explorer
#    - Busca por tokens específicos
#    - Cópia de tokens
#    - Seleção de classes no Class Playground
#    - Preview ao vivo das classes
#    - Cópia de snippets
```

## ✅ Checklist de Validação

Use este checklist ao visualizar pela primeira vez:

- [ ] Storybook iniciou sem erros
- [ ] Story "CSS Explorer" aparece em Foundations
- [ ] Token Explorer carrega e mostra 280+ tokens
- [ ] Filtros funcionam (cores, fontes, raios, etc.)
- [ ] Busca funciona (tente "primary")
- [ ] Copiar token funciona (aparece "✓ Copiado!")
- [ ] Class Playground mostra 7 categorias
- [ ] Preview atualiza ao selecionar classe
- [ ] Snippet de código é copiável
- [ ] Token `--color-primary-500` é #6E63E8 (roxo)
- [ ] Token `--legend-basic` é #FF9F43 (laranja)
- [ ] Build do Storybook funciona sem erros

---

**🎉 Pronto!** Você agora tem acesso a uma ferramenta interativa para explorar todos os 280+ tokens CSS e 50+ classes Tailwind do Design System Educacross, sem precisar criar centenas de stories!

**💡 Dica:** Marque esta página ou adicione aos favoritos para referência rápida.
