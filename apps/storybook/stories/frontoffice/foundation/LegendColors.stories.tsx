import type { Meta, StoryObj } from "@storybook/react";

/**
 * # LegendColors
 * 
 * Cores de proficiência do sistema Educacross.
 * 
 * ## ⚠️ IMPORTANTE
 * 
 * A cor "Básico" é **LARANJA** (#ff9f43), NÃO amarelo!
 * 
 * ## Níveis de Proficiência
 * 
 * | Nível | Nome | Cor | Faixa |
 * |-------|------|-----|-------|
 * | 4 | Avançado | #6e63e8 (roxo) | 75-100% |
 * | 3 | Proficiente | #28c76f (verde) | 50-74% |
 * | 2 | Básico | #ff9f43 (LARANJA!) | 25-49% |
 * | 1 | Abaixo do Básico | #ea5455 (vermelho) | 0-24% |
 * | 0 | Não Concluído | #b4b7bd (cinza) | N/A |
 * | - | Em Andamento | #00cfe8 (ciano) | N/A |
 * 
 * ## Uso no Tailwind
 * 
 * ```html
 * <div class="bg-legend-advanced text-white">Avançado</div>
 * <div class="bg-legend-proficient text-white">Proficiente</div>
 * <div class="bg-legend-basic text-white">Básico</div>
 * <div class="bg-legend-below-basic text-white">Abaixo</div>
 * <div class="bg-legend-not-completed text-white">Não Concluído</div>
 * <div class="bg-legend-in-progress text-white">Em Andamento</div>
 * ```
 * 
 * @see packages/ui/src/styles.css
 * @see packages/ui/src/tailwind-preset.ts
 */

const meta: Meta = {
  title: "Frontoffice/Foundation/LegendColors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Sistema de Cores Legend

Cores oficiais para representar níveis de proficiência no sistema Educacross.

### ⚠️ ATENÇÃO
**A cor "Básico" é LARANJA (#ff9f43), não amarelo!**
Isso é diferente da cor semântica "warning" que costuma ser amarela em outros sistemas.

### Origem
Estas cores vêm do Frontoffice Vue e são o padrão oficial para todo o sistema.

### Uso em CSS
\`\`\`css
.elemento {
  background-color: var(--color-legend-advanced);
  /* ou */
  background-color: rgb(var(--color-legend-advanced-rgb) / 0.2);
}
\`\`\`

### Uso em Tailwind
\`\`\`html
<div class="bg-legend-proficient text-white">Proficiente</div>
<div class="bg-legend-basic/20">Fundo básico com opacidade</div>
\`\`\`
        `,
      },
    },
  },
};

export default meta;

