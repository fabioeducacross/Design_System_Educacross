import type { Meta, StoryObj } from "@storybook/react";

/**
 * **Certificate** - Certificado de conclusão
 * 
 * Componente para exibição e exportação de certificados de conclusão.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/PDFs/certificate/Certificate.vue`
 * 
 * @example
 * ```vue
 * <Certificate :student="studentData" :course="courseData" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/PDF/Certificate",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Certificado de conclusão de curso/missão para impressão ou PDF.",
      },
    },
  },
  argTypes: {
    studentName: {
      control: "text",
      description: "Nome do aluno",
    },
    courseName: {
      control: "text",
      description: "Nome do curso/missão",
    },
    completionDate: {
      control: "text",
      description: "Data de conclusão",
    },
    teacherName: {
      control: "text",
      description: "Nome do professor responsável",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const CertificateMock = ({ 
  studentName = "Maria Silva",
  courseName = "Matemática Básica - 5º Ano",
  completionDate = "15 de Janeiro de 2026",
  teacherName = "Prof. João Santos",
  schoolName = "Escola Municipal São Paulo",
  hours = 40,
  grade = "Proficiente"
}: { 
  studentName?: string;
  courseName?: string;
  completionDate?: string;
  teacherName?: string;
  schoolName?: string;
  hours?: number;
  grade?: string;
}) => (
  <div className="w-[800px] bg-white border-8 border-double border-primary/30 p-12 mx-auto">
    {/* Header com logo */}
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-4xl text-primary">school</span>
      </div>
      <h1 className="text-3xl font-bold text-primary uppercase tracking-widest">
        Certificado
      </h1>
      <p className="text-muted-foreground mt-2">de Conclusão</p>
    </div>
    
    {/* Conteúdo principal */}
    <div className="text-center space-y-6 py-8">
      <p className="text-lg text-muted-foreground">Certificamos que</p>
      
      <h2 className="text-4xl font-serif font-bold text-foreground border-b-2 border-primary/30 pb-2 inline-block px-8">
        {studentName}
      </h2>
      
      <p className="text-lg text-muted-foreground">
        concluiu com êxito o curso
      </p>
      
      <h3 className="text-2xl font-semibold text-primary">
        {courseName}
      </h3>
      
      <div className="flex justify-center gap-8 text-sm text-muted-foreground">
        <span>Carga horária: <strong>{hours}h</strong></span>
        <span>Desempenho: <strong className="text-legend-proficient">{grade}</strong></span>
      </div>
      
      <p className="text-muted-foreground">
        realizado em <strong>{schoolName}</strong>
      </p>
    </div>
    
    {/* Footer com assinaturas */}
    <div className="flex justify-between items-end mt-12 pt-8">
      <div className="text-center">
        <div className="w-48 border-t border-foreground/30 pt-2">
          <p className="text-sm font-medium">{teacherName}</p>
          <p className="text-xs text-muted-foreground">Professor(a) Responsável</p>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">{completionDate}</p>
      </div>
      
      <div className="text-center">
        <div className="w-48 border-t border-foreground/30 pt-2">
          <p className="text-sm font-medium">Coordenação Pedagógica</p>
          <p className="text-xs text-muted-foreground">Educacross</p>
        </div>
      </div>
    </div>
    
    {/* Código de verificação */}
    <div className="mt-8 text-center">
      <p className="text-xs text-muted-foreground">
        Código de verificação: <code className="bg-muted px-2 py-1 rounded">CERT-2026-001234</code>
      </p>
    </div>
  </div>
);

export const Default: Story = {
  render: () => <CertificateMock />,
};

export const Avancado: Story = {
  name: "Aluno Avançado",
  render: () => (
    <CertificateMock 
      studentName="Pedro Oliveira"
      courseName="Português - Interpretação de Texto"
      grade="Avançado"
      hours={60}
      completionDate="20 de Janeiro de 2026"
    />
  ),
};

export const CursoCurto: Story = {
  name: "Curso Curto",
  render: () => (
    <CertificateMock 
      studentName="Ana Costa"
      courseName="Introdução à Programação"
      hours={20}
      grade="Proficiente"
    />
  ),
};

export const PrintPreview: Story = {
  name: "Visualização de Impressão",
  render: () => (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="shadow-2xl">
        <CertificateMock />
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">print</span>
          Imprimir
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Baixar PDF
        </button>
      </div>
    </div>
  ),
};
