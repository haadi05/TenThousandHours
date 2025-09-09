import SkillsCard from "./SkillsCard";
import Heatmap from "./Heatmap";

function Dashboard() {
  return (
    <>
      <p className="ml-18 mt-4 text-2xl text-gray-400">Your Skills</p>
      <div className="flex mx-18 gap-4">
        <SkillsCard color="2e6cb7" />
        <Heatmap />
      </div>
    </>
  );
}

export default Dashboard;
