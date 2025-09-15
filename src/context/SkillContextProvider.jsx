import { useState } from "react";
import SkillContext from "./Context";

function SkillContextProvider({ children }) {
  const [skill, setSkill] = useState([]);
  return (
    <SkillContext.Provider value={{ skill, setSkill }}>
      {children}
    </SkillContext.Provider>
  );
}

export default SkillContextProvider;
