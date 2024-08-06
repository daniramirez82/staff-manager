// todo una funcion que recupere un día seleccionado

import { db } from "../../../../firebaseConfig";
import {
  collection,
  addDoc,
} from "firebase/firestore/lite";

export const addSiteToDailyEntry = async (myCollection, id, data) => {
  try {
    const docRef = await addDoc(collection(db, myCollection, id, "sites"), data);
    return { status: "ok", docRef };
  } catch (error) {
    console.error("Error agregando cambios: ", error);
    alert("Hubo un error agregando los cambios API");
    return { status: "fail" };
  }
};





