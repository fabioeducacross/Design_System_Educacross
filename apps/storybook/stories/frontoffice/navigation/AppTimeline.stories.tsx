import type { Meta, StoryObj } from "@storybook/react";

/**
 * # AppTimeline / AppTimelineItem
 * 
 * **Origem**: 
 * - `educacross-frontoffice/src/@core/app-timeline/AppTimeline.vue`
 * - `educacross-frontoffice/src/@core/app-timeline/AppTimelineItem.vue`
 * 
 * Timeline vertical para exibir sequência de eventos ou atividades.
 * 
 * ## Props AppTimeline
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `items` | `Array` | [] | Lista de itens da timeline |
 * 
 * ## Props AppTimelineItem
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `variant` | `string` | 'primary' | Cor do marcador |
 * | `icon` | `string` | null | Ícone no marcador |
 * | `title` | `string` | - | Título do item |
 * | `subtitle` | `string` | - | Subtítulo/data |
 * | `time` | `string` | - | Timestamp |
 * | `fillBorder` | `boolean` | false | Marcador preenchido |
 * 
 * @see Frontoffice: src/@core/app-timeline/
 */

const meta: Meta = {
  title: "Frontoffice/Navigation/AppTimeline",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componentes Vue: AppTimeline + AppTimelineItem

Timeline vertical do Frontoffice para histórico de atividades.

### Arquivos Originais
- \`educacross-frontoffice/src/@core/app-timeline/AppTimeline.vue\`
- \`educacross-frontoffice/src/@core/app-timeline/AppTimelineItem.vue\`

### Uso no Vue
\`\`\`vue
<AppTimeline>
  <AppTimelineItem
    variant="success"
    icon="check-circle"
    title="Atividade concluída"
    subtitle="Matemática - Prova 1"
    time="há 2 horas"
    fill-border
  />
  <AppTimelineItem
    variant="warning"
    icon="clock"
    title="Atividade em andamento"
    subtitle="Português - Redação"
    time="há 1 dia"
  />
  <AppTimelineItem
    variant="primary"
    icon="calendar"
    title="Atividade agendada"
    subtitle="Ciências - Quiz"
    time="em 2 dias"
  />
</AppTimeline>
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
      <h2 className="text-xl font-bold mb-4">AppTimeline - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Variantes de Cor</h3>
      <div className="flex gap-2 mb-4">
        <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">primary</span>
        <span className="px-3 py-1 bg-legend-proficient text-white rounded text-sm">success</span>
        <span className="px-3 py-1 bg-legend-basic text-white rounded text-sm">warning</span>
        <span className="px-3 py-1 bg-legend-below-basic text-white rounded text-sm">danger</span>
        <span className="px-3 py-1 bg-legend-in-progress text-white rounded text-sm">info</span>
      </div>
      
      <h3 className="font-semibold mb-2">Props do Item</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">title</td><td className="border border-border p-2">Título principal</td></tr>
          <tr><td className="border border-border p-2">subtitle</td><td className="border border-border p-2">Texto secundário</td></tr>
          <tr><td className="border border-border p-2">time</td><td className="border border-border p-2">Timestamp/data</td></tr>
          <tr><td className="border border-border p-2">icon</td><td className="border border-border p-2">Ícone Feather</td></tr>
          <tr><td className="border border-border p-2">fillBorder</td><td className="border border-border p-2">Marcador preenchido</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
