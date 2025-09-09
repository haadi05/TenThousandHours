import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AddSkills() {
  // const [open, setOpen] = useState(true);
  // if (!open) return null;

  const navigate = useNavigate();
  const ClosePopup = () => navigate("/");

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70"
      onClick={ClosePopup}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-[#1e232d] text-white p-6 rounded-xl w-[400px]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl  font-semibold">Add New Skill</h2>
          <NavLink
            to={"/"}
            // onClick={() => {
            //   setOpen(false);
            // }}
            className="cursor-pointer text-gray-400 hover:text-white text-2xl hover:bg-[#2b313f] px-2 rounded-4xl"
          >
            ✕
          </NavLink>
        </div>

        {/* Skill Name */}
        <label className="text-sm mb-1 block">Skill Name</label>
        <input
          type="text"
          placeholder="e.g. Programming, Drawing"
          className="w-full p-2 rounded-md bg-[#2b313f] border border-gray-600 text-sm mb-4"
        />

        {/* Goal Hours */}
        <label className="text-sm mb-1 block">Goal Hours</label>
        <select className="w-full p-2 rounded-md bg-[#2b313f] border border-gray-600 text-sm mb-4">
          <option>10000</option>
          <option>5000</option>
          <option>1000</option>
          <option>500</option>
          <option>100</option>
          <option>50</option>
        </select>

        {/* Start Date */}
        <label className="text-sm mb-1 block ">Start Date</label>
        <button className="w-full p-2 flex justify-between items-center rounded-md bg-[#2b313f] border-gray-600 text-sm mb-4 text-left">
          Pick Date
          <button className="cursor-pointer">
            <img src="./public/calender.svg" />
          </button>
        </button>

        {/* Theme Color */}
        <label className="text-sm mb-1 block">Theme Color</label>
        <div
          className="flex gap-2 mb-6 [&>*]:rounded [&>*]:cursor-pointer [&>*]:h-8 [&>*]:w-8 
        [&>*]:foucs:border-2 "
        >
          <div className="bg-green-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-purple-500"></div>
          <div className="bg-orange-500"></div>
          <div className="bg-pink-500"></div>
          <div className="bg-teal-500"></div>
        </div>

        {/* Submit */}
        <button className="cursor-pointer w-full text-lg text-black bg-white py-2 rounded-md font-medium">
          Add Skill
        </button>
      </div>
    </div>
  );
}
