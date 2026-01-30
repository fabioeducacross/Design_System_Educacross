<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version change: 0.0.0 → 1.0.0 (MAJOR — initial adoption)
Modified principles: N/A (initial version)
Added sections:
  - Title + Purpose
  - Core Principles (5): Spec-First, Test-First, A11y-First, Tokens-First, Docs-First
  - Stack & Technical Standards
  - Repository Structure
  - Tokens & Theming
  - Component Standards
  - Accessibility
  - Tests & Quality
  - Governance
  - CI Gates
  - Definition of Done
  - PR Checklist
  - Security & Privacy
  - Conventions
  - Open Questions (TBD)
Removed sections: Template placeholders
Templates requiring updates:
  ✅ plan-template.md — compatible (Constitution Check section generic)
  ✅ spec-template.md — compatible (functional requirements pattern ok)
  ✅ tasks-template.md — compatible (phase structure aligns)
Follow-up TODOs: None
================================================================================
-->

# Design System Constitution

## 1. Purpose

This constitution governs the **Design System** repository. Its goal is to establish non-negotiable rules and quality gates that:

1. **Reduce visual inconsistencies** across products.
2. **Accelerate development** via reusable, documented components.
3. **Increase quality** through accessibility-by-default and complete state coverage.

All contributors MUST comply with this constitution. Violations block merge.

---

## 2. Core Principles

### I. Spec-First

- Every component or feature MUST begin with a specification (`spec.md`) before implementation.
- Specs MUST include: user scenarios, acceptance criteria (Given/When/Then), and priority.
- Implementation without an approved spec is prohibited.

### II. Test-First

- Tests (stories with `play` functions, unit tests for logic) MUST be written before production code.
- Red-Green-Refactor cycle is enforced: tests MUST fail first, then pass, then be refactored.
- No component ships without at least one interaction test validating core behavior.

### III. A11y-First (Accessibility)

- Accessibility is not optional or "phase 2."
- All interactive components MUST be keyboard-navigable and expose correct ARIA attributes.
- Color contrast MUST meet WCAG 2.1 AA (4.5:1 text, 3:1 UI).
- The Storybook a11y addon MUST report zero violations before merge.

### IV. Tokens-First

- All visual values (colors, spacing, typography, radii, shadows) MUST come from design tokens.
- "Magic numbers" (hard-coded `#fff`, `16px`, `0.5rem`) are prohibited in component code.
- Tokens are the single source of truth; Tailwind config extends them, never defines originals.

### V. Docs-First

- Every exported component MUST have a Storybook story with `autodocs`.
- Stories MUST demonstrate all variants, sizes, and states (default, hover, focus, disabled, loading, error).
- Missing or incomplete documentation blocks merge.

---

## 3. Stack & Technical Standards

| Layer             | Technology                                         |
| ----------------- | -------------------------------------------------- |
| Framework         | React 18+                                          |
| Styling           | Tailwind CSS 3.4+ (extends tokens via preset)      |
| Primitives        | Radix UI (headless, accessible) - apenas quando necessário |
| Component recipes | **Frontoffice Vue** (espelhar comportamento e visual) |
| Documentation     | Storybook 10+ with `@storybook/addon-*`            |
| Bundler           | Vite (for Storybook) or as required by consumers   |
| Package manager   | pnpm (workspace protocol)                          |
| TypeScript        | Strict mode (`"strict": true`)                     |
| Linting           | ESLint + Prettier                                  |

### ⚠️ IMPORTANTE: Frontoffice como Fonte da Verdade

Os componentes deste Design System **NÃO** devem seguir padrões do shadcn/ui.
A referência canônica é o **Frontoffice Vue** (`educacross-frontoffice/src/components/`).

Consulte o catálogo completo em: `specs/001-ds-frontoffice-catalog/spec.md`

### Monorepo Structure

