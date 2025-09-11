import { useContext } from "react";
import SkillContext from "../context/Context";

function SkillCard({ color }) {
  const { skill } = useContext(SkillContext);
  const title = skill.skillName;
  const days = 1;
  const hour = skill.hours;
  const remaining = skill.hours;
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
        <div className="flex justify-center items-center gap-1 text-gray-400 text-sm">
          <img className="w-4 text-gray-400 " src="./src/assets/calender.svg" />
          {skill.Date}
        </div>
      </div>

      <div className="flex justify-center items-center mb-6">
        <div className="w-full bg-[#2b313f] rounded-4xl h-3 overflow-hidden">
          <div
            className={"h-full  w-1/3 flex items-center"}
            style={{ backgroundColor: `#${color}` }}
          ></div>
        </div>

        <p className="text-sm m-0 pl-2 text-white">26%</p>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <div>
          <span className="text-gray-400">Goal: </span> {hour}h
        </div>
        <div>
          <span className="text-gray-400">Remaining:</span> {remaining}h
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
