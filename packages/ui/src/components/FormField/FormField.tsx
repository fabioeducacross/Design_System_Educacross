/**
 * FormField — Molécula de campo de formulário
 * 
 * Agrupa Label + Input + Helper/Error para criar campos completos e acessíveis.
 * Segue WCAG 2.1 AA e injeta props de acessibilidade via cloneElement.
 * 
 * @component FormField
 * @category Forms
 * @atomic-level Molécula
 * 
 * @example
 * ```tsx
 * <FormField label="E-mail" required error={errors.email?.message}>
 *   <Input type="email" {...register("email")} />
 * </FormField>
 * ```
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

// ============================================================================
// VARIANTS (CVA)
// ============================================================================

export const formFieldVariants = cva("space-y-2", {
  variants: {
    /**
     * Tamanho do campo (afeta label, helper text e espaçamento)
     */
    size: {
      sm: "space-y-1",
      md: "space-y-2",
      lg: "space-y-2.5",
    },
    /**
     * Layout do campo
     * - vertical: label acima do input (padrão)
     * - horizontal: label ao lado do input (útil para checkboxes inline)
     */
    layout: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row items-start gap-3",
    },
  },
  defaultVariants: {
    size: "md",
    layout: "vertical",
  },
});

export const formFieldLabelVariants = cva(
  [
    "font-medium leading-none",
    "text-foreground",
    "transition-colors duration-200",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      layout: {
        vertical: "block",
        horizontal: "inline-flex pt-2", // Alinha com input
      },
      disabled: {
        true: "cursor-not-allowed opacity-70",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      layout: "vertical",
      disabled: false,
    },
  }
);

export const formFieldMessageVariants = cva("font-medium transition-colors duration-200", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    },
    type: {
      error: "text-destructive",
      helper: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    type: "helper",
  },
});

// ============================================================================
// TYPES
// ============================================================================

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  /**
   * Texto do label (sempre visível, obrigatório para acessibilidade).
   * 
   * ✅ MUST: Label sempre presente (não apenas placeholder)
   * @see WCAG 2.1 - 3.3.2 Labels or Instructions (Level A)
   */
  label: string;

  /**
   * ID do campo. Se omitido, será gerado automaticamente via useId().
   * 
   * @example "email-field"
   */
  id?: string;

  /**
   * Se o campo é obrigatório. Adiciona asterisco (*) no label e aria-required.
   * 
   * ✅ MUST: Use esta prop, não adicione asterisco manualmente no label
   */
  required?: boolean;

  /**
   * Mensagem de erro. Quando presente, sobrescreve helperText.
   * 
   * ✅ MUST: Erro tem prioridade sobre helperText (apenas 1 mensagem por vez)
   */
  error?: string;

  /**
   * Texto de ajuda (dica). Oculto quando há erro.
   * 
   * @example "Mínimo 8 caracteres"
   */
  helperText?: string;

  /**
   * Se o campo está desabilitado (aplica estilos de disabled no label)
   */
  disabled?: boolean;

  /**
   * Campo de entrada (Input, Textarea, Select, etc).
   * 
   * ✅ MUST: Apenas 1 elemento filho
   * ❌ MUST NOT: Checkbox ou Radio (use FormField específico ou grupo)
   */
  children: React.ReactElement;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      id,
      required = false,
      error,
      helperText,
      disabled = false,
      size,
      layout,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Gerar ID automático se não fornecido
    const autoId = React.useId();
    const fieldId = id || `field-${autoId}`;

    // IDs para mensagens de erro e helper
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    // Determinar qual mensagem exibir (erro tem prioridade)
    const showError = Boolean(error);
    const showHelper = Boolean(helperText) && !showError;

    // Construir aria-describedby baseado em qual mensagem está visível
    const ariaDescribedBy = showError
      ? errorId
      : showHelper
      ? helperId
      : undefined;

    // ========================================================================
    // INJEÇÃO DE PROPS NO CHILD VIA CLONELEMENT
    // ========================================================================
    // Injeta props de acessibilidade no input filho
    // ✅ Mantém props originais do child (spread first)
    // ✅ Sobrescreve apenas o necessário (id, aria-*)
    
    const enhancedChild = React.cloneElement(children, {
      id: fieldId,
      disabled: disabled || children.props.disabled,
      "aria-invalid": showError ? true : undefined,
      "aria-required": required ? true : undefined,
      "aria-describedby": ariaDescribedBy,
      // Spread original props do child por último para permitir override se necessário
      ...children.props,
    });

    // Layout horizontal precisa de wrapper para input + mensagens
    const isHorizontal = layout === "horizontal";

    return (
      <div
        ref={ref}
        className={cn(formFieldVariants({ size, layout }), className)}
        {...props}
      >
        {/* ================================================================
            LABEL
            ================================================================ */}
        <label
          htmlFor={fieldId}
          className={formFieldLabelVariants({ size, layout, disabled })}
        >
          {label}
          {required && (
            <span
              className="ml-1 text-destructive"
              aria-label="obrigatório"
            >
              *
            </span>
          )}
        </label>

        {/* ================================================================
            INPUT + MENSAGENS (wrapper para layout horizontal)
            ================================================================ */}
        {isHorizontal ? (
          <div className="flex-1 space-y-1">
            {enhancedChild}
            {/* Mensagens */}
            {showError && (
              <p
                id={errorId}
                role="alert"
                aria-live="polite"
                className={cn(
                  formFieldMessageVariants({ size, type: "error" }),
                  "animate-in fade-in-50 duration-200"
                )}
              >
                {error}
              </p>
            )}
            {showHelper && (
              <p
                id={helperId}
                className={formFieldMessageVariants({ size, type: "helper" })}
              >
                {helperText}
              </p>
            )}
          </div>
        ) : (
          <>
            {enhancedChild}
            {/* Mensagens (layout vertical) */}
            {showError && (
              <p
                id={errorId}
                role="alert"
                aria-live="polite"
                className={cn(
                  formFieldMessageVariants({ size, type: "error" }),
                  "animate-in fade-in-50 duration-200"
                )}
              >
                {error}
              </p>
            )}
            {showHelper && (
              <p
                id={helperId}
                className={formFieldMessageVariants({ size, type: "helper" })}
              >
                {helperText}
              </p>
            )}
          </>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
