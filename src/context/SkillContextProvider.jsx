import { useState, useEffect } from "react";
import SkillContext from "./Context";
//Firebase imports
import { useAuth } from "./AuthContext";
import { getData } from "../firebase/db";

function SkillContextProvider({ children }) {
  const [skill, setSkill] = useState([]);

  const { currentUser } = useAuth();

  //Optional Chaining
  const userId = currentUser?.uid;

  useEffect(() => {
    if (!userId) {
      setSkill([]);
      return;
    }

    getData(userId).then(setSkill);
  }, [userId]);

  return (
    <SkillContext.Provider value={{ skill, setSkill }}>
      {children}
    </SkillContext.Provider>
  );
}

export default SkillContextProvider;
