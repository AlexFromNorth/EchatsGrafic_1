export function forceResizeCharts(fn: Function) {
  const observer = new MutationObserver(() => fn());
  observer.observe(document.body, { attributes: true });
  return observer;
}