```
/
├── packages/
│   └── ui/                  # publishable package (@acme/ui) ← REPLACE @acme with org name
│       ├── src/
│       │   ├── tokens/      # CSS vars + Tailwind preset
│       │   ├── components/  # Button, Input, Label, ...
│       │   └── index.ts     # public barrel exports
│       ├── package.json
│       └── tsconfig.json
├── apps/
│   ├── storybook/           # Storybook catalog (dev-only)
│   └── web/                 # (optional) consumer playground
├── .github/
│   └── workflows/           # CI pipelines
├── pnpm-workspace.yaml
└── turbo.json | nx.json     # (optional) task runner
```

> **Note**: Turborepo or Nx are OPTIONAL. Simpler pnpm workspace scripts are acceptable for MVP.

---

## 4. Repository Structure — Expected Paths

| Path                                      | Purpose                                       |
| ----------------------------------------- | --------------------------------------------- |
| `packages/ui/src/tokens/`                 | CSS custom properties + Tailwind preset       |
| `packages/ui/src/components/<Name>/`      | Component folder (e.g., `Button/`)            |
| `packages/ui/src/components/<Name>/index.ts` | Re-export for barrel                        |
| `packages/ui/src/components/<Name>/<Name>.tsx` | Component implementation                  |
| `packages/ui/src/components/<Name>/<Name>.stories.tsx` | Storybook stories               |
| `packages/ui/src/components/<Name>/<Name>.test.tsx` | Unit tests (when logic exists)        |
| `apps/storybook/.storybook/`              | Storybook config (main.ts, preview.ts)        |
| `specs/<###-feature>/`                    | Specification artifacts per feature           |

---

## 5. Tokens & Theming

### 5.1 CSS Custom Properties

All tokens are declared as CSS variables under `:root` and `.dark`:

```css
:root {
  --color-primary: #0066ff;
  --color-background: #ffffff;
  --spacing-4: 1rem;
  /* ... */
}
.dark {
  --color-primary: #3399ff;
  --color-background: #121212;
}
```

### 5.2 Tailwind Preset

`packages/ui/src/tokens/tailwind-preset.ts` exports a preset that maps CSS vars:

```ts
export default {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
      },
      spacing: {
        4: "var(--spacing-4)",
      },
    },
  },
};
```

### 5.3 Light / Dark Mode

- Theme switching MUST rely on a `.dark` class on `<html>` or `<body>`.
- Components MUST NOT hard-code light or dark values; always reference tokens.
- Storybook MUST include a theme switcher via `@storybook/addon-themes` or Docs toolbar.

### 5.4 Legend Colors (Sistema de Proficiência)

O Frontoffice usa um sistema de cores específico para legendas de proficiência e performance.
Estas cores **NÃO são equivalentes** às cores semânticas (primary, success, warning, etc.).

