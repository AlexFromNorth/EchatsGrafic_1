import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { CSSProperties } from 'react';

import { forceResizeCharts } from './utilsForCharts';

interface IOnEvents {
  type: string;
  func: (params: any) => void;
}

export interface ReactEChartsProps {
  option: any;
  onEvents?: IOnEvents;
  style?: CSSProperties;
  settings?: echarts.SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  forceResize?: boolean;
}

export function ReactECharts({
  option,
  onEvents,
  style,
  settings,
  loading,
  theme,
  forceResize = true,
}: ReactEChartsProps): React.ReactElement { // Изменили JSX.Element на React.ReactElement
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    let chart: echarts.ECharts | undefined;

    if (chartRef.current) {
      chart = echarts.init(chartRef.current, theme);
      chartInstanceRef.current = chart;
    }

    function resizeChart() {
      chart?.resize();
    }

    window.addEventListener('resize', resizeChart);

    let observer: MutationObserver | undefined;
    if (forceResize) observer = forceResizeCharts(resizeChart);

    return () => {
      chart?.dispose();
      chartInstanceRef.current = null;
      window.removeEventListener('resize', resizeChart);
      observer?.disconnect();
    };
  }, [theme, forceResize]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    if (!chart) return;
    
    chart.setOption(option, settings);

    if (onEvents) {
      chart.on(onEvents.type, params => {
        onEvents.func(params);
      });
    }
  }, [option, settings, onEvents]);

  useEffect(() => {
    const chart = chartInstanceRef.current;
    if (!chart) return;
    
    loading ? chart.showLoading() : chart.hideLoading();
  }, [loading]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
}