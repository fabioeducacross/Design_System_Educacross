# Research: Storybook Vue Migration

**Date**: 2026-01-30 | **Author**: Copilot Agent | **Spec**: Migration to Vue Storybook

## Executive Summary

Pesquisa técnica para migração do Storybook de React para Vue 3, permitindo renderização real dos componentes do Frontoffice Vue como fonte da verdade do Design System.

---

## R-1: Storybook Vue 3 Configuration

### Decision: `@storybook/vue3-vite`

**Rationale:**
- Storybook 10 suporta Vue 3 nativamente via `@storybook/vue3-vite`
- Vite é o bundler preferido (já usado no projeto)
- Configuração simples, performance excelente
- Suporte completo a Composition API e Options API

**Configuration Required:**
```ts
// .storybook/main.ts
export default {
  stories: ['../stories/**/*.stories.ts'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-themes'
  ]
};
```

**Alternatives Considered:**
| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| @storybook/vue3-webpack5 | Webpack ecosystem | Slower, more config | ❌ Rejected |
| Keep React | No migration effort | Can't render Vue components | ❌ Rejected |
| Hybrid React+Vue | Both frameworks | Complex, maintenance burden | ❌ Rejected |

---

## R-2: Frontoffice Integration Strategy

### Decision: Path Alias + Selective Imports

**Rationale:**
- Frontoffice já está no monorepo (`educacross-frontoffice/`)
- Configurar alias no Vite para imports diretos
- Importar componentes individualmente evita dependências circulares

**Vite Configuration:**
```ts
// vite.config.ts
export default {
  resolve: {
    alias: {
      '@frontoffice': path.resolve(__dirname, '../../educacross-frontoffice/src'),
      '@components': path.resolve(__dirname, '../../educacross-frontoffice/src/components')
    }
  }
}
```

**Challenges Identified:**

| Challenge | Impact | Solution |
|-----------|--------|----------|
| Vuex Store dependency | High | Mock store com dados estáticos |
| Vue Router dependency | Medium | Mock router com route object |
| Bootstrap-Vue plugins | High | Registrar globalmente em preview.ts |
| i18n ($t) | Medium | Mock i18n com passthrough |
| Event Bus ($root.$emit) | Low | Mock via provide/inject |
| API Services | Medium | Mock com dados estáticos |

---

## R-3: Dependencies Mocking Strategy

### 3.1 Vuex Store Mock

**Pattern:**
```ts
// .storybook/mocks/store.ts
import { createStore } from 'vuex';

export const mockStore = createStore({
  state: {
    user: { name: 'Demo User', role: 'teacher' },
    theme: { dark: false }
  },
  getters: {
    isAuthenticated: () => true,
    currentUser: (state) => state.user
  },
  mutations: {},
  actions: {}
});
```

### 3.2 Vue Router Mock

**Pattern:**
```ts
// .storybook/mocks/router.ts
export const mockRoute = {
  path: '/demo',
  params: { id: '123' },
  query: {},
  name: 'demo'
};

export const mockRouter = {
  push: () => Promise.resolve(),
  replace: () => Promise.resolve(),
  currentRoute: { value: mockRoute }
};
```

### 3.3 Bootstrap-Vue Integration

**Pattern:**
```ts
// .storybook/preview.ts
import { setup } from '@storybook/vue3';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

setup((app) => {
  app.use(BootstrapVue3);
});
```

### 3.4 i18n Mock

**Pattern:**
```ts
// .storybook/mocks/i18n.ts
export const mockI18n = {
  install: (app) => {
    app.config.globalProperties.$t = (key: string) => key;
    app.config.globalProperties.$tc = (key: string) => key;
  }
};
```

---

## R-4: Story Pattern for Vue 3

### Decision: CSF 3.0 with Vue Templates

**Rationale:**
- CSF 3.0 é compatível entre React e Vue
- Vue stories usam `render` function ou `template` property
- Args funcionam da mesma forma

