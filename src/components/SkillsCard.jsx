function SkillCard({ color }) {
  const title = "Full Stack Dev";
  const days = 1;
  const hours = 260;
  const totalHours = 10000;
  const remaining = 740;
  const dailyAvg = 7;

  return (
    <div className="w-100 mt-5 p-6 rounded-lg shadow-md  bg-[#1e232d]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div
          className={"h-4 w-4 rounded-2xl"}
          style={{ backgroundColor: `#${color}` }}
        ></div>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-sm text-black mb-2 bg-white rounded-sm px-1">
          {hours} / {totalHours.toLocaleString()}h
        </p>
      </div>

      <div className="flex justify-center items-center mb-6">
        <div className="w-full bg-[#2b313f] rounded-4xl h-3 overflow-hidden">
          <div
            className={"h-full  w-1/3 flex items-center"}
            style={{ backgroundColor: `#${color}` }}
          ></div>
        </div>

        <p class="text-sm m-0 pl-2 text-white">26%</p>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <div>
          <span className="text-gray-400">Remaining:</span> {remaining}h
        </div>
        <div>
          <span className="text-gray-400">Daily Avg:</span> {dailyAvg}h
        </div>
      </div>

      <button
        className={
          "cursor-pointer w-full text-[16px] bg py-2 rounded-md font-semibold"
        }
        style={{ backgroundColor: `#${color}` }}
      >
        Log Hours
      </button>
    </div>
  );
}

export default SkillCard;
