import { create } from "zustand";

export const useGlobalView = create((set) => ({
  view: "",
  updateView: (newView) =>
    set(() => {
      console.log(newView);
      return { view: newView };
    }),
}));
