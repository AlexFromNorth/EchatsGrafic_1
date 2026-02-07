import React, { useMemo, useState } from "react";
import { data, SeriesName } from "./data/data";
// import { buildStackedBarOption } from './utils/buildStackedBarOption';
import { ReactECharts } from "./charts/ReactECharts";
import { buildStackedBarOption } from "./utils/chart/buildStackedBarOption";
import { COLORS } from "./types/types";

const SERIES: SeriesName[] = ["В программе ЦП", "В программе ИТ", "Вне программ ЦП", "Вне программ ИТ"];

function App() {
  const [active, setActive] = useState<SeriesName[]>(SERIES);
  const [chartKey, setChartKey] = useState(0); // Добавляем key для принудительного ререндера

  const toggle = (name: SeriesName) => {
    // console.log('Toggle:', name);

    setActive((prev) => {
      const newActive = prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name];
      // console.log('New active:', newActive);

      // Принудительно обновляем key чтобы пересоздать компонент графика
      setChartKey((prev) => prev + 1);

      return newActive;
    });
  };

  const option = buildStackedBarOption(data, active);

  return (
    <div style={{ padding: 24, background: "white", borderRadius: 8 }}>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 24 }}>Проекты в программах и вне программ</p>
      <p style={{ fontSize: "1.2rem" }}>Сумма и процентное соотношение проектов, находящихся в программах и вне программ</p>

      <div style={{ height: 420 }}>
        {/* Добавляем key чтобы пересоздавать компонент */}
        <ReactECharts key={chartKey} option={option} />
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {SERIES.map((item) => (
          <button
            key={item}
            style={{
              padding: "8px 16px",
              border: "0",
              background: "transparent",
              color: "#333",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => toggle(item)}
          >
            {/* Просто цветной символ ● */}
            <span
              style={{
                color: active.includes(item) ? COLORS[item] : "#ccc",
                marginRight: "6px",
                fontSize: "14px",
              }}
            >
              {active.includes(item) ? "●" : "○"}
            </span>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
