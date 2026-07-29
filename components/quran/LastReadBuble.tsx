"use client";

import { useBookMark } from "@/stores/useBookMarkStore";
import Link from "next/link";

export default function LastReadBuble() {
  const lastRead = useBookMark((s) => s.lastRead);

  if (!lastRead) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4 md:bottom-6 md:max-w-fit">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md transition-colors duration-300 md:rounded-full dark:border-gray-700 dark:bg-gray-900/80">
        <span className="min-w-0 truncate text-xs text-gray-700 md:text-sm dark:text-gray-200">
          📍Lanjutkan :{" "}
          {lastRead.juz && <span className="ml-1">Juz {lastRead.juz} •</span>}{" "}
          {lastRead.surahName} • Ayat {lastRead.ayat}
        </span>

        <Link
          href={
            lastRead.href ?? `/surah/${lastRead.surah}#ayat-${lastRead.ayat}`
          }
          className="shrink-0 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 md:text-sm dark:text-blue-300 dark:hover:text-blue-200"
        >
          Buka
        </Link>
      </div>
    </div>
  );
}
