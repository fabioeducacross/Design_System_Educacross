# 📖 Storybook - Educacross Design System

Documentação interativa e catálogo de componentes do Design System Educacross.

---

## 🚀 Quick Start

### Desenvolvimento
```bash
# Instalar dependências
pnpm install

# Build do pacote UI (necessário primeiro)
pnpm --filter @fabioeducacross/ui build

# Iniciar Storybook
pnpm --filter storybook dev
```

Acesse: `http://localhost:6006`

### Build para Produção
```bash
# Build estático
pnpm --filter storybook build

# Preview do build
pnpm --filter storybook preview
```

---

## 🎯 O Que é Este Storybook?

Este Storybook documenta o **Educacross Design System**, um sistema de design completo para aplicações educacionais.

### Conteúdo Disponível

#### 🎨 **Foundations** (Fundações)
Tokens, cores, tipografia e primitivos do design system.

**Stories principais:**
- **Tokens Showcase** - 280 tokens CSS exploráveis
- **Colors** - Paleta completa de cores
- **Primitives** - Tokens primitivos (spacing, radius)
- **Typography** - Escalas tipográficas
- **Icons** - Biblioteca de ícones
- **Bootstrap Compatibility** - Teste de compatibilidade opt-in

#### 🧱 **Components** (Componentes)
27 componentes React prontos para uso.

**Categorias:**
- **Layout**: Header, Logo, AvatarIcon, Sidebar
- **Forms**: Button, Input, Label, Checkbox, Radio, Select
- **Display**: Card, Badge, Avatar, Skeleton, Table
- **Feedback**: Alert, Toast
- **Overlay**: Dialog, Popover, Tooltip, DropdownMenu
- **Navigation**: Tabs, Accordion, Pagination
- **Theme**: ThemeSwitcher

#### 📚 **Patterns** (Padrões)
Padrões de uso e composição de componentes.

#### 📄 **Templates** (Templates)
Layouts completos de página.

---

## 🎨 Explorador de Tokens CSS

### Como Explorar Tokens

#### Via Tokens Showcase (Recomendado)
1. Navegue para `Foundations` → `Tokens Showcase`
2. Visualize **todos os 280 tokens** organizados por categoria
3. Veja preview visual de cores, spacing e radius
4. Clique para copiar nomes de tokens

#### Via Colors
1. Navegue para `Foundations` → `Colors`
2. Explore cores semânticas e base
3. Clique em uma cor para copiar o token CSS

#### Via Primitives
1. Navegue para `Foundations` → `Primitives`
2. Veja escalas de spacing, typography e radius
3. Exemplos de uso em contexto

**📘 Documentação completa**: Ver `docs/CSS_EXPLORER.md`

---

## 🔍 Categorias de Tokens

### Cores (175 tokens)
- `--color-primary-*` (100-900)
- `--color-secondary-*` (100-900)
- `--color-success-*`, `--color-danger-*`, `--color-warning-*`, `--color-info-*`
- `--color-legend-*` (advanced, proficient, basic, below-basic, not-completed, in-progress)

### Spacing (52 tokens)
- `--padding-*` (1-25, incrementos de 4px)
- `--gap-*` (1-25, incrementos de 4px)

### Border Radius (7 tokens)
- `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-round`

### Typography
- `--font-sans` (Montserrat)

---

## 💻 Como Usar no Código

### Importar CSS
```tsx
import "@fabioeducacross/ui/styles.css";
```

### Usar Tokens em CSS
```css
.my-component {
  /* Cores */
  color: var(--color-primary-500);
  background: var(--color-legend-advanced);
  
  /* Spacing */
  padding: var(--padding-4);  /* 16px */
  gap: var(--gap-3);          /* 12px */
  
  /* Border Radius */
  border-radius: var(--radius-md); /* 6px */
}
```

### Usar Classes Tailwind
```tsx
<div className="bg-primary text-primary-foreground p-4 rounded-md">
  <h1 className="text-2xl">Hello World</h1>
  <span className="text-legend-basic">Básico</span>
</div>
```

### Legend Colors (Proficiência)
```tsx
<span className="text-legend-advanced">Avançado</span>      // Roxo
<span className="text-legend-proficient">Proficiente</span> // Verde
<span className="text-legend-basic">Básico</span>           // LARANJA (não amarelo!)
<span className="text-legend-below-basic">Abaixo</span>     // Vermelho
```

---

## ⚙️ Configuração Pixel Perfect

Este Storybook está configurado em **modo Pixel Perfect**, garantindo fidelidade visual 100% com produção.

### O Que Significa?
- ✅ CSS importado do **dist compilado** (`@fabioeducacross/ui/styles.css`)
- ✅ Sem duplicação de Tailwind directives
- ✅ Aliases apontam para `packages/ui/dist` (não `src`)
- ✅ Bootstrap-Vue é **opt-in** (não global)

