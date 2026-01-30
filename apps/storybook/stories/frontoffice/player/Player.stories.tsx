import type { Meta, StoryObj } from "@storybook/react";

/**
 * # Player (Audio/Video)
 * 
 * **Origem**: `educacross-frontoffice/src/components/player/Player.vue`
 * 
 * Player de mídia para reproduzir áudio e vídeo nos jogos educativos.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `src` | `string` | - | URL do arquivo de mídia |
 * | `type` | `string` | 'audio' | 'audio' ou 'video' |
 * | `autoplay` | `boolean` | false | Iniciar automaticamente |
 * | `loop` | `boolean` | false | Repetir |
 * | `showControls` | `boolean` | true | Mostrar controles |
 * | `poster` | `string` | null | Imagem de capa (vídeo) |
 * 
 * ## Eventos
 * 
 * - `@play` - Quando começa a reproduzir
 * - `@pause` - Quando pausa
 * - `@ended` - Quando termina
 * - `@timeupdate` - Atualização de tempo
 * - `@error` - Erro de carregamento
 * 
 * @see Frontoffice: src/components/player/Player.vue
 */

const meta: Meta = {
  title: "Frontoffice/Player/Player",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: Player

Player de áudio/vídeo para conteúdo educativo.

### Arquivo Original
\`educacross-frontoffice/src/components/player/Player.vue\`

### Uso no Vue
\`\`\`vue
<!-- Player de Áudio -->
<Player
  src="/audios/musica.mp3"
  type="audio"
  @ended="onAudioEnded"
/>

<!-- Player de Vídeo -->
<Player
  src="/videos/explicacao.mp4"
  type="video"
  poster="/thumbnails/video.jpg"
  :autoplay="false"
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
      <h2 className="text-xl font-bold mb-4">Player - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Tipos de Player</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">🎵 Audio Player</h4>
          <div className="bg-muted rounded-lg p-3 flex items-center gap-3">
            <button className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">▶</button>
            <div className="flex-1">
              <div className="h-2 bg-background rounded-full">
                <div className="w-1/3 h-full bg-primary rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>
            <span className="text-sm">🔊</span>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">🎬 Video Player</h4>
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative">
            <span className="text-white text-4xl">▶</span>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2">
              <div className="h-1 bg-white/30 rounded-full">
                <div className="w-1/4 h-full bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Eventos</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Evento</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">@play</td><td className="border border-border p-2">Início da reprodução</td></tr>
          <tr><td className="border border-border p-2">@pause</td><td className="border border-border p-2">Pausa</td></tr>
          <tr><td className="border border-border p-2">@ended</td><td className="border border-border p-2">Fim da mídia</td></tr>
          <tr><td className="border border-border p-2">@timeupdate</td><td className="border border-border p-2">Atualização de tempo</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
