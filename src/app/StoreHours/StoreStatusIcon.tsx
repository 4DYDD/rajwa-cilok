import React from "react";

const StoreStatusIcon = ({
  isOpen,
  expanded,
}: {
  isOpen: boolean;
  expanded: boolean;
}) => (
  <div
    className={`flex items-center justify-center transall !duration-300 ${
      isOpen ? "bg-green-400" : "bg-red-400"
    }`}
    style={{
      width: expanded ? 56 : 40,
      height: expanded ? 56 : 40,
      minWidth: expanded ? 56 : 40,
      minHeight: expanded ? 56 : 40,
      borderRadius: "50%",
      marginRight: expanded ? 16 : 0,
    }}
  >
    <span className="text-white font-bold text-xs">
      {isOpen ? "Buka" : "Tutup"}
    </span>
  </div>
);

export default StoreStatusIcon;
