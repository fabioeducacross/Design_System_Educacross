/**
 * Performance Enum - Sistema de Desempenho de Aprendizagem
 *
 * Define as regras de classificação de desempenho baseadas em porcentagem.
 * Usado em componentes como:
 * - PerformanceCell
 * - LegendCard
 * - Relatórios de desempenho
 *
 * As faixas de porcentagem são baseadas no Frontoffice:
 * - Abaixo do Básico: 0-24%
 * - Básico: 25-49%
 * - Proficiente: 50-74%
 * - Avançado: 75-100%
 *
 * @see Frontoffice: src/consts/performance.js
 */

import type { ProficiencyVariant } from "./proficiency";

export interface PerformanceRule {
  id: number;
  label: string;
  variant: ProficiencyVariant;
  min: number;
  max: number;
  /** Função que verifica se um valor está na faixa */
  matches: (percentage: number) => boolean;
}

/**
 * Regras de classificação de desempenho por porcentagem
 */
export const performanceRules: PerformanceRule[] = [
  {
    id: 1,
    label: "Abaixo do Básico",
    variant: "legend-below-basic",
    min: 0,
    max: 24,
    matches: (percentage: number) => percentage >= 0 && percentage < 25,
  },
  {
    id: 2,
    label: "Básico",
    variant: "legend-basic",
    min: 25,
    max: 49,
    matches: (percentage: number) => percentage >= 25 && percentage < 50,
  },
  {
    id: 3,
    label: "Proficiente",
    variant: "legend-proficient",
    min: 50,
    max: 74,
    matches: (percentage: number) => percentage >= 50 && percentage < 75,
  },
  {
    id: 4,
    label: "Avançado",
    variant: "legend-advanced",
    min: 75,
    max: 100,
    matches: (percentage: number) => percentage >= 75 && percentage <= 100,
  },
];

/**
 * Retorna a regra de performance correspondente a uma porcentagem
 */
export function getPerformanceRule(
  percentage: number
): PerformanceRule | undefined {
  // Clamp to 0-100 range
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  return performanceRules.find((rule) => rule.matches(clampedPercentage));
}

/**
 * Retorna a variante de performance correspondente a uma porcentagem
 */
export function getPerformanceVariant(
  percentage: number
): ProficiencyVariant | undefined {
  return getPerformanceRule(percentage)?.variant;
}

/**
 * Retorna o ID de proficiência correspondente a uma porcentagem
 */
export function getPerformanceId(percentage: number): number | undefined {
  return getPerformanceRule(percentage)?.id;
}

/**
 * Retorna o label de performance correspondente a uma porcentagem
 */
export function getPerformanceLabel(percentage: number): string | undefined {
  return getPerformanceRule(percentage)?.label;
}

/**
 * Formata uma porcentagem com símbolo
 */
export function formatPercentage(
  value: number,
  decimals = 0
): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Cores hex para uso em gráficos (Chart.js, etc)
 * Correspondem exatamente aos tokens CSS
 */
export const performanceColors = {
  advanced: "#6e63e8",
  proficient: "#28c76f",
  basic: "#ff9f43",
  belowBasic: "#ea5455",
  notCompleted: "#b4b7bd",
  inProgress: "#00cfe8",
} as const;

/**
 * Array de cores na ordem de proficiência (1-4)
 * Útil para gráficos de barras/pizza
 */
export const performanceColorArray = [
  performanceColors.belowBasic,
  performanceColors.basic,
  performanceColors.proficient,
  performanceColors.advanced,
] as const;
