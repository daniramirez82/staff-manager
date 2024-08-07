// todo una funcion que recupere un día seleccionado

import { db } from "../../../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs
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

export const getSitesFromDailyEntry = async (myCollection, id) => {
  try {
    const querySnapshot = await getDocs(collection(db, myCollection, id, "sites"));
    const sites = [];
    querySnapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });
    return { status: "ok", sites };
  } catch (error) {
    console.error("Error recuperando sitios: ", error);
    alert("Hubo un error recuperando los sitios");
    return { status: "fail" };
  }
};




