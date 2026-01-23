# Implementation Plan: Design System Multi-Framework

**Branch**: `master` | **Date**: 2026-01-23 | **Prioridade**: P1  
**Storybook Version**: 10.1.11 | **Estratégia**: Storybook Composition  
**Referência**: [Storybook Composition Docs](https://storybook.js.org/docs/sharing/storybook-composition)

## 1. Contexto Entendido

### Requisito do Usuário
Desenvolvedores devem visualizar **3 opções de código** para cada componente:
1. **React** (TypeScript + Tailwind CSS + Radix UI) - ✅ Existente
2. **Vue 2** (JavaScript + Bootstrap 5) - ❌ A implementar
3. **Vue 3** (TypeScript + Composition API) - ❌ A implementar

### Solução Escolhida
**Storybook 10 Composition** permite compor múltiplos Storybooks em uma única interface:
- Menu lateral unificado
- Navegação fluida entre frameworks
- Cada Storybook mantém preview interativo próprio
- Documentação compartilhada via MDX quando necessário

**Fonte**: Documentação oficial em https://storybook.js.org/docs/sharing/storybook-composition

---

## 2. Arquitetura Multi-Framework

### 2.1 Estrutura de Pacotes

```
packages/
├── tokens/                 # @educacross/tokens (novo)
│   ├── src/
│   │   ├── colors.json
│   │   ├── spacing.json
│   │   ├── typography.json
│   │   └── index.ts
│   └── package.json
│
├── ui/                     # @fabioeducacross/ui (existente - React)
│   ├── src/components/
│   └── package.json
│
├── ui-vue2/                # @educacross/ui-vue2 (novo)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   │   ├── EdButton.vue
│   │   │   │   └── index.js
│   │   │   └── ...
│   │   └── index.js
│   ├── vite.config.ts
│   └── package.json
│
└── ui-vue3/                # @educacross/ui-vue3 (novo)
    ├── src/
    │   ├── components/
    │   │   ├── Button/
    │   │   │   ├── EdButton.vue
    │   │   │   └── index.ts
    │   │   └── ...
    │   └── index.ts
    ├── vite.config.ts
    └── package.json

apps/
├── storybook/              # Storybook React (existente - porta 6006)
│   ├── .storybook/
│   │   └── main.ts         # 🔧 Adicionar refs para Vue2 e Vue3
│   └── stories/
│
├── storybook-vue2/         # Storybook Vue 2 (novo - porta 6007)
│   ├── .storybook/
│   │   └── main.ts
│   └── stories/
│
└── storybook-vue3/         # Storybook Vue 3 (novo - porta 6008)
    ├── .storybook/
    │   └── main.ts
    └── stories/
```

### 2.2 Configuração Storybook Composition

**apps/storybook/.storybook/main.ts** (React - Master):
```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // ... configuração existente
  
  refs: {
    'vue2': {
      title: 'Vue 2 + Bootstrap',
      url: 'http://localhost:6007',
      expanded: false,
    },
    'vue3': {
      title: 'Vue 3',
      url: 'http://localhost:6008',
      expanded: false,
    },
  },
};

export default config;
```

**Resultado Visual:**
```
Storybook (porta 6006)
├── 📁 React (local)
│   ├── Components/Button
│   └── Components/Input
├── 📁 Vue 2 + Bootstrap (ref → 6007)
│   ├── Components/EdButton
│   └── Components/EdInput
└── 📁 Vue 3 (ref → 6008)
    ├── Components/EdButton
    └── Components/EdInput
```

---

## 3. Design Tokens Compartilhados

### 3.1 Pacote @educacross/tokens

**packages/tokens/src/colors.json**:
```json
{
  "primary": {
    "50": "hsl(221.2, 83.2%, 95%)",
    "500": "hsl(221.2, 83.2%, 53.3%)",
    "900": "hsl(221.2, 83.2%, 13.3%)"
  },
  "background": "hsl(0, 0%, 100%)",
  "foreground": "hsl(222.2, 47.4%, 11.2%)"
}
```

**packages/tokens/src/spacing.json**:
```json
{
  "0": "0px",
  "1": "0.25rem",
  "2": "0.5rem",
  "4": "1rem",
  "8": "2rem"
}
```

**packages/tokens/src/index.ts**:
```typescript
import colors from './colors.json';
import spacing from './spacing.json';
import typography from './typography.json';

export { colors, spacing, typography };
export type { ColorToken, SpacingToken, TypographyToken };
```

### 3.2 Integração nos Frameworks

**React (Tailwind CSS)** - `packages/ui/tailwind-preset.ts`:
```typescript
import { colors, spacing } from '@educacross/tokens';

export const educacrossPreset = {
  theme: {
    extend: {
      colors: colors,
      spacing: spacing,
    }
  }
};
```

**Vue 2 (Bootstrap 5)** - `packages/ui-vue2/src/styles/_tokens.scss`:
```scss
@import '@educacross/tokens/dist/colors.json';

$primary: map-get($colors, 'primary', '500');
$background: map-get($colors, 'background');
```

**Vue 3 (CSS Custom Properties)** - `packages/ui-vue3/src/styles/tokens.css`:
```css
:root {
  --primary-500: hsl(221.2, 83.2%, 53.3%);
  --spacing-4: 1rem;
}
```

---

## 4. Implementação Faseada

### Fase 1: Fundação (1-2 semanas)

**T1: Extrair Design Tokens** (4h)
- Criar `packages/tokens/`
- Extrair cores, spacing, typography do React
- Build como JSON + TypeScript
- Publicar no GitHub Packages

**T2: Setup Pacote Vue 2** (8h)
- Criar `packages/ui-vue2/`
- Configurar Vite + Vue 2.7
- Integrar Bootstrap 5.3
- Importar tokens via SCSS
- Configurar build para CommonJS + ES Modules

**T3: Setup Pacote Vue 3** (6h)
- Criar `packages/ui-vue3/`
- Configurar Vite + Vue 3.4
- Setup Composition API + TypeScript
- Importar tokens via CSS Custom Properties
- Configurar build e exports

**T4: Storybook Vue 2** (6h)
- Criar `apps/storybook-vue2/`
- Instalar Storybook 10 com `@storybook/vue3-vite`
- Configurar porta 6007
- Tema Bootstrap
- Build e dev scripts

**T5: Storybook Vue 3** (4h)
- Criar `apps/storybook-vue3/`
- Instalar Storybook 10 com `@storybook/vue3-vite`
- Configurar porta 6008
- Build e dev scripts

**T6: Storybook Composition** (2h)
- Adicionar `refs` em `apps/storybook/.storybook/main.ts`
- Configurar títulos e URLs
- Testar navegação entre frameworks
- Ajustar expanded/collapsed

**Checkpoint Fase 1**: 
```bash
# Terminal 1
cd apps/storybook && pnpm dev        # → localhost:6006

# Terminal 2
cd apps/storybook-vue2 && pnpm dev   # → localhost:6007

# Terminal 3
cd apps/storybook-vue3 && pnpm dev   # → localhost:6008
```
Acessar `localhost:6006` mostra menu com React, Vue 2, Vue 3 navegáveis.

---

### Fase 2: Componentes Core (2-3 semanas)

**T7: Button React → Vue 2 → Vue 3** (12h)

**React (existente)**:
```tsx
// packages/ui/src/components/Button/Button.tsx
<Button variant="primary" size="default">Click</Button>
```

**Vue 2 (novo)**:
```vue
<!-- packages/ui-vue2/src/components/Button/EdButton.vue -->
<template>
  <button :class="buttonClasses" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'EdButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (v) => ['primary', 'secondary', 'outline'].includes(v)
    },
    size: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    buttonClasses() {
      return {
        'btn': true,
        [`btn-${this.variant}`]: true,
        [`btn-${this.size}`]: true,
      }
    }
  }
}
</script>

<style scoped>
@import '../../styles/tokens';
.btn { /* Bootstrap 5 base + tokens */ }
</style>
```

**Vue 3 (novo)**:
```vue
<!-- packages/ui-vue3/src/components/Button/EdButton.vue -->
<template>
  <button :class="buttonClasses" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface EdButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'default' | 'lg';
}

const props = withDefaults(defineProps<EdButtonProps>(), {
  variant: 'primary',
  size: 'default'
});

const buttonClasses = computed(() => ({
  'ed-button': true,
  [`ed-button--${props.variant}`]: true,
  [`ed-button--${props.size}`]: true,
}));
</script>

<style scoped>
.ed-button { /* Tokens via CSS vars */ }
</style>
```

**Stories**:
- `apps/storybook/stories/components/Button.stories.tsx` (React)
- `apps/storybook-vue2/stories/components/EdButton.stories.js` (Vue 2)
- `apps/storybook-vue3/stories/components/EdButton.stories.ts` (Vue 3)

**T8: Input React → Vue 2 → Vue 3** (10h)
**T9: Label React → Vue 2 → Vue 3** (6h)

**Checkpoint Fase 2**: 
3 componentes P1 funcionando nos 3 frameworks, navegáveis no Storybook unificado.

---

### Fase 3: Componentes Restantes (4-8 semanas)

**T10-T30**: Portar 18 componentes restantes (P2 e P3)
- Checkbox, Radio, Select, Card, Badge, etc.
- Cada componente: ~6-10h (3-4h por framework Vue)

**Checkpoint Fase 3**: 
21 componentes × 3 frameworks = 63 implementações completas.

---

## 5. Scripts e Comandos

### 5.1 Scripts do Workspace Root

**package.json**:
```json
{
  "scripts": {
    "dev": "pnpm --parallel --filter './apps/*' dev",
    "storybook": "pnpm --filter storybook dev",
    "storybook:vue2": "pnpm --filter storybook-vue2 dev",
    "storybook:vue3": "pnpm --filter storybook-vue3 dev",
    "storybook:all": "pnpm --parallel --filter './apps/storybook*' dev",
    "build": "turbo build",
    "build:tokens": "pnpm --filter @educacross/tokens build",
    "build:ui-all": "pnpm --filter '@educacross/ui*' build"
  }
}
```

### 5.2 Desenvolvimento Multi-Framework

```bash
# Modo composition (recomendado)
pnpm storybook:all
# Acessar http://localhost:6006 (master com refs)

# Desenvolvimento isolado
pnpm storybook        # React → 6006
pnpm storybook:vue2   # Vue 2 → 6007
pnpm storybook:vue3   # Vue 3 → 6008
```

---

## 6. CI/CD Multi-Framework

### 6.1 GitHub Actions

**.github/workflows/ci.yml**:
```yaml
name: CI Multi-Framework

on: [push, pull_request]

jobs:
  test-react:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm --filter @fabioeducacross/ui test
      - run: pnpm --filter @fabioeducacross/ui build

  test-vue2:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm --filter @educacross/ui-vue2 test
      - run: pnpm --filter @educacross/ui-vue2 build

  test-vue3:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm --filter @educacross/ui-vue3 test
      - run: pnpm --filter @educacross/ui-vue3 build

  build-storybooks:
    runs-on: ubuntu-latest
    needs: [test-react, test-vue2, test-vue3]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install
      - run: pnpm build:tokens
      - run: pnpm --parallel --filter './apps/storybook*' build
```

### 6.2 Chromatic Multi-Framework

```bash
# Build separado para cada Storybook
pnpm exec chromatic --project-token=$TOKEN_REACT --storybook-build-dir=apps/storybook/storybook-static
pnpm exec chromatic --project-token=$TOKEN_VUE2 --storybook-build-dir=apps/storybook-vue2/storybook-static
pnpm exec chromatic --project-token=$TOKEN_VUE3 --storybook-build-dir=apps/storybook-vue3/storybook-static
```

---

## 7. Publicação NPM

### 7.1 Pacotes Independentes

**@educacross/tokens** → `0.1.0`
**@fabioeducacross/ui** → `0.2.0` (React)
**@educacross/ui-vue2** → `0.1.0`
**@educacross/ui-vue3** → `0.1.0`

### 7.2 Instalação por Framework

**React**:
```bash
pnpm add @fabioeducacross/ui@0.2.0
```

**Vue 2**:
```bash
npm install @educacross/ui-vue2 bootstrap@5.3.3
```

**Vue 3**:
```bash
npm install @educacross/ui-vue3
```

---

## 8. Documentação Multi-Framework

### 8.1 MDX com Code Tabs (Adicional)

**apps/storybook/stories/guides/MultiFramework.mdx**:
```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Guides/Multi-Framework" />

# Usando Educacross Design System

## React

\```tsx
import { Button } from '@fabioeducacross/ui';

<Button variant="primary">Click</Button>
\```

## Vue 2

\```vue
<template>
  <ed-button variant="primary">Click</ed-button>
</template>

<script>
import { EdButton } from '@educacross/ui-vue2';
export default { components: { EdButton } }
</script>
\```

## Vue 3

\```vue
<template>
  <ed-button variant="primary">Click</ed-button>
</template>

<script setup>
import { EdButton } from '@educacross/ui-vue3';
</script>
\```
```

---

## 9. Estimativas de Esforço

| Fase | Tarefas | Horas | Semanas |
|------|---------|-------|---------|
| **Fase 1: Fundação** | T1-T6 | 30h | 1-2 |
| **Fase 2: Core (Button, Input, Label)** | T7-T9 | 28h | 2-3 |
| **Fase 3: Componentes P2/P3** | T10-T30 | 120-180h | 4-8 |
| **Total** | 30 tarefas | **178-238h** | **7-13 semanas** |

**Considerações**:
- Fase 1 e 2 podem ser feitas em sprint MVP (3-5 semanas)
- Fase 3 é incremental (1-2 componentes por semana)
- Equipe de 2 devs: ~6-8 semanas para MVP
- Equipe de 1 dev: ~10-13 semanas para MVP

---

## 10. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Bootstrap 5 conflita com tokens | Média | Alto | Usar CSS Modules no Vue 2 |
| Vue 2.7 incompatível com Storybook 10 | Baixa | Alto | Fallback para Vue 2.6 + Storybook 7 |
| Composition refs lentos em dev | Baixa | Médio | Modo isolado para desenvolvimento |
| Manutenção triplicada | Alta | Alto | Priorizar subset P1, documentar bem |

---

## 11. Sucesso Medido Por

✅ **MVP (Fase 1 + 2)**:
- [ ] 3 Storybooks rodando em paralelo (6006, 6007, 6008)
- [ ] Composition mostra menu unificado
- [ ] Button funciona nos 3 frameworks com mesma API
- [ ] Tokens compartilhados aplicados corretamente
- [ ] CI passa para os 3 pacotes

✅ **Release v1.0 (Fase 3)**:
- [ ] 21 componentes × 3 frameworks = 63 implementações
- [ ] 3 pacotes publicados no NPM
- [ ] Documentação completa com exemplos multi-framework
- [ ] Chromatic configurado para os 3 Storybooks

---

## 12. Próximos Passos Imediatos

1. **Confirmar escopo**: MVP (3 componentes) ou Full (21 componentes)?
2. **Confirmar prioridade**: Vue 2 ou Vue 3 primeiro?
3. **Executar T1**: Extrair tokens como primeiro passo
4. **Atualizar tasks.md**: Detalhar subtarefas de cada fase

Aguardo confirmação para prosseguir com implementação.
