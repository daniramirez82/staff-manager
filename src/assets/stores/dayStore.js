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
      site.id === editedSite.id ? editedSite : site
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
}));

export const useWorkersStore = create((set, get)=>({

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
export const handleAddWorkerToSite = (siteId, newWorker) => {
  const { sites, editSite } = useSitesStore.getState();
  const site = sites.find((site) => site.id === siteId);
  if (site) {
    if (newWorker.company === "Cisa") {
      site.homeWorkers = [...site.homeWorkers, newWorker]
    } else {
      site.outsideWorkers = [...site.outsideWorkers, newWorker];
    }
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
