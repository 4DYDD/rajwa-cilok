import { create } from "zustand";

export interface CartItemInterface {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number; // Properti untuk menyimpan total harga item
  category?: "" | "terlaris" | "terbaru"; // Properti opsional untuk kategori
  image?: string; // Properti opsional untuk gambar
  ongkir?: "" | "free"; // Properti opsional untuk ongkir
  description?: string; // Properti opsional untuk deskripsi
}

interface CartState {
  items: CartItemInterface[];
  addItem: (item: CartItemInterface) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item: CartItemInterface) =>
    set((state) => ({
      items: [
        ...state.items,
        { ...item, totalPrice: item.price * item.quantity }, // Hitung total harga saat item ditambahkan
      ],
    })),
  removeItem: (id: string) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateQuantity: (id: string, quantity: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity, totalPrice: item.price * quantity } // Perbarui total harga
          : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
