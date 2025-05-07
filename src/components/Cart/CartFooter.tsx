import { CartItemInterface } from "@/app/hooks/useCartStore";

const CartFooter = ({
  items,
  clearCart,
  handleOrder,
  totalCartPrice,
}: {
  items: Array<CartItemInterface>;
  clearCart: () => void;
  handleOrder: (
    items: Array<CartItemInterface>,
    totalCartPrice: number
  ) => void;
  totalCartPrice: number;
}) => {
  return (
    <div className="flexcc !justify-between px-8 py-4 bg-white font-bold shadow-lg shadow-gray-800 rounded-t-xl border-t border-gray-100">
      <div className="w-full text-[18px] border-transparent border-b-gray-400 border text-gray-700 flexc !justify-start gap-2 mb-3.5 pe-3 pb-2">
        <span>Total Pesanan :</span>
        <span className="font-bold text-gray-900">
          Rp {totalCartPrice.toLocaleString()}
        </span>
      </div>

      <div className="flexc !justify-between p-2 font-bold w-full">
        <button
          className="bg-red-500 text-white py-3 px-4 rounded-md shadow text-[16px] flex items-center gap-2 flexc leading-none clicked transall"
          onClick={() => {
            if (
              window.confirm("Apakah Anda yakin ingin menghapus semua pesanan?")
            ) {
              clearCart();
            } else {
              return;
            }
          }}
        >
          <span className="size-4 flexc relative">
            <i className="transall fas fa-trash-alt text-[1em]" />
          </span>
          <span className="text-[0.9em]">Hapus Semua</span>
        </button>
        <button
          className="bg-gray-800 text-white py-3 px-4 rounded-md shadow text-[16px] flex items-center gap-2 flexc leading-none clicked transall"
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
    </div>
  );
};

export default CartFooter;
