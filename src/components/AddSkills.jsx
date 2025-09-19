import { themes } from "../themes/theme.js";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import SkillContext from "../context/Context.js";
//Firebase imports
import { setData } from "../firebase/db.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AddSkills() {
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  //---
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [dropdown, setDropdown] = useState("dropdown");
  const [skillName, SetSkillName] = useState("");
  const [hours, setHours] = useState(10000);
  const [theme, setTheme] = useState("teal");

  const navigate = useNavigate();
  const ClosePopup = () => navigate("/dashboard");

  const { setSkill } = useContext(SkillContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSkillObj = {
      id: Date.now(), // Add unique ID
      skillName,
      hours,
      theme,
      Date: date.toLocaleDateString(),
    };

    // Add to the new skills array in context
    setSkill((prev) => [...prev, newSkillObj]);
    ClosePopup();

    try {
      await setData(userId, newSkillObj, String(newSkillObj.id));
      console.log("Success");
    } catch (error) {
      console.error("Failed: ", error);
      //Roll back if it fails to send obj to FireStore
      setSkill((prev) => prev.filter((skill) => skill.id !== newSkillObj.id));
    }
  };

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
                to={"/dashboard"}
                className="cursor-pointer text-gray-400 hover:text-white text-2xl rounded-4xl"
              >
                ✕
              </NavLink>
            </div>

            {/* Skill Name */}
            <label className="text-sm mb-1 block">Skill Name</label>
            <input
              required
              maxLength={30}
              value={skillName}
              onChange={(e) => SetSkillName(e.target.value)}
              type="text"
              placeholder="e.g. Programming, Drawing"
              className="w-full p-2 rounded-md bg-[#2b313f] outline-0 border border-gray-600 text-sm mb-4 break-words whitespace-pre-wrap"
            />

            {/* Goal Hours */}
            <label className="text-sm mb-1 block">Goal Hours</label>
            <input
              max={10000}
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Enter Your Goal"
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
              onClick={(e) => e.preventDefault()}
              className="flex gap-2 mb-6 [&>*]:rounded [&>*]:cursor-pointer [&>*]:h-8 [&>*]:w-8
        [&>*]:focus:border-gray-300 [&>*]:focus:border-1"
            >
              {Object.keys(themes).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => {
                    setTheme(themeKey);
                  }}
                  style={{ backgroundColor: themes[themeKey].shade2 }}
                ></button>
              ))}
            </div>

            {/* Submit */}
            <button
              onSubmit={handleSubmit}
              className="cursor-pointer w-full text-lg text-black bg-white hover:bg-gray-300 py-2 rounded-md font-medium"
            >
              Add Skill
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
