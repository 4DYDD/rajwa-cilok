"use client";

import Link from "next/link";
import useCartOpenStore from "@/app/hooks/useCartOpenStore";
import Cart from "./Cart";

const Header = () => {
  const { isCartOpen, setCartOpen } = useCartOpenStore();

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    setCartOpen(!isCartOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-[99] px-3">
      <nav className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/">
          <span className="font-bold text-xl">Rajwa Cilok</span>
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <button
              type="button"
              className="block clicked transall"
              onClick={handleButtonClick}
            >
              <span className="flexc font-semibold border border-gray-200 p-3 rounded-lg text-gray-800 hover:text-black text-lg">
                <span className="leading-none h-[15px] flexc">
                  <i className="fas fa-shopping-basket"></i>
                </span>
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
