import { SkillsCard, NewHeatMap } from "../index.js";

function Dashboard() {
  return (
    <>
      <p className="ml-18 mt-4 text-2xl text-gray-400">Your Skills</p>
      <div className="flex mx-18 gap-4">
        <SkillsCard />
        <NewHeatMap color={"#fff"} />
      </div>
    </>
  );
}

export default Dashboard;
