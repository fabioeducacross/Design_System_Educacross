# Quickstart Guide — Atomic Design Components

**Date**: 2026-01-22 | **Phase**: 1 (Design)  
**Goal**: Configurar ambiente e implementar primeiro componente em ~30 minutos.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Node.js**: 20.x LTS ou superior
- **pnpm**: 9.x ou superior (`npm install -g pnpm`)
- **Git**: Repositório clonado
- **VS Code**: Recomendado (com extensões TypeScript e Tailwind CSS IntelliSense)

Verifique suas versões:

```bash
node --version    # v20.11.0+
pnpm --version    # 9.0.0+
git --version     # 2.40.0+
```

---

## 🚀 Setup Inicial (5 minutos)

### 1. Instalar Dependências

Navegue até a raiz do monorepo e instale todas as dependências:

```bash
cd Design_System_Educacross
pnpm install
```

Isso instalará dependências de ambos os workspaces (`packages/ui` e `apps/storybook`).

### 2. Instalar Novas Dependências (Phase 0 research)

Adicione as novas dependências necessárias para os 3 componentes:

```bash
# No workspace packages/ui
cd packages/ui

pnpm add @tanstack/react-table@^8.20.0
pnpm add react-hook-form@^7.52.0
pnpm add zod@^3.23.0
pnpm add @hookform/resolvers@^3.9.0

# Virtualização (devDependency, opcional)
pnpm add -D @tanstack/react-virtual@^3.10.0

# Volta para raiz
cd ../..
```

**Checklist de instalação:**

```bash
# Verificar se instalou corretamente
cd packages/ui
pnpm list @tanstack/react-table  # 8.20.0
pnpm list react-hook-form        # 7.52.0
pnpm list zod                    # 3.23.0
pnpm list @hookform/resolvers    # 3.9.0
```

### 3. Verificar Build

Certifique-se de que o projeto compila sem erros:

```bash
# Na raiz do monorepo
pnpm build
```

Saída esperada:

```
✓ packages/ui:build (tsup)
✓ apps/storybook:build (vite)
```

---

## 🧪 Rodar Storybook (Desenvolvimento)

O Storybook é sua fonte de verdade para visualizar componentes durante o desenvolvimento.

```bash
pnpm storybook
```

Isso iniciará o dev server em **http://localhost:6006**.

Abra no navegador e verifique se componentes existentes (Button, Badge, etc.) estão funcionando.

---

## 📂 Estrutura de Pastas

Familiarize-se com a estrutura do projeto:

```
Design_System_Educacross/
├── packages/
│   └── ui/                          # Pacote @educacross/ui
│       ├── src/
│       │   ├── components/          # Componentes do DS
│       │   │   ├── Button/
│       │   │   │   ├── Button.tsx
│       │   │   │   └── index.ts
│       │   │   ├── FormField/       # ⬅️ Criar aqui
│       │   │   ├── DataTable/       # ⬅️ Criar aqui
│       │   │   └── DashboardLayout/ # ⬅️ Criar aqui
│       │   ├── hooks/               # Hooks reutilizáveis
│       │   ├── utils/               # Utilitários (cn, etc.)
│       │   ├── types/               # Tipos compartilhados
│       │   ├── index.ts             # Barrel export
│       │   └── styles.css           # Tokens CSS
│       ├── package.json
│       └── tsconfig.json
├── apps/
│   └── storybook/                   # Documentação
│       ├── stories/
│       │   └── components/
│       │       ├── FormField.stories.tsx       # ⬅️ Criar aqui
│       │       ├── DataTable.stories.tsx       # ⬅️ Criar aqui
│       │       └── DashboardLayout.stories.tsx # ⬅️ Criar aqui
│       └── vite.config.ts
├── specs/                           # Especificações
│   ├── components/
│   │   ├── FORMFIELD.md
│   │   ├── DATATABLE.md
│   │   └── DASHBOARDLAYOUT.md
│   └── atomic-design-implementation/
│       ├── plan.md
│       ├── research.md
│       ├── data-model.md
│       ├── quickstart.md            # ⬅️ Você está aqui
│       └── contracts/
└── pnpm-workspace.yaml
```

---

## 🧑‍💻 Implementar Primeiro Componente (FormField)

Vamos implementar **FormField** (molécula) como exemplo. Siga os mesmos passos para DataTable e DashboardLayout.

### Passo 1: Criar Arquivos Base

```bash
cd packages/ui/src/components

# Criar pasta FormField
mkdir FormField
cd FormField

# Criar arquivos
touch FormField.tsx
touch FormField.types.ts
touch index.ts
```

### Passo 2: Definir Types

