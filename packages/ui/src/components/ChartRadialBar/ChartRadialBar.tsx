import * as React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { cn } from "../../utils";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value);

export interface ChartRadialBarProps extends React.HTMLAttributes<HTMLDivElement> {
  chartSeries: number[];
  seriesColors?: string[];
  heightSize?: number;
  showTotalLabel?: boolean;
  labels?: string[];
  labelColor?: string;
  totalLabelColor?: string;
}

/**
 * RadialBar multi-série com label total, seguindo o `RadialBarChart.vue`.
 */
export const ChartRadialBar = React.forwardRef<HTMLDivElement, ChartRadialBarProps>(
  (
    {
      chartSeries,
      seriesColors = ["hsl(var(--info))", "hsl(var(--primary))"],
      heightSize = 200,
      showTotalLabel = true,
      labels = ["Iniciaram", "Finalizaram"],
      labelColor = "#6E6B7B",
      totalLabelColor = "#6E6B7B",
      className,
      ...props
    },
    ref
  ) => {
    const options = React.useMemo<ApexOptions>(() => {
      return {
        colors: seriesColors,
        chart: { type: "radialBar", height: heightSize, fontFamily: "Montserrat" },
        plotOptions: {
          radialBar: {
            hollow: { margin: 5, size: "50%", background: "transparent" },
            dataLabels: {
              name: { color: labelColor, offsetY: -8 },
              value: {
                fontSize: "18px",
                color: labelColor,
                offsetY: -4,
                formatter(val: number) {
                  return `${formatNumber(val)}%`;
                },
              },
              total: {
                show: showTotalLabel,
                fontSize: "10px",
                fontWeight: 400,
                color: totalLabelColor,
                label: labels[0],
                formatter: () => `${formatNumber(chartSeries[0] ?? 0)}%`,
              },
            },
          },
        },
        stroke: { lineCap: "round" },
        labels,
      };
    }, [chartSeries, labelColor, labels, seriesColors, showTotalLabel, totalLabelColor, heightSize]);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ReactApexChart options={options} series={chartSeries} type="radialBar" height={heightSize} />
      </div>
    );
  }
);

ChartRadialBar.displayName = "ChartRadialBar";

export default ChartRadialBar;
