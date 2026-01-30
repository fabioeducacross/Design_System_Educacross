# Quickstart: Vue Storybook Migration

**Date**: 2026-01-30

## Prerequisites

- Node.js 22+
- pnpm 9+
- Frontoffice Vue clonado em `educacross-frontoffice/`

## Quick Setup (5 minutos)

### 1. Instalar dependências Vue

```bash
cd apps/storybook

# Remover React
pnpm remove @storybook/react @storybook/react-vite react react-dom @types/react @types/react-dom

# Adicionar Vue
pnpm add vue@^3.4 @storybook/vue3-vite
pnpm add -D @vue/compiler-sfc
pnpm add bootstrap-vue-3 vuex@^4 vue-router@^4 -D
```

### 2. Configurar Storybook para Vue

**.storybook/main.ts:**
```ts
import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-themes'
  ],
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@frontoffice': path.resolve(__dirname, '../../educacross-frontoffice/src'),
          '@components': path.resolve(__dirname, '../../educacross-frontoffice/src/components')
        }
      }
    });
  }
};

export default config;
```

### 3. Configurar Preview com Mocks

**.storybook/preview.ts:**
```ts
import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';

// Bootstrap-Vue
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

// Design System Tokens
import '@fabioeducacross/ui/styles.css';

// Mocks
import { mockStore } from './mocks/store';
import { mockI18n } from './mocks/i18n';

setup((app) => {
  app.use(BootstrapVue3);
  app.use(mockStore);
  app.use(mockI18n);
});

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a2e' }
      ]
    }
  }
};

export default preview;
```

### 4. Criar Mocks

**.storybook/mocks/store.ts:**
```ts
import { createStore } from 'vuex';

export const mockStore = createStore({
  state: {
    user: { name: 'Demo User', role: 'teacher', id: 1 },
    theme: { dark: false },
    school: { id: 1, name: 'Escola Demo' }
  },
  getters: {
    isAuthenticated: () => true,
    currentUser: (state) => state.user,
    currentSchool: (state) => state.school
  }
});
```

**.storybook/mocks/i18n.ts:**
```ts
export const mockI18n = {
  install: (app: any) => {
    app.config.globalProperties.$t = (key: string) => key;
    app.config.globalProperties.$tc = (key: string) => key;
    app.config.globalProperties.$n = (n: number) => String(n);
    app.config.globalProperties.$d = (d: Date) => d.toLocaleDateString();
  }
};
```

**.storybook/mocks/router.ts:**
```ts
export const mockRoute = {
  path: '/demo',
  params: { id: '123' },
  query: {},
  name: 'demo'
};

export const mockRouter = {
  push: () => Promise.resolve(),
  replace: () => Promise.resolve(),
  go: () => {},
  back: () => {},
  currentRoute: { value: mockRoute }
};
```

### 5. Criar primeira Story Vue

**stories/frontoffice/badges/BadgeStatus.stories.ts:**
```ts
import type { Meta, StoryObj } from '@storybook/vue3';
import BadgeStatus from '@components/badges/BadgeStatus.vue';

const meta: Meta<typeof BadgeStatus> = {
  title: 'Frontoffice/Badges/BadgeStatus',
  component: BadgeStatus,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['advanced', 'proficient', 'basic', 'below-basic', 'not-completed']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
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
      <div class="d-flex gap-2">
        <BadgeStatus variant="advanced" label="Avançado" />
        <BadgeStatus variant="proficient" label="Proficiente" />
        <BadgeStatus variant="basic" label="Básico" />
        <BadgeStatus variant="below-basic" label="Abaixo do Básico" />
        <BadgeStatus variant="not-completed" label="Não Concluído" />
      </div>
    `
  })
};
```

### 6. Executar

```bash
pnpm storybook
```

Acesse: http://localhost:6006

## Próximos Passos

1. ✅ Verificar que Badge renderiza corretamente
2. ✅ Testar Controls (props editáveis)
3. ✅ Testar addon A11y
4. 🔄 Migrar mais componentes seguindo o padrão
5. 🔄 Remover componentes React de `packages/ui/`

## Troubleshooting

### Erro: "Cannot find module '@components/...'"
- Verificar alias no `viteFinal` do main.ts
- Verificar se o caminho do Frontoffice está correto

### Erro: "$store is undefined"
- Verificar se mockStore está registrado no preview.ts
- Alguns componentes precisam de getters específicos - adicionar ao mock

### Erro: "Bootstrap-Vue component not found"
- Verificar se BootstrapVue3 está instalado e registrado
- Verificar imports de CSS

### Erro: "$t is not a function"
- Verificar se mockI18n está registrado
- Componente usa vue-i18n v9? Pode precisar de createI18n()
