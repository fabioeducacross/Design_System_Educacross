import type { Meta, StoryObj } from "@storybook/react";

/**
 * # Sidebar / VerticalNavMenu
 * 
 * **Origem**: `educacross-frontoffice/src/@core/layouts/components/vertical-nav-menu/`
 * 
 * Menu de navegação lateral do Frontoffice.
 * 
 * ## Componentes
 * 
 * - VerticalNavMenu - Container principal
 * - VerticalNavMenuHeader - Header com logo
 * - VerticalNavMenuItems - Lista de itens
 * - VerticalNavMenuLink - Link individual
 * - VerticalNavMenuGroup - Grupo colapsável
 * 
 * ## Props do Item de Menu
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `title` | `string` | - | Título do item |
 * | `route` | `string/Object` | - | Rota Vue Router |
 * | `icon` | `string` | null | Ícone Feather |
 * | `tag` | `string` | null | Badge/tag |
 * | `tagVariant` | `string` | 'primary' | Cor da tag |
 * | `disabled` | `boolean` | false | Item desabilitado |
 * 
 * @see Frontoffice: src/@core/layouts/components/vertical-nav-menu/
 */

const meta: Meta = {
  title: "Frontoffice/Layout/Sidebar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: VerticalNavMenu (Sidebar)

Navegação lateral do Frontoffice.

### Arquivos Originais
- \`VerticalNavMenu.vue\`
- \`VerticalNavMenuHeader.vue\`
- \`VerticalNavMenuItems.vue\`
- \`VerticalNavMenuLink.vue\`
- \`VerticalNavMenuGroup.vue\`

### Uso no Vue
\`\`\`vue
<VerticalNavMenu :is-vertical-menu-active="isMenuActive">
  <template #header>
    <VerticalNavMenuHeader />
  </template>
  
  <VerticalNavMenuItems :items="navMenuItems" />
</VerticalNavMenu>

<script setup>
const navMenuItems = [
  { title: 'Dashboard', route: 'dashboard', icon: 'home' },
  { title: 'Turmas', route: 'classes', icon: 'users' },
  {
    title: 'Relatórios',
    icon: 'bar-chart',
    children: [
      { title: 'Desempenho', route: 'reports-performance' },
      { title: 'Frequência', route: 'reports-attendance' }
    ]
  }
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
      <h2 className="text-xl font-bold mb-4">Sidebar - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estrutura</h3>
      <div className="flex gap-4">
        <div className="w-64 bg-slate-800 text-white rounded-lg overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-sm font-bold">E</div>
            <span className="font-medium">Educacross</span>
          </div>
          
          <nav className="p-2">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded bg-primary/20 text-primary">
              <span>🏠</span>
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 mt-1">
              <span>👥</span>
              <span>Turmas</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 mt-1">
              <span>🎮</span>
              <span>Jogos</span>
              <span className="ml-auto text-xs bg-primary px-1.5 rounded">5</span>
            </a>
            
            <div className="mt-1">
              <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 w-full">
                <span>📊</span>
                <span>Relatórios</span>
                <span className="ml-auto">▼</span>
              </button>
              <div className="ml-8 mt-1 space-y-1">
                <a href="#" className="block px-3 py-1.5 rounded hover:bg-slate-700 text-sm">Desempenho</a>
                <a href="#" className="block px-3 py-1.5 rounded hover:bg-slate-700 text-sm">Frequência</a>
                <a href="#" className="block px-3 py-1.5 rounded hover:bg-slate-700 text-sm">Evolução</a>
              </div>
            </div>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-700 mt-1 opacity-50">
              <span>⚙️</span>
              <span>Configurações</span>
            </a>
          </nav>
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium mb-2">Estrutura de Dados</h4>
          <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`[
  { 
    title: 'Dashboard', 
    route: 'dashboard', 
    icon: 'home' 
  },
  { 
    title: 'Turmas', 
    route: 'classes', 
    icon: 'users' 
  },
  { 
    title: 'Jogos', 
    route: 'games', 
    icon: 'play',
    tag: '5',
    tagVariant: 'primary'
  },
  {
    title: 'Relatórios',
    icon: 'bar-chart',
    children: [
      { title: 'Desempenho', route: 'performance' },
      { title: 'Frequência', route: 'attendance' }
    ]
  }
]`}
          </pre>
        </div>
      </div>
    </div>
  ),
};
