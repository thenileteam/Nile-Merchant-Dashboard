import { create } from 'zustand';

export const useStaffStore = create((set) => ({
  delStaff: false,
  openDelStaff: () => set({ delStaff: true }),
  closeDelStaff: () => set({ delStaff: false }),
}));




