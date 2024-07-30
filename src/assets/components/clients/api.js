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
  const clientDocRef = doc(db, CLIENTS, clientId);
  try {
    await updateDoc(clientDocRef, {
      Sites: arrayUnion(newSite)
    });
    console.log("Site added successfully!");
  } catch (error) {
    console.error("Error adding site: ", error);
  }
};

export const getClientSites = async (clientId) => {
  const clientDocRef = doc(db, CLIENTS, clientId);
  try {
    const clientDoc = await getDoc(clientDocRef);
    if (clientDoc.exists()) {
      const clientData = clientDoc.data();
      return clientData.Sites || [];
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching client sites: ", error);
    return [];
  }
};
