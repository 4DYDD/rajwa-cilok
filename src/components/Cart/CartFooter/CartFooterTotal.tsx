import React from "react";

interface CartFooterTotalProps {
  totalCartPrice: number;
}

const CartFooterTotal: React.FC<CartFooterTotalProps> = ({
  totalCartPrice,
}) => (
  <div className="w-full text-[18px] border-transparent border-b-gray-400 border text-gray-700 flexc !justify-start gap-2 mb-3.5 pe-3 pb-2">
    <span>Total Pesanan :</span>
    <span className="font-bold text-gray-900">
      Rp {totalCartPrice.toLocaleString()}
    </span>
  </div>
);

export default CartFooterTotal;
