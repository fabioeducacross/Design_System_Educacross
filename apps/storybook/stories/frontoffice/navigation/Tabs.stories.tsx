import type { Meta, StoryObj } from "@storybook/react";

/**
 * # Tab / SimpleTab
 * 
 * **Origem**: `educacross-frontoffice/src/components/tabs/`
 * 
 * Componentes de navegação por abas.
 * 
 * ## Props Vue Original (Tab)
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `tabs` | `Array` | [] | Lista de abas |
 * | `modelValue` | `string/number` | null | Aba ativa |
 * | `vertical` | `boolean` | false | Layout vertical |
 * | `fill` | `boolean` | false | Preencher largura |
 * | `pills` | `boolean` | false | Estilo pills |
 * 
 * ## Props Vue Original (SimpleTab)
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `title` | `string` | - | Título da aba |
 * | `active` | `boolean` | false | Se está ativa |
 * | `disabled` | `boolean` | false | Desabilitada |
 * 
 * @see Frontoffice: src/components/tabs/
 */

const meta: Meta = {
  title: "Frontoffice/Navigation/Tabs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componentes Vue: Tab / SimpleTab

Navegação por abas do Frontoffice.

### Arquivos Originais
- \`educacross-frontoffice/src/components/tabs/Tab.vue\`
- \`educacross-frontoffice/src/components/tabs/SimpleTab.vue\`
- \`educacross-frontoffice/src/components/tabs/TabCards.vue\`

### Uso no Vue
\`\`\`vue
<Tab v-model="activeTab" :tabs="tabs">
  <template #tabContent1>
    <p>Conteúdo da aba 1</p>
  </template>
  <template #tabContent2>
    <p>Conteúdo da aba 2</p>
  </template>
</Tab>

<script setup>
const tabs = [
  { id: 1, title: 'Visão Geral', icon: 'home' },
  { id: 2, title: 'Relatórios', icon: 'bar-chart' },
  { id: 3, title: 'Configurações', icon: 'settings' }
]
</script>
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
      <h2 className="text-xl font-bold mb-4">Tabs - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estilo Padrão</h3>
      <div className="border-b mb-4">
        <nav className="flex gap-4">
          <button className="px-4 py-2 border-b-2 border-primary text-primary font-medium">Visão Geral</button>
          <button className="px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground">Relatórios</button>
          <button className="px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground">Configurações</button>
        </nav>
      </div>
      
      <h3 className="font-semibold mb-2">Estilo Pills</h3>
      <div className="mb-4">
        <nav className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm">Visão Geral</button>
          <button className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm hover:bg-muted/80">Relatórios</button>
          <button className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm hover:bg-muted/80">Configurações</button>
        </nav>
      </div>
      
      <h3 className="font-semibold mb-2">Tab Cards</h3>
      <div className="flex gap-2 mb-4">
        <button className="flex-1 p-4 border-2 border-primary rounded-lg bg-primary/5 text-center">
          <span className="block text-2xl mb-1">📊</span>
          <span className="font-medium">Dashboard</span>
        </button>
        <button className="flex-1 p-4 border rounded-lg text-center hover:border-primary/50">
          <span className="block text-2xl mb-1">📈</span>
          <span className="text-muted-foreground">Relatórios</span>
        </button>
        <button className="flex-1 p-4 border rounded-lg text-center hover:border-primary/50">
          <span className="block text-2xl mb-1">⚙️</span>
          <span className="text-muted-foreground">Config</span>
        </button>
      </div>
      
      <h3 className="font-semibold mb-2">Componentes</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Componente</th>
            <th className="border border-border p-2 text-left">Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">Tab</td><td className="border border-border p-2">Tabs com conteúdo via slots</td></tr>
          <tr><td className="border border-border p-2">SimpleTab</td><td className="border border-border p-2">Tab simples individual</td></tr>
          <tr><td className="border border-border p-2">TabCards</td><td className="border border-border p-2">Tabs estilo cards</td></tr>
          <tr><td className="border border-border p-2">TabRouter</td><td className="border border-border p-2">Tabs com Vue Router</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
