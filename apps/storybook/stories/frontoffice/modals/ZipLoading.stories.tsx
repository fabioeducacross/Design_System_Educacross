import type { Meta, StoryObj } from "@storybook/react";

/**
 * # ZipLoading
 * 
 * **Origem**: `educacross-frontoffice/src/components/loading/ZipLoading.vue`
 * 
 * Componente de loading para operações de download/upload de arquivos ZIP.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `visible` | `boolean` | false | Controla visibilidade |
 * | `progress` | `number` | 0 | Progresso (0-100) |
 * | `message` | `string` | 'Processando...' | Mensagem |
 * | `filename` | `string` | null | Nome do arquivo |
 * | `type` | `string` | 'download' | 'download' ou 'upload' |
 * 
 * ## Uso Comum
 * 
 * - Download de relatórios em lote
 * - Export de dados
 * - Upload de planilhas
 * - Geração de PDFs
 * 
 * @see Frontoffice: src/components/loading/ZipLoading.vue
 */

const meta: Meta = {
  title: "Frontoffice/Modals/ZipLoading",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: ZipLoading

Loading overlay para operações de arquivo.

### Arquivo Original
\`educacross-frontoffice/src/components/loading/ZipLoading.vue\`

### Uso no Vue
\`\`\`vue
<ZipLoading
  v-model:visible="isDownloading"
  :progress="downloadProgress"
  message="Gerando relatório..."
  filename="relatorio-turma.zip"
  type="download"
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
      <h2 className="text-xl font-bold mb-4">ZipLoading - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Exemplo Visual</h3>
      <div className="bg-black/50 rounded-lg p-8 flex items-center justify-center">
        <div className="bg-card rounded-lg p-6 w-80 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h4 className="font-medium mb-2">Gerando relatório...</h4>
          <p className="text-sm text-muted-foreground mb-4">relatorio-turma.zip</p>
          
          <div className="w-full bg-muted h-3 rounded-full overflow-hidden mb-2">
            <div className="w-[65%] h-full bg-primary rounded-full transition-all"></div>
          </div>
          <span className="text-sm font-medium">65%</span>
        </div>
      </div>
      
      <h3 className="font-semibold mt-4 mb-2">Tipos de Operação</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-3 text-center">
          <span className="text-2xl">⬇️</span>
          <p className="text-sm mt-1">Download</p>
        </div>
        <div className="border rounded p-3 text-center">
          <span className="text-2xl">⬆️</span>
          <p className="text-sm mt-1">Upload</p>
        </div>
      </div>
    </div>
  ),
};
