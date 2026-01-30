import type { Meta, StoryObj } from "@storybook/react";

/**
 * # FixedStickyFooter
 * 
 * **Origem**: `educacross-frontoffice/src/components/footer/FixedStickyFooter.vue`
 * 
 * Footer fixo na parte inferior da página com ações.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `visible` | `boolean` | true | Controla visibilidade |
 * | `variant` | `string` | 'default' | Estilo do footer |
 * | `position` | `string` | 'fixed' | fixed, sticky |
 * 
 * ## Slots
 * 
 * - `default` - Conteúdo principal
 * - `left` - Conteúdo à esquerda
 * - `right` - Conteúdo à direita (ações)
 * 
 * ## Uso Comum
 * 
 * - Formulários de edição com Salvar/Cancelar
 * - Wizards com Próximo/Anterior
 * - Telas de seleção em massa
 * 
 * @see Frontoffice: src/components/footer/FixedStickyFooter.vue
 */

const meta: Meta = {
  title: "Frontoffice/Layout/FixedStickyFooter",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: FixedStickyFooter

Footer fixo com ações.

### Arquivo Original
\`educacross-frontoffice/src/components/footer/FixedStickyFooter.vue\`

### Uso no Vue
\`\`\`vue
<FixedStickyFooter v-if="hasChanges">
  <template #left>
    <span class="text-muted">3 alterações não salvas</span>
  </template>
  
  <template #right>
    <button @click="cancel" class="btn btn-outline">Cancelar</button>
    <button @click="save" class="btn btn-primary">Salvar</button>
  </template>
</FixedStickyFooter>
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
      <h2 className="text-xl font-bold mb-4">FixedStickyFooter - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Variações</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Formulário de edição</p>
          <div className="border rounded-lg p-4 bg-muted/50 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">3 alterações não salvas</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded hover:bg-muted">Cancelar</button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Salvar</button>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Wizard/Passo a passo</p>
          <div className="border rounded-lg p-4 bg-muted/50 flex justify-between items-center">
            <button className="px-4 py-2 border rounded hover:bg-muted">← Anterior</button>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-muted"></div>
              <div className="w-3 h-3 rounded-full bg-muted"></div>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Próximo →</button>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Seleção em massa</p>
          <div className="border rounded-lg p-4 bg-primary/10 flex justify-between items-center">
            <span className="text-sm font-medium">12 itens selecionados</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded hover:bg-muted">Cancelar</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded">Excluir</button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded">Mover</button>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mt-4 mb-2">Props</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">visible</td><td className="border border-border p-2">boolean</td><td className="border border-border p-2">Controla visibilidade</td></tr>
          <tr><td className="border border-border p-2">position</td><td className="border border-border p-2">'fixed' | 'sticky'</td><td className="border border-border p-2">Tipo de posicionamento</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