**Example Pattern:**
```ts
// BadgeStatus.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import BadgeStatus from '@components/badges/BadgeStatus.vue';

const meta: Meta<typeof BadgeStatus> = {
  title: 'Components/BadgeStatus',
  component: BadgeStatus,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['advanced', 'proficient', 'basic', 'below-basic']
    }
  }
};

export default meta;
type Story = StoryObj<typeof BadgeStatus>;

export const Default: Story = {
  args: {
    variant: 'proficient',
    label: 'Proficiente'
  }
};

export const AllVariants: Story = {
  render: () => ({
    components: { BadgeStatus },
    template: `
      <div class="flex gap-2">
        <BadgeStatus variant="advanced" label="Avançado" />
        <BadgeStatus variant="proficient" label="Proficiente" />
        <BadgeStatus variant="basic" label="Básico" />
        <BadgeStatus variant="below-basic" label="Abaixo do Básico" />
      </div>
    `
  })
};
```

---

## R-5: Migration Strategy - What to Keep/Remove

### Decision: Keep Tokens, Remove React Components

**Keep (Framework-agnostic):**
| Asset | Path | Reason |
|-------|------|--------|
| CSS Tokens | `packages/ui/src/styles.css` | CSS vars work everywhere |
| Tailwind Preset | `packages/ui/src/tailwind-preset.ts` | Tailwind is framework-agnostic |
| Enums/Types | `packages/ui/src/enums/` | TypeScript types are universal |

**Remove (React-specific):**
| Asset | Path | Reason |
|-------|------|--------|
| React Components | `packages/ui/src/components/` | Replaced by Frontoffice Vue |
| React Stories | `apps/storybook/stories/components/` | Will be Vue stories |
| React Dependencies | `react`, `@radix-ui/*` | Not needed |

**New Structure:**
```
packages/ui/
├── src/
│   ├── styles.css          # ✅ Keep
│   ├── tailwind-preset.ts  # ✅ Keep
│   ├── enums/              # ✅ Keep
│   └── index.ts            # ✅ Keep (exports tokens/enums only)
└── package.json            # Update deps

apps/storybook/
├── .storybook/
│   ├── main.ts             # Reconfigure for Vue
│   ├── preview.ts          # Add Vue plugins/mocks
│   └── mocks/              # NEW: Store, Router, i18n mocks
├── stories/
│   ├── frontoffice/        # Vue component stories
│   └── foundation/         # Token documentation (can be Vue or MDX)
└── package.json            # Update deps
```

---

## R-6: Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Bootstrap-Vue CSS conflicts | Medium | High | Isolate styles, CSS reset |
| Vuex mock incomplete | Medium | Medium | Start with stateless components |
| Circular dependencies | Low | High | Selective imports, no barrel files |
| Build time regression | Low | Low | Limit initial scope to P0 |
| Missing component props | Medium | Medium | Use @vue/devtools for inspection |

---

## R-7: Estimated Effort

| Phase | Tasks | Hours |
|-------|-------|-------|
| 1. Setup | Install deps, configure Storybook | 2h |
| 2. Mocks | Create store/router/i18n mocks | 4h |
| 3. Bootstrap | Register plugins, test base | 2h |
| 4. Stories P0 | Badge, Button, Input, Card (10 stories) | 4h |
| 5. Stories P1 | Tables, Forms, Charts (20 stories) | 6h |
| 6. Stories P2 | Remaining components (20 stories) | 6h |
| 7. Cleanup | Remove React, update docs | 2h |
| **Total** | | **26h (~3-4 days)** |

---

## Conclusion

A migração é viável e recomendada. Os principais desafios são:
1. Mocking das dependências globais do Frontoffice (Vuex, Router, Bootstrap-Vue)
2. Garantir que os estilos não conflitem

**Recommendation**: Executar em fases, começando com componentes simples (Badge, Button) para validar a infraestrutura antes de migrar componentes complexos.
