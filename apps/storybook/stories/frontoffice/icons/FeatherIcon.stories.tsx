import type { Meta, StoryObj } from "@storybook/react";

/**
 * # FeatherIcon
 * 
 * **Origem**: `educacross-frontoffice/src/@core/feather-icon/FeatherIcon.vue`
 * 
 * Wrapper para ícones Feather Icons usado em todo o Frontoffice.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `icon` | `string` | - | Nome do ícone Feather |
 * | `size` | `string/number` | '14' | Tamanho em pixels |
 * | `badge` | `string/number` | null | Badge numérico |
 * | `badgeClasses` | `string` | '' | Classes do badge |
 * 
 * ## Ícones Mais Usados
 * 
 * - `home`, `user`, `users`, `settings`
 * - `check`, `x`, `plus`, `minus`
 * - `edit`, `trash`, `eye`, `download`
 * - `chevron-left`, `chevron-right`, `chevron-down`, `chevron-up`
 * - `search`, `filter`, `refresh-cw`
 * - `alert-circle`, `info`, `check-circle`, `x-circle`
 * 
 * @see Frontoffice: src/@core/feather-icon/FeatherIcon.vue
 * @see https://feathericons.com/
 */

const meta: Meta = {
  title: "Frontoffice/Icons/FeatherIcon",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: FeatherIcon

Wrapper para Feather Icons usado em todo o Frontoffice.

### Arquivo Original
\`educacross-frontoffice/src/@core/feather-icon/FeatherIcon.vue\`

### Uso no Vue
\`\`\`vue
<FeatherIcon icon="home" size="18" />

<!-- Com badge -->
<FeatherIcon 
  icon="bell" 
  size="20" 
  badge="5"
  badge-classes="bg-danger"
/>
\`\`\`

### Biblioteca
Usa [Feather Icons](https://feathericons.com/) - 280+ ícones minimalistas.
        `,
      },
    },
  },
};

export default meta;

export const Documentation: StoryObj = {
  render: () => (
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">FeatherIcon - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Ícones Mais Usados no Frontoffice</h3>
      <div className="grid grid-cols-6 gap-4 mb-4 text-center text-sm">
        <div className="p-2 border rounded">home</div>
        <div className="p-2 border rounded">user</div>
        <div className="p-2 border rounded">users</div>
        <div className="p-2 border rounded">settings</div>
        <div className="p-2 border rounded">check</div>
        <div className="p-2 border rounded">x</div>
        <div className="p-2 border rounded">plus</div>
        <div className="p-2 border rounded">minus</div>
        <div className="p-2 border rounded">edit</div>
        <div className="p-2 border rounded">trash</div>
        <div className="p-2 border rounded">eye</div>
        <div className="p-2 border rounded">download</div>
        <div className="p-2 border rounded">search</div>
        <div className="p-2 border rounded">filter</div>
        <div className="p-2 border rounded">refresh-cw</div>
        <div className="p-2 border rounded">alert-circle</div>
        <div className="p-2 border rounded">info</div>
        <div className="p-2 border rounded">check-circle</div>
      </div>
      
      <h3 className="font-semibold mb-2">Tamanhos Comuns</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Size</th>
            <th className="border border-border p-2 text-left">Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">14</td><td className="border border-border p-2">Inline com texto</td></tr>
          <tr><td className="border border-border p-2">16-18</td><td className="border border-border p-2">Botões</td></tr>
          <tr><td className="border border-border p-2">20-24</td><td className="border border-border p-2">Sidebar/Header</td></tr>
          <tr><td className="border border-border p-2">32+</td><td className="border border-border p-2">Empty states</td></tr>
        </tbody>
      </table>
      
      <p className="text-sm text-muted-foreground mt-4">
        Ver todos os ícones: <a href="https://feathericons.com/" target="_blank" className="text-primary underline">feathericons.com</a>
      </p>
    </div>
  ),
};
