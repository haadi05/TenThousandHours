import React from "react";
// import Tooltip from "@uiw/react-tooltip";
import HeatMap from "@uiw/react-heat-map";
import { useState } from "react";

const value = [
  { date: "2025/01/01", count: 6 },
  { date: "2025/04/01", count: 9 },
  { date: "2025/05/01", count: 16 },
  { date: "2025/07/01", count: 15 },
  { date: "2025/12/31", count: 30 },
];
const NewHeatMap = ({ color }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col justify-center items-center w-full mt-5 bg-[#1e232d] rounded-lg p-4">
      <div>
        <HeatMap
          value={value}
          width={1150}
          height={172}
          style={{
            color: "#ffffff",
            "--rhm-rect-active": "blue",
          }}
          legendCellSize={0}
          startDate={new Date("2025/01/01")}
          panelColors={{
            0: "#414a5e",
            5: "#acd5f2",
            10: "#7fa8d1",
            15: "#49729b",
            20: "#254e77",
          }}
          space={5}
          rectSize={16}
          rectProps={{
            rx: 4,
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
          <span style={{ backgroundColor: `${color}` }}></span>
          <span style={{ backgroundColor: `${color}` }}></span>
          <span style={{ backgroundColor: `${color}` }}></span>
          <span style={{ backgroundColor: `${color}` }}></span>
          <span style={{ backgroundColor: `${color}` }}></span>
        </div>
        <span className="text-xs text-gray-400 ">More</span>
      </div>
    </div>
  );
};

export default NewHeatMap;
