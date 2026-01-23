# ✅ Checklist - Novo Componente no Design System

Use este checklist ao criar ou modificar componentes no Design System.

## 📋 Fase 1: Planejamento

- [ ] **Requisitos definidos**
  - Especificação visual (Figma/mockup)
  - Comportamentos esperados
  - Estados necessários (hover, focus, disabled, etc)
  - Variantes de design

- [ ] **Tokens identificados**
  - Cores usam tokens CSS (`--primary`, `--background`, etc)
  - Espaçamentos seguem escala Tailwind
  - Typography usa sistema base
  - Border radius usa `--radius`

- [ ] **Acessibilidade planejada**
  - Navegação por teclado
  - Screen reader support (ARIA)
  - Contraste adequado (WCAG AA)
  - Estados visíveis de foco

## 🔨 Fase 2: Implementação

### Código do Componente

- [ ] **Arquivo criado** em `packages/ui/src/components/[Nome]/`
  ```
  [Nome]/
  ├── [Nome].tsx
  └── index.ts
  ```

- [ ] **Usa CVA** para variantes
  ```tsx
  import { cva, type VariantProps } from "class-variance-authority";
  const variants = cva(["base"], { variants: {...} });
  ```

- [ ] **forwardRef + displayName**
  ```tsx
  const Component = React.forwardRef<HTMLElement, Props>(...);
  Component.displayName = "ComponentName";
  ```

- [ ] **Props bem tipadas**
  - Interface ou type exportado
  - VariantProps de CVA
  - HTMLAttributes estendidos

- [ ] **Utilitário cn()** para merge de classes
  ```tsx
  className={cn(variants({ variant, size }), className)}
  ```

- [ ] **Acessibilidade implementada**
  - `aria-*` apropriados
  - `role` quando necessário
  - Focus visible styles
  - Estados disabled

### Exportação

- [ ] **Exportado em `packages/ui/src/index.ts`**
  ```tsx
  export { Component, componentVariants, type ComponentProps } from "./components/Component";
  ```

## 🧪 Fase 3: Testes

- [ ] **Testes unitários** criados em `packages/ui/src/components/[Nome]/[Nome].test.tsx`
  - Renderização básica
  - Todas as variantes
  - Props customizadas
  - Estados (disabled, loading, etc)
  - Eventos (onClick, onChange, etc)
  - Acessibilidade (roles, labels)

- [ ] **Cobertura adequada**
  ```bash
  pnpm test:coverage
  # Mínimo 80% no componente
  ```

- [ ] **Testes passando**
  ```bash
  pnpm test
  ```

## 📖 Fase 4: Documentação Storybook

- [ ] **Story criada** em `apps/storybook/stories/components/[Nome].stories.tsx`

- [ ] **Metadata configurado**
  ```tsx
  const meta: Meta<typeof Component> = {
    title: "Components/ComponentName",
    component: Component,
    tags: ["autodocs"],
    parameters: {
      docs: {
        description: {
          component: "Descrição do componente..."
        }
      }
    }
  };
  ```

- [ ] **Stories principais**
  - [ ] Default - Estado padrão
  - [ ] Variants - Todas as variantes visuais
  - [ ] Sizes - Todos os tamanhos
  - [ ] States - Disabled, loading, error, etc
  - [ ] Interactive - Exemplo interativo/formulário

- [ ] **Play functions** (quando aplicável)
  - Testes de interação básicos
  - Queries específicos (sem ambiguidade)
  - Verificações de acessibilidade

- [ ] **ArgTypes configurados** para controles interativos

## 🎨 Fase 5: Visual Testing

- [ ] **Chromatic local**
  ```bash
  pnpm chromatic
  ```

- [ ] **Snapshots revisados** no painel Chromatic
  - Todas as stories renderizando
  - Sem erros visuais
  - Dark mode funcionando

- [ ] **Aprovado visualmente**

## 🔍 Fase 6: Qualidade

- [ ] **Lint passando**
  ```bash
  pnpm lint
  ```

- [ ] **Type check passando**
  ```bash
  pnpm typecheck
  ```

- [ ] **Build funcionando**
  ```bash
  pnpm build
  ```

- [ ] **Storybook buildando**
  ```bash
  pnpm build:storybook
  ```

## 📝 Fase 7: Commit & PR

- [ ] **Conventional Commits**
  ```
  feat(ComponentName): adiciona novo componente
  
  - Implementa variantes: default, outline, ghost
  - Suporta tamanhos: sm, default, lg
  - Totalmente acessível (WCAG AA)
  - Stories completas no Storybook
  - Testes unitários com 90% cobertura
  ```

- [ ] **PR criado** com:
  - Screenshot das variantes principais
  - Link para Storybook (Chromatic)
  - Checklist de acessibilidade
  - Breaking changes (se houver)

- [ ] **CI passando**
  - GitHub Actions green
  - Chromatic aprovado

## 🚀 Fase 8: Release

- [ ] **Componente exportado** em `packages/ui/src/index.ts`

- [ ] **CHANGELOG atualizado**
  ```markdown
  ## [Unreleased]
  ### Added
  - Novo componente `ComponentName` com variantes X, Y, Z
  ```

- [ ] **Documentação de uso** criada (se componente complexo)

- [ ] **Version bump** (após merge)
  - Patch (0.0.X) - Bug fix
  - Minor (0.X.0) - Novo componente/feature
  - Major (X.0.0) - Breaking change

## ✨ Opcional (Bônus)

- [ ] **Exemplo no educacross-frontoffice** (app real)
- [ ] **Migration guide** (se substituir componente existente)
- [ ] **Performance benchmarks** (se componente pesado)
- [ ] **Bundle size check** (impacto no pacote final)

---

## 📚 Referências

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Guidelines gerais
- [CHROMATIC_QUICKSTART.md](./CHROMATIC_QUICKSTART.md) - Guia Chromatic
- [Radix UI Docs](https://www.radix-ui.com/) - Primitivos base
- [Tailwind Docs](https://tailwindcss.com/) - Utility classes

**Última Atualização**: 23/01/2026
