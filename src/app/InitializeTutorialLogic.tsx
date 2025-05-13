"use client";

import { useEffect } from "react";
import useTutorialStore, { TutorialStep } from "./hooks/useTutorialStore";

const InitializeTutorialLogic = () => { // Renamed component
  const { setTutorialSteps, checkInitialTutorialStatus } = useTutorialStore();

  useEffect(() => {
    const steps: TutorialStep[] = [
      {
        title: "Selamat Datang!",
        text: "Ini adalah menu utama kami. Kamu bisa lihat berbagai pilihan cilok dan minuman.",
        highlightedElementId: "tutorial-highlight-menu-grid",
        arrow: { direction: "bottom" },
      },
      {
        title: "Pilih Menu",
        text: "Tap pada salah satu item untuk melihat detail atau menambahkannya ke keranjang.",
        arrow: { direction: "right", targetId: "tutorial-target-menu-item-1" },
      },
      {
        title: "Jam Buka Toko",
        text: "Cek jam operasional toko kami di sini ya!",
        highlightedElementId: "tutorial-highlight-store-hours-section",
        arrow: { direction: "top" },
      },
      {
        title: "Navigasi",
        text: "Gunakan tombol ini untuk membuka keranjangmu, tempat semua pesananmu ditampung sebelum di checkout.",
        highlightedElementId: "tutorial-highlight-header-menu-button",
        arrow: { direction: "right" }, // Changed from "left" to "right"
      },
    ];

    setTutorialSteps(steps);
    checkInitialTutorialStatus();
  }, [setTutorialSteps, checkInitialTutorialStatus]);

  return null; // This component doesn't render anything itself
};

export default InitializeTutorialLogic; // Renamed export
