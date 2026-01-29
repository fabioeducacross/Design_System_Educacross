/**
 * Tipos compartilhados para os componentes Question
 * 
 * @packageDocumentation
 */

import type { QuestionRendererProps } from "./QuestionRenderer";
import type { QuestionAlternativeProps } from "./QuestionAlternative";

/**
 * Tipo de questão suportado
 */
export type QuestionType = QuestionRendererProps["type"];

/**
 * Estrutura completa de uma questão (usado em testes)
 */
export interface Question {
  type: QuestionType;
  questionId?: string;
  content: string;
  data: Record<string, any>;
}

/**
 * Alternativa de uma questão de múltipla escolha
 */
export interface Alternative {
  id: string;
  text: string;
  isCorrect?: boolean;
  feedback?: string;
  image?: string;
}

/**
 * Dados específicos para questão de múltipla escolha
 */
export interface MultipleChoiceData {
  alternatives: Alternative[];
  multipleSelection?: boolean;
  columnsCount?: 1 | 2 | 3 | 4;
}

/**
 * Resposta de múltipla escolha (array de IDs selecionados)
 */
export type MultipleChoiceAnswer = string[];

/**
 * Tipo de feedback de uma alternativa
 */
export type FeedbackStatus = QuestionAlternativeProps["status"];
