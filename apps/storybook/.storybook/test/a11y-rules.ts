/**
 * Configuração de regras de acessibilidade para testes automatizados
 * Baseado em WCAG 2.1 nível AA
 */

export const a11yRules = {
  // Regras principais de acessibilidade
  rules: [
    {
      // Contraste de cores - Nível AA (mínimo 4.5:1 para texto normal)
      id: 'color-contrast',
      enabled: true,
      options: { level: 'AA' },
    },
    {
      // Garantir que todos os elementos interativos sejam acessíveis por teclado
      id: 'keyboard',
      enabled: true,
    },
    {
      // Verificar rótulos de formulários
      id: 'label',
      enabled: true,
    },
    {
      // Garantir que imagens tenham alt text apropriado
      id: 'image-alt',
      enabled: true,
    },
    {
      // Verificar hierarquia de headings (h1, h2, h3...)
      id: 'heading-order',
      enabled: true,
    },
    {
      // ARIA - atributos válidos e corretos
      id: 'aria-valid-attr',
      enabled: true,
    },
    {
      // ARIA - valores válidos
      id: 'aria-valid-attr-value',
      enabled: true,
    },
    {
      // ARIA - roles válidos
      id: 'aria-roles',
      enabled: true,
    },
    {
      // Links devem ter texto descritivo
      id: 'link-name',
      enabled: true,
    },
    {
      // Botões devem ter texto ou label
      id: 'button-name',
      enabled: true,
    },
    {
      // Foco visível para navegação por teclado
      id: 'focus-visible',
      enabled: true,
    },
  ],

  // Tags que não devem ser testadas (decorativos, rascunhos, etc)
  disableDuringDevelopment: false,

  // Elementos que podem ser ignorados em contextos específicos
  selectors: {
    // Elementos decorativos que não precisam de alt text
    decorative: ['.decorative', '[aria-hidden="true"]'],
    // Elementos que são intencionalmente ocultos
    hidden: ['[hidden]', '.visually-hidden'],
  },
};

// Severidade de violações
export const a11ySeverity = {
  critical: ['color-contrast', 'keyboard', 'label', 'aria-valid-attr'],
  serious: ['heading-order', 'image-alt', 'link-name', 'button-name'],
  moderate: ['focus-visible', 'aria-roles'],
};

// Configurações por tipo de componente
export const componentA11yConfig = {
  // Componentes de formulário precisam de validação extra
  form: {
    rules: ['label', 'aria-valid-attr', 'aria-required-attr'],
  },
  // Componentes de navegação
  navigation: {
    rules: ['keyboard', 'focus-visible', 'link-name'],
  },
  // Modais e overlays
  modal: {
    rules: ['focus-visible', 'aria-roles', 'aria-modal'],
  },
  // Componentes interativos
  interactive: {
    rules: ['keyboard', 'button-name', 'aria-roles'],
  },
};

export default a11yRules;
