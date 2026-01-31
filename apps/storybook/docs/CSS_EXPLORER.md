# 🎨 CSS Explorer - Explorador de Tokens do Design System

## Visão Geral

O **CSS Explorer** do Design System Educacross é um conjunto de ferramentas interativas no Storybook para explorar, visualizar e documentar todos os tokens CSS disponíveis.

**Objetivo**: Facilitar o uso correto de tokens CSS e garantir consistência visual entre aplicações.

---

## 🚀 Acesso Rápido

Todas as ferramentas estão disponíveis na seção **Foundations** do Storybook:

```
http://localhost:6006
```

### Stories Disponíveis

1. **Tokens Showcase** - `Foundations/Tokens Showcase`
2. **Colors** - `Foundations/Colors`
3. **Primitives** - `Foundations/Primitives`
4. **Bootstrap Compatibility** - `Foundations/Bootstrap Compatibility`

---

## 📋 Ferramentas do Explorer

### 1️⃣ Tokens Showcase

**Arquivo**: `apps/storybook/stories/foundations/TokensShowcase.stories.tsx`

**O que faz:**
- Exibe **todos os 280 tokens CSS** extraídos do `:root` em runtime
- Categorização automática por prefixo
- Preview visual para cores, spacing e border radius

**Categorias disponíveis:**
- 🎨 **Primary Colors** (--color-primary-*)
- 🎨 **Secondary Colors** (--color-secondary-*)
- ✅ **Success Colors** (--color-success-*)
- ❌ **Danger Colors** (--color-danger-*)
- ⚠️ **Warning Colors** (--color-warning-*)
- ℹ️ **Info Colors** (--color-info-*)
- 🏆 **Legend Colors** (--color-legend-*) - Cores de proficiência
- 📏 **Padding Tokens** (--padding-*)
- 📏 **Gap Tokens** (--gap-*)
- ⭕ **Border Radius** (--radius-*)

**Como usar:**
1. Acesse `Foundations/Tokens Showcase/Default`
2. Navegue pelas categorias
3. Clique em um token para copiar o nome
4. Use no seu código CSS ou componente

**Exemplo de output:**
```
Primary Colors
├─ --color-primary-100: #E0DEF9
├─ --color-primary-200: #C1BDF4
├─ --color-primary-300: #A29CEE
└─ ...

Legend Colors (Proficiência)
├─ --color-legend-advanced: #6e63e8 (Roxo)
├─ --color-legend-proficient: #28c76f (Verde)
├─ --color-legend-basic: #ff9f43 (Laranja - NÃO amarelo!)
└─ ...
```

---

### 2️⃣ Colors

**Arquivo**: `apps/storybook/stories/foundations/Colors.stories.tsx`

**O que faz:**
- Paleta completa de cores do Design System
- Foco em cores semânticas e funcionais
- Interface interativa com cópia de tokens

**Stories disponíveis:**

#### a) Semantic Colors
Cores com significado específico:
- Primary / Primary Foreground
- Secondary / Secondary Foreground
- Destructive / Destructive Foreground
- Muted / Muted Foreground
- Accent / Accent Foreground
- Card / Card Foreground

#### b) Base Colors
Cores fundamentais:
- Background
- Foreground
- Border
- Input
- Ring

#### c) All Tokens
Paleta completa com componente `ColorPalette`:
- Cores Primárias
- Cores de Estado
- Cores de Superfície
- Cores Neutras

**Como usar:**
1. Acesse `Foundations/Colors`
2. Escolha a story (Semantic/Base/All Tokens)
3. Clique em uma cor para copiar o token CSS
4. Use em seu componente

**Exemplo de uso:**
```css
/* CSS custom property */
.my-button {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

```tsx
// Tailwind class
<button className="bg-primary text-primary-foreground">
  Click me
</button>
```

---

### 3️⃣ Primitives

**Arquivo**: `apps/storybook/stories/foundations/Primitives.stories.tsx`

**O que faz:**
- Documenta tokens primitivos do Figma
- Mostra escalas de spacing, typography, border radius
- Exemplos de uso em contexto

**Tokens documentados:**
- **Typography**: font-sans, font families
- **Spacing**: padding-1 até padding-25 (incrementos de 4px)
- **Gap**: gap-1 até gap-25
- **Border Radius**: radius-xs, radius-sm, radius-md, radius-lg, radius-xl, radius-round

**Como usar:**
1. Acesse `Foundations/Primitives`
2. Visualize as escalas disponíveis
3. Copie os tokens para uso

**Exemplo de uso:**
```css
.container {
  padding: var(--padding-4);    /* 16px */
  gap: var(--gap-3);             /* 12px */
  border-radius: var(--radius-md); /* 6px */
  font-family: var(--font-sans);
}
```

---

### 4️⃣ Bootstrap Compatibility

**Arquivo**: `apps/storybook/stories/foundations/BootstrapCompatibility.stories.tsx`

**O que faz:**
- Testa carregamento opt-in de Bootstrap-Vue
- Demonstra classes de compatibilidade
- Compara com e sem compatibilidade

**Classes disponíveis:**
- Badges: `.badge`, `.badge-primary`, `.badge-legend-*`
- Buttons: `.btn`, `.btn-primary`, `.btn-outline-*`
- Cards: `.card`, `.card-header`, `.card-body`
- Forms: `.form-control`, `.form-label`

**Uso especial:**
Apenas em stories que precisam de Bootstrap-Vue:
```tsx
export const MinhaStory: Story = {
  parameters: {
    bootstrapCompat: true, // ← Ativa compatibilidade
  },
};
```

---

## 🔍 Navegação e Busca

### Via Search do Storybook
1. Pressione `/` ou `Ctrl+K` para abrir busca
2. Digite `tokens`, `colors`, ou nome do token
3. Navegue para a story desejada

### Via Sidebar
1. Expanda `Foundations`
2. Escolha a categoria:
   - Tokens Showcase (overview completo)
   - Colors (foco em cores)
   - Primitives (tokens base)
   - Spacing (espaçamentos)
   - Typography (fontes)

---

## 💻 Uso no Código

### Em CSS / SCSS

```css
/* Importar tokens */
@import "@fabioeducacross/ui/styles.css";

