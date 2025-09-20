import { useState, useEffect } from "react";
import SkillContext from "./Context";
//Firebase imports
import { useAuth } from "./AuthContext";
import { getData } from "../firebase/db";

function SkillContextProvider({ children }) {
  const [skill, setSkill] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();

  //Optional Chaining
  const userId = currentUser?.uid;

  useEffect(() => {
    setLoading(true);
    if (!userId) {
      setSkill([]);
      return;
    }

    getData(userId).then(setSkill);
    setLoading(false);
  }, [userId]);

  return (
    <SkillContext.Provider value={{ skill, setSkill, loading }}>
      {children}
    </SkillContext.Provider>
  );
}

export default SkillContextProvider;
