import CalendarHeatmap from "react-calendar-heatmap";
import "../index.css";

function Heatmap({ practicedHours, activeDays }) {
  return (
    <div className="w-full mt-5 bg-[#1e232d] rounded-lg px-8 py-[21px]">
      <div className="">
        <CalendarHeatmap
          startDate={new Date("2025-01-01")}
          endDate={new Date("2025-12-31")}
          gutterSize={1}
          values={[
            { date: "2025-01-01", count: 1 },
            { date: "2025-01-22", count: 4 },
            { date: "2025-06-30", count: 10 },
            { date: "2025-05-3", count: 23 },
            { date: "2025-04-23", count: 1 },
            { date: "2025-06-23", count: 1 },
            { date: "2025-07-3", count: 1 },
            { date: "2025-04-27", count: 1 },
            { date: "2025-04-9", count: 1 },
            { date: "2025-08-31", count: 1 },
            { date: "2025-05-21", count: 1 },
          ]}
        />
      </div>
      <div className="flex mt-3 justify-between">
        <p className="text-xs text-gray-400">Your Activity</p>
        <div className="flex justify-center items-center gap-2">
          <span className="text-xs text-gray-400">Less</span>
          <div className="flex gap-1 [&>*]:rounded-full [&>*]:w-3 [&>*]:h-3">
            <span className="bg-blue-300"></span>
            <span className="bg-blue-400"></span>
            <span className="bg-blue-500"></span>
            <span className="bg-blue-600"></span>
            <span className="bg-blue-800"></span>
          </div>
          <span className="text-xs text-gray-400 ">More</span>
        </div>
      </div>
    </div>
  );
}

export default Heatmap;
