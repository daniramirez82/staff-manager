import { db } from "../../../../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";

export const setDocWithId = async (collection, id, data) => {
  try {
    await setDoc(doc(db, collection, id), data);
    return { status: "ok", data };
  } catch (error) {
    console.error("Error agregando subcontrata: ", error);
    alert("Hubo un error agregando la subcontrata API");
    return { status: "fail" };
  }
};

export const getCollection = async (myCollection) => {
  const querySnapshot = await getDocs(collection(db, myCollection));
  const subsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const sortedSubData = subsData.sort((a, b) =>
    a.subName.localeCompare(b.subName)
  );

  return sortedSubData;
};

export const deleteWithId = async (id, myCollection) => {
  try {
    await deleteDoc(doc(db, myCollection, id));
  } catch (error) {
    console.error("Error borrando entrada");
  }
};

export const changeCheked = async (id, myCollection, checkValue) => {
  console.log("la check value que llega a api es", checkValue);
  const queryRef = doc(db, myCollection, id);
  try {
    await updateDoc(queryRef, {
      isActive: checkValue,
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};
