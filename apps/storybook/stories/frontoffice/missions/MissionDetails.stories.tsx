import type { Meta, StoryObj } from "@storybook/react";

/**
 * **MissionDetails** - Detalhes de uma missão
 * 
 * Exibe informações completas de uma missão/atividade.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/missions/MissionDetails.vue`
 * 
 * @example
 * ```vue
 * <MissionDetails :mission="missionData" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Missions/MissionDetails",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Card detalhado de missão com progresso, objetivos e ações.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface Mission {
  id: number;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  progress: number;
  totalStudents: number;
  completedStudents: number;
  status: "active" | "completed" | "expired" | "draft";
  games: number;
  questions: number;
}

// Mock do componente Vue
const MissionDetailsMock = ({ mission }: { mission: Mission }) => {
  const statusConfig = {
    active: { label: "Ativa", bg: "bg-success/10", text: "text-success", icon: "play_circle" },
    completed: { label: "Concluída", bg: "bg-primary/10", text: "text-primary", icon: "check_circle" },
    expired: { label: "Expirada", bg: "bg-destructive/10", text: "text-destructive", icon: "cancel" },
    draft: { label: "Rascunho", bg: "bg-muted", text: "text-muted-foreground", icon: "edit_note" },
  };
  
  const status = statusConfig[mission.status];

  return (
    <div className="max-w-2xl bg-card border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                <span className="material-symbols-outlined text-sm align-middle mr-1">{status.icon}</span>
                {status.label}
              </span>
              <span className="text-xs text-muted-foreground">{mission.subject}</span>
            </div>
            <h2 className="text-xl font-bold">{mission.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{mission.description}</p>
          </div>
        </div>
      </div>
      
      {/* Progresso */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progresso da Turma</span>
          <span className="text-sm text-muted-foreground">
            {mission.completedStudents}/{mission.totalStudents} alunos
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${mission.progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-right">{mission.progress}% concluído</p>
      </div>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-3 divide-x">
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{mission.games}</p>
          <p className="text-xs text-muted-foreground">Jogos</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{mission.questions}</p>
          <p className="text-xs text-muted-foreground">Questões</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-muted-foreground">{mission.dueDate}</p>
          <p className="text-xs text-muted-foreground">Prazo</p>
        </div>
      </div>
      
      {/* Ações */}
      <div className="p-4 bg-muted/30 flex gap-2">
        <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
          Ver Resultados
        </button>
        <button className="px-4 py-2 border rounded-md text-sm">
          <span className="material-symbols-outlined text-lg">share</span>
        </button>
        <button className="px-4 py-2 border rounded-md text-sm">
          <span className="material-symbols-outlined text-lg">more_vert</span>
        </button>
      </div>
    </div>
  );
};

const sampleMission: Mission = {
  id: 1,
  title: "Frações e Números Decimais",
  description: "Missão para praticar conversão entre frações e números decimais, incluindo representação na reta numérica.",
  subject: "Matemática",
  dueDate: "30/01",
  progress: 68,
  totalStudents: 25,
  completedStudents: 17,
  status: "active",
  games: 5,
  questions: 20,
};

export const Active: Story = {
  name: "Missão Ativa",
  render: () => <MissionDetailsMock mission={sampleMission} />,
};

export const Completed: Story = {
  name: "Missão Concluída",
  render: () => (
    <MissionDetailsMock 
      mission={{
        ...sampleMission,
        status: "completed",
        progress: 100,
        completedStudents: 25,
      }} 
    />
  ),
};

export const Expired: Story = {
  name: "Missão Expirada",
  render: () => (
    <MissionDetailsMock 
      mission={{
        ...sampleMission,
        status: "expired",
        progress: 45,
        completedStudents: 11,
        dueDate: "15/01",
      }} 
    />
  ),
};

export const Draft: Story = {
  name: "Rascunho",
  render: () => (
    <MissionDetailsMock 
      mission={{
        ...sampleMission,
        status: "draft",
        progress: 0,
        completedStudents: 0,
        dueDate: "-",
      }} 
    />
  ),
};

export const LowProgress: Story = {
  name: "Baixo Progresso",
  render: () => (
    <MissionDetailsMock 
      mission={{
        ...sampleMission,
        progress: 12,
        completedStudents: 3,
      }} 
    />
  ),
};
