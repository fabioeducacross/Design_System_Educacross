import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./.storybook/test/setup.ts'],
    include: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    exclude: ['node_modules', 'dist', 'storybook-static'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      include: ['stories/**/*.{ts,tsx}'],
      exclude: [
        '**/*.stories.{ts,tsx}',
        '**/*.d.ts',
        '**/node_modules/**',
        '**/dist/**',
        '**/.storybook/**',
        '**/examples/**', // Exemplos não são testados diretamente
        '**/components/CodeTabs.tsx', // Componente auxiliar do Storybook
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
        autoUpdate: true, // Atualizar thresholds automaticamente no início
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@educacross/ui': resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
