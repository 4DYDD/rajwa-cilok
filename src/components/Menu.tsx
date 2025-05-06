"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useCartStore from "@/app/hooks/useCartStore";
import { formatRupiah } from "@/app/utils/formatRupiah";
import { MenuItemInterface } from "@/app/data/menuItems";

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
        <h3 className="text-[20px] text-gray-600 font-bold text-left">
          {truncateText(item.name, 30)}
        </h3>
        <div className="text-gray-900 font-bold text-2xl mb-4 text-left flexc !items-end !justify-start self-start">
          <span className="text-lg mr-0.5">Rp</span>
          <span className="">
            {formatRupiah(item.price).split("Rp")[1].trim()}
          </span>
        </div>
        <div className="text-gray-500 text-sm mb-6 text-left h-[40px]">
          {item.description.length > 130
            ? `${item.description.slice(0, 130)}...`
            : item.description}
        </div>
      </div>

      <button
        className="bg-green-500 h-[50px] w-[60px] text-white py-1.5 px-3 rounded-lg hover:bg-green-600 transall clicked flexc font-bold self-end m-5"
        onClick={(event) => handleAddToCart(event, item)}
      >
        <i className="fas fa-shopping-basket text-[1.5em]" />
      </button>
    </div>
  );
};

const MenuGrid = ({
  menuItems,
  handleAddToCart,
}: {
  menuItems: Array<MenuItemInterface>;
  handleAddToCart: (
    event: React.MouseEvent<HTMLButtonElement>,
    item: any
  ) => void;
}) => {
  const textSizeInPx = 13; // Ukuran teks dalam pixel
  const textSizeInEm = textSizeInPx / 16; // Konversi ke em (1em = 16px)

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2.5"
      style={{ fontSize: `${textSizeInEm}em` }}
    >
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} handleAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

const Menu = () => {
  const { items, addItem, updateQuantity } = useCartStore();
  const [menuItems, setMenuItems] = useState<Array<MenuItemInterface>>([]);

  const handleAddToCart = (event: any, item: any) => {
    const isItemExist = items.find((cartItem: any) => cartItem.id === item.id);
    if (isItemExist) {
      updateQuantity(item.id, isItemExist.quantity + 1);
    } else {
      addItem({ ...item, quantity: 1 });
    }
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/menu`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
      <MenuHeader />
      <MenuGrid menuItems={menuItems} handleAddToCart={handleAddToCart} />
    </>
  );
};

export default Menu;
