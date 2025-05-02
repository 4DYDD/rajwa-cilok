"use client";

import Link from "next/link";

const Header = () => {
  const handleButtonClick = (event: any) => {
    event.preventDefault();
    alert("Button clicked!");
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
              <span className="flex items-center">
                <i className="fas fa-shopping-cart mr-2 text-xl"></i>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
