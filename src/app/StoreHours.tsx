"use client";

import React, { useState, useRef, useEffect } from "react";
import { useStoreHours } from "./hooks/useStoreHours";

// import { useStoreHours } from "./useStoreHours";

const StoreHours = () => {
  const { openHour, openMinute, closeHour, closeMinute } = useStoreHours();

  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Helper function to get next open/close state and times
  function getNextOpenClose(now: Date): {
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

  // Helper function to get countdown string
  function getCountdown(target: Date): string {
    const now = new Date();
    let diff = Math.max(0, target.getTime() - now.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;
    const seconds = Math.floor(diff / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const [state, setState] = useState(() => {
    const now = new Date();
    return getNextOpenClose(now);
  });

  const [countdown, setCountdown] = useState(() =>
    getCountdown(state.isOpen ? state.nextClose : state.nextOpen)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nextState = getNextOpenClose(now);
      setState(nextState);
      setCountdown(
        getCountdown(
          nextState.isOpen ? nextState.nextClose : nextState.nextOpen
        )
      );
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div
      ref={ref}
      className={`fixed bottom-14 right-6 z-50 transition-all duration-300 clicked select-none ${
        state.isOpen && "animate-bounceku"
      } ${
        expanded
          ? "w-80 px-6 h-32 rounded-lg"
          : "w-14 px-0 h-14 justify-center rounded-full"
      } bg-white shadow-xl flex items-center cursor-pointer group overflow-hidden`}
      style={{
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
        transition: "width 0.3s, height 0.3s",
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      {expanded && (
        <button
          className="absolute top-1 left-1 text-gray-400 active:text-gray-700 text-2xl font-bold px-2 py-1 size-[30px] flexc"
          aria-label="Sembunyikan notifikasi"
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
        >
          ×
        </button>
      )}

      <div
        className={`flex items-center justify-center transition-all duration-300 ${
          state.isOpen ? "bg-green-400" : "bg-red-400"
        }`}
        style={{
          width: expanded ? 56 : 40,
          height: expanded ? 56 : 40,
          minWidth: expanded ? 56 : 40,
          minHeight: expanded ? 56 : 40,
          borderRadius: "50%",
          marginRight: expanded ? 16 : 0,
        }}
      >
        <span className="text-white font-bold text-xs">
          {state.isOpen ? "Buka" : "Tutup"}
        </span>
      </div>

      {expanded && (
        <div className="ml-2 flex flex-col justify-center overflow-hidden w-full relative">
          <span
            className={`leading-none font-bold text-gray-800 text-sm mb-1.5 py-1.5 truncate opacity-0 ${
              expanded && "!opacity-100"
            }`}
          >
            {state.isOpen ? "🔥 Warung sedang buka" : "🌙 Warung sudah tutup"}
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
            {state.isOpen
              ? `Tutup dalam ${countdown}`
              : `Buka dalam ${countdown}`}
          </span>
          <span className="text-[10px] text-gray-400 leading-tight break-words whitespace-normal">
            {state.isOpen
              ? "Silakan datang atau pesan sekarang!"
              : `Buka kembali pukul ${openHour
                  .toString()
                  .padStart(2, "0")}.${openMinute
                  .toString()
                  .padStart(2, "0")} WIB`}
          </span>
        </div>
      )}
    </div>
  );
};

export default StoreHours;
