# Storybook - Guia de Boas Práticas

Checklist completo baseado no guia oficial do Storybook para garantir qualidade e manutenibilidade do Design System.

---

## 📚 Fundamentos do Storybook

### ✅ Configuração Básica
- [x] Storybook instalado e configurado
- [x] Tema customizado aplicado
- [x] Documentação estruturada (Introdução, API Reference, Guia Rápido)
- [x] Stories organizadas por categoria (Components, Foundations, Patterns)

### 📝 Escrita de Stories
- [x] Usar formato CSF3 (Component Story Format)
- [x] Incluir `tags: ["autodocs"]` para documentação automática
- [x] Definir `argTypes` para controles interativos
- [x] Adicionar descrições nos parâmetros
- [ ] Incluir exemplos de uso em diferentes contextos

```tsx
// ✅ Exemplo de story bem estruturada
export const Default: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Variante padrão do botão com estilo primário.",
      },
    },
  },
};
```

---

## 🛠️ Desenvolvimento

### 🎨 Change a story with Controls
**Status:** ✅ Implementado

Os controles permitem modificar props interativamente:
- [x] ArgTypes definidos em todas as stories
- [x] Controles configurados para cada tipo de prop (select, boolean, text, number)
- [x] Valores padrão documentados

### 🔍 Check responsiveness with Viewports
**Status:** ⚠️ Pendente

**Ação necessária:** Configurar addon de viewports

```ts
// .storybook/preview.ts
export const parameters = {
  viewport: {
    viewports: {
      mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
      tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
    },
    defaultViewport: 'desktop',
  },
};
```

### 🌓 Temas Light/Dark
**Status:** ✅ Implementado
- [x] Tema Light configurado
- [x] Suporte a Dark Mode via classe `.dark`
- [x] Addon themes configurado

### 🎯 Group your components
**Status:** ✅ Implementado
- [x] Componentes agrupados em categorias (Components, Foundations, Guidelines, Patterns)
- [x] Nomenclatura consistente nos títulos (`title: "Components/Button"`)

---

## 🧪 Testing

### ✅ Install Vitest addon
**Status:** ✅ CONCLUÍDO (26/01/2026)

Addon instalado com sucesso:
- [x] `@storybook/addon-vitest@10.2.0`
- [x] `vitest` e `@vitest/browser-playwright`
- [x] `@vitest/coverage-v8` para relatórios de cobertura
- [x] Playwright Chromium instalado
- [x] Arquivo `.storybook/vitest.setup.ts` criado

### 🧪 Test your components
**Status:** ⚠️ Configurar

**Próximos passos:**
1. Adicionar script de teste no `package.json`:
```json
{
  "scripts": {
    "test:storybook": "vitest --project=storybook",
    "test:storybook:watch": "vitest --project=storybook --watch",
    "test:storybook:ui": "vitest --project=storybook --ui"
  }
}
```

2. Criar testes básicos para componentes críticos:
```ts
// Button.test.ts
import { test, expect } from '@vitest/experimental-addon-test';

test('Button renders with correct text', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--default');
  await expect(page.locator('button')).toContainText('Button');
});
```

### 🎭 Test functionality with interactions
**Status:** ⚠️ Implementar

**Ação necessária:** Adicionar play functions nas stories

```tsx
import { userEvent, within, expect } from '@storybook/test';

export const LoginForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Simular preenchimento do formulário
    await userEvent.type(canvas.getByLabelText('Email'), 'user@example.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'password123');
    await userEvent.click(canvas.getByRole('button', { name: /login/i }));
    
    // Verificar resultado
    await expect(canvas.getByText('Success')).toBeInTheDocument();
  },
};
```

**Componentes prioritários para testes de interação:**
- [ ] Button (click, disabled, loading)
- [ ] Input (type, validation, error states)
- [ ] Dialog (open, close, escape key)
- [ ] Select (open dropdown, select option)
- [ ] Tabs (change tab, keyboard navigation)

### ♿ Run accessibility tests
**Status:** ✅ Parcialmente implementado

**Addon a11y instalado, próximos passos:**
1. [ ] Revisar todos os componentes na aba "Accessibility"
2. [ ] Corrigir violações WCAG encontradas
3. [ ] Adicionar testes automáticos de a11y:

```tsx
export const parameters = {
  a11y: {
    config: {
      rules: [
        {
          id: 'color-contrast',
          enabled: true,
        },
      ],
    },
  },
};
```

### 📸 Visual Tests
**Status:** ❌ Não instalado

