# Guia de Contribuição - Novos Pacotes

Este guia detalha como criar e contribuir com novos pacotes no Educacross Design System.

---

## Pré-requisitos

- Node.js 20 LTS
- pnpm 9.15+
- Familiaridade com React 18, TypeScript e Tailwind CSS

---

## Criando um Novo Pacote

### 1. Estrutura Base

```bash
packages/
└── seu-pacote/
    ├── src/
    │   ├── components/
    │   │   ├── ComponenteA/
    │   │   │   ├── ComponenteA.tsx
    │   │   │   ├── ComponenteA.test.tsx
    │   │   │   └── index.ts
    │   │   └── ComponenteB/
    │   └── index.ts
    ├── package.json
    ├── tsconfig.json
    ├── tsup.config.ts
    └── README.md
```

### 2. package.json

```json
{
  "name": "@fabioeducacross/seu-pacote",
  "version": "0.1.0",
  "description": "Descrição do pacote",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "engines": {
    "node": ">=20.0.0"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://npm.pkg.github.com"
  },
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "clean": "rimraf dist",
    "test": "vitest run"
  },
  "peerDependencies": {
    "@fabioeducacross/ui": "workspace:*",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@fabioeducacross/ui": "workspace:*",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@typescript-eslint/eslint-plugin": "^8.19.1",
    "@typescript-eslint/parser": "^8.19.1",
    "@vitest/coverage-v8": "^2.1.8",
    "eslint": "^9.18.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "rimraf": "^6.0.1",
    "tsup": "^8.3.5",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

### 3. tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### 4. tsup.config.ts

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    external: ["react", "react-dom", "@fabioeducacross/ui"],
});
```

---

## Padrões de Código

### Componentes

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@fabioeducacross/ui";

const componentVariants = cva(["base-classes"], {
  variants: {
    variant: {
      default: "default-classes",
      secondary: "secondary-classes",
    },
    size: {
      default: "h-10 px-4",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ComponenteProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Props específicas
}

export const Componente = React.forwardRef<HTMLDivElement, ComponenteProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Componente.displayName = "Componente";
```

### Testes

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Componente } from "./Componente";

describe("Componente", () => {
  it("deve renderizar corretamente", () => {
    render(<Componente>Conteúdo</Componente>);
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("deve aplicar variant corretamente", () => {
    render(<Componente variant="secondary">Test</Componente>);
    const element = screen.getByText("Test");
    expect(element).toHaveClass("secondary-classes");
  });
});
```

### Exports (src/index.ts)

```typescript
export { Componente, type ComponenteProps } from "./components/Componente";
export { OutroComponente, type OutroComponenteProps } from "./components/OutroComponente";
```

---

## Storybook

### Criar Story

```tsx
// apps/storybook/stories/seu-pacote/Componente.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Componente } from "@fabioeducacross/seu-pacote";

const meta: Meta<typeof Componente> = {
  title: "Seu Pacote/Componente",
  component: Componente,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Descrição do componente",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Exemplo",
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { Componente } from "@fabioeducacross/seu-pacote";

<Componente>Exemplo</Componente>`,
      vue2: `<!-- Exemplo Vue 2 -->
<template>
  <div>Exemplo</div>
</template>`,
      vue3: `<!-- Exemplo Vue 3 -->
<template>
  <EdComponente>Exemplo</EdComponente>
</template>

<script setup lang="ts">
import { EdComponente } from "@fabioeducacross/seu-pacote-vue3";
</script>`,
    },
  },
};
```

---

## Workflow de Desenvolvimento

### 1. Instalar Dependências
```bash
pnpm install
```

### 2. Modo Dev com Hot Reload
```bash
# Terminal 1: Build do seu pacote em watch mode
cd packages/seu-pacote
pnpm dev

# Terminal 2: Storybook
cd ../../
pnpm storybook
```

### 3. Testes
```bash
# Todos os testes
pnpm test

# Seu pacote específico
pnpm --filter @fabioeducacross/seu-pacote test

# Watch mode com coverage
pnpm --filter @fabioeducacross/seu-pacote test:coverage
```

### 4. Lint e TypeCheck
```bash
pnpm lint
pnpm typecheck
```

### 5. Build
```bash
# Build de todos os pacotes
pnpm build

# Build específico
pnpm --filter @fabioeducacross/seu-pacote build
```

---

## Integração com CI/CD

### Atualizar .github/workflows/publish.yml

```yaml
- name: Commitar dist/ para permitir instalação via GitHub
  run: |
    git config --local user.email "github-actions[bot]@users.noreply.github.com"
    git config --local user.name "github-actions[bot]"
    git add packages/ui/dist/ || true
    git add packages/ui-education/dist/ || true
    git add packages/ui-charts/dist/ || true
    git add packages/ui-pdf/dist/ || true
    git add packages/seu-pacote/dist/ || true  # <-- ADICIONAR AQUI
    git diff --staged --quiet || git commit -m "build: atualizar dist/ para ${GITHUB_REF#refs/tags/}"
    git push origin HEAD:master || echo "Nenhuma mudança para commitar"

- name: Publish to NPM (se NPM_TOKEN configurado)
  if: ${{ secrets.NPM_TOKEN != '' }}
  run: |
    pnpm --filter @fabioeducacross/ui publish --access public --no-git-checks
    pnpm --filter @fabioeducacross/ui-education publish --access public --no-git-checks
    pnpm --filter @fabioeducacross/seu-pacote publish --access public --no-git-checks  # <-- ADICIONAR AQUI
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Checklist de PR

Antes de submeter um Pull Request:

- [ ] Código segue padrões CVA + forwardRef + displayName
- [ ] Todos os testes passam (`pnpm test`)
- [ ] Lint sem erros (`pnpm lint`)
- [ ] TypeCheck sem erros (`pnpm typecheck`)
- [ ] Build bem-sucedido (`pnpm build`)
- [ ] Stories criadas com multi-framework code
- [ ] Componentes documentados com JSDoc
- [ ] README.md do pacote atualizado
- [ ] CHANGELOG.md atualizado (se aplicável)
- [ ] Acessibilidade verificada (foco, ARIA, teclado)
- [ ] Dark mode testado

---

## Recursos

- [Radix UI Primitives](https://www.radix-ui.com/)
- [CVA Documentation](https://cva.style/docs)
- [Storybook Docs](https://storybook.js.org/docs)
- [Vitest](https://vitest.dev/)
- [Turborepo](https://turbo.build/repo/docs)

---

## Contato

Dúvidas? Abra uma issue no GitHub ou entre em contato via [educacross@example.com](mailto:educacross@example.com).

---

Última atualização: 28 de janeiro de 2026
