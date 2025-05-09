"use client";

import Link from "next/link";
import useCartOpenStore from "@/app/hooks/useCartOpenStore";
import Cart from "./Cart";
import Image from "next/image";
import useCartStore from "@/app/hooks/useCartStore";
import useIsMobile from "@/app/hooks/useIsMobile";
import { useEffect } from "react";

interface HeaderProps {
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { isCartOpen, setCartOpen } = useCartOpenStore();
  const { items } = useCartStore();
  const { isMobile, setIsMobile } = useIsMobile();

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    setCartOpen(!isCartOpen);
  };

  useEffect(() => {
    setIsMobile(props.isMobile);
  }, [props.isMobile, setIsMobile]);

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
          <li className="rounded-lg overflow-hidden border border-gray-200 relative clicked transall text-gray-700 active:text-black">
            <button
              type="button"
              className={`h-[50px] w-[60px] flexc font-semibold p-3 relative`}
              onClick={handleButtonClick}
            >
              <span className="flexc font-semibold text-lg">
                <span className="leading-none h-[15px] flexc">
                  <i
                    className={`fas fa-shopping-basket text-[1.2em] ${
                      items.length > 0 ? "animate-bounceku" : ""
                    }`}
                  />
                </span>
              </span>
              {/* Lingkaran kecil dengan efek pulse dan jumlah total quantity */}
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-blue-500 rounded-lg px-3 flexc text-white text-[10px] font-bold animate-pulseku">
                  {items.reduce((total, item) => total + item.quantity, 0)}
                  <span className="absolute h-[80%] w-[80%] rounded-lg px-1.5 bg-blue-500 opacity-50 animate-pingku"></span>
                </span>
              )}
            </button>
          </li>
        </ul>
      </nav>
      {isCartOpen && <Cart />}
    </div>
  );
};

export default Header;