**Ação necessária:** Instalar addon de testes visuais

```bash
pnpm dlx storybook add @storybook/addon-visual-tests
```

**Benefícios:**
- Detecta regressões visuais automaticamente
- Compara screenshots entre branches
- Integração com Chromatic

### 📊 Generate a coverage report
**Status:** ⚠️ Configurar

**Próximos passos:**
1. Executar testes com coverage:
```bash
pnpm test:storybook --coverage
```

2. Definir threshold mínimo no `vitest.config.ts`:
```ts
export default {
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
};
```

### 🤖 Automate tests in CI
**Status:** ⚠️ Configurar

**Ação necessária:** Adicionar workflow no GitHub Actions

```yaml
# .github/workflows/storybook-tests.yml
name: Storybook Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test:storybook
      - run: pnpm test:storybook --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## 📖 Documentation

### 📝 Automatically document your components
**Status:** ✅ Implementado

- [x] `autodocs` habilitado nas stories
- [x] TypeScript docstrings em interfaces
- [x] Descrições nos argTypes

**Melhorias sugeridas:**
```tsx
export interface ButtonProps {
  /**
   * Variante visual do botão
   * @default "default"
   */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  
  /**
   * Tamanho do botão
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";
  
  /**
   * Estado de carregamento
   */
  loading?: boolean;
}
```

### 📄 Custom content with MDX
**Status:** ✅ Implementado

Documentação MDX criada:
- [x] Introduction.mdx
- [x] Quickstart.mdx
- [x] API.mdx
- [x] Accessibility.mdx
- [x] States.mdx

**Componentes helper criados:**
- [x] BrandHeader
- [x] FeatureCard
- [x] DiagramGrid
- [x] Callout

### 🌐 Publish your Storybook to share
**Status:** ❌ Não publicado

**Opções de publicação:**

#### Opção 1: GitHub Pages
```bash
pnpm build-storybook
# Commit storybook-static/ para branch gh-pages
```

#### Opção 2: Chromatic
```bash
pnpm dlx chromatic --project-token=<token>
```

#### Opção 3: Vercel/Netlify
- Deploy automático do diretório `storybook-static/`

---

## 📋 Checklist de Implementação

### Prioritário (Sprint Atual)
- [ ] Configurar viewports responsivos
- [ ] Adicionar play functions em 5 componentes principais
- [ ] Executar e corrigir testes de acessibilidade
- [ ] Configurar scripts de teste no package.json
- [ ] Gerar primeiro relatório de coverage

### Médio Prazo (Próximo Sprint)
- [ ] Instalar addon de testes visuais
- [ ] Configurar CI/CD com testes automáticos
- [ ] Aumentar coverage para 80%+
- [ ] Publicar Storybook em produção
- [ ] Documentar todos os padrões de composição

### Longo Prazo
- [ ] Integração com Figma (Storybook Connect)
- [ ] Testes de performance (Lighthouse CI)
- [ ] Internacionalização (i18n addon)
- [ ] Modo de alto contraste
- [ ] Documentação de migration guides

---

## 🎯 Métricas de Qualidade

| Métrica | Atual | Meta | Status |
|---------|-------|------|--------|
| Componentes documentados | 37/37 | 37 | ✅ |
| Stories com play functions | 0/37 | 15+ | ❌ |
| Cobertura de testes | 0% | 80% | ❌ |
| Violações de a11y | ? | 0 | ⚠️ |
| Regressões visuais | ? | 0 | ⚠️ |

---

## 📚 Recursos e Links

### Documentação Oficial
- [Storybook Documentation](https://storybook.js.org/docs)
- [Testing with Vitest](https://storybook.js.org/docs/writing-tests/vitest-addon)
- [Accessibility Testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)
- [Visual Testing](https://storybook.js.org/docs/writing-tests/visual-testing)

### Addons Recomendados
- `@storybook/addon-a11y` - ✅ Instalado
- `@storybook/addon-vitest` - ✅ Instalado
- `@storybook/addon-visual-tests` - ❌ Pendente
- `@storybook/addon-interactions` - ⚠️ Verificar se instalado
- `@storybook/addon-coverage` - Via Vitest

### Nossos Recursos
- [Repositório GitHub](https://github.com/fabioeducacross/Design_System_Educacross)
- [Storybook Local](http://localhost:6006)
- [Documentação Interna](./README.md)

---

**Última atualização:** 26 de janeiro de 2026  
**Responsável:** Time de Design System Educacross
