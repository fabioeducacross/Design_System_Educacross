import * as React from "react";
import { cn } from "@fabioeducacross/ui";

export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "matching"
  | "fill-in-blank"
  | "essay"
  | "ordering"
  | "matrix"
  | "hotspot"
  | "cloze"
  | "composite"
  | "interactive";

export interface QuestionRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tipo da questão que determina qual template será usado
   */
  type: QuestionType;
  
  /**
   * Identificador único da questão
   */
  questionId: string;
  
  /**
   * Conteúdo/enunciado da questão (pode conter HTML, LaTeX, Markdown)
   */
  content: string;
  
  /**
   * Dados específicos do tipo de questão (alternativas, configurações, etc)
   */
  data: Record<string, any>;
  
  /**
   * Resposta atual do usuário
   */
  answer?: any;
  
  /**
   * Callback quando a resposta é alterada
   */
  onAnswerChange?: (answer: any) => void;
  
  /**
   * Se a questão está em modo de visualização (sem interação)
   */
  readOnly?: boolean;
  
  /**
   * Se deve mostrar o feedback/correção
   */
  showFeedback?: boolean;
  
  /**
   * Status da questão (correto/incorreto/pendente)
   */
  status?: "correct" | "incorrect" | "pending" | "unanswered";
  
  /**
   * Feedback/explicação da resposta
   */
  feedback?: string;
  
  /**
   * Pontuação da questão
   */
  points?: number;
  
  /**
   * Pontuação obtida (se respondida)
   */
  score?: number;
}

/**
 * QuestionRenderer - Renderizador universal de questões
 * 
 * Componente core que renderiza diferentes tipos de questões educacionais.
 * Suporta 11 tipos de templates de questão com renderização de conteúdo rico
 * (HTML, LaTeX, Markdown) e estados visuais (pendente, correto, incorreto).
 * 
 * @example
 * ```tsx
 * <QuestionRenderer
 *   type="multiple-choice"
 *   questionId="q1"
 *   content="Qual é a capital do Brasil?"
 *   data={{
 *     alternatives: [
 *       { id: "a", text: "São Paulo" },
 *       { id: "b", text: "Brasília" },
 *       { id: "c", text: "Rio de Janeiro" }
 *     ]
 *   }}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const QuestionRenderer = React.forwardRef<HTMLDivElement, QuestionRendererProps>(
  (
    {
      className,
      type,
      questionId,
      content,
      data,
      answer,
      onAnswerChange,
      readOnly = false,
      showFeedback = false,
      status = "unanswered",
      feedback,
      points,
      score,
      ...props
    },
    ref
  ) => {
    // Estado de carregamento do template (lazy load)
    const [TemplateComponent, setTemplateComponent] = React.useState<React.ComponentType<any> | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    // Carregar template dinamicamente baseado no tipo
    React.useEffect(() => {
      setIsLoading(true);
      setError(null);

      // Mapeamento de tipos para templates
      const loadTemplate = async () => {
        try {
          switch (type) {
            case "multiple-choice": {
              const { MultipleChoice } = await import("./templates/MultipleChoice");
              setTemplateComponent(() => MultipleChoice);
              break;
            }
            case "true-false": {
              const { TrueFalse } = await import("./templates/TrueFalse");
              setTemplateComponent(() => TrueFalse);
              break;
            }
            case "matching": {
              const { Matching } = await import("./templates/Matching");
              setTemplateComponent(() => Matching);
              break;
            }
            case "fill-in-blank": {
              const { FillInTheBlank } = await import("./templates/FillInTheBlank");
              setTemplateComponent(() => FillInTheBlank);
              break;
            }
            case "essay": {
              const { Essay } = await import("./templates/Essay");
              setTemplateComponent(() => Essay);
              break;
            }
            case "ordering": {
              const { Ordering } = await import("./templates/Ordering");
              setTemplateComponent(() => Ordering);
              break;
            }
            case "matrix": {
              const { Matrix } = await import("./templates/Matrix");
              setTemplateComponent(() => Matrix);
              break;
            }
            case "hotspot": {
              const { Hotspot } = await import("./templates/Hotspot");
              setTemplateComponent(() => Hotspot);
              break;
            }
            case "cloze": {
              const { Cloze } = await import("./templates/Cloze");
              setTemplateComponent(() => Cloze);
              break;
            }
            case "composite": {
              const { Composite } = await import("./templates/Composite");
              setTemplateComponent(() => Composite);
              break;
            }
            case "interactive": {
              const { Interactive } = await import("./templates/Interactive");
              setTemplateComponent(() => Interactive);
              break;
            }
            default:
              throw new Error(`Tipo de questão desconhecido: ${type}`);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Erro ao carregar template");
          console.error("Erro ao carregar template de questão:", err);
        } finally {
          setIsLoading(false);
        }
      };

      loadTemplate();
    }, [type]);

    // Renderizar estado de carregamento
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-border bg-card p-6",
            "animate-pulse",
            className
          )}
          {...props}
        >
          <div className="h-4 w-3/4 bg-muted rounded mb-4" />
          <div className="h-4 w-full bg-muted rounded mb-2" />
          <div className="h-4 w-5/6 bg-muted rounded" />
        </div>
      );
    }

    // Renderizar estado de erro
    if (error || !TemplateComponent) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-destructive bg-destructive/10 p-6",
            className
          )}
          {...props}
        >
          <p className="text-sm font-medium text-destructive">
            Erro ao carregar questão
          </p>
          {error && (
            <p className="text-xs text-destructive/80 mt-1">{error}</p>
          )}
        </div>
      );
    }

    // Renderizar template
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-card p-6",
          "transition-all duration-200",
          {
            "border-green-500 bg-green-50 dark:bg-green-950/20": status === "correct" && showFeedback,
            "border-red-500 bg-red-50 dark:bg-red-950/20": status === "incorrect" && showFeedback,
            "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20": status === "pending" && showFeedback,
          },
          className
        )}
        {...props}
      >
        {/* Header com pontuação */}
        {(points !== undefined || score !== undefined) && (
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
            <span className="text-sm font-medium text-muted-foreground">
              Questão #{questionId}
            </span>
            <div className="flex gap-2">
              {score !== undefined && points !== undefined && (
                <span className="text-sm font-medium">
                  {score} / {points} pts
                </span>
              )}
              {score === undefined && points !== undefined && (
                <span className="text-sm font-medium text-muted-foreground">
                  {points} pts
                </span>
              )}
            </div>
          </div>
        )}

        {/* Template da questão */}
        <TemplateComponent
          content={content}
          data={data}
          answer={answer}
          onAnswerChange={onAnswerChange}
          readOnly={readOnly}
          showFeedback={showFeedback}
          status={status}
        />

        {/* Feedback */}
        {showFeedback && feedback && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-medium mb-2">Feedback:</p>
            <p className="text-sm text-muted-foreground">{feedback}</p>
          </div>
        )}
      </div>
    );
  }
);

QuestionRenderer.displayName = "QuestionRenderer";
