import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ToastificationContent
 * 
 * **Origem**: `educacross-frontoffice/src/@core/toastification/ToastificationContent.vue`
 * 
 * Componente de conteúdo para toasts/notificações do sistema.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `title` | `string` | - | Título do toast |
 * | `text` | `string` | '' | Texto/descrição |
 * | `variant` | `string` | 'primary' | Cor do toast |
 * | `icon` | `string` | null | Ícone Feather |
 * | `hideClose` | `boolean` | false | Esconder botão fechar |
 * 
 * ## Variantes
 * 
 * - `success` - Ação concluída com sucesso
 * - `danger` - Erro ou falha
 * - `warning` - Aviso
 * - `info` - Informação
 * - `primary` - Neutro/default
 * 
 * ## Uso com vue-toastification
 * 
 * ```javascript
 * import { useToast } from 'vue-toastification'
 * 
 * const toast = useToast()
 * toast({
 *   component: ToastificationContent,
 *   props: {
 *     title: 'Sucesso!',
 *     text: 'Dados salvos com sucesso',
 *     variant: 'success',
 *     icon: 'check-circle'
 *   }
 * })
 * ```
 * 
 * @see Frontoffice: src/@core/toastification/ToastificationContent.vue
 */

const meta: Meta = {
  title: "Frontoffice/Feedback/ToastificationContent",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ToastificationContent

Conteúdo customizado para toasts do Frontoffice.

### Arquivo Original
\`educacross-frontoffice/src/@core/toastification/ToastificationContent.vue\`

### Uso no Vue
\`\`\`javascript
import { useToast } from 'vue-toastification'
import ToastificationContent from '@core/toastification/ToastificationContent.vue'

const toast = useToast()

// Toast de sucesso
toast({
  component: ToastificationContent,
  props: {
    title: 'Sucesso!',
    text: 'Dados salvos com sucesso',
    variant: 'success',
    icon: 'check-circle'
  }
})

// Toast de erro
toast({
  component: ToastificationContent,
  props: {
    title: 'Erro!',
    text: 'Não foi possível salvar os dados',
    variant: 'danger',
    icon: 'x-circle'
  }
})
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
      <h2 className="text-xl font-bold mb-4">ToastificationContent - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Variantes</h3>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 p-3 rounded" style={{backgroundColor: 'rgba(40, 199, 111, 0.12)', borderLeft: '4px solid #28c76f'}}>
          <span className="font-medium" style={{color: '#28c76f'}}>✓ Sucesso!</span>
          <span className="text-sm text-muted-foreground">Dados salvos com sucesso</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded" style={{backgroundColor: 'rgba(234, 84, 85, 0.12)', borderLeft: '4px solid #ea5455'}}>
          <span className="font-medium" style={{color: '#ea5455'}}>✕ Erro!</span>
          <span className="text-sm text-muted-foreground">Não foi possível completar a ação</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded" style={{backgroundColor: 'rgba(255, 159, 67, 0.12)', borderLeft: '4px solid #ff9f43'}}>
          <span className="font-medium" style={{color: '#ff9f43'}}>⚠ Atenção!</span>
          <span className="text-sm text-muted-foreground">Verifique os dados antes de continuar</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded" style={{backgroundColor: 'rgba(0, 207, 232, 0.12)', borderLeft: '4px solid #00cfe8'}}>
          <span className="font-medium" style={{color: '#00cfe8'}}>ℹ Info</span>
          <span className="text-sm text-muted-foreground">Nova versão disponível</span>
        </div>
      </div>
      
      <h3 className="font-semibold mb-2">Props</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Prop</th>
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">title</td><td className="border border-border p-2">string</td><td className="border border-border p-2">Título do toast</td></tr>
          <tr><td className="border border-border p-2">text</td><td className="border border-border p-2">string</td><td className="border border-border p-2">Descrição</td></tr>
          <tr><td className="border border-border p-2">variant</td><td className="border border-border p-2">string</td><td className="border border-border p-2">success, danger, warning, info, primary</td></tr>
          <tr><td className="border border-border p-2">icon</td><td className="border border-border p-2">string</td><td className="border border-border p-2">Ícone Feather</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
