/**
 * Configuração global para testes de Storybook
 * Este arquivo é executado antes de cada teste para garantir ambiente consistente
 */

import { beforeAll, afterAll, beforeEach } from 'vitest';

// Configurações de timeout
const TEST_TIMEOUT = 10000; // 10 segundos por teste
const RETRY_COUNT = 2; // Número de tentativas antes de falhar

// Configurar antes de todos os testes
beforeAll(() => {
  console.log('🧪 Inicializando suíte de testes do Design System Educacross...');

  // Configurar timezone para testes consistentes
  process.env.TZ = 'America/Sao_Paulo';

  // Modo CI - mais estrito
  if (process.env.CI) {
    console.log('🤖 Rodando em modo CI - configurações otimizadas para ambiente de build');
  }
});

// Configurar antes de cada teste
beforeEach((context) => {
  // Resetar console.error para detectar warnings no React
  const originalError = console.error;
  console.error = (...args: any[]) => {
    // Detectar warnings do React que devem falhar o teste
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ') ||
       args[0].includes('Error: '))
    ) {
      throw new Error(args[0]);
    }
    originalError(...args);
  };

  // Restaurar ao final do teste
  return () => {
    console.error = originalError;
  };
});

// Limpar após todos os testes
afterAll(() => {
  console.log('✅ Suíte de testes finalizada');
});

// Exportar configurações para uso em testes
export const testConfig = {
  timeout: TEST_TIMEOUT,
  retries: RETRY_COUNT,
  
  // Viewports padrão para testes responsivos
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 },
  },

  // Delays padrão para interações
  delays: {
    short: 100,    // Para tooltips, hovers
    medium: 300,   // Para transições
    long: 1000,    // Para animações complexas
  },

  // Configurações de acessibilidade
  a11y: {
    level: 'AA', // WCAG 2.1 nível AA
    ignoreRules: [], // Regras a ignorar globalmente
  },
};

export default testConfig;
