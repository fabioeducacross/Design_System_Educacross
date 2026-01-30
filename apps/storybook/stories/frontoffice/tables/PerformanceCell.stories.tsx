import type { Meta, StoryObj } from "@storybook/react";

/**
 * # PerformanceCell
 * 
 * **Origem**: `educacross-frontoffice/src/components/cells/PerformanceCell.vue`
 * 
 * Célula de tabela que exibe o desempenho com cor de proficiência.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `value` | `number` | - | Valor percentual (0-100) |
 * | `enum` | `Array` | learningPerformance | Enum de mapeamento |
 * | `showIcon` | `boolean` | false | Mostrar ícone |
 * | `showLabel` | `boolean` | true | Mostrar label |
 * | `showValue` | `boolean` | true | Mostrar valor % |
 * 
 * ## Regras de Cores (Legend Colors)
 * 
 * | Faixa | Cor | Classe |
 * |-------|-----|--------|
 * | ≥75% | Roxo | legend-advanced |
 * | ≥50% | Verde | legend-proficient |
 * | ≥25% | LARANJA | legend-basic |
 * | <25% | Vermelho | legend-below-basic |
 * 
 * @see Frontoffice: src/components/cells/PerformanceCell.vue
 */

const meta: Meta = {
  title: "Frontoffice/Tables/PerformanceCell",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: PerformanceCell

Célula de desempenho com cor baseada em porcentagem.

### Arquivo Original
\`educacross-frontoffice/src/components/cells/PerformanceCell.vue\`

### Uso no Vue
\`\`\`vue
<template #cell(performance)="{ item }">
  <PerformanceCell 
    :value="item.score" 
    show-icon
    show-label
  />
</template>
\`\`\`

### ⚠️ ATENÇÃO: Cores Legend

A cor "Básico" é **LARANJA** (#ff9f43), NÃO amarelo!
        `,
      },
    },
  },
};

export default meta;

export const Documentation: StoryObj = {
  render: () => (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">PerformanceCell - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Regras de Cores</h3>
      <table className="w-full border-collapse border border-border text-sm mb-4">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2">Faixa</th>
            <th className="border border-border p-2">Nível</th>
            <th className="border border-border p-2">Cor</th>
            <th className="border border-border p-2">Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-border p-2">≥75%</td>
            <td className="border border-border p-2">Avançado</td>
            <td className="border border-border p-2">#6e63e8</td>
            <td className="border border-border p-2"><span className="inline-block w-6 h-6 rounded" style={{backgroundColor: '#6e63e8'}}></span></td>
          </tr>
          <tr>
            <td className="border border-border p-2">≥50%</td>
            <td className="border border-border p-2">Proficiente</td>
            <td className="border border-border p-2">#28c76f</td>
            <td className="border border-border p-2"><span className="inline-block w-6 h-6 rounded" style={{backgroundColor: '#28c76f'}}></span></td>
          </tr>
          <tr>
            <td className="border border-border p-2">≥25%</td>
            <td className="border border-border p-2">Básico</td>
            <td className="border border-border p-2">#ff9f43 ⚠️</td>
            <td className="border border-border p-2"><span className="inline-block w-6 h-6 rounded" style={{backgroundColor: '#ff9f43'}}></span></td>
          </tr>
          <tr>
            <td className="border border-border p-2">&lt;25%</td>
            <td className="border border-border p-2">Abaixo do Básico</td>
            <td className="border border-border p-2">#ea5455</td>
            <td className="border border-border p-2"><span className="inline-block w-6 h-6 rounded" style={{backgroundColor: '#ea5455'}}></span></td>
          </tr>
        </tbody>
      </table>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
        <strong>⚠️ Importante:</strong> A cor "Básico" é LARANJA (#ff9f43), não amarelo!
      </div>
    </div>
  ),
};
