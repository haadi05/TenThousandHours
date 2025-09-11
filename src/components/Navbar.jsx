import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#161b22] text-white px-18 py-4 flex justify-between items-center">
      <div>
        <p className="text-3xl font-bold">Ten Thousand Hours</p>
        <p className="text-[18px] font-normal text-[#a2a2a2]">
          Track. Improve. Master
          {/* Every master was once a beginner */}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <NavLink
          to={"/addskills"}
          className="cursor-pointer text-black bg-gray-100 px-3 py-1 text-[16px] rounded-md"
        >
          + Add Skill
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
