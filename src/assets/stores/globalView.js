import { create } from "zustand";
import { DAYS } from "../../db/collections";

export const useGlobalView = create((set) => ({
  view: DAYS,
  updateView: (newView) =>
    set(() => {
      return { view: newView };
    }),
}));
