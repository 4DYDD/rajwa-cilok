"use client";

import { useEffect } from "react";
import Image from "next/image";
import useCartStore from "@/app/hooks/useCartStore";
import { menuItems } from "@/app/data/menuItems";
import { formatRupiah } from "@/app/utils/formatRupiah";

const Menu = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart } =
    useCartStore();

  const handleAddToCart = (event: any, item: any) => {
    const isItemExist = items.find((cartItem: any) => cartItem.id === item.id);
    if (isItemExist) {
      updateQuantity(item.id, isItemExist.quantity + 1);
    } else {
      addItem({ ...item, quantity: 1 });
    }
  };

  const handleRemoveFromCart = (event: any, item: any) => {
    const isItemExist = items.find((cartItem: any) => cartItem.id === item.id);
    if (isItemExist) removeItem(item.id);
  };

  useEffect(() => {
    if (items.length > 0) console.log(items);
  }, [items]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 mt-16">
      <h1 className="text-2xl font-extrabold text-center text-black flexc gap-4 mx-auto transform cursor-pointer hover:scale-95 transall">
        <i
          className="fas fa-utensil-spoon transall"
          style={{ transform: "scaleX(-1)" }}
        />
        <span>Menu</span>
        <i className="fas fa-spoon" />
      </h1>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col p-7 mb-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg shadow-md"
        >
          <Image
            src={
              item.image || `https://picsum.photos/500/300?random=${item.id}`
            }
            alt={item.name}
            width={500}
            height={300}
            className="rounded-t-lg"
          />
          <div className="flex flex-col p-4">
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-lg font-semibold">{formatRupiah(item.price)}</p>
            <div className="flexc !justify-end pe-1">
              <span className="text-lg font-semibold min-w-10 h-10 flexc">
                {items.find((cartItem: any) => cartItem.id === item.id)
                  ? items.find((cartItem: any) => cartItem.id === item.id)
                      ?.quantity
                  : ""}
              </span>
            </div>
            <div className="flexc !justify-end mt-4 gap-3">
              {items.find((cartItem: any) => cartItem.id === item.id) && (
                <button
                  className="block clicked transall !select-none self-end w-28 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow"
                  onClick={(event: any) => handleRemoveFromCart(event, item)}
                >
                  Hapus
                </button>
              )}
              <button
                className="block clicked transall !select-none self-end w-28 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow"
                onClick={(event: any) => handleAddToCart(event, item)}
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
