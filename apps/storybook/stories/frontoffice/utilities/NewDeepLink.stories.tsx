import type { Meta, StoryObj } from "@storybook/react";

/**
 * **NewDeepLink** - Deep Link Handler
 * 
 * Componente para tratamento de deep links e redirecionamentos.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/NewDeepLink.vue`
 * 
 * @example
 * ```vue
 * <NewDeepLink :url="deepLinkUrl" @redirect="handleRedirect" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Utilities/NewDeepLink",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Handler para deep links com estado de carregamento e feedback visual.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const NewDeepLinkMock = ({ 
  status = "loading",
  destination = "missão",
  error = ""
}: { 
  status?: "loading" | "success" | "error";
  destination?: string;
  error?: string;
}) => (
  <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
    <div className="bg-card p-8 rounded-xl shadow-lg text-center max-w-sm">
      {status === "loading" && (
        <>
          <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Redirecionando...</h2>
          <p className="text-muted-foreground">
            Aguarde enquanto preparamos sua {destination}
          </p>
          <div className="mt-6 flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </>
      )}
      
      {status === "success" && (
        <>
          <div className="w-16 h-16 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-success">check_circle</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Pronto!</h2>
          <p className="text-muted-foreground">
            Sua {destination} foi carregada com sucesso
          </p>
        </>
      )}
      
      {status === "error" && (
        <>
          <div className="w-16 h-16 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-destructive">error</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Ops! Algo deu errado</h2>
          <p className="text-muted-foreground mb-4">
            {error || "Não foi possível processar o link"}
          </p>
          <div className="flex gap-2 justify-center">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
              Tentar novamente
            </button>
            <button className="px-4 py-2 border rounded-md text-sm">
              Ir para início
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

export const Loading: Story = {
  name: "Carregando",
  render: () => <NewDeepLinkMock status="loading" />,
};

export const Success: Story = {
  name: "Sucesso",
  render: () => <NewDeepLinkMock status="success" />,
};

export const Error: Story = {
  name: "Erro",
  render: () => <NewDeepLinkMock status="error" error="O link expirou ou é inválido" />,
};

export const MissionLink: Story = {
  name: "Link de Missão",
  render: () => <NewDeepLinkMock destination="missão" />,
};

export const GameLink: Story = {
  name: "Link de Jogo",
  render: () => <NewDeepLinkMock destination="jogo" />,
};

export const ReportLink: Story = {
  name: "Link de Relatório",
  render: () => <NewDeepLinkMock destination="relatório" />,
};

export const ExpiredLink: Story = {
  name: "Link Expirado",
  render: () => <NewDeepLinkMock status="error" error="Este link expirou. Solicite um novo link ao professor." />,
};

export const NotFound: Story = {
  name: "Conteúdo Não Encontrado",
  render: () => <NewDeepLinkMock status="error" error="O conteúdo solicitado não foi encontrado ou foi removido." />,
};
