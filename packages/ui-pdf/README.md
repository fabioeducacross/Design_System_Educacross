# @fabioeducacross/ui-pdf

Componentes de geração de PDF do Educacross Design System.

## 📦 Instalação

```bash
pnpm add @fabioeducacross/ui-pdf @fabioeducacross/ui jspdf html2canvas
```

## 🎯 Componentes

### Certificados
- **CertificateTemplate**: Template base de certificado
- **CertificateModern**: Certificado moderno
- **CertificateClassic**: Certificado clássico
- **CertificateMinimal**: Certificado minimalista
- **CertificateGenerator**: Gerador de certificados
- **CertificatePreview**: Preview antes do download

### Relatórios de Performance
- **PerformanceReport**: Relatório completo de desempenho
- **GradeReport**: Relatório de notas
- **AttendanceReport**: Relatório de frequência
- **ProgressReport**: Relatório de progresso
- **ComparisonReport**: Relatório comparativo
- **ExportToPDF**: Utilitário de exportação

### Relatórios de Eventos
- **EventCertificate**: Certificado de evento
- **EventSummary**: Resumo de evento
- **ParticipantList**: Lista de participantes
- **EventSchedule**: Programação de evento
- **EventStats**: Estatísticas de evento

## 🚀 Uso

```tsx
import { CertificateModern, PerformanceReport, usePDFExport } from "@fabioeducacross/ui-pdf";

function CertificatePage() {
  const { generatePDF, isGenerating } = usePDFExport();
  
  return (
    <>
      <CertificateModern
        studentName="João Silva"
        courseName="React Avançado"
        completionDate={new Date()}
        grade={9.5}
        onDownload={(element) => generatePDF(element, "certificado.pdf")}
      />
      
      <PerformanceReport
        student={{
          name: "Maria Santos",
          grades: [8.5, 9.0, 8.8],
          attendance: 95,
        }}
        onExport={(data) => generatePDF(data, "relatorio.pdf")}
      />
    </>
  );
}
```

## 📚 Documentação

Consulte o Storybook para exemplos interativos e documentação completa.

## 🔗 Dependências

Este pacote depende de:
- `@fabioeducacross/ui` (componentes base)
- `react` ^18.3.0
- `jspdf` ^2.5.2 (peer) - Geração de PDF
- `html2canvas` ^1.4.1 (peer) - Conversão HTML→Canvas→PDF

## 🎨 Features

- ✅ Templates de certificado customizáveis
- ✅ Geração de relatórios complexos
- ✅ Preview antes do download
- ✅ Suporte a imagens e logos
- ✅ Fontes customizadas
- ✅ Orientação retrato e paisagem
- ✅ Multi-página automático
- ✅ Qualidade de impressão otimizada

## 📝 Status

**Planejado** - Aguardando Phase 4/5 da expansão 100% Coverage.
