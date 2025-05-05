"use client";

import { useEffect } from "react";
import Image from "next/image";
import useCartStore from "@/app/hooks/useCartStore";
import { menuItems } from "@/app/data/menuItems";
import { formatRupiah } from "@/app/utils/formatRupiah";

const MenuHeader = () => (
  <h1 className="text-2xl font-extrabold text-center text-black flex items-center gap-4 mx-auto clicked transall mt-24 mb-5 flexc">
    <i className="fas fa-utensil-spoon transform scale-x-[-1]" />
    <span>Menu</span>
    <i className="fas fa-spoon" />
  </h1>
);

const MenuItem = ({ item, handleAddToCart }: any) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      key={item.id}
      className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform clicked transall h-full"
    >
      <Image
        src={item.image || `https://picsum.photos/300/300?random=${item.id}`}
        alt={item.name}
        width={500}
        height={500}
        className="w-full h-[150px] object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-md font-bold text-gray-800 mb-2">
          {truncateText(item.name, 30)}
        </h2>
        <button
          className="bg-green-500 text-white py-1.5 px-3 rounded-lg hover:bg-green-600 transall clicked flexc !justify-start font-bold"
          onClick={(event) => handleAddToCart(event, item)}
        >
          <i className="fas fa-shopping-basket mr-2" />
          <span>{formatRupiah(item.price)}</span>
        </button>
      </div>
    </div>
  );
};

const MenuGrid = ({ items, handleAddToCart }: any) => {
  const textSizeInPx = 13; // Ukuran teks dalam pixel
  const textSizeInEm = textSizeInPx / 16; // Konversi ke em (1em = 16px)

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2"
      style={{ fontSize: `${textSizeInEm}em` }}
    >
      {items.map((item: any) => (
        <MenuItem key={item.id} item={item} handleAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

const Menu = () => {
  const { items, addItem, updateQuantity } = useCartStore();

  const handleAddToCart = (event: any, item: any) => {
    const isItemExist = items.find((cartItem: any) => cartItem.id === item.id);
    if (isItemExist) {
      updateQuantity(item.id, isItemExist.quantity + 1);
    } else {
      addItem({ ...item, quantity: 1 });
    }
  };

  useEffect(() => {
    if (items.length > 0) console.log(items);
  }, [items]);

  return (
    <>
      <MenuHeader />
      <MenuGrid items={menuItems} handleAddToCart={handleAddToCart} />
    </>
  );
};

export default Menu;
