// todo una funcion que recupere un día seleccionado



//todo una funcion que guarde una obra en el dia seleccionado
import { db } from "../../../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore/lite";
import { DAYS } from "../../../db/collections";

export const addSiteToDailyEntry = async (collection, id, data) => {
  try {
    await setDoc(doc(db, collection, id), data);
    return { status: "ok", data };
  } catch (error) {
    console.error("Error agregando cambios: ", error);
    alert("Hubo un error agregando los cambios API");
    return { status: "fail" };
  }
};

