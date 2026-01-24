import * as React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { cn } from "../../utils";

export interface ChartDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Séries numéricas (donut) */
  series: number[];
  /** Rótulos a serem exibidos na legenda e tooltip */
  labels?: string[];
  /** Paleta de cores para cada fatia */
  colors?: string[];
  /** Altura do gráfico em pixels */
  height?: number;
}

/**
 * Replica o `DefaultChart.vue` (Apex Donut) usado no frontoffice.
 * Inclui rótulo total customizado e estados responsivos.
 */
export const ChartDefault = React.forwardRef<HTMLDivElement, ChartDefaultProps>(
  ({ series, labels = ["iniciaram", "finalizaram", "não iniciaram"], colors, height = 240, className, ...props }, ref) => {
    const chartOptions = React.useMemo<ApexOptions>(() => {
      const primaryColors = colors ?? ["#28c76f66", "hsl(var(--success))", "#28c76f33"];
      const defaultLabel = series?.[1] ?? 0;

      return {
        chart: {
          type: "donut",
          toolbar: { show: false },
          fontFamily: "Montserrat",
        },
        tooltip: { enabled: false },
        dataLabels: { enabled: false },
        legend: { show: false },
        labels,
        stroke: { width: 0 },
        colors: primaryColors,
        grid: {
          padding: { right: -20, bottom: -8, left: -20 },
        },
        plotOptions: {
          pie: {
            startAngle: 10,
            donut: {
              labels: {
                show: true,
                name: {
                  offsetY: 15,
                  color: "#6E6B7B",
                  fontSize: "12px",
                },
                value: {
                  offsetY: -15,
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#6E6B7B",
                  formatter(val: string) {
                    const num = Number.parseFloat(val);
                    return `${Number.isFinite(num) ? num : 0}%`.replace(".", ",");
                  },
                },
                total: {
                  show: true,
                  offsetY: 15,
                  label: "finalizaram",
                  color: "#6E6B7B",
                  fontSize: "12px",
                  fontWeight: 400,
                  formatter() {
                    return `${defaultLabel}%`.replace(".", ",");
                  },
                },
              },
            },
          },
        },
        responsive: [
          { breakpoint: 1325, options: { chart: { height: 120 } } },
          { breakpoint: 1200, options: { chart: { height: 150 } } },
          { breakpoint: 1045, options: { chart: { height: 120 } } },
          { breakpoint: 992, options: { chart: { height: 150 } } },
          { breakpoint: 370, options: { chart: { height: 120 } } },
        ],
      };
    }, [colors, labels, series]);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ReactApexChart options={chartOptions} series={series} height={height} type="donut" />
      </div>
    );
  }
);

ChartDefault.displayName = "ChartDefault";

export default ChartDefault;