export const Documentation: StoryObj = {
  render: () => (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">🎨 Legend Colors - Sistema de Proficiência</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="font-medium text-yellow-800">⚠️ ATENÇÃO: Básico é LARANJA!</p>
        <p className="text-sm text-yellow-700">A cor "legend-basic" é #ff9f43 (laranja), não amarelo como "warning" em outros sistemas.</p>
      </div>
      
      <h3 className="font-semibold mb-3">Cores de Proficiência</h3>
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-4 p-3 rounded-lg" style={{backgroundColor: '#6e63e8'}}>
          <div className="w-12 h-12 rounded-lg bg-white/20"></div>
          <div className="text-white">
            <p className="font-bold">Avançado</p>
            <p className="text-sm opacity-80">#6e63e8 • 75-100% • legend-advanced</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 rounded-lg" style={{backgroundColor: '#28c76f'}}>
          <div className="w-12 h-12 rounded-lg bg-white/20"></div>
          <div className="text-white">
            <p className="font-bold">Proficiente</p>
            <p className="text-sm opacity-80">#28c76f • 50-74% • legend-proficient</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 rounded-lg" style={{backgroundColor: '#ff9f43'}}>
          <div className="w-12 h-12 rounded-lg bg-white/20"></div>
          <div className="text-white">
            <p className="font-bold">Básico ⚠️ LARANJA!</p>
            <p className="text-sm opacity-80">#ff9f43 • 25-49% • legend-basic</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 rounded-lg" style={{backgroundColor: '#ea5455'}}>
          <div className="w-12 h-12 rounded-lg bg-white/20"></div>
          <div className="text-white">
            <p className="font-bold">Abaixo do Básico</p>
            <p className="text-sm opacity-80">#ea5455 • 0-24% • legend-below-basic</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 rounded-lg" style={{backgroundColor: '#b4b7bd'}}>
          <div className="w-12 h-12 rounded-lg bg-white/20"></div>
          <div className="text-white">
            <p className="font-bold">Não Concluído</p>
            <p className="text-sm opacity-80">#b4b7bd • N/A • legend-not-completed</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 rounded-lg" style={{backgroundColor: '#00cfe8'}}>
          <div className="w-12 h-12 rounded-lg bg-white/20"></div>
          <div className="text-white">
            <p className="font-bold">Em Andamento</p>
            <p className="text-sm opacity-80">#00cfe8 • N/A • legend-in-progress</p>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-3">Variantes com Opacidade</h3>
      <div className="grid grid-cols-6 gap-2 text-center text-xs">
        <div className="p-3 rounded" style={{backgroundColor: 'rgba(110, 99, 232, 1)'}}>
          <span className="text-white">100%</span>
        </div>
        <div className="p-3 rounded" style={{backgroundColor: 'rgba(110, 99, 232, 0.8)'}}>
          <span className="text-white">80%</span>
        </div>
        <div className="p-3 rounded" style={{backgroundColor: 'rgba(110, 99, 232, 0.5)'}}>
          <span className="text-white">50%</span>
        </div>
        <div className="p-3 rounded" style={{backgroundColor: 'rgba(110, 99, 232, 0.3)'}}>
          <span>30%</span>
        </div>
        <div className="p-3 rounded" style={{backgroundColor: 'rgba(110, 99, 232, 0.16)'}}>
          <span>16%</span>
        </div>
        <div className="p-3 rounded" style={{backgroundColor: 'rgba(110, 99, 232, 0.08)'}}>
          <span>8%</span>
        </div>
      </div>
    </div>
  ),
};

export const UsageExamples: StoryObj = {
  render: () => (
    <div className="p-6 bg-card rounded-lg border space-y-6">
      <h2 className="text-xl font-bold">Exemplos de Uso</h2>
      
      <div>
        <h3 className="font-semibold mb-2">Badge de Status</h3>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full text-white text-sm" style={{backgroundColor: '#6e63e8'}}>Avançado</span>
          <span className="px-3 py-1 rounded-full text-white text-sm" style={{backgroundColor: '#28c76f'}}>Proficiente</span>
          <span className="px-3 py-1 rounded-full text-white text-sm" style={{backgroundColor: '#ff9f43'}}>Básico</span>
          <span className="px-3 py-1 rounded-full text-white text-sm" style={{backgroundColor: '#ea5455'}}>Abaixo</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Barra de Progresso</h3>
        <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
          <div className="h-full" style={{width: '25%', backgroundColor: '#6e63e8'}}></div>
          <div className="h-full" style={{width: '35%', backgroundColor: '#28c76f'}}></div>
          <div className="h-full" style={{width: '20%', backgroundColor: '#ff9f43'}}></div>
          <div className="h-full" style={{width: '15%', backgroundColor: '#ea5455'}}></div>
          <div className="h-full" style={{width: '5%', backgroundColor: '#b4b7bd'}}></div>
        </div>
        <div className="flex justify-between text-xs mt-1 text-muted-foreground">
          <span>25% Avançado</span>
          <span>35% Proficiente</span>
          <span>20% Básico</span>
          <span>15% Abaixo</span>
          <span>5% N/C</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Célula de Tabela</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Aluno</th>
              <th className="p-2 text-left">Nota</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">João Silva</td>
              <td className="p-2">92%</td>
              <td className="p-2"><span className="px-2 py-0.5 rounded text-white text-xs" style={{backgroundColor: '#6e63e8'}}>Avançado</span></td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Maria Santos</td>
              <td className="p-2">68%</td>
              <td className="p-2"><span className="px-2 py-0.5 rounded text-white text-xs" style={{backgroundColor: '#28c76f'}}>Proficiente</span></td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Pedro Costa</td>
              <td className="p-2">38%</td>
              <td className="p-2"><span className="px-2 py-0.5 rounded text-white text-xs" style={{backgroundColor: '#ff9f43'}}>Básico</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
};
