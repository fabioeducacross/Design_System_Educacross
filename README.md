# Educacross Design System

Sistema de design em código para reduzir inconsistências visuais, acelerar desenvolvimento e aumentar qualidade (a11y + estados).

## Stack

- **React 18+** - Framework de UI
- **Tailwind CSS 3.4+** - Styling com utility classes
- **Radix UI** - Primitivos acessíveis
- **shadcn/ui patterns** - Componentes customizáveis
- **Storybook 8** - Documentação e playground
- **pnpm** - Package manager
- **Turborepo** - Monorepo build system

## Estrutura

```
├── apps/
│   └── storybook/          # Catálogo de componentes
├── packages/
│   └── ui/                 # @educacross/ui - Design System
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

#### Via GitHub (Versão Estável)

```bash
# Instalar versão específica (recomendado)
pnpm add github:fabioeducacross/Design_System_Educacross#v0.1.0

# Ou instalar a branch master (desenvolvimento)
pnpm add github:fabioeducacross/Design_System_Educacross#master
```

#### Via npm (Em breve)

```bash
pnpm add @educacross/ui
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
# Instale via GitHub
pnpm add github:fabioeducacross/Deisign_System_Educacross#master

# No tailwind.config.ts
import { educacrossPreset } from "@educacross/ui/tailwind-preset";

export default {
  presets: [educacrossPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@educacross/ui/dist/**/*.js",
  ],
};

# No seu CSS principal
@import "@educacross/ui/styles.css";
```

### Usando componentes

```tsx
import { Button, Input, Label } from "@educacross/ui";

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
