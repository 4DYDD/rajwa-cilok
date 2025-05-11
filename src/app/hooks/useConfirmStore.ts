import { create } from "zustand";

interface ConfirmState {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  openConfirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
  closeConfirm: () => void;
}

const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  message: "",
  onConfirm: null,
  onCancel: null,
  openConfirm: (message, onConfirm, onCancel) =>
    set({ isOpen: true, message, onConfirm, onCancel: onCancel || null }),
  closeConfirm: () =>
    set({ isOpen: false, message: "", onConfirm: null, onCancel: null }),
}));

export const showConfirm = (
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
) => {
  useConfirmStore.getState().openConfirm(message, onConfirm, onCancel);
};

export default useConfirmStore;
