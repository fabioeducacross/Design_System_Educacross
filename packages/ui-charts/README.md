# @fabioeducacross/ui-charts

Componentes de gráficos e visualização de dados do Educacross Design System.

## 📦 Instalação

```bash
pnpm add @fabioeducacross/ui-charts @fabioeducacross/ui apexcharts echarts
```

## 🎯 Componentes

### ApexCharts Wrappers
- **ChartLine**: Gráfico de linhas
- **ChartArea**: Gráfico de área
- **ChartBar**: Gráfico de barras
- **ChartColumn**: Gráfico de colunas
- **ChartPie**: Gráfico de pizza
- **ChartDonut**: Gráfico de rosca (donut)
- **ChartRadialBar**: Barra radial
- **ChartRadar**: Gráfico de radar

### ECharts Wrappers
- **EChartLine**: Linha (ECharts)
- **EChartBar**: Barra (ECharts)
- **EChartScatter**: Dispersão
- **EChartHeatmap**: Mapa de calor
- **EChartTreeMap**: TreeMap
- **EChartSunburst**: Sunburst

### Progress Variants
- **RangeProgressBar**: Barra de progresso com intervalos
- **RainbowProgressBar**: Barra arco-íris multi-cor
- **ProgressStat**: Progresso com estatística
- **CircularProgress**: Progresso circular

## 🚀 Uso

```tsx
import { ChartBar, ChartPie, RainbowProgressBar } from "@fabioeducacross/ui-charts";

function DashboardCharts() {
  return (
    <>
      <ChartBar 
        series={[{name: "Vendas", data: [30, 40, 35]}]}
        categories={["Jan", "Fev", "Mar"]}
      />
      
      <ChartPie 
        series={[44, 55, 13]}
        labels={["Produto A", "Produto B", "Produto C"]}
      />
      
      <RainbowProgressBar
        value={75}
        segments={[
          { color: "green", threshold: 33 },
          { color: "yellow", threshold: 66 },
          { color: "red", threshold: 100 },
        ]}
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
- `apexcharts` ^3.45.0 (peer)
- `echarts` ^5.5.0 (peer)
- `react-apexcharts` ^1.4.1
- `echarts-for-react` ^3.0.2

## 📝 Status

**Planejado** - Aguardando Phase 4/5 da expansão 100% Coverage.

Nota: Alguns componentes de charts básicos já existem em `@fabioeducacross/ui` (ChartDefault, ChartBar, ChartPie, ChartRadialBar). Este pacote consolidará e expandirá essas funcionalidades.
