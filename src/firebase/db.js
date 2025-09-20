import { db } from "./firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const setData = async (userId, skillData, skillId) => {
  try {
    //using firebase user id as document
    const skillRef = doc(db, "users", userId, "skills", skillId);
    await setDoc(skillRef, skillData);
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
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const delData = async (userId, skillId) => {
  if (!skillId) throw new Error("Cannot delete skill: skillId is undefined");
  try {
    const skillRef = doc(db, "users", userId, "skills", skillId);
    await deleteDoc(skillRef);
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};
