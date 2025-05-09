import React from "react";
import { CartItemInterface } from "@/app/hooks/useCartStore";
import CartItem from "./CartItem";

interface CartListProps {
  items: Array<CartItemInterface>;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  isMobile: boolean;
}

const CartList: React.FC<CartListProps> = ({
  items,
  updateQuantity,
  removeItem,
  isMobile,
}) => (
  <ul
    className={`max-h-[45vh] overflow-y-auto ${
      !isMobile && "scrollbar-custom"
    } w-full px-3`}
  >
    {items.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    ))}
  </ul>
);

export default CartList;
