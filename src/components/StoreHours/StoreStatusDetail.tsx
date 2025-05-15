import React from "react";
import useTutorialStore from "../../app/hooks/useTutorialStore"; // Import useTutorialStore
import useIsMobile from "@/app/hooks/useIsMobile";

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

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}.${minute
      .toString()
      .padStart(2, "0")}`;
  };

  const today = new Date();
  const isMonday = today.getDay() === 1; // 0 for Sunday, 1 for Monday

  const { isMobile } = useIsMobile();

  return (
    <div className="ml-2 flex flex-col overflow-hidden w-full relative py-2 h-full">
      {" "}
      {/* Added h-full */}
      <span
        className={`leading-none font-bold text-gray-800 text-base mb-1 py-1.5 truncate opacity-0 ${
          // Changed text-sm to text-xs
          (expanded || !isMobile) && "!opacity-100"
        }`} // Kept py-1.5 as per original
      >
        {isOpen ? (
          <>
            <i className="fas fa-store mr-1.5"></i> Warung Buka
          </>
        ) : (
          <>
            <i className="fas fa-store-slash mr-1.5"></i> Warung Tutup
          </>
        )}
      </span>
      {/* Table section for operational hours and countdown - ALWAYS VISIBLE */}
      <table className="w-full text-[12px] mb-2">
        <tbody>
          {/* Removed !isWednesday condition */}
          <>
            <tr>
              <th className="text-left font-bold w-[100px] py-0.5 text-gray-500 shrink-0">
                Jam Operasional
              </th>
              <td className="py-0.5 px-1 font-medium text-gray-800">
                : {formatTime(openHour, openMinute)} -{" "}
                {formatTime(closeHour, closeMinute)} WIB
              </td>
            </tr>
            {!isMonday && ( // Hide countdown on Monday as it's not relevant
              <tr>
                <th className="text-left font-bold w-[100px] py-0.5 text-gray-500 shrink-0">
                  {isOpen ? "Tutup dalam" : "Buka dalam"}
                </th>
                <td className="py-0.5 px-1 font-medium text-gray-800">
                  : {countdown}
                </td>
              </tr>
            )}
          </>
        </tbody>
      </table>
      {isMonday ? (
        <span className="text-[12px] text-red-600 leading-tight break-words whitespace-normal mb-2 font-semibold">
          Mohon maaf, hari ini (Senin) warung tutup. Buka kembali besok pukul{" "}
          {formatTime(openHour, openMinute)} WIB.
        </span>
      ) : (
        <span className="text-[12px] text-gray-500 leading-tight break-words whitespace-normal mb-2 font-semibold">
          {" "}
          {/* Changed text-xs to text-[11px] */}
          {isOpen
            ? "Silakan datang atau pesan sekarang!"
            : `Warung akan buka kembali pukul ${formatTime(
                openHour,
                openMinute
              )} WIB.`}
        </span>
      )}
      {/* Tombol untuk menampilkan lagi tutorialnya */}
      {(expanded || !isMobile) && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent StoreHours panel from closing
            restartTutorial();
          }}
          className="ms-1 mb-2 clicked transall mt-auto flex items-center justify-center text-xs font-bold text-blue-700 bg-blue-100 active:bg-blue-200 active:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md py-2 px-4 self-start group !select-none"
          title="Ulangi Tutorial"
        >
          <i className="fas fa-redo mr-1.5 transition-transform duration-150 ease-in-out group-hover:scale-110"></i>
          Ulangi Tutorial
        </button>
      )}
    </div>
  );
};

export default StoreStatusDetail;
