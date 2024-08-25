// todo una funcion que recupere un día seleccionado

import { db } from "../../../../firebaseConfig";
import {
  collection,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  getDocs
} from "firebase/firestore/lite";

export const addSiteToDailyEntry = async (myCollection, dayId, data) => {
  try {
    // Referencia al documento principal en la colección
    const dayDocRef = doc(db, myCollection, dayId);

    // Verificar si el documento existe
    const dayDocSnapshot = await getDoc(dayDocRef);

    if (!dayDocSnapshot.exists()) {
      // Si el documento no existe, crearlo con el objeto inicial
      const today = new Date().toISOString().split("T")[0]; // Formato de fecha YYYY-MM-DD
      const initialData = { date: today, availableWorkers: [] };
      await setDoc(dayDocRef, initialData);
    }

    // Referencia al documento dentro de la subcolección "sites"
    const siteDocRef = doc(dayDocRef, "sites", data.siteDayId);
    
    // Agregar o actualizar el documento en la subcolección
    await setDoc(siteDocRef, data);

    return { status: "ok", docRef: siteDocRef };
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






