import React from "react";
import { CartItemInterface } from "@/app/hooks/useCartStore";

const CartItemRemoveActions = ({
  item,
  removeItem,
}: {
  item: CartItemInterface;
  removeItem: (id: string) => void;
}) => (
  <button
    className="bg-red-500 text-white size-[2em] flexc rounded shadow font-bold text-[1em]"
    onClick={() => {
      if (
        confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?")
      ) {
        removeItem(item.id);
      }
    }}
  >
    <i className="fas fa-trash-alt"></i>
  </button>
);

export default CartItemRemoveActions;
