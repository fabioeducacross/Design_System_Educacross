/**
 * Teste smoke para validar configuração do Vitest
 * Este teste garante que o ambiente está configurado corretamente antes de prosseguir
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@educacross/ui';
import React from 'react';

describe('Setup - Validação de Configuração', () => {
  it('deve importar componente do pacote UI', () => {
    expect(Button).toBeDefined();
    expect(typeof Button).toBe('object');
  });

  it('deve renderizar componente React básico', () => {
    const { container } = render(<div data-testid="test-div">Hello World</div>);
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId('test-div')).toHaveTextContent('Hello World');
  });

  it('deve ter acesso ao DOM via jsdom', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
    expect(global.ResizeObserver).toBeDefined();
    expect(global.IntersectionObserver).toBeDefined();
  });

  it('deve renderizar Button do design system', () => {
    render(<Button>Teste</Button>);
    const button = screen.getByRole('button', { name: /teste/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Teste');
  });

  it('deve suportar variantes do Button', () => {
    const { rerender } = render(<Button variant="default">Primary</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Delete');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Outline');
  });

  it('deve suportar diferentes tamanhos do Button', () => {
    const { rerender } = render(<Button size="default">Normal</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Small');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Large');
  });
});

describe('Setup - Helpers Globais', () => {
  it('deve ter helpers de teste disponíveis', () => {
    expect(describe).toBeDefined();
    expect(it).toBeDefined();
    expect(expect).toBeDefined();
  });

  it('deve ter matchers do jest-dom', () => {
    const div = document.createElement('div');
    div.textContent = 'test';
    document.body.appendChild(div);

    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent('test');

    document.body.removeChild(div);
  });
});

describe('Setup - Configuração de Aliases', () => {
  it('deve resolver alias @educacross/ui', async () => {
    const module = await import('@educacross/ui');
    expect(module).toBeDefined();
    expect(module.Button).toBeDefined();
  });
});
