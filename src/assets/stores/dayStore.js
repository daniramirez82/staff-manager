import { create } from "zustand";
import { HOMEWORKERS } from "../../db/collections";

export const useSitesStore = create((set, get) => ({
  sites: [],

  // Añadir múltiples sitios y ordenarlos
  addSites: (sites) =>
    set(() => ({
      sites: sites.sort((a, b) =>
        a.client.clientAlias.localeCompare(b.client.clientAlias)
      ),
    })),

  // Añadir un sitio y ordenarlo
  addSite: (site) => {
    const updatedSites = [...get().sites, site];
    updatedSites.sort((a, b) =>
      a.client.clientAlias.localeCompare(b.client.clientAlias)
    );
    set({ sites: updatedSites });
  },

  // Editar un sitio y mantener el orden
  editSite: (editedSite) => {
    const updatedSites = get().sites.map((site) =>
      site.siteDayId === editedSite.siteDayId ? editedSite : site
    );
    updatedSites.sort((a, b) =>
      a.client.clientAlias.localeCompare(b.client.clientAlias)
    );
    set({ sites: updatedSites });
  },

  // Eliminar un sitio y mantener el orden
  deleteSite: (siteId) => {
    const filteredSites = get().sites.filter((site) => site.id !== siteId);
    filteredSites.sort((a, b) =>
      a.client.clientAlias.localeCompare(b.client.clientAlias)
    );
    set({ sites: filteredSites });
  },

  //añadir tipos de obra nuevos,
  editSiteType: (siteId, newTypes) => {
    const updatedSites = get().sites.map((site) =>
      site.siteDayId === siteId ? { ...site, types: newTypes.sort() } : site
    );
    set({ sites: updatedSites });
  },

  //alcanza todos los home workers de un sitio
  getHomeWorkers: (siteDayId) => {
    const site = get().sites.find((site) => site.sitedayId === siteDayId);
    return site ? site.homeWorkers : [];
  },

  //alcanza todos los outsideWorkers de un sitio
  getOutsideWorkers: (siteDayId) => {
    const site = get().site.find((site) => site.sitedayID === siteDayId);
    return site ? site.outsideWorkers : [];
  },
}));

// Agregar un trabajador a una site
//todo: a los trabajdores que lleguen nuevos hay que comparar con los que ya estaban
//los nuevo se agregan y los que no existen en el nuevo array hay que borrarles el current id y actualizar esto en store y en BD


export const handleAddWorkersToSite = (siteDayId, newWorkers, company) => {
  console.log("estos son los trabajadores que llegan al store", newWorkers);
  const { sites, editSite } = useSitesStore.getState();
  const site = sites.find((site) => site.siteDayId === siteDayId);
  if (site) {
    //revisamos si los newWorkers son de cisa
    //lo agregamos al campo de los trabajadores de casa
    if (company === HOMEWORKERS) {
      site.homeWorkers = newWorkers;
      //de lo contrario se agrega al campo de trabajadores de afuera
    } else {
      site.outsideWorkers = newWorkers;
    }
  }
  editSite(site);
  return site;
};

// Eliminar un trabajador de un site
export const handleDeleteWorkerFromSite = (siteId, workerId) => {
  const { sites, editSite } = useSitesStore.getState();
  const site = sites.find((site) => site.id === siteId);
  if (site) {
    site.homeWorkers = site.homeWorkers.filter(
      (worker) => worker.id !== workerId
    );
    site.outsideWorkers = site.outsideWorkers.filter(
      (worker) => worker.id !== workerId
    );
    editSite(site);

    return site;
  }
};

export const useWorkersStore = create((set, get) => ({
  availableHomeWorkers: [],
  availableOutsideWorkers: [],

  addAvailableHomeWorker: (workers) => {
    // Filtrar trabajadores activos
    const activeWorkers = workers.filter((worker) => worker.isActive === true);

    // Actualizar el estado con los trabajadores activos
    set({ availableHomeWorkers: activeWorkers });
    return activeWorkers;
  },

  addAvailableOutsideWorker: (workers) => {
    // Filtrar trabajadores activos
    const activeWorkers = workers.filter((worker) => worker.isActive === true);

    // Actualizar el estado con los trabajadores activos
    set({ availableOutsideWorkers: activeWorkers });
    return activeWorkers;
  },

  // Función para actualizar availableHomeWorker
  
  updateAvailableHomeWorkers: (workers, siteDayId) => {
   const globalList = get().availableHomeWorkers;
   console.log(globalList);

   const mapNewIds = {};
        workers.forEach(([id, currentSite]) => {
            mapNewIds[id] = currentSite;
        });
   
   const updatedWorkers = globalList.map(globalWorker =>{
    const obraNueva = mapNewIds[globalWorker.id];
      if(obraNueva) {

    }
   })
  },

  // Función para actualizar availableOutsideWorkers
  updateAvailableOutsideWorkers: (workers) => {
    // Obtener el estado actual de availableOutsideWorkers
    const currentOutsideWorkers = get().availableOutsideWorkers;

    // Crear una lista actualizada de trabajadores
    const updatedOutsideWorkers = currentOutsideWorkers.map(
      (existingWorker) => {
        const workerToUpdate = workers.find(
          (worker) => worker.id === existingWorker.id
        );
        return workerToUpdate
          ? { ...existingWorker, ...workerToUpdate }
          : existingWorker;
      }
    );

    // Agregar nuevos trabajadores que no están en el estado actual
    const newWorkers = workers.filter(
      (worker) =>
        !currentOutsideWorkers.some(
          (existingWorker) => existingWorker.id === worker.id
        )
    );

    // Combinar la lista actualizada con los nuevos trabajadores
    const finalOutsideWorkers = [...updatedOutsideWorkers, ...newWorkers];

    // Actualizar el estado
    set({ availableOutsideWorkers: finalOutsideWorkers });

    return finalOutsideWorkers;
  },
}));
