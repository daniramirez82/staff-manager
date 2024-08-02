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

export const setDocWithId = async (collection, id, data) => {
  try {
    await setDoc(doc(db, collection, id), data);
    return { status: "ok", data };
  } catch (error) {
    console.error("Error agregando cambios: ", error);
    alert("Hubo un error agregando los cambios API");
    return { status: "fail" };
  }
};

const addSiteToDailyEntry = async (site, date) => {
    const siteId = `siteId_${new Date().getTime()}`; // Generar un ID único para cada sitio (por ejemplo, basado en la fecha y hora actual)
    const siteDocRef = doc(db, DAYS, date, "sites", siteId);
  
    try {
      await setDoc(siteDocRef, site);
      console.log(`Sitio ${siteId} agregado correctamente al día ${date}`);
    } catch (error) {
      console.error("Error agregando el sitio:", error);
    }

    return siteId;
  };