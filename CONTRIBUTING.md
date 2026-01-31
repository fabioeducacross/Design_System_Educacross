# Contribuindo para o Educacross Design System

Obrigado pelo interesse em contribuir! Este documento descreve as guidelines para contribuições.

## Antes de Começar

1. Leia a [Constitution](./.specify/memory/constitution.md) para entender os princípios do projeto
2. Verifique se já existe uma issue ou PR relacionada
3. Para mudanças significativas, abra uma issue primeiro para discussão

## Setup de Desenvolvimento

```bash
# Clone e instale
git clone <repo-url>
cd design-system
pnpm install

# Inicie o Storybook
pnpm storybook
```

## Fluxo de Trabalho

### 1. Crie uma branch

```bash
git checkout -b feat/novo-componente
# ou
git checkout -b fix/correcao-button
```

### 2. Desenvolva

- Siga o princípio **Spec-First**: defina a especificação antes de implementar
- Siga o princípio **Test-First**: escreva stories com `play` functions antes do código
- Siga o princípio **Tokens-First**: nunca use valores mágicos
- Siga o princípio **Pixel-Perfect**: o Storybook consome CSS do `dist/`, não do `src/`

> **⚠️ Importante**: Antes de rodar o Storybook, execute `pnpm --filter @fabioeducacross/ui build` para garantir que o CSS compilado esteja disponível.

### 3. Verifique qualidade

```bash
pnpm lint
pnpm typecheck
pnpm build
```

### 4. Abra um PR

Use o checklist do PR template.

## Adicionando um Novo Componente

### 1. Estrutura de Arquivos

```
packages/ui/src/components/NomeComponente/
├── NomeComponente.tsx       # Implementação
├── index.ts                 # Re-export
└── (NomeComponente.test.tsx) # Testes unitários (se houver lógica)

apps/storybook/stories/components/
└── NomeComponente.stories.tsx  # Stories
```

### 2. Implementação

```tsx
// NomeComponente.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const componentVariants = cva(
  ["base-classes-aqui"],
  {
    variants: {
      variant: {
        default: "...",
      },
      size: {
        default: "...",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface NomeComponenteProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // props específicas
}

const NomeComponente = React.forwardRef<HTMLElement, NomeComponenteProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
NomeComponente.displayName = "NomeComponente";

export { NomeComponente, componentVariants };
```

### 3. Export público

```ts
// packages/ui/src/index.ts
export { NomeComponente, type NomeComponenteProps } from "./components/NomeComponente";
```

### 4. Stories

```tsx
// apps/storybook/stories/components/NomeComponente.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { NomeComponente } from "@educacross/ui";

const meta: Meta<typeof NomeComponente> = {
  title: "Components/NomeComponente",
  component: NomeComponente,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// Adicione stories para todas as variantes, tamanhos e estados
```

## Checklist do PR

Antes de abrir o PR, verifique:

- [ ] **Tokens**: Sem valores hard-coded (cores, espaçamentos, etc.)
- [ ] **Estados**: Todos os estados implementados (hover, focus, disabled, etc.)
- [ ] **A11y**: Navegação por teclado funciona, aria-attributes presentes
- [ ] **Docs**: Stories com autodocs, todas as variantes demonstradas
- [ ] **Testes**: Play functions para interações principais
- [ ] **Types**: `pnpm typecheck` passa
- [ ] **Lint**: `pnpm lint` passa
- [ ] **Build**: `pnpm build` funciona

## Convenções

### Naming

- Componentes: PascalCase (`Button`, `FormField`)
- Props: camelCase (`onClick`, `isLoading`)
- CSS classes: kebab-case via Tailwind
- Arquivos: PascalCase para componentes, kebab-case para utilitários

### Commits

Usamos Conventional Commits:

```
feat: adiciona componente Checkbox
fix: corrige foco do Button no Safari
docs: atualiza README com exemplos
chore: atualiza dependências
BREAKING CHANGE: remove prop `size` do Label
```

### Props Padrão

Use nomes consistentes:

| Prop | Uso |
|------|-----|
| `variant` | Variação visual |
| `size` | Tamanho |
| `disabled` | Estado desabilitado |
| `loading` | Estado de carregamento |
| `asChild` | Composição via Slot |
| `className` | Classes adicionais |

## Dúvidas?

Abra uma issue ou procure o time de Design System.
