# Implementation Plan: Correção de Pendências v1.2

**Branch**: `master` | **Date**: 2026-01-24 | **Spec**: [spec.md](./spec.md)  
**Input**: Análise de pendências do Design System Educacross  
**Status**: ✅ **COMPLETO** - Lint corrigido, Sprint 1-2 multiFrameworkCode finalizado

## Summary

~~Plano para corrigir todas as pendências identificadas no projeto: erros de lint (15), configuração de CI, warnings de código, e preparação para publicação NPM.~~

**ATUALIZAÇÃO 24/01/2026**: Spec v1.1 foi completada em Janeiro 2026:
- ✅ 15 erros de lint corrigidos
- ✅ CI passando 100%
- ✅ Sprint 1-2 completo: 241/241 stories com multiFrameworkCode (React 18+, Vue 2, Vue 3)
- ✅ Storybook v10.1.11 compilando sem erros
- ✅ 5 commits realizados e pushed para GitHub

**Próximas specs ativas:**
- 🔄 [001-ds-v2-melhorias](../001-ds-v2-melhorias/plan.md) - Logo bug fix + manifesto JSON
- ⏳ Publicação v0.2.0 com melhorias de usabilidade

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 18.3.1  
**Primary Dependencies**: Radix UI, Tailwind CSS 3.4, CVA 0.7.1, react-feather 2.0.10  
**Storage**: N/A (biblioteca de componentes)  
**Testing**: Vitest + React Testing Library (243 testes passando)  
**Target Platform**: Web (browsers modernos)  
**Project Type**: Monorepo (pnpm workspaces + Turborepo)  
**Performance Goals**: Bundle < 100KB gzip, tree-shakeable  
**Constraints**: WCAG 2.1 AA, zero a11y violations  
**Scale/Scope**: 21 componentes, uso interno Educacross

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| **I. Spec-First** | ✅ PASS | spec.md completo com user scenarios |
| **II. Test-First** | ⚠️ PARTIAL | 243 unit tests OK, play functions parciais |
| **III. A11y-First** | ✅ PASS | Radix UI, keyboard nav, addon-a11y |
| **IV. Tokens-First** | ✅ PASS | CSS vars, Tailwind preset, zero magic values |
| **V. Docs-First** | ✅ PASS | 21 stories com autodocs |

### Gate Violations & Resolution

| Violation | Resolution Plan | Priority |
|-----------|-----------------|----------|
| Test-First parcial | Adicionar play functions faltantes | P2 |
| Lint errors | Corrigir 15 erros (Phase 1) | P0 |

## Project Structure

### Documentation

```text
specs/master/
├── spec.md              # Especificação completa ✅
├── plan.md              # Este arquivo ✅
├── research.md          # Pesquisa técnica ✅
├── quickstart.md        # Guia de início rápido ✅
└── tasks.md             # Tarefas de implementação ✅
```

### Source Code

```text
packages/
└── ui/                           # @educacross/ui
    ├── src/
    │   ├── components/           # 21 componentes ✅
    │   ├── utils/                # cn() utility ✅
    │   ├── styles.css            # Tokens CSS ✅
    │   └── tailwind-preset.ts    # Preset Tailwind ✅
    └── dist/                     # Build output ✅

apps/
└── storybook/                    # Documentação ✅

.github/
└── workflows/
    ├── ci.yml                    # CI pipeline ✅ (lint failing)
    └── publish.yml               # NPM publish ✅ (needs token)
```

**Structure Decision**: Monorepo com pnpm workspaces + Turborepo, padrão shadcn/ui.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative |
|-----------|------------|---------------------|
| Warnings suprimidos | Padrão CVA exports é válido | N/A - design system pattern |
---

## Phase 1: Correção de Erros de Lint (P0 - Bloqueante)

**Objetivo**: CI lint job passa sem erros

### 1.1 Erros `no-empty-object-type` (9 ocorrências)

| Arquivo | Linha | Correção |
|---------|-------|----------|
| Accordion.tsx | 207, 251 | `type AccordionItemProps = ComponentPropsWithoutRef<...>` |
| Avatar.tsx | 56, 86 | `type AvatarImageProps = ComponentPropsWithoutRef<...>` |
| Pagination.tsx | 107, 223, 249 | Usar type alias ao invés de interface vazia |
| Table.tsx | 102, 123 | Usar type alias ao invés de interface vazia |

**Padrão de correção:**
```tsx
// ❌ Antes (erro)
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

// ✅ Depois (correto)
export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;
```

### 1.2 Erros `no-unused-vars` (4 ocorrências)

| Arquivo | Linha | Variável | Correção |
|---------|-------|----------|----------|
| DropdownMenu.tsx | 130 | `ref` | Renomear para `_ref` |
| Popover.tsx | 118 | `ref` | Renomear para `_ref` |
| Tooltip.tsx | 56 | `delayDuration` | Remover ou usar |
| Tooltip.tsx | 201 | `side` | Renomear para `_side` |

### 1.3 Erros `no-constant-binary-expression` (2 ocorrências)

| Arquivo | Linha | Correção |
|---------|-------|----------|
| cn.test.ts | 16, 21 | Usar variável booleana ao invés de literal |