### Verificação
```bash
# Verificar CSS compilado
grep -c "@tailwind" packages/ui/dist/styles.css
# Esperado: 0

# Verificar tamanho
ls -lh packages/ui/dist/styles.css
# Esperado: ~54 KB (compilado)
```

**📘 Documentação completa**: Ver `PIXEL_PERFECT_IMPLEMENTATION.md` na raiz

---

## 🔌 Bootstrap-Vue Compatibility

### Quando Usar?
Apenas para componentes migrando do **Frontoffice Vue**.

### Como Ativar?
```tsx
export const MinhaStory: Story = {
  parameters: {
    bootstrapCompat: true, // ← Ativa CSS de compatibilidade
  },
};
```

### Classes Disponíveis
- Badges: `.badge`, `.badge-primary`, `.badge-legend-*`
- Buttons: `.btn`, `.btn-primary`, `.btn-outline-*`
- Cards: `.card`, `.card-header`, `.card-body`
- Forms: `.form-control`, `.form-label`

**📘 Story de exemplo**: `Foundations/Bootstrap Compatibility`

---

## 🧪 Testes

### Rodar Testes
```bash
# Testes do Storybook
pnpm --filter storybook test

# Testes com watch
pnpm --filter storybook test:watch

# Coverage
pnpm --filter storybook test:coverage
```

### Vitest + Testing Library
Todos os componentes possuem testes com:
- Rendering básico
- Interações do usuário
- Acessibilidade (a11y)

---

## 📁 Estrutura de Pastas

```
apps/storybook/
├── .storybook/          # Configuração do Storybook
│   ├── main.ts          # Config principal
│   ├── preview.ts       # Config de preview
│   └── custom-styles.css # Estilos do Storybook UI
├── docs/                # Documentação
│   └── CSS_EXPLORER.md  # Guia do explorador de tokens
├── public/              # Assets estáticos
│   └── bootstrap-vue-compat.css # Bootstrap opt-in
├── src/                 # Código fonte
│   ├── components/      # Componentes auxiliares
│   └── storybook-globals.css # Import do CSS do DS
├── stories/             # Stories organizadas
│   ├── foundations/     # Tokens, cores, primitivos
│   ├── components/      # Componentes individuais
│   ├── patterns/        # Padrões de uso
│   └── templates/       # Layouts completos
└── tests/               # Testes
```

---

## 📚 Recursos e Links

### Documentação Técnica
- `PIXEL_PERFECT_IMPLEMENTATION.md` - Implementação do modo pixel perfect
- `VERIFICATION_REPORT.md` - Relatório técnico de verificação
- `FINAL_VERIFICATION_REPORT.md` - Validação final completa
- `apps/storybook/docs/CSS_EXPLORER.md` - Guia do explorador de tokens

### Comandos Úteis

```bash
# Build completo
pnpm --filter @fabioeducacross/ui build
pnpm --filter storybook build

# Desenvolvimento
pnpm --filter storybook dev

# Testes
pnpm --filter storybook test

# Lint
pnpm --filter storybook lint

# Typecheck
pnpm --filter storybook typecheck

# Gerar tokens (automático no build)
pnpm --filter @fabioeducacross/ui generate:tokens
```

### Arquivos Gerados
- `packages/ui/dist/styles.css` - CSS compilado (54 KB)
- `packages/ui/dist/tokens.json` - 280 tokens em JSON
- `packages/ui/dist/manifest.json` - Manifest de componentes

---

## 🎯 Status

### Implementação
- ✅ **Pixel Perfect**: 100% implementado
- ✅ **CSS Compilado**: 54 KB sem diretivas @tailwind
- ✅ **Tokens**: 280 tokens exportados
- ✅ **Componentes**: 27 componentes documentados
- ✅ **Explorador de Tokens**: Funcional (TokensShowcase + Colors + Primitives)
- ✅ **Bootstrap Opt-in**: Implementado e testado

### Qualidade
- **Componentes com testes**: 26/27 (96.3%)
- **Componentes com stories**: 25/27 (92.6%)
- **Componentes com README**: 27/27 (100%)
- **Completude geral**: 96.3%

---

## 🤝 Contribuindo

### Adicionar Nova Story
1. Crie arquivo em `stories/[categoria]/[Nome].stories.tsx`
2. Use template:
```tsx
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MeuComponente> = {
  title: "Categoria/Nome",
  component: MeuComponente,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MeuComponente>;

export const Default: Story = {
  args: { ... },
};
```

### Adicionar Novo Token
1. Edite `packages/ui/src/styles.css`
2. Adicione em `:root { --meu-token: valor; }`
3. Build: `pnpm --filter @fabioeducacross/ui build`
4. Token aparece automaticamente no Tokens Showcase

---

## 📞 Suporte

**Issues**: https://github.com/fabioeducacross/Design_System_Educacross/issues  
**Docs**: Ver pasta `/docs` na raiz do repositório

---

**Versão**: 0.2.0  
**Última atualização**: 31/01/2026  
**Status**: ✅ Pronto para Produção
