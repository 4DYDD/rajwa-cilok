import React from "react";

// Mendefinisikan struktur untuk segmen teks beserta gayanya
export interface Segment {
  text: string;
  isBold?: boolean;
  isItalic?: boolean; // Untuk format miring di masa mendatang
}

/**
 * Mem-parsing string pesan awal menjadi satu segmen.
 * @param message String pesan mentah.
 * @returns Array yang berisi satu segmen.
 */
export const parseInitialSegments = (message: string): Segment[] => {
  return [{ text: message }];
};

/**
 * Menerapkan format tebal ke segmen berdasarkan delimiter '**'.
 * Mempertahankan gaya lain yang sudah ada pada segmen.
 * @param segments Array dari Segmen.
 * @returns Array baru dari Segmen dengan format tebal diterapkan.
 */
export const applyBoldFormatting = (segments: Segment[]): Segment[] => {
  return segments.flatMap((segment) => {
    // Jika status tebal sudah ditentukan untuk segmen ini, jangan proses ulang untuk tebal.
    if (segment.isBold !== undefined) {
      return [segment];
    }
    const parts = segment.text.split("**");
    return parts
      .map((part, index) => ({
        ...segment, // Pertahankan gaya lain seperti isItalic
        text: part,
        isBold: index % 2 === 1, // Teks di antara '**' menjadi tebal
      }))
      .filter((s) => s.text.length > 0); // Hapus segmen kosong
  });
};

/**
 * Placeholder untuk menerapkan format miring.
 * Untuk saat ini, hanya mengembalikan segmen apa adanya.
 * @param segments Array dari Segmen.
 * @returns Array baru dari Segmen (di masa mendatang, dengan format miring diterapkan).
 */
export const applyItalicFormatting = (segments: Segment[]): Segment[] => {
  // TODO: Implementasikan logika format miring di sini, mis., memisahkan dengan '*' atau '_'.
  return segments;
};

/**
 * Merender array segmen yang sudah digayakan menjadi node React.
 * @param segments Array dari Segmen.
 * @returns Array dari React.ReactNode.
 */
export const renderFormattedSegments = (
  segments: Segment[]
): React.ReactNode[] => {
  return segments.map((segment, index) => {
    let content: React.ReactNode = segment.text;
    // Terapkan gaya - urutan mungkin penting untuk penumpukan, mis., miring di dalam tebal
    if (segment.isItalic) {
      content = <em key={`italic-${index}`}>{content}</em>;
    }
    if (segment.isBold) {
      content = <strong key={`bold-${index}`}>{content}</strong>;
    }
    return content;
  });
};

/**
 * Memformat string pesan dengan menerapkan semua aturan pemformatan
 * (tebal, miring, dll.) dan merendernya menjadi node React.
 * @param message String pesan mentah.
 * @returns Array dari React.ReactNode yang sudah diformat.
 */
export const formatMessage = (message: string): React.ReactNode[] => {
  const initialSegments = parseInitialSegments(message);
  const boldFormatted = applyBoldFormatting(initialSegments);
  const italicFormatted = applyItalicFormatting(boldFormatted); // Placeholder, akan menerapkan miring jika diimplementasikan
  return renderFormattedSegments(italicFormatted);
};
