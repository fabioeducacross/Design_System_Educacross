import type { Meta, StoryObj } from "@storybook/react";

/**
 * # AppCollapse / AppCollapseItem
 * 
 * **Origem**: 
 * - `educacross-frontoffice/src/components/app-collapse/AppCollapse.vue`
 * - `educacross-frontoffice/src/components/app-collapse/AppCollapseItem.vue`
 * 
 * Componente de accordion/collapse para organizar conteúdo em seções expansíveis.
 * 
 * ## Props AppCollapse
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `accordion` | `boolean` | false | Apenas um item aberto por vez |
 * | `type` | `string` | 'default' | Estilo visual (default, shadow, margin, border) |
 * 
 * ## Props AppCollapseItem
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `title` | `string` | - | Título do item |
 * | `isVisible` | `boolean` | false | Estado inicial aberto |
 * | `icon` | `string` | null | Ícone no header |
 * 
 * @see Frontoffice: src/components/app-collapse/
 */

const meta: Meta = {
  title: "Frontoffice/Navigation/AppCollapse",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componentes Vue: AppCollapse + AppCollapseItem

Accordion do Frontoffice para seções expansíveis.

### Arquivos Originais
- \`educacross-frontoffice/src/components/app-collapse/AppCollapse.vue\`
- \`educacross-frontoffice/src/components/app-collapse/AppCollapseItem.vue\`

### Uso no Vue
\`\`\`vue
<AppCollapse accordion type="shadow">
  <AppCollapseItem title="Seção 1" is-visible>
    Conteúdo da seção 1
  </AppCollapseItem>
  <AppCollapseItem title="Seção 2">
    Conteúdo da seção 2
  </AppCollapseItem>
  <AppCollapseItem title="Seção 3" icon="settings">
    Conteúdo da seção 3
  </AppCollapseItem>
</AppCollapse>
\`\`\`

### Tipos de Estilo
- \`default\` - Estilo padrão sem decoração
- \`shadow\` - Com sombra nos itens
- \`margin\` - Com espaçamento entre itens
- \`border\` - Com bordas nos itens
        `,
      },
    },
  },
};

export default meta;

export const Documentation: StoryObj = {
  render: () => (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">AppCollapse - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Tipos de Estilo</h3>
      <table className="w-full border-collapse border border-border text-sm mb-4">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">default</td><td className="border border-border p-2">Estilo básico sem decoração</td></tr>
          <tr><td className="border border-border p-2">shadow</td><td className="border border-border p-2">Cards com sombra</td></tr>
          <tr><td className="border border-border p-2">margin</td><td className="border border-border p-2">Espaçamento entre itens</td></tr>
          <tr><td className="border border-border p-2">border</td><td className="border border-border p-2">Bordas visíveis</td></tr>
        </tbody>
      </table>
      
      <h3 className="font-semibold mb-2">Comportamento Accordion</h3>
      <p className="text-sm text-muted-foreground">
        Quando <code>accordion=true</code>, apenas um item pode estar aberto por vez.
      </p>
    </div>
  ),
};
