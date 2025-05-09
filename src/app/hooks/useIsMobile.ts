import { create } from "zustand";

interface IsMobileState {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

const useIsMobile = create<IsMobileState>((set) => ({
  isMobile: false,
  setIsMobile: (value: boolean) => set({ isMobile: value }),
}));

export default useIsMobile;
