import type { Meta, StoryObj } from "@storybook/react";

/**
 * **StudentEvidenceReportPDF** - Relatório de evidências do aluno
 * 
 * Relatório detalhado de evidências de aprendizagem por aluno.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/student-evidence-report/StudentEvidenceReportPDF.vue`
 * 
 * @example
 * ```vue
 * <StudentEvidenceReportPDF :student="studentData" :report="reportData" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/PDF/StudentEvidenceReportPDF",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Relatório individual de evidências de aprendizagem para exportação PDF.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface Evidence {
  descriptor: string;
  description: string;
  attempts: number;
  correct: number;
  proficiency: number;
}

// Mock do componente Vue
const StudentEvidenceReportPDFMock = ({ 
  studentName = "Maria Silva",
  className = "5º Ano A",
  subject = "Matemática",
  period = "1º Bimestre 2026",
  overallProficiency = 68,
  evidences
}: { 
  studentName?: string;
  className?: string;
  subject?: string;
  period?: string;
  overallProficiency?: number;
  evidences: Evidence[];
}) => {
  const getVariantClass = (value: number) => {
    if (value >= 70) return "bg-legend-advanced text-white";
    if (value >= 50) return "bg-legend-proficient text-white";
    if (value >= 25) return "bg-legend-basic text-white";
    return "bg-legend-below-basic text-white";
  };

  return (
    <div className="w-[800px] bg-white p-8 mx-auto font-sans text-sm">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between border-b pb-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Relatório de Evidências</h1>
          <p className="text-muted-foreground">{subject} • {period}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Gerado em</p>
          <p className="font-medium">{new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
      
      {/* Informações do aluno */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-primary">person</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">{studentName}</h2>
            <p className="text-muted-foreground">{className}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Proficiência Geral</p>
          <span className={`text-2xl font-bold px-4 py-2 rounded-lg ${getVariantClass(overallProficiency)}`}>
            {overallProficiency}%
          </span>
        </div>
      </div>
      
      {/* Tabela de evidências por descritor */}
      <h3 className="font-semibold mb-3">Desempenho por Descritor</h3>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-muted">
            <th className="text-left p-2 border w-24">Descritor</th>
            <th className="text-left p-2 border">Habilidade</th>
            <th className="text-center p-2 border w-20">Tentativas</th>
            <th className="text-center p-2 border w-20">Acertos</th>
            <th className="text-center p-2 border w-28">Proficiência</th>
          </tr>
        </thead>
        <tbody>
          {evidences.map((evidence, index) => (
            <tr key={index}>
              <td className="p-2 border font-mono text-xs">{evidence.descriptor}</td>
              <td className="p-2 border text-xs">{evidence.description}</td>
              <td className="p-2 border text-center">{evidence.attempts}</td>
              <td className="p-2 border text-center">{evidence.correct}</td>
              <td className="p-2 border text-center">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getVariantClass(evidence.proficiency)}`}>
                  {evidence.proficiency}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Legenda */}
      <div className="flex justify-center gap-6 py-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-legend-advanced" />
          <span className="text-xs">Avançado (≥70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-legend-proficient" />
          <span className="text-xs">Proficiente (≥50%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-legend-basic" />
          <span className="text-xs">Básico (≥25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-legend-below-basic" />
          <span className="text-xs">Abaixo do Básico (&lt;25%)</span>
        </div>
      </div>
      
      {/* Rodapé */}
      <div className="mt-4 pt-4 border-t text-xs text-muted-foreground text-center">
        <p>Educacross © 2026 • Este relatório é confidencial</p>
      </div>
    </div>
  );
};

const sampleEvidences: Evidence[] = [
  { descriptor: "D01", description: "Identificar a localização de números naturais na reta numérica", attempts: 5, correct: 4, proficiency: 80 },
  { descriptor: "D15", description: "Reconhecer diferentes formas de representação de um número racional", attempts: 8, correct: 5, proficiency: 62 },
  { descriptor: "D23", description: "Resolver problema utilizando o cálculo de porcentagem", attempts: 6, correct: 4, proficiency: 67 },
  { descriptor: "D08", description: "Resolver problema utilizando relações entre operações", attempts: 10, correct: 4, proficiency: 40 },
  { descriptor: "D12", description: "Resolver problema envolvendo perímetro de figuras planas", attempts: 4, correct: 3, proficiency: 75 },
  { descriptor: "D05", description: "Reconhecer a conservação ou modificação de medidas de lados e perímetro", attempts: 3, correct: 0, proficiency: 0 },
];

export const Default: Story = {
  render: () => <StudentEvidenceReportPDFMock evidences={sampleEvidences} />,
};

export const AlunoAvancado: Story = {
  name: "Aluno Avançado",
  render: () => (
    <StudentEvidenceReportPDFMock 
      studentName="Pedro Oliveira"
      overallProficiency={85}
      evidences={[
        { descriptor: "D01", description: "Identificar a localização de números naturais na reta numérica", attempts: 5, correct: 5, proficiency: 100 },
        { descriptor: "D15", description: "Reconhecer diferentes formas de representação de um número racional", attempts: 8, correct: 7, proficiency: 87 },
        { descriptor: "D23", description: "Resolver problema utilizando o cálculo de porcentagem", attempts: 6, correct: 5, proficiency: 83 },
        { descriptor: "D08", description: "Resolver problema utilizando relações entre operações", attempts: 10, correct: 7, proficiency: 70 },
      ]}
    />
  ),
};

export const AlunoComDificuldade: Story = {
  name: "Aluno com Dificuldade",
  render: () => (
    <StudentEvidenceReportPDFMock 
      studentName="Lucas Santos"
      overallProficiency={32}
      evidences={[
        { descriptor: "D01", description: "Identificar a localização de números naturais na reta numérica", attempts: 5, correct: 2, proficiency: 40 },
        { descriptor: "D15", description: "Reconhecer diferentes formas de representação de um número racional", attempts: 8, correct: 2, proficiency: 25 },
        { descriptor: "D23", description: "Resolver problema utilizando o cálculo de porcentagem", attempts: 6, correct: 2, proficiency: 33 },
        { descriptor: "D08", description: "Resolver problema utilizando relações entre operações", attempts: 10, correct: 2, proficiency: 20 },
      ]}
    />
  ),
};
