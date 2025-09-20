import { themes } from "../themes/theme";
import { useContext, useState } from "react";
import SkillContext from "../context/Context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//Firebase imports
import { useAuth } from "../context/AuthContext";
import { updateData, delData } from "../firebase/db";

function SkillCard({ skillsList }) {
  const { setSkill } = useContext(SkillContext);
  const skillId = skillsList.id;

  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  const [inputHours, setInputHours] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [open, setOpen] = useState(false);

  //for updating the logged hours
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSkill((prev) =>
      prev.map(
        (currentSkill) =>
          // ID MATCHING: check if current skill matches the target skill ID
          // Without this check, All skillsList would get updated (logged hours)
          currentSkill.id === skillsList.id
            ? {
                // MATCH FOUND: Update this skill
                ...currentSkill,
                inputHours: (currentSkill.inputHours || 0) + inputHours, // Add new hours to existing hours
              } // (currentSkill.inputHours || 0) handles case where inputHours might not be defined (probably in start)
            : currentSkill // if not matched: Return skill unchanged
      )
    );
    setShowInput(false);
    try {
      await updateData(String(userId), String(skillId), inputHours);
    } catch (error) {
      console.error("Failed to update Firestore:", error);
    }
    setInputHours(0);
  };

  const handleDeleteSkill = async () => {
    setSkill((prev) => prev.filter((s) => s.id !== skillsList.id));
    try {
      await delData(String(userId), String(skillId));
    } catch (error) {
      console.error(error);
    }
  };

  const title = skillsList.skillName;
  const hours = skillsList.hours;
  const logged_hours = skillsList.inputHours || 0;
  const remaining = hours - logged_hours || 0;
  const theme = skillsList.theme;
  const percentage = (logged_hours * 100) / hours || 0;
  const fillWidth = (logged_hours * 315) / hours || 0;

  return (
    <div className="w-100 max-[1676px]:w-full mt-5 p-6 rounded-lg shadow-md bg-[#1e232d]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="cursor-pointer">
              <img className="size-[20px]" src="/moreBtn.svg" />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-1 m-0">
              <button
                onClick={handleDeleteSkill}
                className=" outline-none cursor-pointer hover:bg-red-500 rounded-sm px-2 py-1"
              >
                Delete
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex justify-center items-center gap-1 text-gray-400 text-sm">
          <img className="w-4 text-gray-400 " src="/calender.svg" />
          {skillsList.Date}
        </div>
      </div>

      <div className="flex justify-center items-center mb-6">
        <div className="w-full bg-[#2b313f] rounded-4xl h-3 overflow-hidden ">
          <div
            className={`h-full flex items-center`}
            style={{
              backgroundColor: themes[theme]?.shade3 || "transparent",
              width: `${fillWidth}px`,
            }}
          ></div>
        </div>

        <p className="text-sm m-0 pl-2 text-white">{percentage}%</p>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <div>
          <span className="text-gray-400">Logged Hours: </span> {logged_hours}h
        </div>
        <div>
          <span className="text-gray-400">Remaining:</span> {remaining}h
        </div>
      </div>

      {showInput ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            max={10000}
            min={0}
            value={inputHours}
            onChange={(e) => setInputHours(Number(e.target.value))}
            type="number"
            className="w-full p-2 rounded-md bg-[#2b313f] outline-0 border border-gray-600 text-sm"
          />
          <button
            type="submit"
            className={"cursor-pointer px-4 rounded-md font-semibold "}
            style={{ backgroundColor: themes[theme]?.shade3 || "transparent" }}
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
          style={{ backgroundColor: themes[theme]?.shade3 || "transparent" }}
        >
          Log Hours
        </button>
      )}
    </div>
  );
}

export default SkillCard;
