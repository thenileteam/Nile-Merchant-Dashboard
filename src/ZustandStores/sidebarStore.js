import { create } from "zustand";
export const useSidebarStore = create((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  closeSidebar: () => set({ sidebarOpen: false }),

  //collapsible state
  isCollapsed: false,
  isDesktop: window.innerWidth,
  setIsDesktop: (value) => set({ isDesktop: value }),
  setIsCollapsed: (value) =>
    set((state) => {
      if (value <= 1000) {
        return { isCollapsed: value };
      }
      //only update the state when we are on desktop view
      if (state.isDesktop > 1000) {
        return { isCollapsed: !state.isCollapsed };
      }
      return state;
    }),
}));
