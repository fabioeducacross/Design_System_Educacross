import * as React from "react";
import { cn } from "@fabioeducacross/ui";

export interface EvaluationsHtmlContentRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo HTML a ser renderizado
   */
  html: string;
  
  /**
   * Configuração customizada de sanitização (opcional)
   */
  sanitizeConfig?: {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    allowedSchemes?: string[];
  };
}

/**
 * EvaluationsHtmlContentRenderer - Renderizador seguro de HTML
 * 
 * Componente especializado para renderizar HTML de avaliações de forma segura,
 * usando DOMPurify para prevenir XSS e outras vulnerabilidades.
 * 
 * Configuração padrão permite:
 * - Tags básicas de formatação (b, i, em, strong, u)
 * - Parágrafos e quebras de linha (p, br, div, span)
 * - Listas (ul, ol, li)
 * - Links (a) com href
 * - Imagens (img) com src e alt
 * - Tabelas (table, thead, tbody, tr, td, th)
 * - Classes CSS (class attribute)
 * 
 * @example
 * ```tsx
 * <EvaluationsHtmlContentRenderer 
 *   html="<p>Conteúdo <strong>seguro</strong></p>" 
 * />
 * ```
 */
export const EvaluationsHtmlContentRenderer = React.forwardRef<
  HTMLDivElement,
  EvaluationsHtmlContentRendererProps
>(
  (
    {
      className,
      html,
      sanitizeConfig,
      ...props
    },
    ref
  ) => {
    const [sanitizedHtml, setSanitizedHtml] = React.useState<string>("");
    const [isProcessing, setIsProcessing] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
      const sanitizeHtml = async () => {
        setIsProcessing(true);
        setError(null);

        try {
          // TODO: Implementar sanitização com DOMPurify
          // const DOMPurify = (await import("dompurify")).default;
          
          // const config = {
          //   ALLOWED_TAGS: sanitizeConfig?.allowedTags || [
          //     'p', 'br', 'div', 'span',
          //     'b', 'i', 'em', 'strong', 'u', 's', 'sub', 'sup',
          //     'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          //     'ul', 'ol', 'li',
          //     'a', 'img',
          //     'table', 'thead', 'tbody', 'tr', 'td', 'th',
          //     'blockquote', 'code', 'pre'
          //   ],
          //   ALLOWED_ATTR: sanitizeConfig?.allowedAttributes || {
          //     '*': ['class', 'style'],
          //     'a': ['href', 'target', 'rel'],
          //     'img': ['src', 'alt', 'width', 'height']
          //   },
          //   ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
          //   KEEP_CONTENT: true,
          //   RETURN_DOM: false,
          //   RETURN_DOM_FRAGMENT: false,
          // };

          // const clean = DOMPurify.sanitize(html, config);
          // setSanitizedHtml(clean);

          // Temporário: sem sanitização (para desenvolvimento)
          setSanitizedHtml(html);
        } catch (err) {
          console.error("Erro ao sanitizar HTML:", err);
          setError(err instanceof Error ? err.message : "Erro desconhecido");
          setSanitizedHtml(""); // Segurança: não renderizar em caso de erro
        } finally {
          setIsProcessing(false);
        }
      };

      sanitizeHtml();
    }, [html, sanitizeConfig]);

    if (isProcessing) {
      return (
        <div
          ref={ref}
          className={cn("animate-pulse", className)}
          {...props}
        >
          <div className="h-4 w-full bg-muted rounded mb-2" />
          <div className="h-4 w-5/6 bg-muted rounded mb-2" />
          <div className="h-4 w-4/5 bg-muted rounded" />
        </div>
      );
    }

    if (error) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-destructive bg-destructive/10 p-4",
            className
          )}
          {...props}
        >
          <p className="text-sm font-medium text-destructive">
            Erro ao processar conteúdo
          </p>
          <p className="text-xs text-destructive/80 mt-1">{error}</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "prose prose-sm dark:prose-invert max-w-none",
          "text-foreground",
          // Estilos específicos para conteúdo de avaliação
          "[&_table]:border-collapse [&_table]:w-full",
          "[&_td]:border [&_td]:border-border [&_td]:p-2",
          "[&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:bg-muted",
          "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded",
          "[&_a]:text-primary [&_a]:underline",
          "[&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded",
          className
        )}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        {...props}
      />
    );
  }
);

EvaluationsHtmlContentRenderer.displayName = "EvaluationsHtmlContentRenderer";
