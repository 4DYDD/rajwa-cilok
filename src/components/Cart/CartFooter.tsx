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
      <div className="w-full text-[12px] text-gray-500 flexcc !items-start gap-2 mb-3.5 pe-3">
        <span className="leading-none text-[1em]">
          <i className="me-1 fas fa-shopping-basket text-yellow-500 text-[1.2em]" />{" "}
          Pesanan Anda mendapatkan :
        </span>
        <span className="font-bold text-gray-500 text-[0.85em] relative ps-5">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center">
            <span className="relative flexc">
              <i className="fas fa-gift text-red-500 text-[1.1em] relative z-0" />
              <span className="absolute -top-1 -right-1 bg-white rounded-full p-[1.5px] flexc shadow">
                <i className="fas fa-pepper-hot text-red-600 text-[0.7em]" />
              </span>
            </span>
          </span>
          gratis saos kacang pedas/manis!
        </span>
      </div>

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
