/**
 * Enums - Barrel Export
 *
 * Re-exporta todos os enums do Design System Educacross
 */

// Proficiency
export {
  proficiency,
  proficiencyWithNotCompleted,
  proficiencyWithInProgress,
  getProficiencyById,
  getProficiencyVariant,
  type ProficiencyItem,
  type ProficiencyVariant,
} from "./proficiency";

// Performance
export {
  performanceRules,
  getPerformanceRule,
  getPerformanceVariant,
  getPerformanceId,
  getPerformanceLabel,
  formatPercentage,
  performanceColors,
  performanceColorArray,
  type PerformanceRule,
} from "./performance";
