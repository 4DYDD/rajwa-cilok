"use client";

// Import React dan hooks yang diperlukan
import React from "react";
// Import custom hook untuk mendapatkan jam buka/tutup
import { useStoreHoursPanel } from "./StoreHoursFunction/useStoreHoursPanel";
// Import komponen-komponen utama dari folder ini
import {
  StoreStatusIcon,
  StoreStatusDetail,
  HideNotificationButton,
} from "./theindex";

// Komponen utama StoreHours
const StoreHours = () => {
  // Gunakan custom hook untuk seluruh state dan logic panel
  const {
    openHour,
    openMinute,
    closeHour,
    closeMinute,
    isOpen,
    expanded,
    setExpanded,
    ref,
    countdown,
    hidden,
    setHidden,
  } = useStoreHoursPanel();

  // Jika disembunyikan, tidak render apapun
  if (hidden) return null;

  // Render UI utama
  return (
    <div
      ref={ref}
      className={`fixed bottom-14 right-6 z-50 transall !duration-300 clicked select-none ${
        !expanded && isOpen ? "animate-bounceku" : ""
      } ${
        expanded
          ? "w-80 px-6 h-32 rounded-lg"
          : "w-14 px-0 h-14 !justify-center rounded-full"
      } bg-white shadow-xl flexc group overflow-hidden`}
      style={{
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      {/* Tombol untuk menyembunyikan notifikasi */}
      {expanded && (
        <HideNotificationButton
          onClick={(e) => {
            e.stopPropagation();
            if (
              window.confirm(
                "Apakah Anda yakin ingin menyembunyikan notifikasi jam buka/tutup warung?"
              )
            ) {
              setHidden(true);
            }
          }}
        />
      )}
      {/* Ikon status buka/tutup */}
      <StoreStatusIcon isOpen={isOpen} expanded={expanded} />
      {/* Detail status buka/tutup */}
      {expanded && (
        <StoreStatusDetail
          isOpen={isOpen}
          openHour={openHour}
          openMinute={openMinute}
          closeHour={closeHour}
          closeMinute={closeMinute}
          countdown={countdown}
          expanded={expanded}
        />
      )}
    </div>
  );
};

export default StoreHours;
