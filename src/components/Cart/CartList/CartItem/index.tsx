import CartItemFooter from "./CartItemFooter/index";
import CartItemDescriptions from "./CartItemDescriptions";
import { CartItemInterface } from "@/app/hooks/useCartStore";

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
    className={`flexc text-[16px] border border-gray-200 overflow-hidden ps-3 pe-3.5 py-6 ${className}`}
  >
    <div className="flexcc gap-2 h-[250px] w-full !items-start">
      <CartItemDescriptions item={item} />

      <CartItemFooter
        item={item}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  </li>
);

export default CartItem;