**Padrão de correção:**
```tsx
// ❌ Antes (erro)
expect(cn(true && "class")).toBe("class");

// ✅ Depois (correto)
const condition = true;
expect(cn(condition && "class")).toBe("class");
```

### 1.4 Configuração Storybook Lint

**Problema**: Script lint em `apps/storybook` tenta lint em `src/` que não existe.

**Correção**: Atualizar `apps/storybook/package.json`:
```json
"lint": "eslint stories --ext .ts,.tsx"
```

---

## Phase 2: Redução de Warnings (P1 - Recomendado)

**Objetivo**: Reduzir warnings de 34 para < 5

### 2.1 Warnings `react-refresh/only-export-components`

**Decisão**: Adicionar regra no ESLint para permitir exports de variantes CVA.

**Arquivo**: `eslint.config.js`
```js
rules: {
  "react-refresh/only-export-components": [
    "warn",
    { allowConstantExport: true, allowExportNames: [".*Variants$"] }
  ],
}
```

### 2.2 Warnings `react-hooks/exhaustive-deps` em Dialog.tsx

**Opções**:
1. Adicionar `context` às dependências (pode causar re-renders)
2. Usar `// eslint-disable-next-line` com comentário explicativo

**Decisão**: Opção 2 - pattern é intencional para evitar loops.

### 2.3 Warnings `no-explicit-any`

| Arquivo | Linha | Correção |
|---------|-------|----------|
| Dialog.tsx | 178 | Tipar corretamente o handler |
| DropdownMenu.tsx | 139 | Tipar corretamente o handler |
| Popover.tsx | 127, 217 | Tipar corretamente os handlers |
| Tooltip.tsx | 162 | Tipar corretamente o handler |

---

## Phase 3: Preparação NPM Publish (P1)

**Objetivo**: Pacote pronto para publicação

### 3.1 Configurar NPM_TOKEN no GitHub

**Passos manuais (owner do repo)**:
1. Criar token no npmjs.com: Settings → Access Tokens → Generate New Token
2. Tipo: "Automation" (para CI)
3. No GitHub: Settings → Secrets → Actions → New repository secret
4. Nome: `NPM_TOKEN`, Valor: token do npm

### 3.2 Criar Release v0.1.0

```bash
git tag -a v0.1.0 -m "feat: initial release"
git push origin v0.1.0
```

---

## Phase 4: Completar Testes (P2 - Constitution Compliance)

**Objetivo**: Testes para componentes sem `.test.tsx`

### 4.1 Componentes sem testes

| Componente | Complexidade | Prioridade |
|------------|--------------|------------|
| Card | Baixa (wrapper) | P3 |
| Badge | Baixa (wrapper) | P3 |
| Avatar | Média (fallback logic) | P2 |
| Icon | Média (mapeamento) | P2 |
| Tabs | Alta (state) | P1 |
| Accordion | Alta (state) | P1 |
| Pagination | Alta (state) | P1 |
| Popover | Média (Radix wrapper) | P2 |
| DropdownMenu | Média (Radix wrapper) | P2 |
| Skeleton | Baixa (visual only) | P3 |
| Table | Baixa (wrapper) | P3 |
| Tooltip | Média (Radix wrapper) | P2 |

### 4.2 Play Functions faltantes

| Story | Interação a testar |
|-------|-------------------|
| Dialog.stories.tsx | open → close → Escape |
| Toast.stories.tsx | trigger → auto-dismiss |
| Select.stories.tsx | open → select option |
| Checkbox.stories.tsx | toggle checked |
| Radio.stories.tsx | select option |
| Accordion.stories.tsx | expand/collapse |
| Tabs.stories.tsx | switch tabs |
| DropdownMenu.stories.tsx | open → select item |

---

## Phase 5: Documentação e Manutenção (P3)

### 5.1 Atualizar CHANGELOG.md

Incluir todas as features implementadas na v0.1.0.

### 5.2 Configurar Dependabot

Criar `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

### 5.3 Branch Protection

Configurar no GitHub:
- Require status checks (CI)
- Require PR reviews
- Require linear history

---

## Execution Order

```
Phase 1 (Lint Errors) ──────────────────────────────────────────────┐
                                                                    │
Phase 2 (Warnings) ◄────────────────────────────────────────────────┘
       │
       ▼
Phase 3 (NPM Publish) ─────► Manual: NPM_TOKEN
       │
       ▼
Phase 4 (Tests) ──────────────────────────────────────────────────┐
       │                                                          │
       ▼                                                          │
Phase 5 (Docs) ◄──────────────────────────────────────────────────┘
```

## Estimated Time

| Phase | Tasks | Effort |
|-------|-------|--------|
| Phase 1 | Corrigir 15 erros | 45 min |
| Phase 2 | Reduzir warnings | 30 min |
| Phase 3 | Setup NPM (manual) | 15 min |
| Phase 4 | Testes adicionais | 3h |
| Phase 5 | Docs e config | 30 min |
| **Total** | | **~5h** |

---

**Generated**: 2026-01-05 | **Plan Version**: 1.1