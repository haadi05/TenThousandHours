import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col justify-center items-center mt-30">
        <img src="/target.svg" className="size-16" />
        <p className="text-2xl mt-1">Start your Journey to Mastery</p>
        <NavLink
          to={"/dashboard/addskills"}
          className="cursor-pointer text-black bg-gray-100 px-3 py-1 mt-3 text-lg font-medium rounded-md"
        >
          Get Started
        </NavLink>
      </div>
    </>
  );
}

export default Home;
