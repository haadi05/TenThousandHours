import { SkillsCard, HeatmapGraph } from "../index.js";
import SkillContext from "../context/Context.js";
import { useContext } from "react";

function Dashboard() {
  const { skill } = useContext(SkillContext);

  return (
    <>
      <p className="ml-18 mt-4 text-2xl text-gray-400">Your Skills</p>
      {skill.map((skill) => (
        <div className="flex mx-18 gap-4" key={skill.id}>
          <SkillsCard skillsList={skill} />
          <HeatmapGraph skillsList={skill} />
        </div>
      ))}
    </>
  );
}

export default Dashboard;
