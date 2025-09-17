import { SkillsCard, HeatmapGraph } from "../index.js";
import SkillContext from "../context/Context.js";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const { skill } = useContext(SkillContext);

  return (
    <div className="flex flex-col mx-18 mt-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-gray-400">Your Skills</p>
        <NavLink
          to={"addskills"}
          className="cursor-pointer text-black bg-gray-100 px-3 py-1 text-[16px] rounded-md"
        >
          + Add Skill
        </NavLink>
      </div>
      {skill.map((skill) => (
        <div className="flex gap-4" key={skill.id}>
          <SkillsCard skillsList={skill} />
          <HeatmapGraph skillsList={skill} />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
