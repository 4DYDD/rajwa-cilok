"use client";

// Import React dan hooks yang diperlukan
import React from "react";
// Import custom hook untuk mendapatkan jam buka/tutup
import { useStoreHoursPanel } from "./StoreHoursFunction/useStoreHoursPanel";
// Import komponen-komponen utama dari folder ini
import StoreStatusIcon from "./StoreStatusIcon"; // Corrected import
import StoreStatusDetail from "./StoreStatusDetail"; // Corrected import
import HideNotificationButton from "./HideNotificationButton"; // Corrected import
import { showConfirm } from "../../app/hooks/useConfirmStore"; // Corrected path
import useIsMobile from "@/app/hooks/useIsMobile";

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

  const { isMobile } = useIsMobile();

  // Jika disembunyikan, tidak render apapun
  if (hidden) return null;

  // Render UI utama
  return (
    <div
      id="tutorial-highlight-store-hours-section"
      ref={ref}
      className={`!fixed transcenter-b-r z-50 transall !duration-300 ${
        !expanded && isOpen ? "animate-bounceku" : ""
      } ${
        expanded || !isMobile
          ? (!isMobile
              ? "w-[400px] !right-[1710px] !bottom-[820px] h-40"
              : "w-[340px] !bottom-32 h-48") + " px-6 rounded-lg" // Width reverted to w-80, height remains h-40
          : "!bottom-20 !right-14 w-14 px-0 h-14 !justify-center rounded-full"
      } bg-white shadow-xl flexc group overflow-hidden`}
      style={{
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
      }}
      onClick={() => {
        // Jika dalam mode mobile, toggle expanded state
        // clicked select-none
        if (isMobile && !expanded) setExpanded((e) => !e);
      }}
    >
      {/* Tombol untuk menyembunyikan notifikasi */}
      {(expanded || !isMobile) && (
        <HideNotificationButton
          onClick={(e) => {
            e.stopPropagation();

            showConfirm(
              "Apakah Anda yakin ingin menyembunyikan notifikasi jam **buka/tutup** warung?",
              () => {
                setHidden(true);
              },
              () => {}
            );
          }}
        />
      )}
      {/* Ikon status buka/tutup */}
      <StoreStatusIcon isOpen={isOpen} expanded={expanded} />
      {/* Detail status buka/tutup */}
      {(expanded || !isMobile) && (
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
