import type { Meta, StoryObj } from "@storybook/react";

/**
 * **StudentGameDetailsModal** - Modal de detalhes do jogo do aluno
 * 
 * Modal que exibe detalhes de performance do aluno em um jogo específico.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/student-details/StudentGameDetailsModal.vue`
 * 
 * @example
 * ```vue
 * <StudentGameDetailsModal :student="student" :game="game" @close="handleClose" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Modals/StudentGameDetailsModal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Modal com detalhes de desempenho de um aluno em jogo específico.",
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

interface GameAttempt {
  date: string;
  score: number;
  time: string;
  correct: number;
  total: number;
}

interface GameDetail {
  studentName: string;
  gameName: string;
  gameType: string;
  bestScore: number;
  attempts: GameAttempt[];
}

// Mock do componente Vue
const StudentGameDetailsModalMock = ({ 
  data,
  open = true
}: { 
  data: GameDetail;
  open?: boolean;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Desempenho de</p>
              <h2 className="text-xl font-bold">{data.studentName}</h2>
            </div>
            <button className="p-2 hover:bg-accent rounded-full">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
        
        {/* Game Info */}
        <div className="p-6 border-b bg-muted/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-primary">sports_esports</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{data.gameName}</h3>
              <p className="text-sm text-muted-foreground">{data.gameType}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Melhor pontuação</p>
              <p className="text-2xl font-bold text-primary">{data.bestScore}%</p>
            </div>
          </div>
        </div>
        
        {/* Attempts */}
        <div className="p-6 overflow-auto max-h-72">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">history</span>
            Histórico de Tentativas
          </h4>
          <div className="space-y-2">
            {data.attempts.map((attempt, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{attempt.date}</p>
                  <p className="text-xs text-muted-foreground">
                    {attempt.correct}/{attempt.total} acertos • {attempt.time}
                  </p>
                </div>
                <div className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${attempt.score >= 70 ? "bg-legend-advanced/10 text-legend-advanced" : ""}
                  ${attempt.score >= 50 && attempt.score < 70 ? "bg-legend-proficient/10 text-legend-proficient" : ""}
                  ${attempt.score >= 25 && attempt.score < 50 ? "bg-legend-basic/10 text-legend-basic" : ""}
                  ${attempt.score < 25 ? "bg-legend-below-basic/10 text-legend-below-basic" : ""}
                `}>
                  {attempt.score}%
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 flex justify-end gap-2">
          <button className="px-4 py-2 border rounded-md text-sm">
            Ver Relatório Completo
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const sampleData: GameDetail = {
  studentName: "Maria Silva",
  gameName: "Corrida das Frações",
  gameType: "Jogo de Corrida",
  bestScore: 85,
  attempts: [
    { date: "25/01/2026 14:32", score: 85, time: "4:32", correct: 17, total: 20 },
    { date: "24/01/2026 10:15", score: 70, time: "5:10", correct: 14, total: 20 },
    { date: "23/01/2026 09:45", score: 55, time: "6:20", correct: 11, total: 20 },
    { date: "22/01/2026 11:20", score: 40, time: "7:05", correct: 8, total: 20 },
  ],
};

export const Default: Story = {
  render: () => <StudentGameDetailsModalMock data={sampleData} />,
};

export const HighPerformer: Story = {
  name: "Alto Desempenho",
  render: () => (
    <StudentGameDetailsModalMock 
      data={{
        studentName: "Pedro Oliveira",
        gameName: "Quiz Relâmpago",
        gameType: "Quiz",
        bestScore: 100,
        attempts: [
          { date: "25/01/2026 14:32", score: 100, time: "2:15", correct: 20, total: 20 },
          { date: "24/01/2026 10:15", score: 95, time: "2:45", correct: 19, total: 20 },
        ],
      }}
    />
  ),
};

export const Struggling: Story = {
  name: "Com Dificuldade",
  render: () => (
    <StudentGameDetailsModalMock 
      data={{
        studentName: "Lucas Santos",
        gameName: "Desafio Decimal",
        gameType: "Puzzle",
        bestScore: 35,
        attempts: [
          { date: "25/01/2026 14:32", score: 35, time: "8:10", correct: 7, total: 20 },
          { date: "24/01/2026 10:15", score: 25, time: "9:30", correct: 5, total: 20 },
          { date: "23/01/2026 09:45", score: 20, time: "10:00", correct: 4, total: 20 },
          { date: "22/01/2026 11:20", score: 15, time: "10:00", correct: 3, total: 20 },
          { date: "21/01/2026 14:00", score: 10, time: "10:00", correct: 2, total: 20 },
        ],
      }}
    />
  ),
};

export const SingleAttempt: Story = {
  name: "Uma Tentativa",
  render: () => (
    <StudentGameDetailsModalMock 
      data={{
        studentName: "Ana Costa",
        gameName: "Memória Numérica",
        gameType: "Jogo de Memória",
        bestScore: 60,
        attempts: [
          { date: "25/01/2026 14:32", score: 60, time: "5:00", correct: 12, total: 20 },
        ],
      }}
    />
  ),
};
