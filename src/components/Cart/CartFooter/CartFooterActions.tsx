import React from "react";
import { CartItemInterface } from "@/app/hooks/useCartStore";
import { showConfirm } from "@/app/hooks/useConfirmStore"; // Import showConfirm
import { showAlert } from "@/app/hooks/useAlertStore";

interface CartFooterActionsProps {
  items: Array<CartItemInterface>;
  clearCart: () => void;
  handleOrder: (
    items: Array<CartItemInterface>,
    totalCartPrice: number
  ) => void;
  totalCartPrice: number;
}

const CartFooterActions: React.FC<CartFooterActionsProps> = ({
  items,
  clearCart,
  handleOrder,
  totalCartPrice,
}) => (
  <div className="flexc !justify-between p-2 font-bold w-full">
    {/* TOMBOL HAPUS SEMUA ITEM DI KERANJANG */}
    <button
      className="bg-red-500 text-white py-3 px-4 rounded-md shadow text-[16px] flex items-center gap-2 flexc leading-none clicked transall"
      onClick={() => {
        showConfirm(
          "Apakah Anda yakin ingin menghapus semua pesanan?",
          () => {
            // onConfirm
            clearCart();
            showAlert("Semua item dalam keranjang telah **dihapus**!");
          }
          // onCancel is not needed here
        );
      }}
    >
      <span className="size-4 flexc relative">
        <i className="transall fas fa-trash-alt text-[1em]" />
      </span>
      <span className="text-[0.9em]">Hapus Semua</span>
    </button>

    {/* TOMBOL KIRIM PESANAN KE WHATSAPP ADMIN */}
    <button
      className="bg-green-600 text-white py-3 px-4 rounded-md shadow text-[16px] flex items-center gap-2 flexc leading-none clicked transall"
      onClick={() => {
        handleOrder(items, totalCartPrice);
      }}
    >
      <span className="size-4 flexc relative">
        <i className="transall fab fa-whatsapp text-[1.3em]" />
      </span>
      <span className="text-[0.9em]">Pesan</span>
    </button>
  </div>
);

export default CartFooterActions;
