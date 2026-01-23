# Educacross Design System

[![Chromatic](https://img.shields.io/badge/chromatic-visual%20testing-orange?logo=storybook)](https://www.chromatic.com/builds?appId=69727df0ab06437ceb56a008)
[![Storybook](https://img.shields.io/badge/storybook-published-ff4785?logo=storybook)](https://69727df0ab06437ceb56a008-gvenynqzgl.chromatic.com/)

Sistema de design em código para reduzir inconsistências visuais, acelerar desenvolvimento e aumentar qualidade (a11y + estados).

> **📌 Nota**: Atualmente apenas **React** é oficialmente suportado. Exemplos de Vue 2/Bootstrap e Vue 3 no Storybook são conceituais.

## Stack

- **React 18+** - Framework de UI
- **Tailwind CSS 3.4+** - Styling com utility classes
- **Radix UI** - Primitivos acessíveis
- **shadcn/ui patterns** - Componentes customizáveis
- **Storybook 10** - Documentação e playground
- **pnpm** - Package manager
- **Turborepo** - Monorepo build system

## Estrutura

```
├── apps/
│   └── storybook/          # Catálogo de componentes
├── packages/
│   └── ui/                 # @fabioeducacross/ui - Design System
│       ├── src/
│       │   ├── components/ # Button, Input, Label...
│       │   ├── utils/      # Utilitários (cn)
│       │   ├── styles.css  # Tokens CSS
│       │   └── tailwind-preset.ts
│       └── package.json
└── package.json            # Workspace root
```

## Quick Start

### 📦 Instalação

#### Via GitHub Packages

```bash
# 1. Criar .npmrc na raiz do projeto
echo "@fabioaap:registry=https://npm.pkg.github.com" > .npmrc

# 2. Instalar pacote
pnpm add @fabioeducacross/ui@0.1.0
```

**📖 Guia Completo**: Veja [USAGE.md](./USAGE.md) para instruções detalhadas de configuração.

### Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/fabioeducacross/Deisign_System_Educacross.git
cd Deisign_System_Educacross

# Instale dependências
pnpm install

# Rode o Storybook
pnpm storybook
```

### Configuração Básica (React)

```bash
# Criar .npmrc
echo "@fabioaap:registry=https://npm.pkg.github.com" > .npmrc

# Instalar pacote
pnpm add @fabioeducacross/ui@0.1.0

# No tailwind.config.ts
import { educacrossPreset } from "@fabioeducacross/ui/tailwind-preset";

export default {
  presets: [educacrossPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@fabioeducacross/ui/dist/**/*.js",
  ],
};

# No seu CSS principal
@import "@fabioeducacross/ui/styles.css";
```

### Usando componentes

```tsx
import { Button, Input, Label } from "@fabioeducacross/ui";

function LoginForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" required>Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <Button type="submit">Entrar</Button>
    </form>
  );
}
```

## Scripts

```bash
# Desenvolvimento
pnpm storybook          # Storybook em http://localhost:6006

# Build
pnpm build              # Build de todos os pacotes
pnpm build:storybook    # Build do Storybook

# Visual Testing
pnpm chromatic          # Publica no Chromatic para visual testing

# Qualidade
pnpm lint               # ESLint
pnpm typecheck          # TypeScript
pnpm format             # Prettier
pnpm test               # Vitest (480 testes)
pnpm test:watch         # Testes em modo watch
pnpm test:coverage      # Cobertura de testes

# Limpeza
pnpm clean              # Remove dist e node_modules
```

## Links Rápidos

- 📚 **[Storybook Publicado](https://69727df0ab06437ceb56a008-gvenynqzgl.chromatic.com/)** - Visualize todos os componentes
- 🎨 **[Chromatic](https://www.chromatic.com/setup?appId=69727df0ab06437ceb56a008)** - Visual testing e snapshots
- ⚡ **[Guia Rápido Chromatic](./docs/CHROMATIC_QUICKSTART.md)** - Como usar visual testing no dia a dia
- 📖 **[Guia de Uso](./USAGE.md)** - Como instalar e usar o Design System
- 🤝 **[Como Contribuir](./CONTRIBUTING.md)** - Guidelines para contribuidores
- 🚀 **[Configuração Chromatic](./docs/CHROMATIC.md)** - Setup técnico completo

## Componentes MVP

| Componente | Variantes | Tamanhos | Estados |
|------------|-----------|----------|---------|
| Button | default, destructive, outline, secondary, ghost, link | sm, default, lg, icon | hover, focus, disabled, loading |
| Input | default, error | sm, default, lg | focus, disabled, error |
| Label | default, error, muted | - | - |

## Tokens

### Cores
- `background`, `foreground`
- `primary`, `secondary`, `destructive`
- `muted`, `accent`
- `border`, `input`, `ring`

### Outros
- `--radius` - Border radius base
- Shadows: `sm`, `md`, `lg`
- Typography: Montserrat font (pesos 300-700), escala Tailwind

## Light / Dark Mode

O tema é controlado pela classe `.dark` no `<html>`:

```tsx
// Toggle
document.documentElement.classList.toggle("dark");
```

No Storybook, use o controle de tema na toolbar.

## Contribuindo

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para guidelines.

## Governança

- **SemVer**: Seguimos versionamento semântico
- **Changelog**: Toda release tem changelog
- **Deprecação**: APIs deprecated são mantidas por pelo menos 1 minor

## Licença

MIT


