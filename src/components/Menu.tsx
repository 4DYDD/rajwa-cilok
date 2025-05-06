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
    <div className="w-full max-w-[360px] rounded-lg overflow-hidden shadow shadow-gray-300 bg-white flex flex-col mx-auto">
      <div className="size-[360px] relative mb-3 self-center">
        <Image
          src={item.image || `https://picsum.photos/300/300?random=${item.id}`} // Fallback image
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="px-5">
        <h3 className="text-lg text-gray-600 font-bold mb-1 text-left">
          {truncateText(item.name, 30)}
        </h3>
        <div className="text-gray-900 font-bold text-2xl mb-2 text-left">
          {formatRupiah(item.price)}
        </div>
        <div className="text-gray-500 text-sm mb-4 text-left h-[40px]">
          {item.description.length > 130
            ? `${item.description.slice(0, 130)}...`
            : item.description}
        </div>
      </div>

      <button
        className="bg-green-500 h-[40px] w-[50px] text-white py-1.5 px-3 rounded-lg hover:bg-green-600 transall clicked flexc font-bold self-end m-5"
        onClick={(event) => handleAddToCart(event, item)}
      >
        <i className="fas fa-shopping-basket" />
      </button>
    </div>

    // <div
    //   key={item.id}
    //   className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform clicked transall h-full"
    // >
    //   <Image
    //     src={item.image || `https://picsum.photos/300/300?random=${item.id}`}
    //     alt={item.name}
    //     width={500}
    //     height={500}
    //     className="w-full h-[150px] object-cover"
    //   />
    //   <div className="p-4 flex flex-col justify-between flex-grow">
    //     <h2 className="text-md font-bold text-gray-800 mb-2">
    //       {truncateText(item.name, 30)}
    //     </h2>
    //     <button
    //       className="bg-green-500 text-white py-1.5 px-3 rounded-lg hover:bg-green-600 transall clicked flexc !justify-start font-bold"
    //       onClick={(event) => handleAddToCart(event, item)}
    //     >
    //       <i className="fas fa-shopping-basket mr-2" />
    //       <span>{formatRupiah(item.price)}</span>
    //     </button>
    //   </div>
    // </div>
  );
};

const MenuGrid = ({ items, handleAddToCart }: any) => {
  const textSizeInPx = 13; // Ukuran teks dalam pixel
  const textSizeInEm = textSizeInPx / 16; // Konversi ke em (1em = 16px)

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2"
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
