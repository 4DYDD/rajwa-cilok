import useIsMobile from "@/app/hooks/useIsMobile";
import React from "react";

const StoreStatusIcon = ({
  isOpen,
  expanded,
}: {
  isOpen: boolean;
  expanded: boolean;
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={`flexc transall !duration-300 
      ${!isMobile ? "text-[0.9em]" : "text-[0.8em]"} 
      ${isOpen ? "bg-green-400" : "bg-red-400"}`}
      style={{
        width: expanded || !isMobile ? (!isMobile ? 70 : 56) : 40,
        height: expanded || !isMobile ? (!isMobile ? 70 : 56) : 40,
        minWidth: expanded || !isMobile ? (!isMobile ? 70 : 56) : 40,
        minHeight: expanded || !isMobile ? (!isMobile ? 70 : 56) : 40,
        borderRadius: "50%",
        marginRight: expanded || !isMobile ? 16 : 0,
      }}
    >
      <span className="text-white font-bold text-[1em]">
        {isOpen ? "Buka" : "Tutup"}
      </span>
    </div>
  );
};

export default StoreStatusIcon;
