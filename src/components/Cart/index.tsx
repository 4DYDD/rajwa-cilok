"use client";

import useCartStore from "@/app/hooks/useCartStore";
import useCartOpenStore from "@/app/hooks/useCartOpenStore";
import { useEffect } from "react";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const { items, clearCart, updateQuantity, removeItem } = useCartStore();
  const { isCartOpen, setCartOpen } = useCartOpenStore();

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.87)] flex items-center justify-center z-50 text-base font-semibold overflow-hidden"
      onClick={handleCloseCart}
    >
      <div
        className="m-2 rounded-t-xl shadow-md w-96 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <CartHeader handleCloseCart={handleCloseCart} />

        {items.length > 0 ? (
          <ul className="pt-5 max-h-[450px] overflow-y-auto scrollbar-custom bg-red-500 w-full">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </ul>
        ) : (
          <EmptyCart />
        )}
        {items.length > 0 && (
          <CartFooter clearCart={clearCart} handleCloseCart={handleCloseCart} />
        )}
      </div>
    </div>
  );
};

export default Cart;
