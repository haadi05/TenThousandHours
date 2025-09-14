import { SkillsCard, HeatmapGraph } from "../index.js";

function Dashboard() {
  return (
    <>
      <p className="ml-18 mt-4 text-2xl text-gray-400">Your Skills</p>
      <div className="flex mx-18 gap-4">
        <SkillsCard />
        <HeatmapGraph color={"#fff"} />
      </div>
    </>
  );
}

export default Dashboard;
