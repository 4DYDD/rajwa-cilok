import React from "react";
import { formatRupiah } from "@/app/utils/formatRupiah";
import { CartItemInterface } from "@/app/hooks/useCartStore";

const CartItemSubtotal = ({
  item,
  className,
}: {
  item: CartItemInterface;
  className?: string;
}) => (
  <div className={`flexc text-[0.9em] font-bold ${className}`}>
    <span className="w-[60px]">Subtotal</span>
    <span className="w-[10px] text-center mx-1">:</span>
    <span className="text-gray-600">{formatRupiah(item.totalPrice)}</span>
    <span className="text-[0.8em] text-gray-400 ml-2 w-[100px]">
      {`(${item.price} x ${item.quantity})`}
    </span>
  </div>
);

export default CartItemSubtotal;
