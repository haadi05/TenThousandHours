import React, { useContext } from "react";
import { useState } from "react";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import SkillContext from "../context/Context.js";

export default function AddSkills() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [dropdown, setDropdown] = useState("dropdown");

  const [skillName, SetSkillName] = useState("");
  const [hours, setHours] = useState(1000);
  const [color, setColor] = useState("");

  const { setSkill } = useContext(SkillContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSkill({ skillName, hours, Date: date.toLocaleDateString() });
  };

  const navigate = useNavigate();
  const ClosePopup = () => navigate("/");

  return (
    <>
      <form onSubmit={handleSubmit}>
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
                className="cursor-pointer text-gray-400 hover:text-white text-2xl hover:bg-[#2b313f] px-2 rounded-4xl"
              >
                ✕
              </NavLink>
            </div>

            {/* Skill Name */}
            <label className="text-sm mb-1 block">Skill Name</label>
            <input
              value={skillName}
              onChange={(e) => SetSkillName(e.target.value)}
              type="text"
              // placeholder="e.g. Programming, Drawing"
              className="w-full p-2 rounded-md bg-[#2b313f] outline-0 border border-gray-600 text-sm mb-4"
            />

            <p>{skillName}</p>

            {/* Goal Hours */}
            <label className="text-sm mb-1 block">Goal Hours</label>
            <input
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Enter Your Goal"
              // defaultValue={"10000"}
              className="w-full p-2 outline-0 rounded-md bg-[#2b313f] border border-gray-600 text-sm mb-4"
            />

            {/* Start Date */}
            <label className="text-sm mb-1 block ">Start Date</label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                asChild
                className="w-full text-sm text-white p-2 flex justify-between items-center rounded-md bg-[#2b313f] border border-gray-600 mb-4 "
              >
                <Button className="hover:bg-[#3f485d]">
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout={dropdown}
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* Theme Color */}
            <label className="text-sm mb-1 block">Theme Color</label>
            <div
              className="flex gap-2 mb-6 [&>*]:rounded [&>*]:cursor-pointer [&>*]:h-8 [&>*]:w-8
        [&>*]:focus:border-gray-300 [&>*]:focus:border-1"
            >
              <button className="bg-green-500 "></button>
              <button className="bg-blue-500"></button>
              <button className="bg-purple-500"></button>
              <button className="bg-pink-500"></button>
            </div>

            {/* Submit */}
            <button
              onSubmit={handleSubmit}
              className="cursor-pointer w-full text-lg text-black bg-white py-2 rounded-md font-medium"
            >
              Add Skill
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
