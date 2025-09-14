import { useContext, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import SkillContext from "../context/Context.js";
import { themes } from "../themes/theme.js";

const value = [
  { date: "2025/01/01", count: 1 },
  { date: "2025/04/01", count: 6 },
  { date: "2025/05/01", count: 10 },
  { date: "2025/07/01", count: 15 },
];
const HeatmapGraph = () => {
  const { skill } = useContext(SkillContext);
  const theme = skill.theme;

  const [hovered, setHovered] = useState(null);

  const shades = {
    shade1: 600,
    shade2: 500,
    shade3: 400,
    shade4: 300,
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-5 bg-[#1e232d] rounded-lg p-4">
      <div>
        <HeatMap
          value={value}
          width={1150}
          height={172}
          space={5}
          rectSize={16}
          rectProps={{ rx: 4 }}
          legendCellSize={0}
          startDate={new Date("2025/01/01")}
          style={{
            color: "#ffffff",
            "--rhm-rect-active": "blue",
          }}
          panelColors={{
            0: "#414a5e", //no activity
            1: themes[theme]?.shade1 || "#414a5e",
            5: themes[theme]?.shade2 || "#414a5e",
            10: themes[theme]?.shade3 || "#414a5e",
            15: themes[theme]?.shade4 || "#414a5e",
          }}
          rectRender={(props, data) => (
            <rect
              {...props}
              onMouseEnter={(e) => {
                if (data.count > 0) {
                  const rect = e.target.getBoundingClientRect();
                  setHovered({ x: rect.x, y: rect.y, count: data.count });
                }
              }}
              onMouseLeave={() => setHovered(null)}
            />
          )}
        />
        {hovered && (
          <div
            style={{
              position: "absolute",
              top: hovered.y - 35,
              left: hovered.x - 35,
              backgroundColor: "rgba(29, 29, 29, 0.8)",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: 6,
              pointerEvents: "none",
            }}
          >
            Hours: {hovered.count}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-2 w-full ">
        <span className="text-xs text-gray-400">Less</span>
        <div className="flex gap-1 [&>*]:rounded-[4px] [&>*]:w-4 [&>*]:h-4">
          <span
            style={{
              backgroundColor: themes[theme]?.shade1 || "transparent",
            }}
          ></span>
          <span
            style={{
              backgroundColor: themes[theme]?.shade2 || "transparent",
            }}
          ></span>
          <span
            style={{
              backgroundColor: themes[theme]?.shade3 || "transparent",
            }}
          ></span>
          <span
            style={{
              backgroundColor: themes[theme]?.shade4 || "transparent",
            }}
          ></span>
          {/* <span
            style={{ backgroundColor: `rgb(var(--${color}-${shades.shade5}))` }}
          ></span> */}
        </div>
        <span className="text-xs text-gray-400 ">More</span>
      </div>
    </div>
  );
};

export default HeatmapGraph;
