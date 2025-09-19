import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doSignOut } from "../firebase/auth.js";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="bg-[#161b22] text-white px-18 py-4 flex justify-between items-center">
      <div>
        <p className="text-3xl font-bold">Ten Thousand Hours</p>
        <p className="text-[18px] font-normal text-[#a2a2a2]">
          Track. Improve. Master
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="rounded-full">
            <img
              src="https://api.dicebear.com/9.x/glass/svg?seed=Felix"
              className="cursor-pointer size-10"
            />
          </PopoverTrigger>
          <PopoverContent className="w-fit p-1 m-0">
            <button
              onClick={() => {
                doSignOut().then(() => {
                  navigate("/login");
                });
              }}
              className="outline-none cursor-pointer hover:bg-accent rounded-sm px-2 py-1"
            >
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}

export default Navbar;
