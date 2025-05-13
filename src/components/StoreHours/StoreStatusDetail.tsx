import React from "react";
import useTutorialStore from "../../app/hooks/useTutorialStore"; // Import useTutorialStore
import { InformationCircleIcon } from "@heroicons/react/24/outline"; // Import an icon for the button

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
}) => {
  const { restartTutorial } = useTutorialStore(); // Get restartTutorial action

  return (
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
      {/* Tombol untuk menampilkan lagi tutorialnya */}
      {expanded && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent StoreHours panel from closing
            restartTutorial();
          }}
          className="mt-2 flex items-center justify-center text-xs text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md py-1 px-2 transition-all duration-150 ease-in-out self-start group"
          title="Ulangi Tutorial"
        >
          <InformationCircleIcon className="h-4 w-4 mr-1 transition-transform duration-150 ease-in-out group-hover:scale-110" />
          Ulangi Tutorial
        </button>
      )}
    </div>
  );
};

export default StoreStatusDetail;
