import type { Meta, StoryObj } from "@storybook/react";

/**
 * # Avatar
 * 
 * **Origem**: `educacross-frontoffice/src/components/avatar/`
 * 
 * Componente de avatar para usuários.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `src` | `string` | null | URL da imagem |
 * | `text` | `string` | '' | Texto (iniciais) |
 * | `size` | `string` | 'md' | sm, md, lg, xl |
 * | `variant` | `string` | 'primary' | Cor de fundo |
 * | `rounded` | `boolean` | true | Bordas arredondadas |
 * | `status` | `string` | null | online, offline, busy |
 * 
 * ## Variantes
 * 
 * - Com imagem
 * - Com iniciais (fallback)
 * - Com indicador de status
 * - Em grupo (AvatarGroup)
 * 
 * @see Frontoffice: src/components/avatar/
 */

const meta: Meta = {
  title: "Frontoffice/Components/Avatar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: Avatar

Avatar de usuário com suporte a imagem, iniciais e status.

### Arquivo Original
\`educacross-frontoffice/src/components/avatar/Avatar.vue\`

### Uso no Vue
\`\`\`vue
<!-- Com imagem -->
<Avatar src="/avatars/joao.jpg" size="lg" />

<!-- Com iniciais (fallback) -->
<Avatar text="João Silva" size="md" variant="primary" />

<!-- Com status -->
<Avatar src="/avatars/maria.jpg" status="online" />

<!-- Grupo de avatares -->
<AvatarGroup :max="3">
  <Avatar v-for="user in users" :key="user.id" :src="user.avatar" />
</AvatarGroup>
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
      <h2 className="text-xl font-bold mb-4">Avatar - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Tamanhos</h3>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">JS</div>
          <span className="text-xs mt-1">sm</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">JS</div>
          <span className="text-xs mt-1">md</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">JS</div>
          <span className="text-xs mt-1">lg</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-lg">JS</div>
          <span className="text-xs mt-1">xl</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Variantes de Cor</h3>
      <div className="flex gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">AB</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{backgroundColor: '#28c76f'}}>CD</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{backgroundColor: '#ff9f43'}}>EF</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{backgroundColor: '#ea5455'}}>GH</div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{backgroundColor: '#00cfe8'}}>IJ</div>
      </div>
      
      <h3 className="font-semibold mb-2">Com Status</h3>
      <div className="flex gap-4 mb-6">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">AB</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background"></div>
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">CD</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gray-400 border-2 border-background"></div>
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">EF</div>
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-background"></div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Avatar Group</h3>
      <div className="flex -space-x-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm border-2 border-background">AB</div>
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm border-2 border-background">CD</div>
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm border-2 border-background">EF</div>
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm border-2 border-background">+5</div>
      </div>
    </div>
  ),
};
