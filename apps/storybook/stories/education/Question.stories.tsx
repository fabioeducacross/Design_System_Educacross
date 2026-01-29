import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// @ts-expect-error - Temporário até .d.ts ser gerado
import {
  QuestionRenderer,
  MultipleChoice,
  TrueFalse,
  Essay,
  FillInTheBlank,
  Matching,
  Ordering,
  Matrix,
  Hotspot,
  Cloze,
  Composite,
  Interactive,
} from "@fabioeducacross/ui-education";

const meta: Meta<typeof QuestionRenderer> = {
  title: "Education/Question",
  component: QuestionRenderer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Sistema completo de questões educacionais com 11 templates diferentes.

## Tipos de Questões

- **MultipleChoice**: Múltipla escolha (radio/checkbox)
- **TrueFalse**: Verdadeiro ou Falso
- **Essay**: Resposta dissertativa
- **FillInTheBlank**: Preencher lacunas
- **Matching**: Associação de itens
- **Ordering**: Ordenação de itens
- **Matrix**: Tabela interativa
- **Hotspot**: Áreas clicáveis em imagem
- **Cloze**: Texto lacunado
- **Composite**: Questão multi-parte
- **Interactive**: Interação customizada

## Features

- ✅ 11 templates prontos
- ✅ Feedback visual (correto/incorreto)
- ✅ Modo somente leitura
- ✅ Acessibilidade (ARIA, keyboard)
- ✅ Dark mode
- ✅ TypeScript completo
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuestionRenderer>;

// ========================================
// MULTIPLE CHOICE STORIES
// ========================================

export const MultipleChoiceSingleSelection: Story = {
  name: "Multiple Choice - Seleção Única",
  render: () => {
    const [answer, setAnswer] = React.useState<string[]>([]);
    
    return (
      <MultipleChoice
        content="Qual é a capital do Brasil?"
        data={{
          alternatives: [
            { id: "1", text: "Rio de Janeiro", isCorrect: false },
            { id: "2", text: "Brasília", isCorrect: true },
            { id: "3", text: "São Paulo", isCorrect: false },
            { id: "4", text: "Belo Horizonte", isCorrect: false },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const MultipleChoiceMultipleSelection: Story = {
  name: "Multiple Choice - Seleção Múltipla",
  render: () => {
    const [answer, setAnswer] = React.useState<string[]>([]);
    
    return (
      <MultipleChoice
        content="Selecione os países da América do Sul:"
        data={{
          alternatives: [
            { id: "1", text: "Brasil", isCorrect: true },
            { id: "2", text: "Argentina", isCorrect: true },
            { id: "3", text: "México", isCorrect: false },
            { id: "4", text: "Chile", isCorrect: true },
          ],
          multipleSelection: true,
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const MultipleChoiceWithFeedback: Story = {
  name: "Multiple Choice - Com Feedback",
  render: () => {
    const [answer, setAnswer] = React.useState<string[]>(["2"]);
    
    return (
      <MultipleChoice
        content="Qual é a capital do Brasil?"
        data={{
          alternatives: [
            { id: "1", text: "Rio de Janeiro", isCorrect: false },
            { id: "2", text: "Brasília", isCorrect: true },
            { id: "3", text: "São Paulo", isCorrect: false },
            { id: "4", text: "Belo Horizonte", isCorrect: false },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
        showFeedback={true}
      />
    );
  },
};

export const MultipleChoiceGrid: Story = {
  name: "Multiple Choice - Layout em Grid",
  render: () => {
    const [answer, setAnswer] = React.useState<string[]>([]);
    
    return (
      <MultipleChoice
        content="Qual alternativa representa um número par?"
        data={{
          alternatives: [
            { id: "1", text: "1", isCorrect: false },
            { id: "2", text: "2", isCorrect: true },
            { id: "3", text: "3", isCorrect: false },
            { id: "4", text: "4", isCorrect: true },
            { id: "5", text: "5", isCorrect: false },
            { id: "6", text: "6", isCorrect: true },
          ],
          columnsCount: 3,
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

// ========================================
// TRUE FALSE STORIES
// ========================================

export const TrueFalseBasic: Story = {
  name: "True/False - Básico",
  render: () => {
    const [answer, setAnswer] = React.useState<boolean | undefined>(undefined);
    
    return (
      <TrueFalse
        content="O Brasil é o maior país da América do Sul."
        data={{
          correctAnswer: true,
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const TrueFalseWithFeedback: Story = {
  name: "True/False - Com Feedback",
  render: () => {
    const [answer, setAnswer] = React.useState<boolean | undefined>(true);
    
    return (
      <TrueFalse
        content="A Terra é plana."
        data={{
          correctAnswer: false,
          trueLabel: "Verdadeiro",
          falseLabel: "Falso",
        }}
        answer={answer}
        onAnswerChange={setAnswer}
        showFeedback={true}
      />
    );
  },
};

// ========================================
// ESSAY STORIES
// ========================================

export const EssayBasic: Story = {
  name: "Essay - Básico",
  render: () => {
    const [answer, setAnswer] = React.useState<string>("");
    
    return (
      <Essay
        content="Explique o processo de fotossíntese."
        data={{
          minLength: 50,
          maxLength: 500,
          placeholder: "Digite sua resposta aqui...",
          rows: 8,
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const EssayWithValidation: Story = {
  name: "Essay - Com Validação",
  render: () => {
    const [answer, setAnswer] = React.useState<string>("Resposta curta");
    
    return (
      <Essay
        content="Escreva uma redação sobre a importância da educação (mínimo 100 caracteres e 20 palavras)."
        data={{
          minLength: 100,
          maxLength: 1000,
          minWords: 20,
          placeholder: "Digite sua redação aqui...",
          rows: 10,
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

// ========================================
// FILL IN THE BLANK STORIES
// ========================================

export const FillInTheBlankBasic: Story = {
  name: "Fill in the Blank - Básico",
  render: () => {
    const [answer, setAnswer] = React.useState<Record<string, string>>({});
    
    return (
      <FillInTheBlank
        content="A capital do Brasil é {{0}} e foi fundada em {{1}}."
        data={{
          fields: [
            {
              id: "0",
              correctAnswers: ["Brasília", "Brasilia"],
              placeholder: "cidade",
              size: 15,
            },
            {
              id: "1",
              correctAnswers: ["1960"],
              placeholder: "ano",
              size: 6,
            },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const FillInTheBlankWithFeedback: Story = {
  name: "Fill in the Blank - Com Feedback",
  render: () => {
    const [answer, setAnswer] = React.useState<Record<string, string>>({
      "0": "Brasília",
      "1": "1960",
    });
    
    return (
      <FillInTheBlank
        content="A capital do Brasil é {{0}} e foi fundada em {{1}}."
        data={{
          fields: [
            {
              id: "0",
              correctAnswers: ["Brasília", "Brasilia"],
              placeholder: "cidade",
              size: 15,
            },
            {
              id: "1",
              correctAnswers: ["1960"],
              placeholder: "ano",
              size: 6,
            },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
        showFeedback={true}
      />
    );
  },
};

// ========================================
// MATCHING STORIES
// ========================================

export const MatchingBasic: Story = {
  name: "Matching - Básico",
  render: () => {
    const [answer, setAnswer] = React.useState<Record<string, string>>({});
    
    return (
      <Matching
        content="Associe os países com suas capitais:"
        data={{
          pairs: [
            { id: "1", left: "Brasil", correctRightId: "a" },
            { id: "2", left: "Argentina", correctRightId: "b" },
            { id: "3", left: "Chile", correctRightId: "c" },
          ],
          rightItems: [
            { id: "a", content: "Brasília" },
            { id: "b", content: "Buenos Aires" },
            { id: "c", content: "Santiago" },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const MatchingWithFeedback: Story = {
  name: "Matching - Com Feedback",
  render: () => {
    const [answer, setAnswer] = React.useState<Record<string, string>>({
      "1": "a",
      "2": "b",
      "3": "c",
    });
    
    return (
      <Matching
        content="Associe os países com suas capitais:"
        data={{
          pairs: [
            { id: "1", left: "Brasil", correctRightId: "a" },
            { id: "2", left: "Argentina", correctRightId: "b" },
            { id: "3", left: "Chile", correctRightId: "c" },
          ],
          rightItems: [
            { id: "a", content: "Brasília" },
            { id: "b", content: "Buenos Aires" },
            { id: "c", content: "Santiago" },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
        showFeedback={true}
      />
    );
  },
};

// ========================================
// ORDERING STORIES
// ========================================

export const OrderingBasic: Story = {
  name: "Ordering - Básico",
  render: () => {
    const [answer, setAnswer] = React.useState<string[] | undefined>(undefined);
    
    return (
      <Ordering
        content="Ordene os eventos na ordem cronológica:"
        data={{
          items: [
            { id: "1", content: "Descobrimento do Brasil (1500)", correctPosition: 0 },
            { id: "2", content: "Independência do Brasil (1822)", correctPosition: 1 },
            { id: "3", content: "Proclamação da República (1889)", correctPosition: 2 },
            { id: "4", content: "Constituição de 1988", correctPosition: 3 },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const OrderingWithFeedback: Story = {
  name: "Ordering - Com Feedback",
  render: () => {
    const [answer, setAnswer] = React.useState<string[]>(["1", "2", "3", "4"]);
    
    return (
      <Ordering
        content="Ordene os eventos na ordem cronológica:"
        data={{
          items: [
            { id: "1", content: "Descobrimento do Brasil (1500)", correctPosition: 0 },
            { id: "2", content: "Independência do Brasil (1822)", correctPosition: 1 },
            { id: "3", content: "Proclamação da República (1889)", correctPosition: 2 },
            { id: "4", content: "Constituição de 1988", correctPosition: 3 },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
        showFeedback={true}
      />
    );
  },
};

// ========================================
// MATRIX STORIES
// ========================================

export const MatrixBasic: Story = {
  name: "Matrix - Básico",
  render: () => {
    const [answer, setAnswer] = React.useState<string[]>([]);
    
    return (
      <Matrix
        content="Marque os países que fazem parte de cada continente:"
        data={{
          rows: [
            { id: "r1", label: "Brasil" },
            { id: "r2", label: "França" },
            { id: "r3", label: "Japão" },
          ],
          columns: [
            { id: "c1", label: "América" },
            { id: "c2", label: "Europa" },
            { id: "c3", label: "Ásia" },
          ],
          correctCells: [
            { rowId: "r1", columnId: "c1", isCorrect: true },
            { rowId: "r2", columnId: "c2", isCorrect: true },
            { rowId: "r3", columnId: "c3", isCorrect: true },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

// ========================================
// CLOZE STORIES
// ========================================

export const ClozeBasic: Story = {
  name: "Cloze - Texto Lacunado",
  render: () => {
    const [answer, setAnswer] = React.useState<Record<string, string>>({});
    
    return (
      <Cloze
        content="Complete o texto com as palavras corretas:"
        data={{
          text: "O {{0}} é o maior país da América do {{1}}, com capital em {{2}}.",
          gaps: [
            { id: "0", correctAnswers: ["Brasil"], placeholder: "país" },
            { id: "1", correctAnswers: ["Sul"], placeholder: "continente" },
            { id: "2", correctAnswers: ["Brasília", "Brasilia"], placeholder: "cidade" },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

// ============================================================
// Hotspot Stories
// ============================================================

export const HotspotBasic: Story = {
  name: "Hotspot - Básico",
  render: () => {
    const [answer, setAnswer] = React.useState<any>({ areas: [] });
    
    return (
      <Hotspot
        content="Clique nas áreas verdes da imagem:"
        data={{
          imageUrl: "https://via.placeholder.com/600x400/cccccc/666666?text=Mapa+do+Brasil",
          areas: [
            { id: "1", shape: "rect", coords: [50, 50, 150, 150], correct: true },
            { id: "2", shape: "rect", coords: [200, 50, 300, 150], correct: false },
            { id: "3", shape: "rect", coords: [350, 50, 450, 150], correct: true },
            { id: "4", shape: "circle", coords: [300, 300, 50], correct: false },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const HotspotWithFeedback: Story = {
  name: "Hotspot - Com Feedback",
  render: () => {
    const [answer, setAnswer] = React.useState<any>({ 
      areas: ["1", "3"],
      validated: true 
    });
    
    return (
      <Hotspot
        content="Identifique as regiões corretas no mapa:"
        data={{
          imageUrl: "https://via.placeholder.com/600x400/e8f5e9/4caf50?text=Mapa+com+Areas",
          areas: [
            { 
              id: "1", 
              shape: "rect", 
              coords: [50, 50, 150, 150], 
              correct: true,
              label: "Área 1 - Correta"
            },
            { 
              id: "2", 
              shape: "rect", 
              coords: [200, 50, 300, 150], 
              correct: false,
              label: "Área 2 - Incorreta"
            },
            { 
              id: "3", 
              shape: "circle", 
              coords: [450, 100, 50], 
              correct: true,
              label: "Área 3 - Correta"
            },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
        readonly
        showFeedback
      />
    );
  },
};

// ============================================================
// Composite Stories
// ============================================================

export const CompositeBasic: Story = {
  name: "Composite - Multi-parte",
  render: () => {
    const [answer, setAnswer] = React.useState<any>({ parts: {} });
    
    return (
      <Composite
        content="Esta questão possui múltiplas partes. Responda todas:"
        data={{
          parts: [
            {
              id: "part1",
              type: "multipleChoice",
              question: "Parte 1: Qual é a capital do Brasil?",
              alternatives: [
                { id: "1", text: "São Paulo", correct: false },
                { id: "2", text: "Brasília", correct: true },
                { id: "3", text: "Rio de Janeiro", correct: false },
              ],
            },
            {
              id: "part2",
              type: "trueFalse",
              question: "Parte 2: O Brasil é o maior país da América do Sul?",
              correct: true,
            },
            {
              id: "part3",
              type: "fillInTheBlank",
              question: "Parte 3: Complete: A moeda brasileira é o ____.",
              correctAnswers: ["Real", "real", "R$"],
            },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
        showProgress
      />
    );
  },
};

export const CompositeWithProgress: Story = {
  name: "Composite - Com Progresso",
  render: () => {
    const [answer, setAnswer] = React.useState<any>({ 
      parts: {
        part1: { selected: "2" },
        part2: { value: true },
      }
    });
    
    return (
      <Composite
        content="Questão multi-parte - 2 de 3 respondidas:"
        data={{
          parts: [
            {
              id: "part1",
              type: "multipleChoice",
              question: "1. Escolha a alternativa correta:",
              alternatives: [
                { id: "1", text: "Opção A", correct: false },
                { id: "2", text: "Opção B", correct: true },
              ],
            },
            {
              id: "part2",
              type: "trueFalse",
              question: "2. Verdadeiro ou Falso:",
              correct: true,
            },
            {
              id: "part3",
              type: "essay",
              question: "3. Justifique sua resposta:",
              minLength: 50,
            },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
        showProgress
      />
    );
  },
};

// ============================================================
// Interactive Stories
// ============================================================

export const InteractiveBasic: Story = {
  name: "Interactive - Canvas Básico",
  render: () => {
    const [answer, setAnswer] = React.useState<any>({ drawing: [] });
    
    return (
      <Interactive
        content="Use o canvas para desenhar sua resposta:"
        data={{
          type: "canvas",
          width: 600,
          height: 400,
          tools: ["pencil", "eraser", "clear"],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

export const InteractiveDragDrop: Story = {
  name: "Interactive - Drag & Drop",
  render: () => {
    const [answer, setAnswer] = React.useState<any>({ positions: {} });
    
    return (
      <Interactive
        content="Arraste os elementos para as posições corretas:"
        data={{
          type: "dragDrop",
          elements: [
            { id: "elem1", label: "Elemento 1", correctZone: "zone1" },
            { id: "elem2", label: "Elemento 2", correctZone: "zone2" },
            { id: "elem3", label: "Elemento 3", correctZone: "zone1" },
          ],
          zones: [
            { id: "zone1", label: "Zona A", capacity: 2 },
            { id: "zone2", label: "Zona B", capacity: 1 },
          ],
        }}
        answer={answer}
        onAnswerChange={setAnswer}
      />
    );
  },
};

// ============================================================
// Estados Especiais - Error, Loading, Readonly, Empty
// ============================================================

export const ErrorState: Story = {
  name: "Estado - Erro de Validação",
  render: () => {
    const [answer, setAnswer] = React.useState<any>({ selected: [] });
    
    return (
      <div className="space-y-4">
        <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
          <p className="text-sm font-medium text-destructive">
            ⚠️ Erro: Você deve selecionar pelo menos uma alternativa.
          </p>
        </div>
        
        <MultipleChoice
          content="Selecione pelo menos uma opção:"
          data={{
            alternatives: [
              { id: "1", text: "Opção A", correct: true },
              { id: "2", text: "Opção B", correct: false },
              { id: "3", text: "Opção C", correct: true },
            ],
            selectionType: "checkbox",
          }}
          answer={answer}
          onAnswerChange={setAnswer}
          className="border-destructive"
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  name: "Estado - Carregando",
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-4 border rounded-md">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          <p className="text-sm text-muted-foreground">Carregando questão...</p>
        </div>
        
        <div className="space-y-3 opacity-50 pointer-events-none">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-10 bg-muted rounded animate-pulse" />
          <div className="h-10 bg-muted rounded animate-pulse" />
          <div className="h-10 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  },
};

export const ReadonlyMode: Story = {
  name: "Estado - Somente Leitura",
  render: () => {
    return (
      <MultipleChoice
        content="Esta questão está em modo somente leitura:"
        data={{
          alternatives: [
            { id: "1", text: "Alternativa A", correct: false },
            { id: "2", text: "Alternativa B (Selecionada)", correct: true },
            { id: "3", text: "Alternativa C", correct: false },
          ],
          selectionType: "radio",
        }}
        answer={{ selected: "2", validated: true }}
        onAnswerChange={() => {}}
        readonly
        showFeedback
      />
    );
  },
};

export const EmptyState: Story = {
  name: "Estado - Vazio",
  render: () => {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
        <svg
          className="w-12 h-12 text-muted-foreground mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="text-lg font-semibold mb-2">Nenhuma questão carregada</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Selecione uma questão da lista ou crie uma nova para começar.
        </p>
      </div>
    );
  },
};

// ============================================================
// Estados de Feedback
// ============================================================

export const FeedbackCorrect: Story = {
  name: "Feedback - Resposta Correta",
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-success/10 border border-success rounded-md">
          <svg className="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium text-success">Resposta correta!</p>
            <p className="text-sm text-success/80 mt-1">
              Parabéns! Você acertou a questão.
            </p>
          </div>
        </div>
        
        <MultipleChoice
          content="Qual é a capital da França?"
          data={{
            alternatives: [
              { id: "1", text: "Londres", correct: false },
              { id: "2", text: "Paris", correct: true },
              { id: "3", text: "Berlim", correct: false },
            ],
            selectionType: "radio",
          }}
          answer={{ selected: "2", validated: true }}
          onAnswerChange={() => {}}
          readonly
          showFeedback
        />
      </div>
    );
  },
};

export const FeedbackIncorrect: Story = {
  name: "Feedback - Resposta Incorreta",
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive rounded-md">
          <svg className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium text-destructive">Resposta incorreta</p>
            <p className="text-sm text-destructive/80 mt-1">
              Revise o conteúdo e tente novamente.
            </p>
          </div>
        </div>
        
        <MultipleChoice
          content="Qual é a capital da França?"
          data={{
            alternatives: [
              { id: "1", text: "Londres", correct: false },
              { id: "2", text: "Paris", correct: true },
              { id: "3", text: "Berlim", correct: false },
            ],
            selectionType: "radio",
          }}
          answer={{ selected: "1", validated: true }}
          onAnswerChange={() => {}}
          readonly
          showFeedback
        />
      </div>
    );
  },
};

export const FeedbackPartial: Story = {
  name: "Feedback - Resposta Parcial",
  render: () => {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning rounded-md">
          <svg className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium text-warning">Resposta parcialmente correta</p>
            <p className="text-sm text-warning/80 mt-1">
              Você acertou 2 de 3 alternativas. Revise sua resposta.
            </p>
          </div>
        </div>
        
        <MultipleChoice
          content="Selecione os países europeus:"
          data={{
            alternatives: [
              { id: "1", text: "França", correct: true },
              { id: "2", text: "Brasil", correct: false },
              { id: "3", text: "Alemanha", correct: true },
              { id: "4", text: "Japão", correct: false },
            ],
            selectionType: "checkbox",
          }}
          answer={{ selected: ["1", "2"], validated: true }}
          onAnswerChange={() => {}}
          readonly
          showFeedback
        />
      </div>
    );
  },
};
