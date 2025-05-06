// "use client";

// import React, { useEffect } from "react";
// import Image from "next/image";
// import useCartStore from "@/app/hooks/useCartStore";
// import { formatRupiah } from "@/app/utils/formatRupiah";
// import { menuItems } from "../data/menuItems";

// // Tipe data untuk props ProductCard
// interface ProductCardProps {
//   id: number;
//   image: string;
//   name: string;
//   price: number;
//   description: string;
// }

// // Komponen untuk kartu produk tunggal
// const ProductCard: React.FC<ProductCardProps & { handleAddToCart: any }> = ({
//   image,
//   name,
//   price,
//   description,
//   handleAddToCart,
// }) => {
//   return (
//     <div className="w-64 p-3 border rounded-lg shadow-md bg-white flex flex-col">
//       <div className="w-full h-40 relative mb-3">
//         <Image
//           src={image || "https://via.placeholder.com/300"} // Fallback image
//           alt={name}
//           layout="fill"
//           objectFit="cover"
//           className="rounded-md"
//         />
//       </div>
//       <h3 className="text-sm font-semibold mb-1">{name}</h3>
//       <div className="text-red-600 font-bold text-lg mb-2">
//         {formatRupiah(price)}
//       </div>
//       <div className="h-[40px] w-full text-gray-500 mb-4">
//         {description.length > 48
//           ? `${description.slice(0, 48)}...`
//           : description}
//       </div>
//       <button
//         className="bg-green-500 h-[40px] w-[50px] text-white py-1.5 px-3 rounded-lg hover:bg-green-600 transall clicked flexc font-bold self-end m-2"
//         onClick={handleAddToCart}
//       >
//         <i className="fas fa-shopping-basket" />
//       </button>
//     </div>
//   );
// };

// // Komponen daftar produk
// const ProductList: React.FC = () => {
//   const { items, addItem, updateQuantity } = useCartStore();

//   const handleAddToCart = (product: ProductCardProps) => {
//     const isItemExist = items.find(
//       (cartItem: any) => cartItem.id === product.id
//     );
//     if (isItemExist) {
//       updateQuantity(product.id.toString(), isItemExist.quantity + 1);
//     } else {
//       addItem({
//         ...product,
//         quantity: 1,
//         totalPrice: product.price,
//       });
//     }
//   };

//   useEffect(() => {
//     if (items.length > 0) console.log(items);
//   }, [items]);

//   return (
//     <div className="flex gap-4 flex-wrap justify-center p-4">
//       {menuItems.map((product) => (
//         <ProductCard
//           key={product.id}
//           id={product.id}
//           image={product.image || "https://via.placeholder.com/300"}
//           name={product.name}
//           price={product.price}
//           description={product.description}
//           handleAddToCart={() => handleAddToCart(product)}
//         />
//       ))}
//     </div>
//   );
// };

// // Komponen utama
// const Tiruan: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold text-center p-4">Daftar Produk</h1>
//       <ProductList />
//     </div>
//   );
// };

// export default Tiruan;
