// todo una funcion que recupere un día seleccionado

import { db } from "../../../../firebaseConfig";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  getDocs
} from "firebase/firestore/lite";

export const addSiteToDailyEntry = async (myCollection, dayId, data) => {
  try {
    const docRef = doc(db, myCollection, dayId, "sites", data.siteDayId);
    await setDoc(docRef, data);
    return { status: "ok", docRef };
  } catch (error) {
    console.error("Error agregando cambios: ", error);
    alert("Hubo un error agregando los cambios API");
    return { status: "fail" };
  }
};

export const getSitesFromDailyEntry = async (myCollection, dayId) => {
  try {
    const querySnapshot = await getDocs(collection(db, myCollection, dayId, "sites"));
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


export const editTypeSite = async (myCollection, dayId, siteId, newTypes) => {
  try {
    const siteRef = doc(db, `${myCollection}/${dayId}/sites/${siteId}`);
    await updateDoc(siteRef, { types: newTypes });
  } catch (err) {
    console.log("error actualizando los tipos de obra", err);
    alert("no se pudo actualizar los tipos de obra, recargue la página e inténtelo más tarde");
  }
};






