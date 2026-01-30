import type { Meta, StoryObj } from "@storybook/react";

/**
 * # AlbumCover
 * 
 * **Origem**: `educacross-frontoffice/src/components/player/AlbumCover.vue`
 * 
 * Capa de álbum/música com animação para o player de áudio.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `src` | `string` | - | URL da imagem da capa |
 * | `alt` | `string` | '' | Texto alternativo |
 * | `playing` | `boolean` | false | Se está tocando (anima) |
 * | `size` | `string` | 'md' | Tamanho (sm, md, lg) |
 * 
 * ## Animação
 * 
 * Quando `playing=true`, a capa gira lentamente (efeito disco).
 * 
 * @see Frontoffice: src/components/player/AlbumCover.vue
 */

const meta: Meta = {
  title: "Frontoffice/Player/AlbumCover",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: AlbumCover

Capa de álbum animada para player de áudio.

### Arquivo Original
\`educacross-frontoffice/src/components/player/AlbumCover.vue\`

### Uso no Vue
\`\`\`vue
<AlbumCover
  src="/covers/musica.jpg"
  alt="Música das Vogais"
  :playing="isPlaying"
  size="lg"
/>
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
      <h2 className="text-xl font-bold mb-4">AlbumCover - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Tamanhos</h3>
      <div className="flex items-end gap-4 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg">🎵</div>
          <span className="text-xs mt-2">sm</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl shadow-lg">🎵</div>
          <span className="text-xs mt-2">md</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-4xl shadow-lg">🎵</div>
          <span className="text-xs mt-2">lg</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Estados</h3>
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-3xl shadow-lg opacity-70">⏸️</div>
          <span className="text-xs mt-2">pausado</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl shadow-lg animate-spin" style={{animationDuration: '3s'}}>🎵</div>
          <span className="text-xs mt-2">tocando (gira)</span>
        </div>
      </div>
    </div>
  ),
};
