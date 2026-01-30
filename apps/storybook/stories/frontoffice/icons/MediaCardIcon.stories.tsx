import type { Meta, StoryObj } from "@storybook/react";

/**
 * # MediaCardIcon
 * 
 * **Origem**: `educacross-frontoffice/src/components/card/MediaCardIcon.vue`
 * 
 * Ícone estilizado para uso em MediaCards, com fundo colorido e bordas arredondadas.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `icon` | `string` | - | Nome do ícone Feather |
 * | `variant` | `string` | 'primary' | Cor do fundo |
 * | `size` | `string` | 'md' | Tamanho (sm, md, lg, xl) |
 * | `rounded` | `boolean` | true | Bordas arredondadas |
 * 
 * ## Variantes de Cor
 * 
 * - primary, secondary
 * - success (legend-proficient)
 * - warning (legend-basic - LARANJA!)
 * - danger (legend-below-basic)
 * - info (legend-in-progress)
 * - light, dark
 * 
 * @see Frontoffice: src/components/card/MediaCardIcon.vue
 */

const meta: Meta = {
  title: "Frontoffice/Icons/MediaCardIcon",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: MediaCardIcon

Ícone decorativo para cards com fundo colorido.

### Arquivo Original
\`educacross-frontoffice/src/components/card/MediaCardIcon.vue\`

### Uso no Vue
\`\`\`vue
<MediaCardIcon 
  icon="book-open" 
  variant="primary" 
  size="lg"
/>

<!-- Em um MediaCard -->
<MediaCard>
  <template #icon>
    <MediaCardIcon icon="award" variant="success" />
  </template>
  <h5>Certificado Disponível</h5>
</MediaCard>
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
      <h2 className="text-xl font-bold mb-4">MediaCardIcon - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Tamanhos</h3>
      <div className="flex items-end gap-4 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs">sm</div>
          <span className="text-xs mt-1">sm</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded bg-primary flex items-center justify-center text-primary-foreground text-sm">md</div>
          <span className="text-xs mt-1">md</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded bg-primary flex items-center justify-center text-primary-foreground">lg</div>
          <span className="text-xs mt-1">lg</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded bg-primary flex items-center justify-center text-primary-foreground text-lg">xl</div>
          <span className="text-xs mt-1">xl</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Variantes de Cor</h3>
      <div className="flex gap-2 flex-wrap">
        <div className="w-12 h-12 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs">primary</div>
        <div className="w-12 h-12 rounded flex items-center justify-center text-white text-xs" style={{backgroundColor: '#28c76f'}}>success</div>
        <div className="w-12 h-12 rounded flex items-center justify-center text-white text-xs" style={{backgroundColor: '#ff9f43'}}>warning</div>
        <div className="w-12 h-12 rounded flex items-center justify-center text-white text-xs" style={{backgroundColor: '#ea5455'}}>danger</div>
        <div className="w-12 h-12 rounded flex items-center justify-center text-white text-xs" style={{backgroundColor: '#00cfe8'}}>info</div>
      </div>
    </div>
  ),
};
