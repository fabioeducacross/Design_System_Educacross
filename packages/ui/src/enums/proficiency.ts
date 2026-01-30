/**
 * Proficiency Enum - Sistema de Proficiência Educacross
 *
 * Define os níveis de proficiência usados em componentes como:
 * - LegendCard
 * - LegendEnum
 * - BadgeStatus
 * - PerformanceCell
 *
 * ⚠️ ATENÇÃO: A cor de 'basic' é LARANJA (#ff9f43), NÃO amarelo!
 *
 * @see Frontoffice: src/consts/proficiency.js
 */

export type ProficiencyVariant =
  | "legend-advanced"
  | "legend-proficient"
  | "legend-basic"
  | "legend-below-basic"
  | "legend-not-completed"
  | "legend-in-progress";

export interface ProficiencyItem {
  id: number;
  label: string;
  variant: ProficiencyVariant;
  icon?: string;
  description?: string;
}

/**
 * Níveis de proficiência padrão (4 níveis)
 * Usado em avaliações e relatórios de desempenho
 */
export const proficiency: ProficiencyItem[] = [
  {
    id: 1,
    label: "Abaixo do Básico",
    variant: "legend-below-basic",
    icon: "frown",
    description: "Desempenho abaixo do esperado",
  },
  {
    id: 2,
    label: "Básico",
    variant: "legend-basic",
    icon: "meh",
    description: "Desempenho básico",
  },
  {
    id: 3,
    label: "Proficiente",
    variant: "legend-proficient",
    icon: "smile",
    description: "Desempenho proficiente",
  },
  {
    id: 4,
    label: "Avançado",
    variant: "legend-advanced",
    icon: "star",
    description: "Desempenho avançado",
  },
];

/**
 * Níveis de proficiência com "Não Concluído" (5 níveis)
 * Usado quando há estudantes que não fizeram a atividade
 */
export const proficiencyWithNotCompleted: ProficiencyItem[] = [
  {
    id: 0,
    label: "Não fizeram",
    variant: "legend-not-completed",
    icon: "user-x",
    description: "Não realizaram a atividade",
  },
  ...proficiency,
];

/**
 * Níveis de proficiência com "Em Andamento" (5 níveis)
 * Usado quando há estudantes em progresso
 */
export const proficiencyWithInProgress: ProficiencyItem[] = [
  {
    id: 0,
    label: "Em Andamento",
    variant: "legend-in-progress",
    icon: "clock",
    description: "Atividade em andamento",
  },
  ...proficiency,
];

/**
 * Retorna o item de proficiência correspondente ao ID
 */
export function getProficiencyById(
  id: number,
  includeNotCompleted = false,
  includeInProgress = false
): ProficiencyItem | undefined {
  const list = includeInProgress
    ? proficiencyWithInProgress
    : includeNotCompleted
      ? proficiencyWithNotCompleted
      : proficiency;

  return list.find((item) => item.id === id);
}

/**
 * Retorna a variante de proficiência correspondente ao ID
 */
export function getProficiencyVariant(
  id: number,
  includeNotCompleted = false,
  includeInProgress = false
): ProficiencyVariant | undefined {
  return getProficiencyById(id, includeNotCompleted, includeInProgress)?.variant;
}
