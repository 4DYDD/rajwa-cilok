import React from "react";

const StoreStatusDetail = ({
  isOpen,
  openHour,
  openMinute,
  closeHour,
  closeMinute,
  countdown,
  expanded,
}: {
  isOpen: boolean;
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  countdown: string;
  expanded: boolean;
}) => (
  <div className="ml-2 flex flex-col justify-center overflow-hidden w-full relative">
    <span
      className={`leading-none font-bold text-gray-800 text-sm mb-1.5 py-1.5 truncate opacity-0 ${
        expanded && "!opacity-100"
      }`}
    >
      {isOpen ? "🔥 Warung Buka" : "🌙 Warung Tutup"}
    </span>
    <span className="text-xs text-gray-600 leading-tight truncate">
      Jam buka : {openHour.toString().padStart(2, "0")}.
      {openMinute.toString().padStart(2, "0")} WIB
    </span>
    <span className="text-xs text-gray-600 leading-tight truncate">
      Jam tutup : {closeHour.toString().padStart(2, "0")}.
      {closeMinute.toString().padStart(2, "0")} WIB
    </span>
    <span className="text-[10px] text-gray-400 mt-1 mb-2 leading-tight break-words whitespace-normal">
      {isOpen ? `Tutup dalam ${countdown}` : `Buka dalam ${countdown}`}
    </span>
    <span className="text-[10px] text-gray-400 leading-tight break-words whitespace-normal">
      {isOpen
        ? "Silakan datang atau pesan sekarang!"
        : `Buka kembali pukul ${openHour
            .toString()
            .padStart(2, "0")}.${openMinute.toString().padStart(2, "0")} WIB`}
    </span>
  </div>
);

export default StoreStatusDetail;
