# Assets Visuais do Educacross Design System

Este diretório contém todos os assets visuais do Storybook.

## 📦 Arquivos Disponíveis

### Logos

- **`logo-educacross-light.svg`** (200×48px)
  - Logo completo para fundos claros
  - Cor primária: `#7367F0`
  - Gradiente: `#7367F0` → `#5C52C0`
  - Uso: Tema claro, documentação, materiais impressos

- **`logo-educacross-dark.svg`** (200×48px)
  - Logo completo para fundos escuros
  - Cor primária: `#8F85F3` (versão mais clara para contraste)
  - Gradiente: `#8F85F3` → `#6B5FD6`
  - Uso: Tema escuro, BrandHeader, apresentações

### Favicon

- **`favicon.svg`** (32×32px)
  - Ícone simplificado (letra "E" estilizada)
  - Formato SVG para navegadores modernos
  - Detecta automaticamente tema claro/escuro
  - Uso: Aba do navegador, PWA manifest

### Open Graph Image

- **`og-image.svg`** (1200×630px)
  - Imagem vetorial para conversão
  - Gradiente de fundo com brand colors
  - Logo + título + descrição + badge de versão

- **`og-image.png`** (1200×630px, ~150KB)
  - Versão rasterizada para compartilhamento
  - Otimizada com Sharp (quality: 95, compressionLevel: 9)
  - Uso: Meta tags OG, Twitter Cards, LinkedIn

## 🛠️ Scripts

### Regenerar OG Image

```bash
pnpm generate:og-image
```

Este script usa Sharp para converter `og-image.svg` em `og-image.png` com qualidade e compressão otimizadas.

## 📐 Especificações Técnicas

### Cores

| Token        | Light Mode | Dark Mode  | Uso                |
|--------------|------------|------------|--------------------|
| Primary      | `#7367F0`  | `#8F85F3`  | Logo, gradientes   |
| Secondary    | `#5C52C0`  | `#6B5FD6`  | Gradiente end      |
| Text         | `#64748B`  | `#94A3B8`  | Subtítulo do logo  |

### Tipografia

- **Logo**: Montserrat Bold (700)
- **Subtítulo**: Montserrat Regular (400)
- **Tamanho**: 18px (logo), 10px (subtítulo)

### Gradientes

```css
/* Light Mode */
background: linear-gradient(135deg, #7367F0 0%, #5C52C0 100%);

/* Dark Mode */
background: linear-gradient(135deg, #8F85F3 0%, #6B5FD6 100%);
```

## 🔄 Workflow de Atualização

1. **Editar SVG**: Atualizar os arquivos `.svg` conforme necessário
2. **Regenerar PNG**: Executar `pnpm generate:og-image`
3. **Validar Build**: `pnpm build` para verificar cópia correta
4. **Commit**: Incluir todos os assets modificados

## 📱 Uso nos Componentes

### BrandHeader

```tsx
<BrandHeader
  title="Educacross"
  subtitle="Design System"
  version="v1.0.0"
  features={["20+ Componentes", "A11y WCAG 2.1 AA"]}
/>
```

O logo é carregado automaticamente de `./logo-educacross-dark.svg` (ajusta para o tema).

### Meta Tags (manager-head.html)

```html
<link rel="icon" type="image/svg+xml" href="./favicon.svg">
<meta property="og:image" content="./og-image.png">
```

## 🎨 Diretrizes de Uso

### ✅ Fazer

- Usar logo completo em layouts com espaço horizontal adequado (min. 180px)
- Usar favicon simplificado para espaços pequenos (< 48px)
- Manter proporção original (aspecto ratio 4.17:1 para logo completo)
- Aplicar gradiente de acordo com o tema (light/dark)

### ❌ Evitar

- Distorcer ou comprimir o logo
- Mudar cores fora dos tokens definidos
- Adicionar sombras ou efeitos não documentados
- Usar logo light em fundos escuros (baixo contraste)

## 📊 Tamanhos Recomendados

| Contexto           | Arquivo                    | Dimensões  |
|--------------------|----------------------------|------------|
| Hero Section       | logo-educacross-dark.svg   | 200×48px   |
| Navbar             | logo-educacross-light.svg  | 150×36px   |
| Favicon            | favicon.svg                | 32×32px    |
| Social Share       | og-image.png               | 1200×630px |
| Avatar Icon        | favicon.svg                | 40×40px    |

## 🔍 Validação

Para verificar se os assets foram copiados corretamente no build:

```bash
pnpm build
ls storybook-static/*.svg
ls storybook-static/*.png
```

Você deve ver:
- `favicon.svg`
- `logo-educacross-light.svg`
- `logo-educacross-dark.svg`
- `og-image.svg`
- `og-image.png`
