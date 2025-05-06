"use client";

import Link from "next/link";
import useCartOpenStore from "@/app/hooks/useCartOpenStore";
import Cart from "./Cart";
import Image from "next/image";

const Header = () => {
  const { isCartOpen, setCartOpen } = useCartOpenStore();

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    setCartOpen(!isCartOpen);
  };

  return (
    <div className="fixed -top-0.5 left-0 w-full bg-white shadow-md z-[99] px-3">
      <nav className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/thecilok.PNG"
              alt="Logo"
              className="size-[50px]"
              width={346}
              height={346}
            />
            <span className="font-bold text-base flexcc gap-1.5 !items-start">
              <span className="leading-4">Rajwa</span>
              <span className="leading-4">Cilok</span>
            </span>
          </div>
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <button
              type="button"
              className="clicked transall h-[50px] w-[60px] flexc font-semibold border border-gray-200 p-3 rounded-lg"
              onClick={handleButtonClick}
            >
              <span className="flexc font-semibold border-gray-200 text-gray-700 hover:text-black text-lg">
                <span className="leading-none h-[15px] flexc">
                  <i className="fas fa-shopping-basket text-[1.2em]"></i>
                </span>
                {/* tambahkan text jika di desktop */}
              </span>
            </button>
          </li>
        </ul>
      </nav>
      {isCartOpen && <Cart />}
    </div>
  );
};

export default Header;
