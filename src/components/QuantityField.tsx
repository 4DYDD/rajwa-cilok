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
        "Quantity is 0. Do you want to remove this item from the cart?"
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
          "Quantity is 0. Do you want to remove this item from the cart?"
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
        className="size-full text-center"
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
