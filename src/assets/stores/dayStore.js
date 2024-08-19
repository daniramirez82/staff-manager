import { create } from 'zustand';


export const useSitesStore = create((set, get) => ({
  sites: [],

  // Añadir múltiples sitios y ordenarlos
  addSites: (sites) => set(() => ({
    sites: sites.sort((a, b) => a.client.clientAlias.localeCompare(b.client.clientAlias))
  })),

  // Añadir un sitio y ordenarlo
  addSite: (site) => {
    const updatedSites = [...get().sites, site];
    updatedSites.sort((a, b) => a.client.clientAlias.localeCompare(b.client.clientAlias));
    set({ sites: updatedSites });
  },

  // Editar un sitio y mantener el orden
  editSite: (editedSite) => {
    const updatedSites = get().sites.map((site) =>
      site.siteDayId === editedSite.siteDayId ? editedSite : site
    );
    updatedSites.sort((a, b) => a.client.clientAlias.localeCompare(b.client.clientAlias));
    set({ sites: updatedSites });
  },

  // Eliminar un sitio y mantener el orden
  deleteSite: (siteId) => {
    const filteredSites = get().sites.filter((site) => site.id !== siteId);
    filteredSites.sort((a, b) => a.client.clientAlias.localeCompare(b.client.clientAlias));
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
    const site = get().sites.find(site => site.sitedayID === siteDayId);
    return site ? site.homeWorkers : [];
  },

  //alcanza todos los outsideWorkers de un sitio
  getOutsideWorkers: (siteDayId) => {
    const site = get().site.find(site => site.sitedayID === siteDayId);
    return site ? site.outsideWorkers : [];
  }

}));

export const useWorkersStore = create((set, get) => ({

  availableHomeWorkers: [],
  availableOutsideWorkers: [],

  // Añadir trabajadores disponibles a availableHomeWorkers
  addAvailableHomeWorker: (workers) => {
    set({ availableHomeWorkers: workers });
  },

  // Añadir trabajadores disponibles a availableOutsideWorkers
  addAvailableOutsideWorker: (workers) => {
    set({ availableOutsideWorkers: workers });
  }
}))



// Agregar un trabajador a una site
export const handleAddWorkerToSite = (siteDayId, newWorkers) => {
  const { sites, editSite } = useSitesStore.getState();
  const site = sites.find((site) => site.siteDayId === siteDayId);
  if (site) {
    site.homeWorkers = [newWorkers]
    editSite(site);
    return site;
  }
};


// Eliminar un trabajador de un site
export const handleDeleteWorkerFromSite = (siteId, workerId) => {
  const { sites, editSite } = useSitesStore.getState();
  const site = sites.find((site) => site.id === siteId);
  if (site) {
    site.homeWorkers = site.homeWorkers.filter((worker) => worker.id !== workerId);
    site.outsideWorkers = site.outsideWorkers.filter((worker) => worker.id !== workerId);
    editSite(site);

    return site;
  }
};
