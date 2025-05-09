import React from "react";

interface QuantityFieldProps {
  itemId: string;
  quantity: number;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void;
  className: string;
}

const QuantityField: React.FC<QuantityFieldProps> = ({
  itemId,
  quantity,
  updateQuantity,
  removeItem,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      const confirmDelete = window.confirm(
        "Menghapus digit terakhir akan membuat jumlah menjadi 0. Apakah Anda yakin ingin menghapus item ini dari keranjang?"
      );
      if (!confirmDelete) {
        e.target.value = quantity.toString(); // Reset to current quantity
        return;
      } else {
        // Directly remove the item from the cart state
        removeItem(itemId);
      }
    } else if (/^[0-9]*$/.test(value)) {
      // Allow only numeric input
      const newQuantity = parseInt(value, 10);
      if (newQuantity === 0) {
        const confirmDelete = window.confirm(
          "Jika Anda mengubah jumlah item menjadi 0, item akan dihapus. Apakah Anda yakin ingin menghapus item ini dari keranjang?"
        );
        if (!confirmDelete) {
          e.target.value = quantity.toString(); // Reset to current quantity
          return;
        } else {
          // Directly remove the item from the cart state
          removeItem(itemId);
        }
      }
      updateQuantity(itemId, isNaN(newQuantity) ? 0 : newQuantity);
    } else {
      // Prevent potentially harmful input
      e.target.value = quantity.toString(); // Reset to current quantity
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (e.target as HTMLFormElement).querySelector("input")?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className={` ${className}`}>
      <input
        className="size-full text-center bg-white overflow-hidden border border-gray-800 rounded transall"
        id={`quantity-${itemId}`}
        type="text"
        inputMode="numeric"
        value={quantity.toString()}
        onChange={handleChange}
      />
    </form>
  );
};

export default QuantityField;
