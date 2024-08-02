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
import { CLIENTS } from "../../../db/collections";

export const setDocWithId = async (collection, id, data) => {
  try {
    await setDoc(doc(db, collection, id), data);
    return { status: "ok", data };
  } catch (error) {
    console.error("Error agregando cliente: ", error);
    alert("Hubo un error agregando el cliente API");
    return { status: "fail" };
  }
};

export const getCollection = async (myCollection) => {
  const querySnapshot = await getDocs(collection(db, myCollection));
  const clientsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const sortedClientsData = clientsData.sort((a, b) =>
    a.clientName.localeCompare(b.clientName)
  );

  return sortedClientsData;
};

export const deleteWithId = async (id, myCollection) => {
  try {
    await deleteDoc(doc(db, myCollection, id));
  } catch (error) {
    console.error("Error borrando entrada");
  }
};

export const changeCheked = async (id, myCollection, checkValue) => {
  const queryRef = doc(db, myCollection, id);
  try {
    await updateDoc(queryRef, {
      isActive: checkValue,
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};

export const addSiteToClient = async (clientId, newSite) => {
  console.log("a addsitetoclient llega como newSite", newSite);
  
  // Generar un nuevo ID de sitio basado en la hora actual
  const siteId = `siteId_${new Date().getTime()}`;
  
  // Crear una referencia al nuevo documento en la subcolección 'sites'
  const clientDocRef = doc(db, "clients", clientId, "sites", siteId);
  
  try {
    await setDoc(clientDocRef, newSite);
    console.log("Site added successfully!");
  } catch (error) {
    console.error("Error adding site: ", error);
  }
};


export const getSitesForClient = async (clientId) => {
  try {
    // Referencia a la subcolección 'sites' dentro del documento del cliente
    const sitesCollectionRef = collection(db, "clients", clientId, "sites");
    
    // Obtén todos los documentos en la subcolección
    const sitesSnapshot = await getDocs(sitesCollectionRef);
    
    // Mapea los documentos a un array de objetos
    const sites = sitesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("getsites for client desde API",sites)
    return sites;
  } catch (error) {
    console.error("Error retrieving sites: ", error);
    return []; // Devuelve un array vacío si ocurre un error
  }
};