Abra `FormField.types.ts` e copie as interfaces do [data-model.md](./data-model.md#11-props-interface):

```typescript
// packages/ui/src/components/FormField/FormField.types.ts

import type { ReactElement, ReactNode } from "react";

export interface FormFieldProps {
  label: string;
  id?: string;
  required?: boolean;
  error?: string;
  helperText?: string | ReactNode;
  size?: "sm" | "md" | "lg";
  layout?: "vertical" | "horizontal";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: ReactElement;
}

export interface FieldState {
  value: any;
  error?: string;
  touched: boolean;
  dirty: boolean;
  validating?: boolean;
}

export interface FormFieldContextValue {
  fieldId: string;
  helperTextId: string;
  errorId: string;
  hasError: boolean;
  isDisabled: boolean;
  isRequired: boolean;
}
```

### Passo 3: Implementar Componente Mínimo

Abra `FormField.tsx` e implemente versão mínima (sem variantes ainda):

```tsx
// packages/ui/src/components/FormField/FormField.tsx

import * as React from "react";
import { cn } from "../../utils";
import type { FormFieldProps } from "./FormField.types";

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      id,
      required = false,
      error,
      helperText,
      size = "md",
      layout = "vertical",
      disabled = false,
      loading = false,
      className,
      children,
    },
    ref
  ) => {
    // Gerar IDs únicos
    const autoId = React.useId();
    const fieldId = id || `field-${autoId}`;
    const helperTextId = `${fieldId}-helper`;
    const errorId = `${fieldId}-error`;

    const hasError = !!error;

    // Injetar props no input filho
    const enhancedChild = React.cloneElement(children, {
      id: fieldId,
      "aria-invalid": hasError,
      "aria-required": required,
      "aria-describedby": hasError ? errorId : helperText ? helperTextId : undefined,
      disabled: disabled || loading,
      ...children.props, // Preserva props originais
    });

    return (
      <div
        ref={ref}
        className={cn(
          "form-field",
          `form-field-${size}`,
          `form-field-${layout}`,
          className
        )}
        data-testid="form-field"
      >
        <label htmlFor={fieldId} className="form-field-label">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
          {loading && <span className="ml-2">⏳</span>}
        </label>

        {enhancedChild}

        {!hasError && helperText && (
          <p id={helperTextId} className="form-field-helper text-muted-foreground text-sm mt-1">
            {helperText}
          </p>
        )}

        {hasError && (
          <p id={errorId} role="alert" className="form-field-error text-destructive text-sm mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
```

### Passo 4: Exportar Componente

Abra `index.ts`:

```typescript
// packages/ui/src/components/FormField/index.ts

export { FormField } from "./FormField";
export type { FormFieldProps, FieldState, FormFieldContextValue } from "./FormField.types";
```

### Passo 5: Adicionar ao Barrel Export

Abra `packages/ui/src/index.ts` e adicione:

```typescript
// packages/ui/src/index.ts

// ... outros exports ...

// FormField
export { FormField } from "./components/FormField";
export type { FormFieldProps, FieldState, FormFieldContextValue } from "./components/FormField";
```

### Passo 6: Criar Story no Storybook

Crie arquivo de story em `apps/storybook/stories/components/FormField.stories.tsx`:

```tsx
// apps/storybook/stories/components/FormField.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { FormField, Input } from "@educacross/ui";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Nome completo",
    children: <Input placeholder="Digite seu nome" />,
  },
};

export const Required: Story = {
  args: {
    label: "E-mail",
    required: true,
    helperText: "Usaremos para autenticação",
    children: <Input type="email" placeholder="seu@email.com" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Senha",
    required: true,
    error: "Senha deve ter no mínimo 8 caracteres",
    children: <Input type="password" />,
  },
};

export const Loading: Story = {
  args: {
    label: "E-mail",
    loading: true,
    helperText: "Verificando disponibilidade...",
    children: <Input type="email" />,
  },
};

export const Horizontal: Story = {
  args: {
    label: "Data de nascimento",
    layout: "horizontal",
    children: <Input type="date" />,
  },
};

export const Small: Story = {
  args: {
    label: "Filtro",
    size: "sm",
    children: <Input placeholder="Buscar..." />,
  },
};
```

### Passo 7: Testar no Storybook

Salve todos os arquivos e veja o Storybook recarregar automaticamente:

```bash
# Se não estiver rodando, inicie
pnpm storybook
```

Navegue até **Components → FormField** no menu lateral. Você verá 6 stories:

- Default
- Required
- WithError
- Loading
- Horizontal
- Small

Interaja com cada uma e verifique o comportamento.

---

## ✅ Checklist de Validação

Use este checklist para garantir que o componente está correto:

### Estrutura

- [ ] Pasta `FormField/` criada em `packages/ui/src/components/`
- [ ] Arquivos `FormField.tsx`, `FormField.types.ts`, `index.ts` existem
- [ ] Componente exportado em `packages/ui/src/index.ts`
- [ ] Story criada em `apps/storybook/stories/components/FormField.stories.tsx`

### Implementação

- [ ] Componente usa `React.forwardRef`
- [ ] `displayName` definido
- [ ] Props tipadas com TypeScript
- [ ] IDs gerados com `React.useId()`
- [ ] `cloneElement` usado para injetar props no children
- [ ] Classes CSS aplicadas com `cn()` utility

### Acessibilidade

- [ ] Label associado ao input via `htmlFor`
- [ ] `aria-required` presente quando `required=true`
- [ ] `aria-invalid` presente quando há `error`
- [ ] `aria-describedby` aponta para helper/error
- [ ] Erro tem `role="alert"`

### Storybook

- [ ] Story aparece no menu lateral
- [ ] Todas as 6 stories renderizam corretamente
- [ ] Controles (Controls tab) funcionam
- [ ] Docs gerados automaticamente (tags: ["autodocs"])

---

## 🧪 Próximos Passos

Agora que FormField está funcionando, siga os mesmos passos para:

1. **DataTable** (organismo)
   - Mais complexo, use TanStack Table
   - Referência: [specs/components/DATATABLE.md](../../specs/components/DATATABLE.md)
   - Contrato: [contracts/DataTable.contract.ts](./contracts/DataTable.contract.ts)

2. **DashboardLayout** (template)
   - Layout completo com sidebar + header + main
   - Referência: [specs/components/DASHBOARDLAYOUT.md](../../specs/components/DASHBOARDLAYOUT.md)
   - Contrato: [contracts/DashboardLayout.contract.ts](./contracts/DashboardLayout.contract.ts)

---

## 📚 Recursos Adicionais

### Documentação Interna

- [Plan.md](./plan.md) — Plano completo de implementação
- [Research.md](./research.md) — Decisões técnicas e alternativas
- [Data Model.md](./data-model.md) — Todas as interfaces TypeScript
- [Contracts/](./contracts/) — Regras de uso obrigatórias

### Documentação Externa

- [TanStack Table](https://tanstack.com/table/latest) — DataTable dependency
- [React Hook Form](https://react-hook-form.com/) — Form validation
- [Zod](https://zod.dev/) — Schema validation
- [Radix UI](https://www.radix-ui.com/) — Accessible primitives
- [CVA](https://cva.style/docs) — Variant classes
- [Storybook 8](https://storybook.js.org/docs) — Component documentation

### Design System Interno

- [README.md](../../README.md) — Visão geral do projeto
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — Guia de contribuição
- [Styles.css](../../packages/ui/src/styles.css) — Tokens CSS

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@educacross/ui'"

**Causa**: Build não executado ou workspace não linkado.

**Solução**:

```bash
pnpm install  # Re-link workspaces
pnpm build    # Build packages/ui
```

### Erro: "cloneElement expects a single ReactElement"

**Causa**: Children é Fragment (`<>...</>`) ou múltiplos elementos.

**Solução**: FormField aceita apenas 1 filho direto:

```tsx
// ❌ ERRADO
<FormField label="Nome">
  <Input />
  <Button />
</FormField>

// ✅ CORRETO
<FormField label="Nome">
  <Input />
</FormField>
```

### Storybook não carrega componente

**Causa**: Import path incorreto na story.

**Solução**: Verifique se está importando do barrel export:

```tsx
// ✅ CORRETO
import { FormField } from "@educacross/ui";

// ❌ ERRADO
import { FormField } from "../../../../packages/ui/src/components/FormField";
```

### TypeScript não reconhece tipos

**Causa**: Build de tipos não executado.

**Solução**:

```bash
cd packages/ui
pnpm typecheck  # Verifica erros
pnpm build      # Gera .d.ts
```

### Hot Reload não funciona no Storybook

**Causa**: Arquivo não salvo ou erro de sintaxe.

**Solução**:

1. Salve todos os arquivos (Ctrl+S)
2. Verifique console do terminal (erros de TS/lint)
3. Reinicie Storybook se necessário: `Ctrl+C` → `pnpm storybook`

---

## ⏱️ Estimativa de Tempo

| Etapa | Tempo |
|-------|-------|
| Setup inicial | 5 min |
| Implementar FormField | 10 min |
| Criar story | 5 min |
| Testar e validar | 5 min |
| **Total** | **25 min** |

---

## 🎯 Objetivos de Aprendizado

Após completar este quickstart, você deve ser capaz de:

- [ ] Criar novo componente do zero
- [ ] Definir interfaces TypeScript corretamente
- [ ] Usar CVA para variantes (próximo passo)
- [ ] Escrever stories no Storybook
- [ ] Validar acessibilidade básica
- [ ] Exportar componente no barrel export

---

**Dúvidas?** Consulte o [plan.md](./plan.md) para contexto completo ou os [contratos](./contracts/) para regras de uso.

**Próximo documento**: [tasks.md](./tasks.md) (Phase 2 — Task Breakdown)
