import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ButtonWaitAction
 * 
 * **Origem**: `educacross-frontoffice/src/components/form/button/ButtonWaitAction.vue`
 * 
 * Botão com estado de loading integrado para ações assíncronas.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `loading` | `boolean` | false | Estado de loading |
 * | `disabled` | `boolean` | false | Estado desabilitado |
 * | `variant` | `string` | 'primary' | Variante de cor |
 * | `size` | `string` | 'md' | Tamanho (sm, md, lg) |
 * | `block` | `boolean` | false | Largura 100% |
 * | `loadingText` | `string` | 'Aguarde...' | Texto durante loading |
 * 
 * ## Eventos
 * 
 * - `@click` - Emitido no clique (bloqueado durante loading)
 * 
 * @see Frontoffice: src/components/form/button/ButtonWaitAction.vue
 */

const meta: Meta = {
  title: "Frontoffice/Forms/ButtonWaitAction",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ButtonWaitAction

Botão com loading state para operações assíncronas.

### Arquivo Original
\`educacross-frontoffice/src/components/form/button/ButtonWaitAction.vue\`

### Uso no Vue
\`\`\`vue
<ButtonWaitAction
  :loading="isSaving"
  variant="primary"
  @click="saveData"
>
  Salvar
</ButtonWaitAction>

<!-- Com texto customizado de loading -->
<ButtonWaitAction
  :loading="isDeleting"
  variant="danger"
  loading-text="Excluindo..."
  @click="deleteItem"
>
  Excluir
</ButtonWaitAction>
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
      <h2 className="text-xl font-bold mb-4">ButtonWaitAction - Documentação</h2>
      <p className="text-muted-foreground mb-4">
        Botão com spinner de loading para ações assíncronas.
      </p>
      
      <h3 className="font-semibold mb-2">Comportamento</h3>
      <ul className="list-disc list-inside mb-4 text-sm">
        <li>Exibe spinner durante loading</li>
        <li>Desabilita cliques durante loading</li>
        <li>Pode mostrar texto customizado durante loading</li>
      </ul>
      
      <h3 className="font-semibold mb-2">Variantes</h3>
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-primary text-primary-foreground rounded">primary</span>
        <span className="px-3 py-1 bg-legend-proficient text-white rounded">success</span>
        <span className="px-3 py-1 bg-legend-below-basic text-white rounded">danger</span>
        <span className="px-3 py-1 bg-legend-basic text-white rounded">warning</span>
      </div>
    </div>
  ),
};
