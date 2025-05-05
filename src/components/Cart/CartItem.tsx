import { formatRupiah } from "@/app/utils/formatRupiah";
import QuantityField from "../QuantityField";
import Image from "next/image";
import { CartItemInterface } from "@/app/hooks/useCartStore";

const CartItemImage = ({
  item,
  className = "",
}: {
  item: any;
  className?: string;
}) => (
  <div className={`h-full w-[200px] flexc !items-start ${className}`}>
    <div
      className={`rounded-md overflow-hidden h-[100px] w-full
      ${item.ongkir === "free" && "outline-green-600 outline-3"}
      ${item.category === "terlaris" && "outline-orange-500 outline-3"}`}
    >
      <Image
        src={item.image as string}
        alt={item.name}
        width={500}
        height={500}
        className="object-cover size-full"
      />
    </div>
  </div>
);

const CartItemLabels = ({
  item,
  className = "",
}: {
  item: any;
  className?: string;
}) => (
  <div
    className={`text-[1.3em] min-h-[30px] font-bold truncate w-full flexcc !items-start gap-1 ${className}`}
  >
    <span>
      {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
    </span>

    {item.category === "terlaris" && (
      <span
        className="ps-3 pe-5 py-1.5 text-[0.5em] bg-orange-500 font-bold gap-2 flexc"
        style={{
          color: "white",
          WebkitTextStroke: "0.3px white",
        }}
      >
        <i
          style={{
            WebkitTextStroke: "1.5px white",
          }}
          className="leading-none fas fa-fire text-transparent"
        ></i>
        <span className="leading-none uppercase">{item.category}</span>
      </span>
    )}

    {item.ongkir === "free" && (
      <span
        className="ps-3 pe-5 py-1.5 text-[0.5em] bg-green-600 font-bold gap-2 flexc"
        style={{
          color: "white",
          WebkitTextStroke: "0.3px white",
        }}
      >
        <i
          style={{
            WebkitTextStroke: "1.5px white",
          }}
          className="leading-none fas fa-truck text-transparent"
        ></i>
        <span className="leading-none uppercase">gratis ongkir</span>
      </span>
    )}
  </div>
);

const CartItemActions = ({
  item,
  updateQuantity,
  removeItem,
  className = "",
}: {
  item: any;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  className?: string;
}) => (
  <div className={`flex items-center gap-1 text-[11px] ${className}`}>
    {item.quantity <= 1 ? (
      <button
        className="bg-red-500 text-white size-[2em] flexc rounded shadow font-bold text-[1em]"
        onClick={() => {
          if (
            confirm(
              "Apakah Anda yakin ingin menghapus item ini dari keranjang?"
            )
          ) {
            removeItem(item.id);
          }
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    ) : (
      <button
        className="bg-gray-900 text-white size-[2em] flexc rounded shadow font-bold text-[1em]"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
      >
        -
      </button>
    )}
    <QuantityField
      className="w-[40px] h-[2em] flexc border border-gray-800 rounded font-bold text-[1em]"
      itemId={item.id}
      quantity={item.quantity}
      updateQuantity={updateQuantity}
      removeItem={removeItem}
    />
    <button
      className="bg-gray-900 text-white size-[2em] flexc rounded shadow font-bold text-[1em]"
      onClick={() => updateQuantity(item.id, item.quantity + 1)}
    >
      +
    </button>
  </div>
);

const CartItem = ({
  item,
  updateQuantity,
  removeItem,
  className = "",
}: {
  item: CartItemInterface;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  className?: string;
}) => (
  <li
    key={item.id}
    className={`mb-5 flex items-center justify-between text-[16px] bg-gray-100 overflow-hidden rounded-lg p-3 ${className}`}
  >
    <div className="flexcc gap-2 h-[160px] w-full !items-start">
      <div className="flexc gap-2 w-full h-full !items-start p-1">
        <CartItemImage item={item} />
        <div className="text-[12px] h-full w-full">
          <CartItemLabels item={item} />
        </div>
      </div>

      <div className="flexc w-full !justify-between py-1 px-2">
        <span className="text-[1.1em] font-bold">
          {formatRupiah(item.totalPrice)}
        </span>
        <CartItemActions
          item={item}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>
    </div>
  </li>
);

export default CartItem;
