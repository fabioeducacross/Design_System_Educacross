import type { Meta, StoryObj } from "@storybook/react";

/**
 * # HelpChat
 * 
 * **Origem**: `educacross-frontoffice/src/components/help/HelpChat.vue`
 * 
 * Widget de chat/suporte flutuante.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `position` | `string` | 'bottom-right' | Posição do widget |
 * | `minimized` | `boolean` | true | Iniciar minimizado |
 * | `greeting` | `string` | 'Como posso ajudar?' | Mensagem inicial |
 * | `agentName` | `string` | 'Suporte' | Nome do agente |
 * | `agentAvatar` | `string` | null | Avatar do agente |
 * 
 * ## Eventos
 * 
 * - `@message` - Nova mensagem enviada
 * - `@open` - Chat aberto
 * - `@close` - Chat fechado
 * 
 * @see Frontoffice: src/components/help/HelpChat.vue
 */

const meta: Meta = {
  title: "Frontoffice/Layout/HelpChat",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: HelpChat

Widget de chat de suporte.

### Arquivo Original
\`educacross-frontoffice/src/components/help/HelpChat.vue\`

### Uso no Vue
\`\`\`vue
<HelpChat
  position="bottom-right"
  :minimized="chatMinimized"
  greeting="Olá! Como posso ajudar?"
  agent-name="Edu - Suporte"
  @message="handleMessage"
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
      <h2 className="text-xl font-bold mb-4">HelpChat - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estados</h3>
      <div className="flex gap-8 items-end">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl shadow-lg cursor-pointer hover:scale-105 transition-transform">
            💬
          </div>
          <span className="text-xs mt-2">Minimizado</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-80 border rounded-lg shadow-lg overflow-hidden">
            <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">🤖</div>
                <div>
                  <p className="font-medium text-sm">Edu - Suporte</p>
                  <p className="text-xs opacity-75">Online</p>
                </div>
              </div>
              <button className="hover:bg-white/10 p-1 rounded">✕</button>
            </div>
            
            <div className="h-48 bg-muted/50 p-3 space-y-2">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">E</div>
                <div className="bg-card border rounded-lg p-2 text-sm max-w-[80%]">
                  Olá! Como posso ajudar? 😊
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-2 text-sm max-w-[80%]">
                  Como vejo o relatório da turma?
                </div>
              </div>
            </div>
            
            <div className="p-2 border-t flex gap-2">
              <input 
                type="text" 
                placeholder="Digite sua mensagem..." 
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <button className="px-3 py-2 bg-primary text-primary-foreground rounded">➤</button>
            </div>
          </div>
          <span className="text-xs mt-2">Expandido</span>
        </div>
      </div>
    </div>
  ),
};
