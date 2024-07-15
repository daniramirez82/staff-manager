import { db } from "../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore/lite";

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

  return clientsData;
};

export const deleteWithId = async (id, myCollection) => {
  try {
    const deletedDoc = await deleteDoc(doc(db, myCollection, id));
    console.log(deletedDoc);
  } catch (error) {
    console.error("Error borrando entrada");
  }
};