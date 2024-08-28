// todo una funcion que recupere un día seleccionado

import { db } from "../../../../firebaseConfig";
import {
  collection,
  setDoc,
  writeBatch,
  getDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore/lite";

export const addSiteToDailyEntry = async (myCollection, dayId, data) => {
  try {
    // Referencia al documento principal en la colección
    const dayDocRef = doc(db, myCollection, dayId);

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


// Agrega y quita los availableWorkers en Firestore.
//  *
//  * @param {string} myCollection - Nombre de la colección principal.
//  * @param {string} dayId - ID del documento del día.
//  * @param {Array} homeWorkers - Array de objetos que representa a los homeWorkers.
//  * @param {Array} outsideWorkers - Array de objetos que representa a los outsideWorkers.
//  */
export const saveAvailableWorkers = async (myCollection, dayId, homeWorkers = [], outsideWorkers = []) => {
  console.log("lelgan a la api trabajadores de una obra", homeWorkers, outsideWorkers );
  try {
    const batch = writeBatch(db);

    // Guardar homeWorkers si se proporcionan
    if (homeWorkers.length > 0) {
      const homeWorkersCollectionRef = collection(db, myCollection, dayId, 'AvailableHomeWorkers');
      const existingHomeWorkersSnapshot = await getDocs(homeWorkersCollectionRef);
      const existingHomeWorkerIds = existingHomeWorkersSnapshot.docs.map(doc => doc.id);
      const newHomeWorkerIds = new Set(homeWorkers.map(worker => worker.id));

      existingHomeWorkerIds.forEach(id => {
        if (!newHomeWorkerIds.has(id)) {
          const workerDocRef = doc(db, myCollection, dayId, 'AvailableHomeWorkers', id);
          batch.delete(workerDocRef);
        }
      });

      homeWorkers.forEach(worker => {
        const workerDocRef = doc(db, myCollection, dayId, 'AvailableHomeWorkers', worker.id);
        batch.set(workerDocRef, worker);
      });
    }

    // Guardar outsideWorkers si se proporcionan
    if (outsideWorkers.length > 0) {
      const outsideWorkersCollectionRef = collection(db, myCollection, dayId, 'AvailableOutsideWorkers');
      const existingOutsideWorkersSnapshot = await getDocs(outsideWorkersCollectionRef);
      const existingOutsideWorkerIds = existingOutsideWorkersSnapshot.docs.map(doc => doc.id);
      const newOutsideWorkerIds = new Set(outsideWorkers.map(worker => worker.id));

      existingOutsideWorkerIds.forEach(id => {
        if (!newOutsideWorkerIds.has(id)) {
          const workerDocRef = doc(db, myCollection, dayId, 'AvailableOutsideWorkers', id);
          batch.delete(workerDocRef);
        }
      });

      outsideWorkers.forEach(worker => {
        const workerDocRef = doc(db, myCollection, dayId, 'AvailableOutsideWorkers', worker.id);
        batch.set(workerDocRef, worker);
      });
    }

    await batch.commit();
    return { status: "ok" };
  } catch (error) {
    console.error("Error guardando trabajadores disponibles: ", error);
    alert("Hubo un error guardando los trabajadores disponibles en la API");
    return { status: "fail", error };
  }
};



export const getSitesFromDailyEntry = async (myCollection, dayId) => {
  try {
    //revisa si el sitio existe si no lo crea
    const dayDocRef = doc(db, myCollection, dayId);

    const dayDocSnapshot = await getDoc(dayDocRef);

    if (!dayDocSnapshot.exists()) {
      // Si el documento no existe, crearlo con el objeto inicial
      const today = new Date().toISOString().split("T")[0]; // Formato de fecha YYYY-MM-DD
      const initialData = { date: today };
      await setDoc(dayDocRef, initialData);
    }

    const querySnapshot = await getDocs(
      collection(db, myCollection, dayId, "sites")
    );
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
    alert(
      "no se pudo actualizar los tipos de obra, recargue la página e inténtelo más tarde"
    );
  }
};
