import type { Meta, StoryObj } from "@storybook/react";

/**
 * **GuidesLimitAlert** - Alerta de limite de guias
 * 
 * Exibe alerta quando o professor atinge o limite de guias/missões.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/missions/GuidesLimitAlert.vue`
 * 
 * @example
 * ```vue
 * <GuidesLimitAlert :limit="10" :current="8" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Missions/GuidesLimitAlert",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Alerta visual para limite de guias/missões ativas.",
      },
    },
  },
  argTypes: {
    limit: {
      control: "number",
      description: "Limite máximo de guias",
    },
    current: {
      control: "number",
      description: "Número atual de guias",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const GuidesLimitAlertMock = ({ 
  limit = 10,
  current = 8,
  showUpgrade = true
}: { 
  limit?: number;
  current?: number;
  showUpgrade?: boolean;
}) => {
  const percentage = (current / limit) * 100;
  const isWarning = percentage >= 70 && percentage < 100;
  const isLimit = percentage >= 100;
  
  if (percentage < 70) return null;

  return (
    <div className={`
      p-4 rounded-lg border-l-4
      ${isLimit ? "bg-destructive/10 border-destructive" : "bg-warning/10 border-warning"}
    `}>
      <div className="flex items-start gap-3">
        <span className={`
          material-symbols-outlined text-xl
          ${isLimit ? "text-destructive" : "text-warning"}
        `}>
          {isLimit ? "error" : "warning"}
        </span>
        
        <div className="flex-1">
          <p className={`font-medium ${isLimit ? "text-destructive" : "text-warning"}`}>
            {isLimit ? "Limite de guias atingido!" : "Você está próximo do limite de guias"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {isLimit 
              ? `Você atingiu o limite de ${limit} guias ativos. Exclua ou arquive guias para criar novos.`
              : `Você está usando ${current} de ${limit} guias disponíveis (${Math.round(percentage)}%).`
            }
          </p>
          
          {/* Barra de progresso */}
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${isLimit ? "bg-destructive" : "bg-warning"}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          
          {showUpgrade && (
            <div className="mt-3 flex gap-2">
              {isLimit ? (
                <>
                  <button className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded text-sm font-medium">
                    Gerenciar Guias
                  </button>
                  <button className="px-3 py-1.5 border rounded text-sm">
                    Fazer Upgrade
                  </button>
                </>
              ) : (
                <button className="px-3 py-1.5 border rounded text-sm">
                  Ver Detalhes
                </button>
              )}
            </div>
          )}
        </div>
        
        <button className="p-1 hover:bg-accent rounded">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};

export const Warning: Story = {
  name: "Aviso (70-99%)",
  render: () => <GuidesLimitAlertMock limit={10} current={8} />,
};

export const AtLimit: Story = {
  name: "Limite Atingido",
  render: () => <GuidesLimitAlertMock limit={10} current={10} />,
};

export const OverLimit: Story = {
  name: "Acima do Limite",
  render: () => <GuidesLimitAlertMock limit={10} current={12} />,
};

export const HighLimit: Story = {
  name: "Limite Alto",
  render: () => <GuidesLimitAlertMock limit={50} current={42} />,
};

export const NoUpgrade: Story = {
  name: "Sem Opção de Upgrade",
  render: () => <GuidesLimitAlertMock limit={10} current={9} showUpgrade={false} />,
};

export const UnderWarning: Story = {
  name: "Abaixo do Aviso (não mostra)",
  render: () => (
    <div className="p-4 bg-muted rounded-lg text-center text-muted-foreground">
      <p>Componente não exibido quando uso está abaixo de 70%</p>
      <p className="text-sm mt-2">Uso atual: 5/10 (50%)</p>
      <GuidesLimitAlertMock limit={10} current={5} />
    </div>
  ),
};

export const InContext: Story = {
  name: "Em Contexto",
  render: () => (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Meus Guias</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
          + Novo Guia
        </button>
      </div>
      
      <GuidesLimitAlertMock limit={10} current={9} />
      
      <div className="grid gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <p className="font-medium">Guia de Matemática {i}</p>
              <p className="text-sm text-muted-foreground">5º Ano A • 25 alunos</p>
            </div>
            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Ativo</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
