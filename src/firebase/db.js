import { db } from "./firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const setData = async (userId, skillData, skillId) => {
  try {
    //using firebase user id as document
    const skillRef = doc(db, "users", userId, "skills", skillId);
    await setDoc(skillRef, skillData);
    console.log("Document written with ID: ", skillRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getData = async (userId) => {
  const skillCol = collection(db, "users", userId, "skills");
  const snapshot = await getDocs(skillCol);
  return snapshot.docs.map((doc) => doc.data());
};

export const updateData = async (userId, skillId, newHours) => {
  try {
    const skillRef = doc(db, "users", userId, "skills", skillId);
    await updateDoc(skillRef, { inputHours: newHours });
    console.log("sucessfully updated");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};
