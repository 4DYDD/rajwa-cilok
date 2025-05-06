const CartFooter = ({
  clearCart,
  handleCloseCart,
}: {
  clearCart: () => void;
  handleCloseCart: () => void;
}) => (
  <div className="flexc !justify-between p-4 bg-white font-bold">
    <button
      className="bg-red-500 text-white py-3 px-4 rounded-md shadow text-[16px] flex items-center gap-2 flexc leading-none"
      onClick={clearCart}
    >
      <i className="fas fa-trash-alt text-[0.9em]"></i>
      <span className="text-[0.9em]">Hapus Semua</span>
    </button>
    <button
      className="bg-gray-800 text-white py-3 px-4 rounded-md shadow text-[16px] flex items-center gap-2 flexc leading-none"
      onClick={handleCloseCart}
    >
      <i className="fas fa-cart-plus text-[0.9em]"></i>
      <span className="text-[0.9em]">Pesan</span>
    </button>
  </div>
);

export default CartFooter;
