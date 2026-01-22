/**
 * Tipos compartilhados entre múltiplos componentes do Design System Educacross
 * @module types/common
 */

import * as React from "react";

/**
 * Tamanhos padrão dos componentes
 */
export type Size = "sm" | "md" | "lg";

/**
 * Variantes visuais baseadas em tokens semânticos
 */
export type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost";

/**
 * Alinhamentos de conteúdo
 */
export type Alignment = "start" | "center" | "end";

/**
 * Estados de carregamento
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Props base para todos os componentes
 */
export interface BaseComponentProps {
  /** Classes CSS adicionais (merged via cn()) */
  className?: string;
  /** ID único do elemento */
  id?: string;
  /** Atributos data-* customizados */
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * Estado de erro estruturado
 */
export interface ErrorState {
  /** Mensagem de erro para o usuário */
  message: string;
  /** Código de erro (opcional) */
  code?: string;
  /** Detalhes técnicos (para debug) */
  details?: unknown;
}

/**
 * Função de callback genérica
 */
export type CallbackFn<T = void> = () => T;

/**
 * Função de callback com evento
 */
export type EventCallbackFn<E = React.SyntheticEvent> = (event: E) => void;

/**
 * Função de callback com valor
 */
export type ValueCallbackFn<T> = (value: T) => void;

/**
 * Valor ou função que retorna valor (para lazy evaluation)
 */
export type ValueOrFunction<T> = T | (() => T);

/**
 * Props polimórficas para componentes que podem renderizar como diferentes elementos
 */
export type PolymorphicProps<E extends React.ElementType, P = object> = P &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P> & {
    /** Elemento HTML ou componente React para renderizar */
    as?: E;
  };

/**
 * Ref polimórfica para componentes flexíveis
 */
export type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

/**
 * Props de composição para slots nomeados
 */
export interface SlotProps {
  /** Conteúdo do slot */
  children?: React.ReactNode;
  /** Classes CSS do slot */
  className?: string;
}

/**
 * Configuração de ícone (usado em Button, Badge, etc)
 */
export interface IconConfig {
  /** Componente de ícone React */
  icon: React.ComponentType<{ className?: string }>;
  /** Posição do ícone */
  position?: "start" | "end";
  /** Label acessível (aria-label) */
  ariaLabel?: string;
}

/**
 * Prop comum de loading para componentes interativos
 */
export interface LoadingProps {
  /** Se o componente está em estado de carregamento */
  loading?: boolean;
  /** Texto customizado para spinner/loader */
  loadingText?: string;
}

/**
 * Props de validação para campos de formulário
 */
export interface ValidationProps {
  /** Se o campo é obrigatório */
  required?: boolean;
  /** Estado de validação do campo */
  invalid?: boolean;
  /** Se o campo está desabilitado */
  disabled?: boolean;
  /** Se o campo é somente leitura */
  readOnly?: boolean;
}

/**
 * Resultado de validação
 */
export interface ValidationResult {
  /** Se a validação passou */
  valid: boolean;
  /** Mensagem de erro (se inválido) */
  error?: string;
}

/**
 * Guard de tipo para verificar se valor é string
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Guard de tipo para verificar se valor é número
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

/**
 * Guard de tipo para verificar se valor é booleano
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Guard de tipo para verificar se valor é React Element
 */
export function isReactElement(value: unknown): value is React.ReactElement {
  return React.isValidElement(value);
}

/**
 * Guard de tipo para verificar se valor é função
 */
export function isFunction<T extends (...args: any[]) => any>(
  value: unknown
): value is T {
  return typeof value === "function";
}
