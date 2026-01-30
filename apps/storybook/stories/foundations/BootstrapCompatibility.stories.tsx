import type { Meta, StoryObj } from "@storybook/react";

/**
 * # Bootstrap-Vue Compatibility Test
 * 
 * Esta story testa o carregamento opt-in do Bootstrap-Vue compatibility layer.
 * 
 * ## Como funciona
 * 
 * - Por padrão, o CSS de compatibilidade Bootstrap-Vue **não** é carregado
 * - Para ativar, adicione `parameters.bootstrapCompat = true` na story
 * - O decorator `withBootstrapCompat` carrega o CSS dinamicamente
 * 
 * ## Casos de uso
 * 
 * Use `bootstrapCompat: true` em stories que precisam de:
 * - Classes do Bootstrap 4 (`.badge`, `.btn`, `.card`, etc.)
 * - Componentes Bootstrap-Vue migrando do Frontoffice
 * - Estilos específicos de compatibilidade visual
 */

interface BootstrapCompatTestProps {
  useBootstrapClasses?: boolean;
}

const BootstrapCompatTest = ({ useBootstrapClasses = true }: BootstrapCompatTestProps) => {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Teste de Compatibilidade Bootstrap-Vue
        </h1>
        <p className="text-gray-600 mb-6">
          Esta página testa o carregamento opt-in do CSS de compatibilidade Bootstrap-Vue.
        </p>
      </div>

      {useBootstrapClasses && (
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Badges Bootstrap-Vue</h2>
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary">Primary</span>
              <span className="badge badge-secondary">Secondary</span>
              <span className="badge badge-success">Success</span>
              <span className="badge badge-danger">Danger</span>
              <span className="badge badge-warning">Warning</span>
              <span className="badge badge-info">Info</span>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Legend Badges</h2>
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-legend-advanced">Avançado</span>
              <span className="badge badge-legend-proficient">Proficiente</span>
              <span className="badge badge-legend-basic">Básico</span>
              <span className="badge badge-legend-below-basic">Abaixo do Básico</span>
              <span className="badge badge-legend-not-completed">Não Concluído</span>
              <span className="badge badge-legend-in-progress">Em Andamento</span>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Buttons Bootstrap</h2>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-danger">Danger</button>
              <button className="btn btn-outline-primary">Outline</button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Card Bootstrap</h2>
            <div className="card" style={{ maxWidth: "400px" }}>
              <div className="card-header">
                <h3 className="card-title">Card Title</h3>
              </div>
              <div className="card-body">
                <p>
                  Este é um card usando as classes do Bootstrap-Vue para garantir
                  compatibilidade visual com o Frontoffice.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {!useBootstrapClasses && (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-gray-700">
            Esta story não usa classes Bootstrap-Vue. 
            Ative o parâmetro <code className="px-2 py-1 bg-gray-200 rounded">bootstrapCompat</code> para ver os estilos.
          </p>
        </div>
      )}

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">📝 Informações Técnicas</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            O CSS de compatibilidade Bootstrap-Vue está em{" "}
            <code>/public/bootstrap-vue-compat.css</code>
          </li>
          <li>
            É carregado apenas quando <code>parameters.bootstrapCompat = true</code>
          </li>
          <li>
            O decorator <code>withBootstrapCompat</code> gerencia o carregamento
          </li>
          <li>
            Isso evita conflitos com componentes puramente Tailwind
          </li>
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof BootstrapCompatTest> = {
  title: "Foundations/Bootstrap Compatibility",
  component: BootstrapCompatTest,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Esta story demonstra o carregamento opt-in do CSS de compatibilidade Bootstrap-Vue.

### Por que opt-in?

O CSS de compatibilidade Bootstrap-Vue contém classes globais que podem conflitar
com componentes puros do Design System. Por isso, ele só é carregado quando
explicitamente solicitado via parâmetros.

### Como usar

Para ativar o Bootstrap-Vue compat em uma story:

\`\`\`tsx
export const MinhaStory: Story = {
  parameters: {
    bootstrapCompat: true, // ← Adicione esta linha
  },
};
\`\`\`

### Classes disponíveis

- Badges: \`.badge\`, \`.badge-primary\`, \`.badge-legend-*\`
- Buttons: \`.btn\`, \`.btn-primary\`, \`.btn-outline-*\`
- Cards: \`.card\`, \`.card-header\`, \`.card-body\`
- Forms: \`.form-control\`, \`.form-label\`
- E muitas outras...
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BootstrapCompatTest>;

/**
 * Story padrão SEM o Bootstrap-Vue compat carregado.
 * As classes Bootstrap não terão efeito visual.
 */
export const WithoutBootstrapCompat: Story = {
  args: {
    useBootstrapClasses: true,
  },
  parameters: {
    bootstrapCompat: false, // ❌ Desativado
  },
};

/**
 * Story COM o Bootstrap-Vue compat carregado (opt-in).
 * As classes Bootstrap terão os estilos aplicados.
 */
export const WithBootstrapCompat: Story = {
  args: {
    useBootstrapClasses: true,
  },
  parameters: {
    bootstrapCompat: true, // ✅ Ativado
  },
};
