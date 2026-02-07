export function roundToNearestHundred(value: number): number {
  return Math.ceil(value / 100) * 100;
}