/* Usar variáveis CSS */
.my-component {
  /* Cores */
  color: var(--color-primary-500);
  background: var(--color-legend-advanced);
  
  /* Spacing */
  padding: var(--padding-4);
  gap: var(--gap-3);
  
  /* Border Radius */
  border-radius: var(--radius-md);
  
  /* Typography */
  font-family: var(--font-sans);
}
```

### Em Componentes React

```tsx
import "@fabioeducacross/ui/styles.css";

// Usar classes Tailwind (geradas a partir dos tokens)
function MyComponent() {
  return (
    <div className="bg-primary text-primary-foreground p-4 rounded-md">
      <h1 className="text-2xl font-sans">Hello World</h1>
      <span className="text-legend-basic">Básico</span>
    </div>
  );
}
```

### Legend Colors (Proficiência)

⚠️ **IMPORTANTE**: Legend colors têm valores específicos!

```tsx
// Cores de proficiência
<span className="text-legend-advanced">Avançado</span>      // Roxo: #6e63e8
<span className="text-legend-proficient">Proficiente</span> // Verde: #28c76f
<span className="text-legend-basic">Básico</span>           // LARANJA: #ff9f43 (não amarelo!)
<span className="text-legend-below-basic">Abaixo</span>     // Vermelho: #ea5455
```

---

## 📦 Exportação de Tokens

Os tokens são automaticamente exportados durante o build:

```bash
pnpm --filter @fabioeducacross/ui build
```

**Arquivos gerados:**
- `packages/ui/dist/tokens.json` - 280 tokens em JSON
- `packages/ui/dist/manifest.json` - Manifest de componentes
- `packages/ui/dist/styles.css` - CSS compilado com todos os tokens

### Estrutura do tokens.json

```json
{
  "colors": {
    "primary": {
      "100": "#E0DEF9",
      "200": "#C1BDF4",
      "500": "#6E63E8",
      ...
    },
    "legend": {
      "advanced": "#6e63e8",
      "proficient": "#28c76f",
      "basic": "#ff9f43",
      ...
    }
  },
  "spacing": { ... },
  "radius": { ... }
}
```

---

## 🎯 Casos de Uso

### 1. Novo Componente
**Problema**: Preciso criar um botão com as cores do Design System  
**Solução**: 
1. Acesse `Foundations/Colors/Semantic Colors`
2. Veja as combinações de background + foreground
3. Use `bg-primary text-primary-foreground`

### 2. Espaçamento Consistente
**Problema**: Qual padding usar?  
**Solução**:
1. Acesse `Foundations/Primitives`
2. Veja a escala de padding (4px increments)
3. Use `var(--padding-4)` (16px) ou classe `p-4`

### 3. Badge de Proficiência
**Problema**: Preciso mostrar nível "Básico"  
**Solução**:
1. Acesse `Foundations/Tokens Showcase`
2. Encontre `--color-legend-basic` (#ff9f43 - LARANJA)
3. Use `text-legend-basic` ou `bg-legend-basic`

### 4. Compatibilidade Bootstrap
**Problema**: Migrando componente do Frontoffice Vue  
**Solução**:
1. Acesse `Foundations/Bootstrap Compatibility`
2. Veja classes disponíveis
3. Ative opt-in: `parameters.bootstrapCompat: true`

---

## 🔧 Manutenção

### Adicionar Novos Tokens

1. **Editar**: `packages/ui/src/styles.css`
```css
:root {
  --meu-novo-token: valor;
}
```

2. **Build**:
```bash
pnpm --filter @fabioeducacross/ui build
```

3. **Verificar**: Tokens Showcase irá exibir automaticamente

### Atualizar Categorias

Tokens Showcase detecta automaticamente por prefixo:
- `--color-*` → Colors
- `--padding-*` → Padding
- `--gap-*` → Gap
- `--radius-*` → Border Radius

Para adicionar nova categoria, edite:
`apps/storybook/stories/foundations/TokensShowcase.stories.tsx`

---

## 📚 Recursos Adicionais

### Documentação
- `PIXEL_PERFECT_IMPLEMENTATION.md` - Guia de implementação
- `VERIFICATION_REPORT.md` - Relatório técnico
- `FINAL_VERIFICATION_REPORT.md` - Validação final

### Links Úteis
- Storybook: `http://localhost:6006`
- Tokens JSON: `packages/ui/dist/tokens.json`
- Manifest: `packages/ui/dist/manifest.json`

### Comandos Úteis

```bash
# Iniciar Storybook
pnpm --filter storybook dev

# Build do pacote
pnpm --filter @fabioeducacross/ui build

# Gerar tokens
pnpm --filter @fabioeducacross/ui generate:tokens

# Ver tokens no terminal
cat packages/ui/dist/tokens.json | jq '.colors'
```

---

## ✅ Status

**CSS Explorer**: ✅ **FUNCIONAL E COMPLETO**

Embora não exista um arquivo específico `CssExplorer.stories.tsx`, o conjunto de ferramentas acima fornece exploração completa de todos os 280 tokens do Design System.

**Última atualização**: 31/01/2026  
**Versão**: 1.0
