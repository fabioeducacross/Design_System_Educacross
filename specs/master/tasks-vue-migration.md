# Tasks: Vue Storybook Migration

**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Generated**: 2026-01-30

---

## Phase 1: Infrastructure (4h)

### T-1.1: Remove React dependencies
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/package.json`
- **Actions**:
  ```bash
  cd apps/storybook
  pnpm remove @storybook/react @storybook/react-vite react react-dom @types/react @types/react-dom
  ```

### T-1.2: Install Vue dependencies
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/package.json`
- **Actions**:
  ```bash
  pnpm add vue@^3.4 @storybook/vue3-vite
  pnpm add -D @vue/compiler-sfc
  ```

### T-1.3: Install Frontoffice dependencies
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/package.json`
- **Actions**:
  ```bash
  pnpm add bootstrap-vue-3 vuex@^4 vue-router@^4 vue-i18n@^9 -D
  ```

### T-1.4: Configure Storybook main.ts for Vue
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/.storybook/main.ts`
- **Actions**:
  - Change framework from `@storybook/react-vite` to `@storybook/vue3-vite`
  - Add Vite aliases for `@frontoffice`, `@components`, `@core`
  - Configure CSS imports

### T-1.5: Configure preview.ts with Vue setup
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/.storybook/preview.ts`
- **Actions**:
  - Import and use `setup()` from `@storybook/vue3`
  - Register BootstrapVue3
  - Register global mocks
  - Import styles.css

---

## Phase 2: Mocks (4h)

### T-2.1: Create Vuex Store Mock
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/.storybook/mocks/store.ts`
- **Actions**:
  - Create minimal store with user, theme, school state
  - Add common getters (isAuthenticated, currentUser, etc.)
  - Export as plugin

### T-2.2: Create Vue Router Mock
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/.storybook/mocks/router.ts`
- **Actions**:
  - Create mockRoute with path, params, query
  - Create mockRouter with push, replace, go stubs
  - Export for injection

### T-2.3: Create i18n Mock
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/.storybook/mocks/i18n.ts`
- **Actions**:
  - Create plugin that adds $t, $tc, $n, $d to globalProperties
  - Option: Use real vue-i18n with empty translations

### T-2.4: Create Event Bus Mock
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/.storybook/mocks/eventBus.ts`
- **Actions**:
  - Create mitt instance or stub
  - Provide via app.provide() or globalProperties

### T-2.5: Create Services Mock Factory
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/.storybook/mocks/services.ts`
- **Actions**:
  - Create mock factory for API services
  - Add to provide/inject pattern
  - Document how to customize per-story

---

## Phase 3: Story Migration P0 (6h)

### T-3.1: Migrate BadgeStatus story
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/stories/frontoffice/badges/BadgeStatus.stories.ts`
- **Actions**:
  - Import real Vue component
  - Define Meta with argTypes
  - Create Default, AllVariants stories
  - Test controls and actions

### T-3.2: Migrate ProgressBar story
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/stories/frontoffice/progress/ProgressBar.stories.ts`
- **Actions**:
  - Import real component
  - Test with legend colors

### T-3.3: Migrate StudentCard story
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/stories/frontoffice/cards/StudentCard.stories.ts`
- **Actions**:
  - Import real component
  - Verify avatar, badge integration

### T-3.4: Migrate PerformanceTable story
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/stories/frontoffice/tables/PerformanceTable.stories.ts`
- **Actions**:
  - Import real component
  - Test with mock data
  - Verify sorting, filtering work

