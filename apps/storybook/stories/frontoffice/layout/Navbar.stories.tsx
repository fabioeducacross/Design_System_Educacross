import type { Meta, StoryObj } from "@storybook/react";

/**
 * # Navbar / AppNavbarHorizontalLayout
 * 
 * **Origem**: `educacross-frontoffice/src/@core/layouts/components/app-navbar/`
 * 
 * Barra de navegação superior do Frontoffice.
 * 
 * ## Componentes
 * 
 * - AppNavbarHorizontalLayout - Container principal
 * - AppNavbarSearch - Busca global
 * - NotificationDropdown - Notificações
 * - UserDropdown - Menu do usuário
 * - LocalePicker - Seletor de idioma
 * 
 * ## Props
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `toggleVerticalMenuActive` | `Function` | - | Toggle menu lateral |
 * | `navbarType` | `string` | 'sticky' | sticky, static, floating |
 * 
 * @see Frontoffice: src/@core/layouts/components/app-navbar/
 */

const meta: Meta = {
  title: "Frontoffice/Layout/Navbar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: AppNavbarHorizontalLayout

Navbar superior do Frontoffice.

### Arquivos Originais
- \`AppNavbarHorizontalLayout.vue\`
- \`AppNavbarSearch.vue\`
- \`NotificationDropdown.vue\`
- \`UserDropdown.vue\`

### Uso no Vue
\`\`\`vue
<AppNavbarHorizontalLayout
  :toggle-vertical-menu-active="toggleMenu"
  navbar-type="sticky"
>
  <template #search>
    <AppNavbarSearch />
  </template>
  
  <template #notifications>
    <NotificationDropdown :notifications="notifications" />
  </template>
  
  <template #user>
    <UserDropdown :user="currentUser" />
  </template>
</AppNavbarHorizontalLayout>
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
      <h2 className="text-xl font-bold mb-4">Navbar - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estrutura</h3>
      <div className="border rounded-lg shadow-sm overflow-hidden mb-4">
        <div className="bg-card border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-1 hover:bg-muted rounded">☰</button>
            <div className="relative">
              <input 
                type="search" 
                placeholder="Buscar..." 
                className="w-64 border rounded-lg px-4 py-2 text-sm pl-10"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 hover:bg-muted rounded-full">🔔</button>
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </div>
            
            <button className="p-2 hover:bg-muted rounded-full">⚙️</button>
            
            <div className="flex items-center gap-2 pl-4 border-l">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">JP</div>
              <div className="text-sm">
                <p className="font-medium">João Professor</p>
                <p className="text-xs text-muted-foreground">Professor</p>
              </div>
              <span className="text-muted-foreground">▼</span>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Dropdown de Notificações</h3>
      <div className="inline-block border rounded-lg shadow-lg w-80">
        <div className="p-3 border-b flex justify-between items-center">
          <span className="font-medium">Notificações</span>
          <span className="text-xs text-primary cursor-pointer">Marcar todas como lidas</span>
        </div>
        <div className="max-h-64 overflow-y-auto">
          <div className="p-3 hover:bg-muted border-b cursor-pointer">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">📊</div>
              <div>
                <p className="text-sm font-medium">Novo relatório disponível</p>
                <p className="text-xs text-muted-foreground">Há 5 minutos</p>
              </div>
            </div>
          </div>
          <div className="p-3 hover:bg-muted border-b cursor-pointer bg-primary/5">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
              <div>
                <p className="text-sm font-medium">Turma 5º A concluiu a missão</p>
                <p className="text-xs text-muted-foreground">Há 1 hora</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 border-t text-center">
          <a href="#" className="text-sm text-primary">Ver todas as notificações</a>
        </div>
      </div>
    </div>
  ),
};