**⚠️ ATENÇÃO: `legend-basic` é LARANJA (#ff9f43), NÃO é amarelo como `warning`!**

```css
:root {
  /* Legend Colors - Sistema de Proficiência Educacross */
  --color-legend-advanced: 110 82 232;       /* #6e63e8 - Avançado */
  --color-legend-proficient: 40 199 111;     /* #28c76f - Proficiente */
  --color-legend-basic: 255 159 67;          /* #ff9f43 - Básico (LARANJA!) */
  --color-legend-below-basic: 234 84 85;     /* #ea5455 - Abaixo do Básico */
  --color-legend-not-completed: 180 183 189; /* #b4b7bd - Não Concluído */
  --color-legend-in-progress: 0 207 232;     /* #00cfe8 - Em Andamento */
}
```

Classes Tailwind geradas:
- `text-legend-*`, `bg-legend-*`, `border-legend-*`
- Variantes com opacidade: `bg-legend-basic/10` para backgrounds light

---

## 6. Component Standards

### 6.1 API Consistency

- Props MUST use consistent naming: `variant`, `size`, `disabled`, `asChild`.
- Allowed variants and sizes MUST be defined via TypeScript union or `cva` schema.
- Default prop values MUST be explicit and documented.

### 6.2 Variants & Sizes

Every component MUST document supported variants (e.g., `default`, `destructive`, `outline`, `ghost`) and sizes (e.g., `sm`, `md`, `lg`).

### 6.3 Composition

- Use Radix `Slot` / `asChild` pattern to allow polymorphic rendering.
- Compound components (e.g., `Dialog.Root`, `Dialog.Trigger`) follow Radix conventions.

### 6.4 State Coverage

Stories MUST showcase these states (where applicable):

| State       | Requirement                       |
| ----------- | --------------------------------- |
| Default     | Base appearance                   |
| Hover       | `:hover` style                    |
| Focus       | `focus-visible` ring              |
| Active      | Pressed/active feedback           |
| Disabled    | `aria-disabled`, muted visuals    |
| Loading     | Spinner or skeleton               |
| Error       | Destructive variant / error ring  |

### 6.5 No Magic Values

- Every numeric or color value in component styles MUST reference a token class (`bg-primary`, `p-4`) or CSS var.
- Hard-coded hex, px, rem, or opacity values trigger lint failure.

---

## 7. Accessibility

| Requirement                | Rule                                                                 |
| -------------------------- | -------------------------------------------------------------------- |
| Keyboard navigation        | All interactive elements MUST be reachable and operable via keyboard |
| Focus indicator            | `focus-visible` outline MUST meet 3:1 contrast and be visible        |
| ARIA attributes            | Use semantic HTML; add `aria-*` only when semantics are insufficient |
| Color contrast             | Text ≥ 4.5:1, UI elements ≥ 3:1 (WCAG AA)                            |
| Motion                     | Respect `prefers-reduced-motion`                                     |
| Storybook addon            | `@storybook/addon-a11y` MUST be enabled; zero violations to merge    |

---

## 8. Tests & Quality

### 8.1 Stories as Tests

- Each component MUST have at least one story per variant/size combination.
- Use `play` functions (Storybook Interactions addon) to simulate user actions and assert outcomes.

### 8.2 Interaction Tests

```ts
export const ClickIncrementsCounter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(canvas.getByText("1")).toBeInTheDocument();
  },
};
```

### 8.3 Unit Tests

- Unit tests (`*.test.tsx`) are REQUIRED when component contains non-trivial logic (state machines, derived calculations).
- Use Vitest or Jest with React Testing Library.

### 8.4 Visual Regression (Future)

- Chromatic or Percy integration is RECOMMENDED after MVP.
- Until enabled, visual review in Storybook PR preview is acceptable.

---

## 9. Governance

### 9.1 Versioning (SemVer)

The `@acme/ui` package follows Semantic Versioning:

| Change Type                        | Bump   |
| ---------------------------------- | ------ |
| Breaking API change                | MAJOR  |
| New component/variant, non-breaking | MINOR  |
| Bug fix, docs, internal refactor    | PATCH  |

### 9.2 Changelog

- Every release MUST include a `CHANGELOG.md` entry.
- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `BREAKING CHANGE:`).

### 9.3 Deprecation Policy

1. Mark deprecated API with `@deprecated` JSDoc + console warning.
2. Maintain deprecated API for at least **one MINOR** release cycle.
3. Remove in next MAJOR.

### 9.4 Compatibility

- Components MUST NOT depend on global styles outside of token CSS vars.
- Peer dependencies (React, Tailwind) MUST be declared and pinned to compatible ranges.

---

## 10. CI Gates

All pull requests MUST pass these automated checks before merge:

| Gate                    | Command (example)                | Blocking |
| ----------------------- | -------------------------------- | -------- |
| Lint (ESLint + Prettier) | `pnpm lint`                      | ✅       |
| TypeScript typecheck    | `pnpm typecheck`                 | ✅       |
| Storybook build         | `pnpm --filter storybook build`  | ✅       |
| Unit tests              | `pnpm test`                      | ✅       |
| a11y addon violations   | Storybook CI (zero violations)   | ✅       |
| Visual regression       | (future) Chromatic               | ⬚ Optional |

