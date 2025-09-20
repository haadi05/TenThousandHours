import { SkillsCard, HeatmapGraph } from "../index.js";
import SkillContext from "../context/Context.js";
import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const { loading, skill } = useContext(SkillContext);
  const [minLoadingTime, setMinLoadingTime] = useState(true);

  useEffect(() => {
    // Set minimum loading time of 1 second
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col mx-18 mt-4 max-[1320px]:mx-12 max-[860px]:mx-8 max-[630px]:mx-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-gray-400">Your Skills</p>
        <NavLink
          to={"addskills"}
          className="cursor-pointer  text-black bg-gray-100 px-3 py-1 text-[16px] rounded-md"
        >
          + Add Skill
        </NavLink>
      </div>
      {loading || minLoadingTime ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        skill.map((skill) => (
          <div className="flex max-[1676px]:flex-col gap-4" key={skill.id}>
            <SkillsCard skillsList={skill} />
            <HeatmapGraph skillsList={skill} />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
