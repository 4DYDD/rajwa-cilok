"use client";

import useCartStore, { CartItemInterface } from "@/app/hooks/useCartStore";
import useCartOpenStore from "@/app/hooks/useCartOpenStore";
import { useEffect } from "react";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import useIsMobile from "@/app/hooks/useIsMobile";

const Cart = () => {
  const { items, totalCartPrice, clearCart, updateQuantity, removeItem } =
    useCartStore();
  const { isCartOpen, setCartOpen } = useCartOpenStore();
  const { isMobile } = useIsMobile();

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handleOrder = (
    items: Array<CartItemInterface>,
    totalCartPrice: number
  ) => {
    const confirmOrder = window.confirm(
      "Apakah Anda yakin ingin mengirimkan pesanan ini ke WhatsApp admin?"
    );
    if (!confirmOrder) return;

    const address = window.prompt(
      "Masukkan alamat pengiriman, \nBoleh menggunakan text saja atau link goggle maps yang mengarah ke lokasi anda 🙏 \n(Opsional) :",
      undefined
    );

    const phoneNumber = process.env.NEXT_PUBLIC_MERCHANT_PHONE;
    if (!phoneNumber) {
      console.error("Merchant phone number is not defined.");
      return;
    }

    const orderDetails = items
      .map((item, index) => {
        const name = item.name.padEnd(20, " ");
        const price = `Rp${item.price.toLocaleString()}`;
        const quantity = item.quantity;
        const subtotal = `Rp${(item.price * item.quantity).toLocaleString()}`;

        return (
          `${index + 1}. ${name}\n\n` +
          `   ID Item        : ${item.id}\n` +
          `   Harga          : ${price}\n` +
          `   Jumlah Pesanan : (${quantity})\n` +
          `   Subtotal       : ${subtotal} \n\n\n`
        );
      })
      .join("\n");

    const message = encodeURIComponent(
      [
        "```",
        "🧾 Struk Pemesanan",
        "==============================",
        "",
        orderDetails,
        "",
        "-----------------------------------",
        `Total Biaya Pemesanan : Rp${totalCartPrice.toLocaleString()}`,
        `-----------------------------------${
          address ? `\n\nAlamat Pengiriman :\n${address}\n\n` : ``
        }`,
        "",
        "",
        "Terima kasih 🙏",
        "```",
      ].join("\n")
    );

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    // Clear the cart after sending the order
    clearCart();
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
      className="transcenter !fixed inset-0 p-10 bg-[rgba(0,0,0,0.87)] flexc w-[200vw] h-[200vh] z-[99] text-base font-semibold overflow-hidden"
      onClick={handleCloseCart}
    >
      <div
        className="m-2 rounded-t-xl shadow-md w-96 overflow-hidden bg-white flexcc"
        onClick={(e) => e.stopPropagation()}
      >
        <CartHeader handleCloseCart={handleCloseCart} />

        {items.length > 0 ? (
          <>
            <CartList
              items={items}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              isMobile={isMobile}
            />

            <CartFooter
              items={items}
              totalCartPrice={totalCartPrice}
              clearCart={clearCart}
              handleOrder={handleOrder}
            />
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
