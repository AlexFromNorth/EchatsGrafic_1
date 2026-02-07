import { TooltipItem } from "../../types/types";

export function tooltipFormatter(params: TooltipItem[] | TooltipItem): string {
  const items = Array.isArray(params) ? params : [params];

  const period = String(items[0]?.axisValue ?? "");

  let programTotal = 0;
  let outsideTotal = 0;

  const programItems: TooltipItem[] = [];
  const outsideItems: TooltipItem[] = [];

  items.forEach((p) => {
    const value = typeof p.value === "number" ? p.value : 0;

    if (value > 0 && p.seriesName) {
      if (p.seriesName.includes("В программе")) {
        programTotal += value;
        programItems.push(p);
      } else if (p.seriesName.includes("Вне программ")) {
        outsideTotal += value;
        outsideItems.push(p);
      }
    }
  });

  const total = programTotal + outsideTotal;

  let result = `<b>${period} 2022</b><br/>`;

  if (programTotal > 0) {
    const percent = total > 0 ? Math.round((programTotal / total) * 100) : 0;

    result += `<div>
      <b>В программе:</b> ${percent}% | ${programTotal} шт.
    </div>`;

    programItems.forEach((p) => {
      result += `<div style="margin-left:16px">
        ${p.marker ?? ""} ${p.seriesName}: <b>${p.value}</b>
      </div>`;
    });
  }

  if (programTotal > 0 && outsideTotal > 0) {
    result += `<hr style="margin:6px 0;border:none;border-top:1px solid #eee;" />`;
  }

  if (outsideTotal > 0) {
    const percent = total > 0 ? Math.round((outsideTotal / total) * 100) : 0;

    result += `<div>
      <b>Вне программ:</b> ${percent}% | ${outsideTotal} шт.
    </div>`;

    outsideItems.forEach((p) => {
      result += `<div style="margin-left:16px">
        ${p.marker ?? ""} ${p.seriesName}: <b>${p.value}</b>
      </div>`;
    });
  }

  return result;
}
