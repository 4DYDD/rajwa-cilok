"use client";

import React from "react";
import useConfirmStore from "../hooks/useConfirmStore"; // Path diperbarui
import {
  formatMessage, // Menggunakan formatMessage tunggal
} from "../utils/formatMessage"; // Impor fungsi dari utilitas

/**
 * Komponen MyConfirm adalah dialog konfirmasi yang dapat digunakan untuk menampilkan pesan
 * dan meminta pengguna untuk mengonfirmasi atau membatalkan tindakan tertentu.
 */
const MyConfirm: React.FC = () => {
  // Mengambil state dan fungsi dari store untuk mengelola dialog konfirmasi
  const { isOpen, message, onConfirm, onCancel, closeConfirm } =
    useConfirmStore();

  // Jika dialog tidak terbuka, tidak menampilkan apa pun
  if (!isOpen) {
    return null;
  }

  // Fungsi untuk menangani aksi konfirmasi
  const handleConfirm = () => {
    if (onConfirm) onConfirm(); // Memanggil callback jika ada
    closeConfirm(); // Menutup dialog
  };

  // Fungsi untuk menangani aksi pembatalan
  const handleCancel = () => {
    if (onCancel) onCancel(); // Memanggil callback jika ada
    closeConfirm(); // Menutup dialog
  };

  // Memproses pesan melalui pipeline pemformatan
  const formattedMessage = formatMessage(message);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[10000] p-5"
    >
      <div className="animate-squish bg-white p-4.5 rounded-lg shadow-xl max-w-sm w-full mx-auto">
        <div className="text-sm font-medium text-gray-800 mb-5 text-center">
          {formattedMessage} {/* Menggunakan pesan yang sudah diformat */}
        </div>

        <div className="flex justify-around gap-2">
          <button
            onClick={handleCancel}
            className="clicked transall w-[125px] flexc bg-red-500 hover:bg-red-600 text-white font-bold text-[0.8em] py-2.5 px-2.5 rounded-lg text-sm"
          >
            <i className="fas fa-times mr-2"></i>
            Batal
          </button>

          <button
            onClick={handleConfirm}
            className="clicked transall w-[125px] flexc bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-[0.8em] py-2.5 px-2.5 rounded-lg text-sm"
          >
            <i className="fas fa-check mr-2"></i>
            Ya, Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyConfirm;