---

## 11. Definition of Done

### 11.1 Component DoD

A component is "done" when:

- [ ] Spec approved (`spec.md` exists with acceptance criteria).
- [ ] All variants/sizes implemented per spec.
- [ ] All states (hover, focus, disabled, loading, error) styled.
- [ ] Tokens used exclusively—no magic values.
- [ ] Storybook stories exist with autodocs.
- [ ] `play` function covers primary interaction.
- [ ] a11y addon reports zero violations.
- [ ] Keyboard navigation verified.
- [ ] TypeScript strict mode passes.
- [ ] Exported from `packages/ui/src/index.ts`.

### 11.2 Release DoD

A release is "done" when:

- [ ] All component DoDs met for included components.
- [ ] CHANGELOG.md updated.
- [ ] Version bumped per SemVer.
- [ ] CI pipeline green (lint, typecheck, build, tests).
- [ ] Package published to registry (npm or private).

---

## 12. PR Checklist

Every pull request description MUST include this checklist:

```markdown
## PR Checklist

- [ ] **Tokens**: No hard-coded colors, spacing, or sizing.
- [ ] **States**: All applicable states demonstrated in stories.
- [ ] **A11y**: Keyboard nav works; a11y addon zero violations.
- [ ] **Docs**: Stories have autodocs; README updated if API changed.
- [ ] **Security**: No PII, secrets, or real user data.
- [ ] **Tests**: Interaction tests cover primary flows.
- [ ] **Types**: `pnpm typecheck` passes.
- [ ] **Lint**: `pnpm lint` passes.
```

---

## 13. Security & Privacy

| Rule                          | Detail                                                      |
| ----------------------------- | ----------------------------------------------------------- |
| No PII in code or stories     | Use fake names (`Jane Doe`), emails (`user@example.com`)    |
| No secrets in repository      | API keys, tokens MUST be in env vars, never committed       |
| Dependency audit              | Run `pnpm audit` before releases; fix critical/high vulns   |
| Content Security              | Components MUST NOT execute arbitrary user-provided scripts |

---

## 14. Conventions

### 14.1 Naming

| Artifact            | Convention                                        |
| ------------------- | ------------------------------------------------- |
| Component folder    | PascalCase (`Button/`)                            |
| Component file      | `<Name>.tsx`                                      |
| Stories file        | `<Name>.stories.tsx`                              |
| Test file           | `<Name>.test.tsx`                                 |
| CSS/token files     | kebab-case (`tokens.css`, `tailwind-preset.ts`)   |
| Branches            | `<issue#>-<short-description>` or `feat/<name>`  |

### 14.2 Public Exports

- Only export from `packages/ui/src/index.ts` what consumers should use.
- Internal utilities live in `lib/` or `utils/` and are NOT exported.

### 14.3 Story Organization

- Group stories by component: `Components / Button`.
- Order stories: Default → Variants → Sizes → States → Playground.

---

## 15. Open Questions

| Topic                      | Status       | Notes                                           |
| -------------------------- | ------------ | ----------------------------------------------- |
| Visual regression tool     | TBD          | Chromatic vs Percy vs Playwright snapshots      |
| Icon library               | ✅ RESOLVED  | Feather Icons (react-feather)                   |
| Animation tokens           | TBD          | Framer Motion or CSS keyframes                  |
| Monorepo task runner       | ✅ RESOLVED  | Turborepo 2.7.2                                 |
| Package registry           | TBD          | npm public, GitHub Packages, Verdaccio          |

---

## Governance Meta

- This constitution supersedes all other practices.
- Amendments require: (1) PR with rationale, (2) team review, (3) version bump.
- Use `.specify/memory/constitution.md` as the canonical source.

**Version**: 1.0.0 | **Ratified**: 2026-01-05 | **Last Amended**: 2026-01-05
