import type { BarSeriesOption } from "echarts";
import { BuildSeriesParams, COLORS } from "../../types/types";

export function buildStackedSeries({ data, periods, activeSeries, stackName }: BuildSeriesParams): BarSeriesOption[] {
  return activeSeries.map((name, index) => {
    const values = periods.map((p) => data.find((d) => d.period === p && d.name === name)?.value || 0);

    const isLast = index === activeSeries.length - 1;

    return {
      name,
      type: "bar",
      stack: stackName,
      data: values,
      itemStyle: { color: COLORS[name] },
      label: {
        show: isLast,
        position: "top",
        fontSize: 12,
        fontWeight: "bold",
        formatter: (params) => {
          if (!isLast) return "";

          const i = params.dataIndex;
          const period = periods[i];

          const sum = activeSeries.reduce(
            (acc, s) => acc + (data.find((d) => d.period === period && d.name === s)?.value || 0),
            0,
          );

          return sum > 0 ? String(sum) : "";
        },
      },
    };
  });
}
