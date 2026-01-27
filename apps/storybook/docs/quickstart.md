# Guia Rápido - Testes no Design System Educacross

## 🎯 Visão Geral

Este guia fornece instruções práticas para escrever e executar testes no Design System Educacross usando Vitest, Storybook e Playwright.

## 📋 Tipos de Teste

### 1. Testes de Unidade
Testam componentes isolados e suas variantes.

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@educacross/ui';

describe('Button', () => {
  it('renderiza com texto correto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Clique aqui');
  });

  it('chama onClick quando clicado', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### 2. Testes de Interação (Play Functions)
Testam comportamento do usuário nas stories do Storybook.

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { Dialog } from '@educacross/ui';

export const Interactive: StoryObj<typeof Dialog> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Clicar no botão de abrir
    await userEvent.click(canvas.getByRole('button', { name: /abrir/i }));

    // 2. Verificar que o dialog apareceu
    const dialog = await canvas.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // 3. Testar fechar com ESC
    await userEvent.keyboard('{Escape}');
    expect(dialog).not.toBeInTheDocument();
  },
};
```

### 3. Testes de Acessibilidade
Validam conformidade com WCAG 2.1 AA usando axe-core.

```typescript
import { axe } from '@storybook/addon-a11y';
import { render } from '@testing-library/react';
import { Input } from '@educacross/ui';

describe('Input - Acessibilidade', () => {
  it('não deve ter violações de a11y', async () => {
    const { container } = render(
      <Input 
        label="Nome completo" 
        aria-describedby="helper-text"
      />
    );

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('suporta navegação por teclado', async () => {
    render(<Input label="Email" />);
    const input = screen.getByRole('textbox');

    // Tab para focar
    await userEvent.tab();
    expect(input).toHaveFocus();

    // Digite texto
    await userEvent.keyboard('teste@email.com');
    expect(input).toHaveValue('teste@email.com');
  });
});
```

### 4. Testes Visuais
Detectam mudanças não intencionais no layout/estilo usando Playwright.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Button - Visual', () => {
  test('deve corresponder ao snapshot em todos os estados', async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/button--default');

    // Estado padrão
    await expect(page).toHaveScreenshot('button-default.png');

    // Estado hover
    await page.hover('[data-testid="button"]');
    await expect(page).toHaveScreenshot('button-hover.png');

    // Estado disabled
    await page.goto('http://localhost:6006/?path=/story/button--disabled');
    await expect(page).toHaveScreenshot('button-disabled.png');
  });
});
```

## 🚀 Comandos

```bash
# Executar todos os testes
pnpm test:storybook

# Modo watch (desenvolvimento)
pnpm test:watch

# Gerar relatório de coverage
pnpm test:coverage

# Interface gráfica do Vitest
pnpm test:ui

# Rodar Storybook + testes simultaneamente
pnpm dev         # Terminal 1
pnpm test:watch  # Terminal 2
```

## 📁 Estrutura de Arquivos

```
apps/storybook/
├── .storybook/
│   └── test/
│       ├── setup.ts           # Configuração global (mocks, helpers)
│       ├── setup.global.ts    # Timeouts, retries
│       └── a11y-rules.ts      # Regras de acessibilidade
│
├── tests/
│   ├── integration/           # Testes de fluxo de usuário
│   │   └── Form.test.tsx
│   │
│   ├── accessibility/         # Testes WCAG 2.1
│   │   └── Navigation.test.tsx
│   │
│   └── visual/                # Testes de regressão visual
│       ├── Button.spec.ts
│       └── baseline/          # Screenshots de referência
│
└── stories/
    └── components/
        └── Button.stories.tsx # Stories + play functions
```

## 🎨 Boas Práticas

### ✅ Fazer

- **Teste comportamento, não implementação**: Teste o que o usuário vê, não detalhes internos de state.
- **Use roles e labels**: `getByRole('button', { name: 'Salvar' })` em vez de classes CSS.
- **Simule usuário real**: Use `userEvent` em vez de disparar eventos sintéticos.
- **Asserts claros**: Mensagens de erro que ajudem a debugar rapidamente.

### ❌ Evitar

- Testar estilos CSS diretamente (use testes visuais para isso)
- Snapshots de HTML completo (são frágeis e difíceis de manter)
- Timers arbitrários com `setTimeout` (use `waitFor` do Testing Library)
- Testes que dependem de ordem de execução

## 🔍 Debugging

### 1. Vitest UI
```bash
pnpm test:ui
```
Interface gráfica interativa no navegador (localhost:51204).

### 2. Chrome DevTools
Adicione `debugger;` no teste:
```typescript
it('debug test', async () => {
  render(<MyComponent />);
  debugger; // Pausa aqui
  await userEvent.click(...);
});
```

Execute com:
```bash
node --inspect-brk ./node_modules/.bin/vitest run
```

### 3. screen.debug()
Imprime o DOM atual no terminal:
```typescript
import { screen } from '@testing-library/react';

it('debug DOM', () => {
  render(<MyComponent />);
  screen.debug(); // Mostra HTML completo
  screen.debug(screen.getByRole('button')); // Mostra apenas o botão
});
```

## 📊 Coverage

O relatório de coverage é gerado em `apps/storybook/coverage/`:

- `index.html` - Interface web navegável
- `lcov.info` - Para integração com CI/CD
- `coverage-summary.json` - Métricas em JSON

**Meta mínima**: 80% de coverage em:
- Lines (linhas executadas)
- Functions (funções chamadas)
- Branches (condicionais testadas)
- Statements (comandos executados)

## 🧩 Patterns Comuns

### Testar formulário completo
```typescript
describe('LoginForm', () => {
  it('submete dados válidos', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@email.com');
    await userEvent.type(screen.getByLabelText(/senha/i), 'senha123');
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@email.com',
      password: 'senha123',
    });
  });
});
```

### Testar loading state
```typescript
it('mostra spinner durante carregamento', async () => {
  render(<Button loading>Salvar</Button>);

  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByTestId('spinner')).toBeInTheDocument();
});
```

### Testar responsividade
```typescript
import { testConfig } from '../.storybook/test/setup.global';

describe('Header - Responsivo', () => {
  it('mostra menu mobile em telas pequenas', () => {
    // Simular viewport mobile
    global.innerWidth = testConfig.viewports.mobile.width;
    
    render(<Header />);
    expect(screen.getByRole('button', { name: /menu/i })).toBeVisible();
  });
});
```

## 🆘 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Cannot find module '@educacross/ui'" | Verifique alias em `vitest.config.ts` |
| Timeouts em testes | Aumente `testTimeout` ou use `vi.setConfig({ testTimeout: 15000 })` |
| Testes flaky (falham aleatoriamente) | Use `waitFor` para aguardar mudanças assíncronas |
| Coverage não atinge 80% | Adicione testes de edge cases (undefined, null, arrays vazios) |
| Storybook não reconhece play functions | Certifique-se que `@storybook/addon-interactions` está instalado |

## 📚 Recursos

- [Vitest Docs](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Storybook Testing](https://storybook.js.org/docs/writing-tests)
- [Playwright](https://playwright.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Próximos passos**:
1. Leia [specs/002-storybook-testing/plan.md](../../specs/002-storybook-testing/plan.md) para entender a arquitetura completa
2. Revise [specs/002-storybook-testing/tasks.md](../../specs/002-storybook-testing/tasks.md) para detalhes de cada task
3. Veja exemplos práticos em `tests/integration/` e `stories/components/`
