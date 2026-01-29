import * as React from "react";
import { cn } from "@fabioeducacross/ui";
import DOMPurify from "dompurify";
import katex from "katex";
import { marked } from "marked";
import "katex/dist/katex.min.css";

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
            // Configurar marked para permitir HTML inline
            marked.setOptions({
              breaks: true,
              gfm: true,
            });
            result = await marked.parse(result);
          }

          // 2. Processar LaTeX (se habilitado)
          if (enableLatex) {
            // Substituir expressões LaTeX display ($$...$$)
            result = result.replace(/\$\$([^$]+)\$\$/g, (_, math) => {
              try {
                return katex.renderToString(math.trim(), { 
                  throwOnError: false,
                  displayMode: true 
                });
              } catch {
                return `$$${math}$$`;
              }
            });
            
            // Substituir expressões LaTeX inline ($...$)
            result = result.replace(/\$([^$]+)\$/g, (_, math) => {
              try {
                return katex.renderToString(math.trim(), { 
                  throwOnError: false,
                  displayMode: false 
                });
              } catch {
                return `$${math}$`;
              }
            });
          }

          // 3. Sanitizar HTML (sempre no final para garantir segurança)
          if (sanitize) {
            result = DOMPurify.sanitize(result, {
              ALLOWED_TAGS: [
                'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 
                'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'table', 'thead', 'tbody', 'tr', 'th', 'td',
                'img', 'code', 'pre', 'blockquote', 'hr', 'sup', 'sub',
                // Tags do KaTeX
                'math', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msub', 'mfrac',
                'annotation', 'semantics'
              ],
              ALLOWED_ATTR: [
                'href', 'class', 'style', 'src', 'alt', 'title', 'target',
                'rel', 'aria-hidden', 'mathvariant', 'encoding'
              ],
              ALLOW_DATA_ATTR: false,
            });
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
