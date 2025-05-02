"use client";

import { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const handleRemoveFromCart = (item: any) => {
    setCart((prevCart) => prevCart.filter((i: any) => i.id !== item.id));
  };

  return (
    <div className="fixed top-0 right-0 w-12 h-12 bg-red-500 text-white rounded-full">
      <h2>Keranjang</h2>
      <ul>
        {cart.map((item: any) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>Rp {item.price}</p>
            <button onClick={() => handleRemoveFromCart(item)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
