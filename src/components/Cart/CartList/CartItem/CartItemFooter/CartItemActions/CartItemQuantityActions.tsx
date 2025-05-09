import QuantityField from "@/components/Cart/CartList/CartItem/CartItemFooter/CartItemActions/CartItemQuantityField";

const CartItemQuantityActions = ({
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
  <div className={`flex items-center gap-1 text-[13px] ${className}`}>
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
      className="w-[40px] h-[2em] flexc font-bold text-[1em]"
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

export default CartItemQuantityActions;
