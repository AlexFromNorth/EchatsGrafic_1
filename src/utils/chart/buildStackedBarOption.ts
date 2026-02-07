import { RawDataItem, SeriesName } from '../../data/data';
import { roundToNearestHundred } from './math';
import { buildStackedSeries } from './seriesBuilders';
import { tooltipFormatter } from './tooltipFormatter';

export function buildStackedBarOption(
  data: RawDataItem[],
  activeSeries: SeriesName[]
) {
  const periods = Array.from(new Set(data.map(d => d.period)));

  const programSeries = activeSeries.filter(n =>
    n.includes('В программе')
  );
  const outsideSeries = activeSeries.filter(n =>
    n.includes('Вне программ')
  );

  const series = [
    ...buildStackedSeries({
      data,
      periods,
      activeSeries: programSeries,
      stackName: 'program',
    }),
    ...buildStackedSeries({
      data,
      periods,
      activeSeries: outsideSeries,
      stackName: 'outside',
    }),
  ];

  const max = Math.max(
    ...series.flatMap(s => (s.data as number[])).filter(v => v > 0),
    0
  );

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: tooltipFormatter,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: periods,
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: roundToNearestHundred(max * 1.3),
    },
    series,
  };
}
