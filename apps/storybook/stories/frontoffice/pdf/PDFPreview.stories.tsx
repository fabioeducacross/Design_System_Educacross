import type { Meta, StoryObj } from "@storybook/react";

/**
 * # PDFPreview
 * 
 * **Origem**: `educacross-frontoffice/src/components/pdf/PDFPreview.vue`
 * 
 * Visualizador de PDF inline.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `src` | `string` | - | URL do PDF |
 * | `page` | `number` | 1 | Página inicial |
 * | `zoom` | `number` | 100 | Zoom (%) |
 * | `showToolbar` | `boolean` | true | Mostrar toolbar |
 * | `height` | `string` | '500px' | Altura do viewer |
 * 
 * ## Componentes Relacionados
 * 
 * - PDFPreview - Visualizador básico
 * - PerformancePDFList - Lista de PDFs de desempenho
 * - PDFExport - Geração de PDFs
 * 
 * @see Frontoffice: src/components/pdf/
 */

const meta: Meta = {
  title: "Frontoffice/PDF/PDFPreview",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## Componente Vue: PDFPreview

Visualizador de PDF do Frontoffice.

### Arquivo Original
\`educacross-frontoffice/src/components/pdf/PDFPreview.vue\`

### Uso no Vue
\`\`\`vue
<PDFPreview
  src="/reports/relatorio-turma.pdf"
  :page="1"
  :zoom="100"
  height="600px"
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
      <h2 className="text-xl font-bold mb-4">PDFPreview - Documentação</h2>
      
      <h3 className="font-semibold mb-2">Estrutura do Viewer</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-2 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-background rounded">◀</button>
            <span className="text-sm">Página 1 de 5</span>
            <button className="p-1 hover:bg-background rounded">▶</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-background rounded">➖</button>
            <span className="text-sm">100%</span>
            <button className="p-1 hover:bg-background rounded">➕</button>
            <button className="p-1 hover:bg-background rounded">⬇️</button>
            <button className="p-1 hover:bg-background rounded">🖨️</button>
          </div>
        </div>
        
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <div className="bg-white shadow-lg w-48 h-56 p-4 text-center">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-sm text-muted-foreground">Relatório de Desempenho</p>
            <p className="text-xs text-muted-foreground mt-2">5º Ano A - 2024</p>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mt-4 mb-2">Componentes PDF</h3>
      <table className="w-full border-collapse border border-border text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="border border-border p-2 text-left">Componente</th>
            <th className="border border-border p-2 text-left">Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-border p-2">PDFPreview</td><td className="border border-border p-2">Visualizador inline</td></tr>
          <tr><td className="border border-border p-2">PerformancePDFList</td><td className="border border-border p-2">Lista de relatórios</td></tr>
          <tr><td className="border border-border p-2">PDFExport</td><td className="border border-border p-2">Geração de PDFs</td></tr>
          <tr><td className="border border-border p-2">PDFDownloadButton</td><td className="border border-border p-2">Botão de download</td></tr>
        </tbody>
      </table>
    </div>
  ),
};
