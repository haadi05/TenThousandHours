import { useContext, useState } from "react";
import SkillContext from "../context/Context";

function SkillCard() {
  const { skill, setSkill } = useContext(SkillContext);

  const [inputHours, setInputHours] = useState(0);
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkill((prev) => ({
      ...prev,
      inputHours: (prev.inputHours || 0) + inputHours,
    }));
    setShowInput(false);
    setInputHours(0);
  };

  const title = skill.skillName;
  const hours = skill.hours;
  const logged_hours = skill.inputHours || 0;
  const remaining = hours - logged_hours || 0;
  const color = skill.color;
  const percentage = (logged_hours * 100) / hours || 0;
  const fillWidth = (logged_hours * 315) / hours || 0;

  return (
    <div className="w-100 mt-5 p-6 rounded-lg shadow-md bg-[#1e232d]">
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
        <div className="w-full bg-[#2b313f] rounded-4xl h-3 overflow-hidden ">
          <div
            className={`h-full flex items-center`}
            style={{ backgroundColor: `#${color}`, width: `${fillWidth}px` }}
          ></div>
        </div>

        <p className="text-sm m-0 pl-2 text-white">{percentage}%</p>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <div>
          <span className="text-gray-400">logged Hours: </span> {logged_hours}h
        </div>
        <div>
          <span className="text-gray-400">Remaining:</span> {remaining}h
        </div>
      </div>

      {showInput ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            max={10000}
            value={inputHours}
            onChange={(e) => setInputHours(Number(e.target.value))}
            type="number"
            className="w-full p-2 rounded-md bg-[#2b313f] outline-0 border border-gray-600 text-sm"
          />
          <button
            type="submit"
            className={"cursor-pointer px-4 rounded-md font-semibold "}
            style={{ backgroundColor: `#${color}` }}
          >
            ➜
          </button>
        </form>
      ) : null}

      {showInput ? null : (
        <button
          onClick={() => setShowInput(true)}
          className={
            "cursor-pointer w-full text-[16px] bg py-2 rounded-md font-semibold"
          }
          style={{ backgroundColor: `#${color}` }}
        >
          Log Hours
        </button>
      )}
    </div>
  );
}

export default SkillCard;
