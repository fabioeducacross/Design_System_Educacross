import type { Meta, StoryObj } from "@storybook/react";

/**
 * **MissionVisualization** - Visualização de missão
 * 
 * Componente para visualização de estrutura e conteúdo de uma missão.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/missions/MissionVisualization.vue`
 * 
 * @example
 * ```vue
 * <MissionVisualization :mission="missionData" mode="preview" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Missions/MissionVisualization",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Visualização hierárquica do conteúdo de uma missão com jogos e questões.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["preview", "edit", "results"],
      description: "Modo de visualização",
    },
  },
};

export default meta;
type Story = StoryObj;

interface Game {
  id: number;
  name: string;
  type: string;
  questions: number;
  icon: string;
}

interface MissionData {
  title: string;
  games: Game[];
}

// Mock do componente Vue
const MissionVisualizationMock = ({ 
  mission,
  mode = "preview"
}: { 
  mission: MissionData;
  mode?: "preview" | "edit" | "results";
}) => (
  <div className="max-w-xl bg-card border rounded-lg p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-semibold">{mission.title}</h3>
      <span className={`
        px-2 py-1 rounded text-xs font-medium
        ${mode === "edit" ? "bg-warning/10 text-warning" : ""}
        ${mode === "preview" ? "bg-primary/10 text-primary" : ""}
        ${mode === "results" ? "bg-success/10 text-success" : ""}
      `}>
        {mode === "edit" ? "Editando" : mode === "results" ? "Resultados" : "Visualização"}
      </span>
    </div>
    
    <div className="space-y-3">
      {mission.games.map((game, index) => (
        <div 
          key={game.id}
          className={`
            flex items-center gap-4 p-4 rounded-lg border
            ${mode === "edit" ? "cursor-grab hover:border-primary" : ""}
            hover:bg-accent/30 transition-colors
          `}
        >
          {/* Número/Ordem */}
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
          
          {/* Ícone do jogo */}
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <span className="material-symbols-outlined text-xl text-muted-foreground">{game.icon}</span>
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <p className="font-medium">{game.name}</p>
            <p className="text-xs text-muted-foreground">{game.type} • {game.questions} questões</p>
          </div>
          
          {/* Ações */}
          {mode === "edit" && (
            <div className="flex gap-1">
              <button className="p-1 hover:bg-accent rounded">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
              <button className="p-1 hover:bg-accent rounded text-destructive">
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          )}
          
          {mode === "results" && (
            <div className="text-right">
              <p className="text-sm font-bold text-success">85%</p>
              <p className="text-xs text-muted-foreground">média</p>
            </div>
          )}
          
          {mode === "preview" && (
            <span className="material-symbols-outlined text-muted-foreground">chevron_right</span>
          )}
        </div>
      ))}
    </div>
    
    {mode === "edit" && (
      <button className="w-full mt-4 p-3 border-2 border-dashed rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">add</span>
        Adicionar Jogo
      </button>
    )}
    
    {/* Resumo */}
    <div className="mt-6 pt-4 border-t flex justify-between text-sm text-muted-foreground">
      <span>{mission.games.length} jogos</span>
      <span>{mission.games.reduce((sum, g) => sum + g.questions, 0)} questões no total</span>
    </div>
  </div>
);

const sampleMission: MissionData = {
  title: "Frações e Decimais",
  games: [
    { id: 1, name: "Corrida das Frações", type: "Corrida", questions: 10, icon: "directions_run" },
    { id: 2, name: "Quebra-cabeça Decimal", type: "Puzzle", questions: 8, icon: "extension" },
    { id: 3, name: "Quiz Relâmpago", type: "Quiz", questions: 15, icon: "bolt" },
    { id: 4, name: "Memória Numérica", type: "Memória", questions: 12, icon: "psychology" },
  ],
};

export const Preview: Story = {
  name: "Modo Visualização",
  render: () => <MissionVisualizationMock mission={sampleMission} mode="preview" />,
};

export const Edit: Story = {
  name: "Modo Edição",
  render: () => <MissionVisualizationMock mission={sampleMission} mode="edit" />,
};

export const Results: Story = {
  name: "Modo Resultados",
  render: () => <MissionVisualizationMock mission={sampleMission} mode="results" />,
};

export const SingleGame: Story = {
  name: "Missão com 1 Jogo",
  render: () => (
    <MissionVisualizationMock 
      mission={{
        title: "Introdução",
        games: [
          { id: 1, name: "Tutorial Básico", type: "Tutorial", questions: 5, icon: "school" },
        ],
      }}
    />
  ),
};

export const ManyGames: Story = {
  name: "Missão Longa",
  render: () => (
    <MissionVisualizationMock 
      mission={{
        title: "Maratona de Matemática",
        games: [
          { id: 1, name: "Aquecimento", type: "Quiz", questions: 5, icon: "fitness_center" },
          { id: 2, name: "Corrida Nível 1", type: "Corrida", questions: 10, icon: "directions_run" },
          { id: 3, name: "Desafio Mental", type: "Puzzle", questions: 8, icon: "psychology" },
          { id: 4, name: "Corrida Nível 2", type: "Corrida", questions: 12, icon: "directions_run" },
          { id: 5, name: "Quebra-cabeça", type: "Puzzle", questions: 10, icon: "extension" },
          { id: 6, name: "Desafio Final", type: "Boss", questions: 15, icon: "emoji_events" },
        ],
      }}
    />
  ),
};
