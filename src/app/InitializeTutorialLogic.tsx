"use client";

import { useEffect } from "react";
import useTutorialStore, { TutorialStep } from "./hooks/useTutorialStore";

const InitializeTutorialLogic = () => {
  const { setTutorialSteps, checkInitialTutorialStatus } = useTutorialStore();

  useEffect(() => {
    const steps: TutorialStep[] = [
      {
        title: "Selamat Datang!",
        text: "Ini adalah menu utama kami. Kamu bisa lihat berbagai pilihan cilok dan minuman.",
        name: "Menu Utama dari Rajwa Cilok",
        highlightedElementId: "tutorial-highlight-menu-grid",
      },
      {
        title: "Pilih Menu",
        text: "Tap pada salah satu item untuk melihat detail atau menambahkannya ke keranjang.",
        name: "Cara masukkan Menu ke keranjang lewat tombol bakul biru",
        highlightedElementId: "tutorial-target-menu-item-1",
      },
      {
        title: "Jam Buka Warung",
        text: "Cek jam operasional toko kami di sini ya!",
        name: "Info tentang Jam Buka Rajwa Cilok",
        highlightedElementId: "tutorial-highlight-store-hours-section",
      },
      {
        title: "Tombol buka keranjang",
        text: "Gunakan tombol ini untuk membuka keranjangmu, tempat semua pesananmu ditampung sebelum di checkout.",
        name: "Tombol di pojok kanan atas untuk buka keranjang",
        highlightedElementId: "tutorial-highlight-header-menu-button",
      },
    ];

    setTutorialSteps(steps);
    checkInitialTutorialStatus();
  }, [setTutorialSteps, checkInitialTutorialStatus]);

  return null;
};

export default InitializeTutorialLogic;
