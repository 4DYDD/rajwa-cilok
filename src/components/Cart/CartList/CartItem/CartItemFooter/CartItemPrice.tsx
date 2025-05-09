import React from "react";
import { formatRupiah } from "@/app/utils/formatRupiah";
import { CartItemInterface } from "@/app/hooks/useCartStore";

const CartItemPrice = ({
  item,
  className,
}: {
  item: CartItemInterface;
  className?: string;
}) => (
  <div className={`flex text-[0.8em] text-gray-400 ${className}`}>
    <span className="w-[60px]">Harga</span>
    <span className="w-[10px] text-center mx-1">:</span>
    <span>{formatRupiah(item.price)}</span>
  </div>
);

export default CartItemPrice;
