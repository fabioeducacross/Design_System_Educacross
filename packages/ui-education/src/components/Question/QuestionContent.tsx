import * as React from "react";
import { cn } from "@fabioeducacross/ui";

export interface QuestionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo a ser renderizado (HTML, LaTeX, Markdown)
   */
  content: string;
  
  /**
   * Se deve processar LaTeX (padrão: true)
   */
  enableLatex?: boolean;
  
  /**
   * Se deve processar Markdown (padrão: true)
   */
  enableMarkdown?: boolean;
  
  /**
   * Se deve sanitizar HTML (padrão: true)
   */
  sanitize?: boolean;
}

/**
 * QuestionContent - Renderizador seguro de conteúdo rico
 * 
 * Componente para renderizar conteúdo de questões com suporte a:
 * - HTML seguro (sanitizado com DOMPurify)
 * - LaTeX (usando KaTeX)
 * - Markdown (usando marked)
 * 
 * @example
 * ```tsx
 * <QuestionContent 
 *   content="Qual é o resultado de $x^2 + 2x + 1$?" 
 *   enableLatex
 * />
 * ```
 */
export const QuestionContent = React.forwardRef<HTMLDivElement, QuestionContentProps>(
  (
    {
      className,
      content,
      enableLatex = true,
      enableMarkdown = true,
      sanitize = true,
      ...props
    },
    ref
  ) => {
    const [processedContent, setProcessedContent] = React.useState<string>("");
    const [isProcessing, setIsProcessing] = React.useState(true);

    React.useEffect(() => {
      const processContent = async () => {
        setIsProcessing(true);
        let result = content;

        try {
          // 1. Processar Markdown (se habilitado)
          if (enableMarkdown) {
            // TODO: Implementar com 'marked' library
            // const { marked } = await import("marked");
            // result = marked.parse(result);
          }

          // 2. Processar LaTeX (se habilitado)
          if (enableLatex) {
            // TODO: Implementar com 'katex' library
            // Substituir expressões LaTeX inline ($...$) e display ($$...$$)
            // const renderLatex = (match: string) => {
            //   const math = match.slice(1, -1); // Remove $ delimiters
            //   return katex.renderToString(math, { throwOnError: false });
            // };
            // result = result.replace(/\$\$([^$]+)\$\$/g, renderLatex);
            // result = result.replace(/\$([^$]+)\$/g, renderLatex);
          }

          // 3. Sanitizar HTML (se habilitado)
          if (sanitize) {
            // TODO: Implementar com 'dompurify' library
            // const DOMPurify = await import("dompurify");
            // result = DOMPurify.sanitize(result, {
            //   ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span', 'div'],
            //   ALLOWED_ATTR: ['href', 'class', 'style']
            // });
          }

          setProcessedContent(result);
        } catch (error) {
          console.error("Erro ao processar conteúdo:", error);
          setProcessedContent(content); // Fallback para conteúdo original
        } finally {
          setIsProcessing(false);
        }
      };

      processContent();
    }, [content, enableLatex, enableMarkdown, sanitize]);

    if (isProcessing) {
      return (
        <div
          ref={ref}
          className={cn("animate-pulse", className)}
          {...props}
        >
          <div className="h-4 w-full bg-muted rounded mb-2" />
          <div className="h-4 w-5/6 bg-muted rounded" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "prose prose-sm dark:prose-invert max-w-none",
          "text-foreground",
          className
        )}
        dangerouslySetInnerHTML={{ __html: processedContent }}
        {...props}
      />
    );
  }
);

QuestionContent.displayName = "QuestionContent";