### T-3.5: Migrate ReportHeader story
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/stories/frontoffice/layout/ReportHeader.stories.ts`
- **Actions**:
  - Import real component
  - Test breadcrumbs, actions

### T-3.6: Migrate NotificationToast story
- **Status**: ⬜ Not Started
- **Files**: `apps/storybook/stories/frontoffice/feedback/NotificationToast.stories.ts`
- **Actions**:
  - Import real component
  - Test variants and animations

### T-3.7: Validate P0 Build
- **Status**: ⬜ Not Started
- **Actions**:
  ```bash
  pnpm build-storybook
  # Verify no errors
  # Verify 6 stories render correctly
  ```

---

## Phase 4: Story Migration P1 (8h)

### T-4.1: Migrate remaining Badge stories (5)
- **Status**: ⬜ Not Started
- **Files**: `stories/frontoffice/badges/*.stories.ts`
- **Components**: ProficiencyBadge, AchievementBadge, StatusBadge, etc.

### T-4.2: Migrate Card stories (8)
- **Status**: ⬜ Not Started
- **Files**: `stories/frontoffice/cards/*.stories.ts`
- **Components**: ContentCard, StatCard, MissionCard, etc.

### T-4.3: Migrate Table stories (4)
- **Status**: ⬜ Not Started
- **Files**: `stories/frontoffice/tables/*.stories.ts`
- **Components**: DataTable, ScoreTable, etc.

### T-4.4: Migrate Form stories (7)
- **Status**: ⬜ Not Started
- **Files**: `stories/frontoffice/forms/*.stories.ts`
- **Components**: EInput, ESelect, ECheckbox, etc.

### T-4.5: Migrate Navigation stories (5)
- **Status**: ⬜ Not Started
- **Files**: `stories/frontoffice/navigation/*.stories.ts`
- **Components**: Tabs, Breadcrumb, Pagination, etc.

### T-4.6: Migrate Chart/Progress stories (7)
- **Status**: ⬜ Not Started
- **Files**: `stories/frontoffice/charts/*.stories.ts`, `stories/frontoffice/progress/*.stories.ts`
- **Components**: RadialProgress, BarChart, etc.

### T-4.7: Migrate remaining stories (12)
- **Status**: ⬜ Not Started
- **Files**: modals/, domain/, missions/, etc.

### T-4.8: Validate P1 Build
- **Status**: ⬜ Not Started
- **Actions**:
  ```bash
  pnpm build-storybook
  # Verify all 49 stories render
  # Run a11y checks
  ```

---

## Phase 5: Cleanup (4h)

### T-5.1: Remove React components from packages/ui
- **Status**: ⬜ Not Started
- **Actions**:
  ```bash
  rm -rf packages/ui/src/components/*
  # Keep: styles.css, tailwind-preset.ts, enums/, utils/
  ```

### T-5.2: Update packages/ui exports
- **Status**: ⬜ Not Started
- **Files**: `packages/ui/src/index.ts`
- **Actions**:
  - Remove React component exports
  - Keep styles, enums, utils exports

### T-5.3: Update packages/ui package.json
- **Status**: ⬜ Not Started
- **Files**: `packages/ui/package.json`
- **Actions**:
  - Remove React dependencies
  - Update description
  - Keep CSS/token exports

### T-5.4: Update documentation
- **Status**: ⬜ Not Started
- **Files**: `README.md`, `CONTRIBUTING.md`, `USAGE.md`
- **Actions**:
  - Update architecture description
  - Remove React references
  - Add Vue story examples

### T-5.5: Update Turborepo config
- **Status**: ⬜ Not Started
- **Files**: `turbo.json`
- **Actions**:
  - Review pipeline dependencies
  - Remove React-specific tasks if any

### T-5.6: Final validation
- **Status**: ⬜ Not Started
- **Actions**:
  ```bash
  pnpm install
  pnpm lint
  pnpm typecheck
  pnpm build
  pnpm storybook
  # Manual verification of all stories
  ```

---

## Progress Summary

| Phase | Tasks | Completed | Status |
|-------|-------|-----------|--------|
| Phase 1: Infrastructure | 5 | 0 | ⬜ Not Started |
| Phase 2: Mocks | 5 | 0 | ⬜ Not Started |
| Phase 3: Story Migration P0 | 7 | 0 | ⬜ Not Started |
| Phase 4: Story Migration P1 | 8 | 0 | ⬜ Not Started |
| Phase 5: Cleanup | 6 | 0 | ⬜ Not Started |
| **TOTAL** | **31** | **0** | ⬜ Not Started |

---

## Dependencies Graph

```
T-1.1 ─┬─► T-1.2 ─┬─► T-1.4 ─► T-1.5 ─┬─► Phase 2
       │         │                    │
       └─► T-1.3 ┘                    ▼
                                    T-2.1 ─┬─► T-3.1 (P0 Start)
                                    T-2.2 ─┤
                                    T-2.3 ─┤
                                    T-2.4 ─┤
                                    T-2.5 ─┘
                                           │
                                           ▼
                                    T-3.7 (P0 Validate) ─► Phase 4
                                           │
                                           ▼
                                    T-4.8 (P1 Validate) ─► Phase 5
                                           │
                                           ▼
                                    T-5.6 (Final) ─► DONE
```

---

## Estimated Time

| Phase | Tasks | Effort |
|-------|-------|--------|
| Phase 1: Infrastructure | 5 | 4h |
| Phase 2: Mocks | 5 | 4h |
| Phase 3: Story Migration P0 | 7 | 6h |
| Phase 4: Story Migration P1 | 8 | 8h |
| Phase 5: Cleanup | 6 | 4h |
| **TOTAL** | **31** | **~26h (3-4 dias)** |
