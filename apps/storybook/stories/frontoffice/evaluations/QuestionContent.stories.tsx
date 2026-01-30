import type { Meta, StoryObj } from "@storybook/react";

/**
 * **QuestionContent** - Conteúdo de questão
 * 
 * Renderiza o conteúdo/enunciado de uma questão com suporte a HTML, imagens e fórmulas.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/evaluations/questionDetail/.../QuestionContent.vue`
 * 
 * @example
 * ```vue
 * <QuestionContent :content="questionHtml" :type="'html'" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Evaluations/QuestionContent",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Renderiza o enunciado de questões com suporte a diferentes tipos de conteúdo.",
      },
    },
  },
  argTypes: {
    content: {
      control: "text",
      description: "Conteúdo da questão (texto, HTML, etc.)",
    },
    type: {
      control: "select",
      options: ["text", "html", "image", "mixed"],
      description: "Tipo de conteúdo",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const QuestionContentMock = ({ 
  content,
  type = "text",
  image,
  questionNumber
}: { 
  content: string;
  type?: "text" | "html" | "image" | "mixed";
  image?: string;
  questionNumber?: number;
}) => (
  <div className="p-6 bg-card border border-border rounded-lg">
    {questionNumber && (
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          Questão {questionNumber}
        </span>
      </div>
    )}
    
    {type === "image" || type === "mixed" ? (
      <div className="mb-4">
        {image ? (
          <img 
            src={image} 
            alt="Imagem da questão"
            className="max-w-full h-auto rounded-lg border border-border"
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-muted-foreground">image</span>
          </div>
        )}
      </div>
    ) : null}
    
    <div className="prose prose-sm max-w-none text-foreground">
      {type === "html" ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p className="text-base leading-relaxed">{content}</p>
      )}
    </div>
  </div>
);

export const TextContent: Story = {
  render: () => (
    <QuestionContentMock 
      questionNumber={1}
      content="Qual é o resultado da expressão 2 + 2 × 3?"
      type="text"
    />
  ),
};

export const HtmlContent: Story = {
  render: () => (
    <QuestionContentMock 
      questionNumber={2}
      content={`
        <p>Leia o texto a seguir:</p>
        <blockquote class="border-l-4 border-primary pl-4 italic my-4">
          "A educação é a arma mais poderosa que você pode usar para mudar o mundo."
        </blockquote>
        <p>De acordo com o texto, qual é a principal mensagem que o autor deseja transmitir?</p>
      `}
      type="html"
    />
  ),
};

export const WithImage: Story = {
  render: () => (
    <QuestionContentMock 
      questionNumber={3}
      content="Observe a figura acima e responda: qual forma geométrica está representada?"
      type="mixed"
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Regular_pentagon.svg/200px-Regular_pentagon.svg.png"
    />
  ),
};

export const MathContent: Story = {
  render: () => (
    <QuestionContentMock 
      questionNumber={4}
      content={`
        <p>Resolva a equação do segundo grau:</p>
        <p class="text-center text-lg font-mono my-4">x² - 5x + 6 = 0</p>
        <p>Os valores de x que satisfazem a equação são:</p>
      `}
      type="html"
    />
  ),
};

export const LongContent: Story = {
  render: () => (
    <QuestionContentMock 
      questionNumber={5}
      content={`
        <p><strong>Texto I</strong></p>
        <p class="mb-4">
          O Brasil é um país de dimensões continentais, ocupando quase metade da América do Sul. 
          Sua extensão territorial proporciona uma grande diversidade de climas, vegetações e 
          ecossistemas. Do Norte ao Sul, encontramos desde a floresta amazônica até os pampas gaúchos.
        </p>
        <p><strong>Texto II</strong></p>
        <p class="mb-4">
          A biodiversidade brasileira é considerada uma das maiores do mundo. O país abriga 
          aproximadamente 20% de todas as espécies do planeta, incluindo muitas que são endêmicas, 
          ou seja, só existem no território brasileiro.
        </p>
        <p>Com base nos textos I e II, responda:</p>
        <p>Qual é a relação entre a extensão territorial do Brasil e sua biodiversidade?</p>
      `}
      type="html"
    />
  ),
};

export const PlaceholderImage: Story = {
  name: "Imagem não disponível",
  render: () => (
    <QuestionContentMock 
      questionNumber={6}
      content="A imagem acima representa qual conceito científico?"
      type="mixed"
    />
  ),
};
