import type { Meta, StoryObj } from "@storybook/react";

/**
 * **ModalStudentActivityDetails** - Modal de detalhes de atividade
 * 
 * Modal para visualização detalhada de atividades de um aluno.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/ModalStudentActivityDetails.vue`
 * 
 * @example
 * ```vue
 * <ModalStudentActivityDetails :activity="activityData" @close="handleClose" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Modals/ModalStudentActivityDetails",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Modal com detalhes de uma atividade específica do aluno.",
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

interface Question {
  id: number;
  text: string;
  correct: boolean;
  timeSpent: string;
}

interface Activity {
  studentName: string;
  activityName: string;
  date: string;
  duration: string;
  score: number;
  questions: Question[];
}

// Mock do componente Vue
const ModalStudentActivityDetailsMock = ({ 
  activity,
  open = true
}: { 
  activity: Activity;
  open?: boolean;
}) => {
  if (!open) return null;

  const correctCount = activity.questions.filter(q => q.correct).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{activity.activityName}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {activity.studentName} • {activity.date}
            </p>
          </div>
          <button className="p-2 hover:bg-accent rounded-full">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-4 border-b">
          <div className="p-4 text-center border-r">
            <p className="text-2xl font-bold text-primary">{activity.score}%</p>
            <p className="text-xs text-muted-foreground">Pontuação</p>
          </div>
          <div className="p-4 text-center border-r">
            <p className="text-2xl font-bold text-success">{correctCount}</p>
            <p className="text-xs text-muted-foreground">Acertos</p>
          </div>
          <div className="p-4 text-center border-r">
            <p className="text-2xl font-bold text-destructive">{activity.questions.length - correctCount}</p>
            <p className="text-xs text-muted-foreground">Erros</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{activity.duration}</p>
            <p className="text-xs text-muted-foreground">Duração</p>
          </div>
        </div>
        
        {/* Questions */}
        <div className="p-6 overflow-auto max-h-80">
          <h4 className="font-medium mb-4">Detalhes das Questões</h4>
          <div className="space-y-3">
            {activity.questions.map((question, index) => (
              <div 
                key={question.id}
                className={`
                  flex items-start gap-3 p-3 rounded-lg border-l-4
                  ${question.correct 
                    ? "bg-success/5 border-success" 
                    : "bg-destructive/5 border-destructive"
                  }
                `}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${question.correct 
                    ? "bg-success text-success-foreground" 
                    : "bg-destructive text-destructive-foreground"
                  }
                `}>
                  {question.correct 
                    ? <span className="material-symbols-outlined text-sm">check</span>
                    : <span className="material-symbols-outlined text-sm">close</span>
                  }
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">Questão {index + 1}:</span> {question.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tempo: {question.timeSpent}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 flex justify-between">
          <button className="px-4 py-2 border rounded-md text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Exportar
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const sampleActivity: Activity = {
  studentName: "Maria Silva",
  activityName: "Quiz de Frações - Nível 2",
  date: "25/01/2026 às 14:32",
  duration: "8:45",
  score: 75,
  questions: [
    { id: 1, text: "Quanto é 1/2 + 1/4?", correct: true, timeSpent: "0:45" },
    { id: 2, text: "Qual fração é equivalente a 0,5?", correct: true, timeSpent: "0:30" },
    { id: 3, text: "Simplifique 4/8", correct: true, timeSpent: "0:55" },
    { id: 4, text: "Quanto é 3/4 - 1/2?", correct: false, timeSpent: "1:20" },
    { id: 5, text: "Represente 25% como fração", correct: true, timeSpent: "0:40" },
    { id: 6, text: "Qual é maior: 2/3 ou 3/5?", correct: false, timeSpent: "1:45" },
    { id: 7, text: "Converta 7/10 para decimal", correct: true, timeSpent: "0:35" },
    { id: 8, text: "Quanto é 1/3 x 6?", correct: true, timeSpent: "0:55" },
  ],
};

export const Default: Story = {
  render: () => <ModalStudentActivityDetailsMock activity={sampleActivity} />,
};

export const PerfectScore: Story = {
  name: "Nota Perfeita",
  render: () => (
    <ModalStudentActivityDetailsMock 
      activity={{
        studentName: "Pedro Oliveira",
        activityName: "Desafio Rápido",
        date: "25/01/2026 às 10:15",
        duration: "3:20",
        score: 100,
        questions: [
          { id: 1, text: "Pergunta 1", correct: true, timeSpent: "0:40" },
          { id: 2, text: "Pergunta 2", correct: true, timeSpent: "0:35" },
          { id: 3, text: "Pergunta 3", correct: true, timeSpent: "0:45" },
          { id: 4, text: "Pergunta 4", correct: true, timeSpent: "0:40" },
          { id: 5, text: "Pergunta 5", correct: true, timeSpent: "0:40" },
        ],
      }}
    />
  ),
};

export const LowScore: Story = {
  name: "Pontuação Baixa",
  render: () => (
    <ModalStudentActivityDetailsMock 
      activity={{
        studentName: "Lucas Santos",
        activityName: "Avaliação Diagnóstica",
        date: "24/01/2026 às 09:00",
        duration: "15:30",
        score: 25,
        questions: [
          { id: 1, text: "Pergunta 1", correct: false, timeSpent: "2:00" },
          { id: 2, text: "Pergunta 2", correct: true, timeSpent: "1:45" },
          { id: 3, text: "Pergunta 3", correct: false, timeSpent: "2:30" },
          { id: 4, text: "Pergunta 4", correct: false, timeSpent: "3:00" },
          { id: 5, text: "Pergunta 5", correct: false, timeSpent: "2:15" },
          { id: 6, text: "Pergunta 6", correct: true, timeSpent: "1:30" },
          { id: 7, text: "Pergunta 7", correct: false, timeSpent: "1:45" },
          { id: 8, text: "Pergunta 8", correct: false, timeSpent: "0:45" },
        ],
      }}
    />
  ),
};
