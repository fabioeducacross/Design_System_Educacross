import * as React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { cn } from "../../utils";

export interface ChartBarDataSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface ChartBarData {
  series?: ChartBarDataSeries[];
  chartColumnLabel?: string[];
}

export interface ChartBarProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: ChartBarData;
  height?: number;
  chartYLabels?: string[];
}

/**
 * Gráfico de barras horizontais com fallback para séries vazias.
 * Mantém a lógica de `BarChart.vue` (frontoffice) com tooltips percentuais.
 */
export const ChartBar = React.forwardRef<HTMLDivElement, ChartBarProps>(
  ({ data, height = 235, chartYLabels = [], className, ...props }, ref) => {
    const getSafeSeries = React.useCallback((d?: ChartBarData): ChartBarDataSeries[] => {
      if (Array.isArray(d?.series) && d.series.length > 0 && Array.isArray(d.series[0]?.data)) {
        return d.series;
      }
      return [
        {
          name: "Sem dados",
          data: [0],
          color: "#D8D6DE",
        },
      ];
    }, []);

    const getSafeCategories = React.useCallback((d?: ChartBarData): string[] => {
      if (Array.isArray(d?.chartColumnLabel) && d.chartColumnLabel.length > 0) {
        return d.chartColumnLabel;
      }
      return [""];
    }, []);

    const [series, setSeries] = React.useState<ChartBarDataSeries[]>(getSafeSeries(data));
    const [categories, setCategories] = React.useState<string[]>(getSafeCategories(data));

    const options = React.useMemo(() => {
      const opts: ApexOptions = {
        series,
        chart: {
          type: "bar",
          height: 430,
          toolbar: { show: false },
          fontFamily: "Montserrat",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: { position: "top" },
            borderRadius: 4,
            barHeight: `${series.length * (categories.length * 10)}%`,
          },
        },
        grid: {
          show: true,
          xaxis: { lines: { show: true } },
          yaxis: { lines: { show: false } },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: "top",
          horizontalAlign: "left",
          markers: { size: 8, shape: "circle" },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 4, colors: ["transparent"] },
        tooltip: {
          enabled: chartYLabels.length > 0,
          shared: true,
          intersect: false,
          y: {
            formatter(value: number) {
              return `${value}%`.replace(".", ",");
            },
          },
          x: {
            show: true,
            formatter: (value: number, { dataPointIndex }: any) => {
              return chartYLabels[dataPointIndex] ?? "";
            },
          },
        },
        xaxis: {
          categories,
          tickAmount: 4,
          min: 0,
          max: 100,
          range: 25,
          labels: {
            formatter: value => `${value}%`,
          },
        },
        yaxis: {},
      };
      return opts;
    }, [categories, chartYLabels, series]);

    // Atualiza quando o prop "data" muda
    React.useEffect(() => {
      const safeSeries = getSafeSeries(data);
      const safeCategories = getSafeCategories(data);
      setSeries(safeSeries);
      setCategories(safeCategories);
    }, [data, getSafeCategories, getSafeSeries]);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ReactApexChart options={options} series={series} height={height} type="bar" />
      </div>
    );
  }
);

ChartBar.displayName = "ChartBar";

export default ChartBar;
