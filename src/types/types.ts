import type { TooltipComponentFormatterCallbackParams } from "echarts";
import { RawDataItem, SeriesName } from "../data/data";
import { CSSProperties } from "react";

export type TooltipParams = TooltipComponentFormatterCallbackParams[];

export interface TooltipItem {
  axisValue?: string | number;
  value?: number | number[];
  seriesName?: string;
  marker?: string;
}

export interface BuildSeriesParams {
  data: RawDataItem[];
  periods: string[];
  activeSeries: SeriesName[];
  stackName: string;
}

export const COLORS: Record<SeriesName, string> = {
  "В программе ЦП": "#56B9F2",
  "В программе ИТ": "#0078D2",
  "Вне программ ЦП": "#22C38E",
  "Вне программ ИТ": "#00724C",
};

export interface IOnEvents {
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