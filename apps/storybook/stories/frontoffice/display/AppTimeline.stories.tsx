import type { Meta, StoryObj } from "@storybook/react";

/**
 * **AppTimeline** - Linha do tempo
 * 
 * Componente para exibição de eventos em ordem cronológica.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/AppTimeline.vue`
 * 
 * @example
 * ```vue
 * <AppTimeline :events="timelineEvents" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Display/AppTimeline",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Linha do tempo vertical para exibição de histórico de eventos.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface TimelineEvent {
  id: number;
  title: string;
  description?: string;
  date: string;
  icon?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
}

// Mock do componente Vue
const AppTimelineMock = ({ 
  events
}: { 
  events: TimelineEvent[];
}) => {
  const variantStyles = {
    default: { bg: "bg-muted", icon: "text-muted-foreground", dot: "bg-muted-foreground" },
    success: { bg: "bg-success/10", icon: "text-success", dot: "bg-success" },
    warning: { bg: "bg-warning/10", icon: "text-warning", dot: "bg-warning" },
    error: { bg: "bg-destructive/10", icon: "text-destructive", dot: "bg-destructive" },
    info: { bg: "bg-primary/10", icon: "text-primary", dot: "bg-primary" },
  };

  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
      
      <div className="space-y-6">
        {events.map((event, index) => {
          const styles = variantStyles[event.variant || "default"];
          return (
            <div key={event.id} className="relative">
              {/* Dot */}
              <div className={`
                absolute -left-5 top-1 w-4 h-4 rounded-full border-2 border-background
                ${styles.dot}
              `} />
              
              {/* Content */}
              <div className={`p-4 rounded-lg ${styles.bg}`}>
                <div className="flex items-start gap-3">
                  {event.icon && (
                    <span className={`material-symbols-outlined text-lg ${styles.icon}`}>
                      {event.icon}
                    </span>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <span className="text-xs text-muted-foreground">{event.date}</span>
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const activityEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Missão concluída",
    description: "Aluno completou a missão 'Frações e Decimais' com 85% de aproveitamento",
    date: "Hoje, 14:32",
    icon: "check_circle",
    variant: "success",
  },
  {
    id: 2,
    title: "Jogo iniciado",
    description: "Aluno iniciou o jogo 'Corrida das Frações'",
    date: "Hoje, 14:15",
    icon: "play_circle",
    variant: "info",
  },
  {
    id: 3,
    title: "Alerta de desempenho",
    description: "Aluno está abaixo da média em 'Geometria'",
    date: "Ontem, 16:45",
    icon: "warning",
    variant: "warning",
  },
  {
    id: 4,
    title: "Tentativa falhou",
    description: "Aluno não atingiu a pontuação mínima no quiz",
    date: "23/01, 10:30",
    icon: "cancel",
    variant: "error",
  },
  {
    id: 5,
    title: "Primeiro acesso",
    description: "Aluno realizou o primeiro acesso à plataforma",
    date: "20/01, 09:00",
    icon: "person_add",
    variant: "default",
  },
];

export const Default: Story = {
  render: () => <AppTimelineMock events={activityEvents} />,
};

export const Simple: Story = {
  name: "Simples (sem ícones)",
  render: () => (
    <AppTimelineMock 
      events={activityEvents.map(e => ({ ...e, icon: undefined }))}
    />
  ),
};

export const AllSuccess: Story = {
  name: "Todos Sucesso",
  render: () => (
    <AppTimelineMock 
      events={[
        { id: 1, title: "Fase 3 concluída", date: "Hoje", icon: "check_circle", variant: "success" },
        { id: 2, title: "Fase 2 concluída", date: "Ontem", icon: "check_circle", variant: "success" },
        { id: 3, title: "Fase 1 concluída", date: "23/01", icon: "check_circle", variant: "success" },
        { id: 4, title: "Jornada iniciada", date: "20/01", icon: "flag", variant: "info" },
      ]}
    />
  ),
};

export const InCard: Story = {
  name: "Dentro de Card",
  render: () => (
    <div className="max-w-md border rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-muted">
        <h3 className="font-semibold">Histórico de Atividades</h3>
        <p className="text-xs text-muted-foreground">Maria Silva</p>
      </div>
      <div className="p-4">
        <AppTimelineMock events={activityEvents.slice(0, 3)} />
      </div>
      <div className="p-4 border-t text-center">
        <button className="text-sm text-primary hover:underline">Ver histórico completo</button>
      </div>
    </div>
  ),
};

export const TwoEvents: Story = {
  name: "Dois Eventos",
  render: () => (
    <AppTimelineMock 
      events={activityEvents.slice(0, 2)}
    />
  ),
};
