import type { Meta, StoryObj } from "@storybook/react";

/**
 * **PerformancePDF** - Relatório de desempenho para PDF
 * 
 * Componente otimizado para exportação de relatórios de desempenho em PDF.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/PDFs/event/performance/PerformancePDF.vue`
 * 
 * @example
 * ```vue
 * <PerformancePDF :performance="performanceData" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/PDF/PerformancePDF",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Relatório de desempenho formatado para exportação PDF.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface Student {
  name: string;
  proficiency: number;
  status: string;
  correct: number;
  total: number;
}

const variantColors: Record<string, { bg: string; text: string }> = {
  advanced: { bg: "bg-legend-advanced/10", text: "text-legend-advanced" },
  proficient: { bg: "bg-legend-proficient/10", text: "text-legend-proficient" },
  basic: { bg: "bg-legend-basic/10", text: "text-legend-basic" },
  "below-basic": { bg: "bg-legend-below-basic/10", text: "text-legend-below-basic" },
};

const getVariant = (value: number) => {
  if (value >= 70) return "advanced";
  if (value >= 50) return "proficient";
  if (value >= 25) return "basic";
  return "below-basic";
};

// Mock do componente Vue
const PerformancePDFMock = ({ 
  title = "Relatório de Desempenho",
  className = "5º Ano A",
  subject = "Matemática",
  period = "1º Bimestre 2026",
  students,
  summary
}: { 
  title?: string;
  className?: string;
  subject?: string;
  period?: string;
  students: Student[];
  summary: { advanced: number; proficient: number; basic: number; belowBasic: number };
}) => (
  <div className="w-[800px] bg-white p-8 mx-auto font-sans text-sm">
    {/* Cabeçalho */}
    <div className="flex items-center justify-between border-b pb-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl text-primary">assessment</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{className} • {subject}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{period}</p>
        <p className="text-xs text-muted-foreground">Gerado em: {new Date().toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
    
    {/* Resumo */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: "Avançado", value: summary.advanced, color: "legend-advanced" },
        { label: "Proficiente", value: summary.proficient, color: "legend-proficient" },
        { label: "Básico", value: summary.basic, color: "legend-basic" },
        { label: "Abaixo do Básico", value: summary.belowBasic, color: "legend-below-basic" },
      ].map((item) => (
        <div key={item.label} className={`p-3 rounded-lg bg-${item.color}/10 text-center`}>
          <p className={`text-2xl font-bold text-${item.color}`}>{item.value}</p>
          <p className="text-xs text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
    
    {/* Tabela de alunos */}
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-muted">
          <th className="text-left p-2 border">#</th>
          <th className="text-left p-2 border">Aluno</th>
          <th className="text-center p-2 border">Acertos</th>
          <th className="text-center p-2 border">Aproveitamento</th>
          <th className="text-center p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => {
          const variant = getVariant(student.proficiency);
          const colors = variantColors[variant];
          return (
            <tr key={index} className="hover:bg-accent/30">
              <td className="p-2 border text-muted-foreground">{index + 1}</td>
              <td className="p-2 border font-medium">{student.name}</td>
              <td className="p-2 border text-center">{student.correct}/{student.total}</td>
              <td className="p-2 border text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                  {student.proficiency}%
                </span>
              </td>
              <td className="p-2 border text-center">{student.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    
    {/* Rodapé */}
    <div className="mt-6 pt-4 border-t text-xs text-muted-foreground flex justify-between">
      <span>Total de alunos: {students.length}</span>
      <span>Educacross © 2026</span>
    </div>
  </div>
);

const sampleStudents: Student[] = [
  { name: "Ana Silva", proficiency: 85, status: "Avançado", correct: 17, total: 20 },
  { name: "Bruno Santos", proficiency: 70, status: "Proficiente", correct: 14, total: 20 },
  { name: "Carla Oliveira", proficiency: 65, status: "Proficiente", correct: 13, total: 20 },
  { name: "Daniel Costa", proficiency: 55, status: "Proficiente", correct: 11, total: 20 },
  { name: "Elena Ferreira", proficiency: 45, status: "Básico", correct: 9, total: 20 },
  { name: "Felipe Lima", proficiency: 40, status: "Básico", correct: 8, total: 20 },
  { name: "Gabriela Souza", proficiency: 30, status: "Básico", correct: 6, total: 20 },
  { name: "Henrique Alves", proficiency: 20, status: "Abaixo do Básico", correct: 4, total: 20 },
];

const sampleSummary = {
  advanced: 1,
  proficient: 3,
  basic: 3,
  belowBasic: 1,
};

export const Default: Story = {
  render: () => <PerformancePDFMock students={sampleStudents} summary={sampleSummary} />,
};

export const TurmaMaior: Story = {
  name: "Turma com mais alunos",
  render: () => (
    <PerformancePDFMock 
      students={[
        ...sampleStudents,
        { name: "Igor Mendes", proficiency: 75, status: "Avançado", correct: 15, total: 20 },
        { name: "Julia Ramos", proficiency: 90, status: "Avançado", correct: 18, total: 20 },
        { name: "Lucas Martins", proficiency: 35, status: "Básico", correct: 7, total: 20 },
        { name: "Mariana Pereira", proficiency: 60, status: "Proficiente", correct: 12, total: 20 },
      ]} 
      summary={{ advanced: 3, proficient: 4, basic: 4, belowBasic: 1 }}
    />
  ),
};

export const Portugues: Story = {
  name: "Relatório de Português",
  render: () => (
    <PerformancePDFMock 
      subject="Português"
      students={sampleStudents} 
      summary={sampleSummary}
    />
  ),
};
