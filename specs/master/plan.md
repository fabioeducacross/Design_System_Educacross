# Implementation Plan: Storybook Vue Migration

**Branch**: `master` | **Date**: 2026-01-30 | **Spec**: [spec.md](spec.md)
**Input**: Migration from React Storybook to Vue 3 Storybook for Frontoffice components

## Summary

Migrar o Storybook de React para Vue 3 para renderizar os componentes reais do Frontoffice Vue, eliminando a duplicação de componentes React e estabelecendo o Frontoffice como fonte única de verdade para o Design System.

## Technical Context

**Language/Version**: Vue 3.4+ / TypeScript 5.x  
**Primary Dependencies**: @storybook/vue3-vite, bootstrap-vue-3, vuex 4.x  
**Storage**: N/A  
**Testing**: Storybook play functions, Vitest  
**Target Platform**: Web (Chrome, Firefox, Safari, Edge)  
**Project Type**: Monorepo (pnpm + Turborepo)  
**Performance Goals**: Storybook load < 5s, HMR < 500ms  
**Constraints**: Manter tokens CSS/Tailwind, Bootstrap-Vue compatibility  
**Scale/Scope**: 120 componentes Vue do Frontoffice

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Spec-First | ✅ PASS | Esta spec documenta a migração |
| II. Test-First | ✅ PASS | Stories Vue incluirão play functions |
| III. A11y-First | ✅ PASS | addon-a11y será mantido |
| IV. Tokens-First | ✅ PASS | styles.css e tailwind-preset mantidos |
| V. Docs-First | ✅ PASS | Autodocs habilitado para Vue |

**Constitution Alignment:**
- ⚠️ Constitution menciona React 18+ como framework, mas também define **Frontoffice Vue como fonte da verdade**
- ✅ Migração resolve conflito: Storybook Vue permite renderizar componentes reais
- ✅ Tokens CSS são framework-agnostic (compatível)

## Project Structure

### Documentation (this feature)

```text
specs/master/
├── plan.md                    # This file
├── research.md                # Original research (React)
├── research-vue-migration.md  # NEW: Vue migration research
├── data-model.md              # N/A (no data model changes)
├── quickstart.md              # Vue Storybook quickstart
└── tasks.md                   # Implementation tasks
```

### Source Code (repository root)

```text
# Post-Migration Structure

packages/ui/
├── src/
│   ├── styles.css           # ✅ KEEP: CSS tokens (framework-agnostic)
│   ├── tailwind-preset.ts   # ✅ KEEP: Tailwind config
│   ├── enums/               # ✅ KEEP: TypeScript types
│   │   ├── proficiency.ts
│   │   ├── performance.ts
│   │   └── index.ts
│   └── index.ts             # UPDATE: Export tokens/enums only
├── package.json             # UPDATE: Remove React deps
└── tsconfig.json

apps/storybook/
├── .storybook/
│   ├── main.ts              # UPDATE: Vue 3 + Vite config
│   ├── preview.ts           # UPDATE: Bootstrap-Vue, mocks
│   └── mocks/               # NEW: Vuex, Router, i18n mocks
│       ├── store.ts
│       ├── router.ts
│       └── i18n.ts
├── stories/
│   ├── frontoffice/         # UPDATE: Vue stories (replace React mocks)
│   │   ├── badges/
│   │   ├── cards/
│   │   ├── tables/
│   │   └── ...
│   └── foundation/          # KEEP: Token documentation
│       ├── Colors.stories.tsx → Colors.mdx
│       └── Typography.mdx
├── package.json             # UPDATE: Vue deps
└── vite.config.ts           # UPDATE: Frontoffice alias

educacross-frontoffice/      # SOURCE OF TRUTH (unchanged)
└── src/components/          # 120 Vue components
```

**Structure Decision**: Monorepo híbrido mantendo tokens em `packages/ui` e stories Vue em `apps/storybook` conectadas ao Frontoffice via path alias.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Framework change (React → Vue) | Frontoffice é Vue, precisa renderizar componentes reais | Manter React = documentação estática, não interativa |
| Bootstrap-Vue dependency | Frontoffice usa Bootstrap-Vue | Remover = quebra componentes |
| Vuex mock | Componentes dependem de store | Não mockar = componentes não funcionam |

## Phases

### Phase 1: Infrastructure (4h)

| Task | Description | Output |
|------|-------------|--------|
| 1.1 | Instalar `@storybook/vue3-vite` | package.json updated |
| 1.2 | Reconfigurar `.storybook/main.ts` | Vue 3 framework config |
| 1.3 | Configurar Vite aliases | Frontoffice path resolution |
| 1.4 | Registrar Bootstrap-Vue plugin | preview.ts setup |

### Phase 2: Mocks Layer (4h)

| Task | Description | Output |
|------|-------------|--------|
| 2.1 | Criar mock Vuex store | mocks/store.ts |
| 2.2 | Criar mock Vue Router | mocks/router.ts |
| 2.3 | Criar mock i18n | mocks/i18n.ts |
| 2.4 | Testar com componente simples | Badge story working |

### Phase 3: Story Migration P0 (6h)

| Task | Description | Components |
|------|-------------|------------|
| 3.1 | Badges | BadgeStatus, CellStatus |
| 3.2 | Cards | StatisticCard*, BCardActions |
| 3.3 | Forms | ESelect, ButtonWaitAction |
| 3.4 | Tables | ListTable, PerformanceCell |

### Phase 4: Story Migration P1 (8h)

| Task | Description | Components |
|------|-------------|------------|
| 4.1 | Charts | BarChart, PieChart, RadialBar |
| 4.2 | Navigation | AppCollapse, AppTimeline, Tabs |
| 4.3 | Progress | ProgressBarHorizontal/Vertical |
| 4.4 | Modals | GameDetailsModal, FAQModal |

### Phase 5: Cleanup (4h)

| Task | Description | Output |
|------|-------------|--------|
| 5.1 | Remover componentes React | packages/ui/src/components/ deleted |
| 5.2 | Atualizar exports | index.ts = tokens + enums only |
| 5.3 | Remover deps React | package.json cleaned |
| 5.4 | Atualizar documentação | README, constitution |

## Estimated Total: 26 hours (~3-4 days)

## Success Criteria

- [ ] Storybook Vue inicia sem erros
- [ ] Badge component renderiza do Frontoffice
- [ ] Props são editáveis via Controls
- [ ] Addon A11y funciona
- [ ] 50+ stories Vue funcionais
- [ ] Build passa sem erros
- [ ] Tokens CSS mantidos funcionais
