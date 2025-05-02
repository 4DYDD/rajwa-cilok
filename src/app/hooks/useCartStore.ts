import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: any) => void;
  updateQuantity: (id: any, quantity: any) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item: any) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id: any) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateQuantity: (id: any, quantity: any) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
