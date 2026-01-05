# Educacross Design System - Copilot Instructions

## Arquitetura

Este é um **monorepo** com pnpm + Turborepo contendo:
- `packages/ui` → Pacote NPM `@educacross/ui` (componentes React)
- `apps/storybook` → Documentação interativa Storybook 8

Stack: **React 18+**, **Tailwind CSS 3.4+**, **Radix UI** (primitivos acessíveis), **class-variance-authority** (CVA).

## Comandos Essenciais

```bash
pnpm install           # Instalar dependências
pnpm storybook         # Dev em localhost:6006
pnpm build             # Build via Turborepo
pnpm lint && pnpm typecheck  # Validação
pnpm test              # Vitest no pacote UI
```

## Estrutura de Componentes

Cada componente segue esta estrutura em `packages/ui/src/components/`:

```
NomeComponente/
├── NomeComponente.tsx   # Implementação com CVA
└── index.ts             # Re-export
```

E uma story correspondente em `apps/storybook/stories/components/NomeComponente.stories.tsx`.

## Padrões Obrigatórios

### 1. Tokens-First (Nunca valores mágicos)
Use APENAS tokens CSS de [styles.css](packages/ui/src/styles.css):
```tsx
// ✅ Correto - usa token
"bg-primary text-primary-foreground"

// ❌ Errado - valor hard-coded
"bg-blue-500 text-white"
```

### 2. CVA para Variantes
Todos componentes usam `class-variance-authority`:
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(["base-classes"], {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "h-10 px-4", sm: "h-9 px-3" },
  },
  defaultVariants: { variant: "default", size: "default" },
});
```

### 3. `cn()` para Merge de Classes
Sempre use o utilitário `cn` de `../../utils` para combinar classes:
```tsx
import { cn } from "../../utils";
<button className={cn(buttonVariants({ variant, size }), className)} />
```

### 4. forwardRef + displayName
Componentes devem usar `React.forwardRef` e definir `displayName`:
```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => { ... }
);
Button.displayName = "Button";
```

### 5. Acessibilidade (A11y)
- Incluir `focus-visible:ring-2 focus-visible:ring-ring` para foco visível
- Usar primitivos Radix UI quando disponíveis
- Estados: `disabled:pointer-events-none disabled:opacity-50`

### 6. Props Padrão
| Prop | Descrição |
|------|-----------|
| `variant` | Variação visual |
| `size` | Tamanho (sm, default, lg) |
| `disabled` | Estado desabilitado |
| `loading` | Mostra spinner |
| `asChild` | Composição via Radix Slot |
| `className` | Classes adicionais |

## Exportação

Novos componentes devem ser exportados em `packages/ui/src/index.ts`:
```tsx
export { Button, buttonVariants, type ButtonProps } from "./components/Button";
```

## Stories

Use `tags: ["autodocs"]` para gerar documentação automática. Inclua play functions para testes de interação:
```tsx
export const Default: Story = {
  args: { children: "Button" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
  },
};
```

## Tema Claro/Escuro

Tokens adaptam automaticamente via classe `.dark` no root. Cores usam formato HSL em CSS custom properties:
```css
--primary: 221.2 83.2% 53.3%;  /* Light */
.dark { --primary: 217.2 91.2% 59.8%; }  /* Dark */
```

## Commits

Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `BREAKING CHANGE:`
