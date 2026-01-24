import * as React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { cn } from "../../utils";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value);

export interface ChartPieProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: {
    series?: number[];
    colors?: string[];
    tooltipLabels?: string[];
  };
  height?: number;
  tooltipSuffix?: string;
  placeholderIcon?: React.ReactNode;
}

/**
 * Gráfico de pizza com fallback visual quando todas as séries são zero.
 */
export const ChartPie = React.forwardRef<HTMLDivElement, ChartPieProps>(
  (
    {
      data,
      height = 150,
      tooltipSuffix = "",
      className,
      placeholderIcon,
      ...props
    },
    ref
  ) => {
    const series = data?.series ?? [];
    const allZero = series.length > 0 && series.every(value => value === 0);

    const options = React.useMemo<ApexOptions>(() => {
      return {
        chart: { type: "pie", height: 130, toolbar: { show: false } },
        legend: { show: false },
        colors: data?.colors ?? [],
        dataLabels: { enabled: false },
        labels: data?.tooltipLabels ?? [],
        tooltip: {
          custom: ({ series: s, seriesIndex, w }) => {
            const color = w.globals.colors[seriesIndex];
            const label = w.globals.labels[seriesIndex];
            const value = formatNumber(s[seriesIndex]);
            return `<div class="arrow_box">\n        <div class="chart-tooltip-icon rounded-full" style="border-color: ${color};"></div>\n        <span class="text-body">\n          ${label} ${value}${tooltipSuffix}\n        </span>\n      </div>`;
          },
        },
      };
    }, [data?.colors, data?.tooltipLabels, tooltipSuffix]);

    if (allZero) {
      return (
        <div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
          {placeholderIcon ?? (
            <svg width="103" height="102" viewBox="0 0 103 102" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="51.5"
                cy="51"
                r="50"
                fill="#BABFC7"
                fillOpacity="0.12"
                stroke="#D8D6DE"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ReactApexChart options={options} series={series} height={height} type="pie" />
      </div>
    );
  }
);

ChartPie.displayName = "ChartPie";

export default ChartPie;
