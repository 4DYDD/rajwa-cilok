// Fungsi untuk menentukan status buka/tutup dan waktu berikutnya
export function getNextOpenClose(
  now: Date,
  openHour: number,
  openMinute: number,
  closeHour: number,
  closeMinute: number
): {
  isOpen: boolean;
  nextOpen: Date;
  nextClose: Date;
} {
  const open = new Date(now);
  open.setHours(openHour, openMinute, 0, 0);
  const close = new Date(now);
  close.setHours(closeHour, closeMinute, 0, 0);

  let isOpen = false;
  let nextOpen = new Date(open);
  let nextClose = new Date(close);

  if (now < open) {
    isOpen = false;
    nextOpen = open;
    nextClose = close;
  } else if (now >= open && now < close) {
    isOpen = true;
    nextOpen = new Date(open);
    nextOpen.setDate(open.getDate() + 1);
    nextClose = close;
  } else {
    isOpen = false;
    nextOpen = new Date(open);
    nextOpen.setDate(open.getDate() + 1);
    nextClose = new Date(close);
    nextClose.setDate(close.getDate() + 1);
  }

  return { isOpen, nextOpen, nextClose };
}
