"use client";

import { useBookMark } from "@/stores/surah/useBookMarkStore";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";

export default function BookmarkTabs() {
  const bookmarks = useBookMark((s) => s.bookmarks);
  const router = useRouter();

  if (bookmarks.length === 0) return null;

  return (
    <div className="mx-auto mt-6 w-full max-w-xl">
      <h2 className="text-center text-lg font-semibold tracking-tight">
        Your Bookmarks
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
        {bookmarks.map((b) => (
          <Card
            key={`${b.surah}-${b.ayat}`}
            onClick={() =>
              router.push(b.href ?? `/surah/${b.surah}#ayat-${b.ayat}`)
            }
            className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-800"
          >
            <p className="text-center text-sm font-semibold text-gray-800 dark:text-gray-100">
              {b.surahName || `Surah ${b.surah}`}
            </p>

            <p className="mt-1 text-center text-xs text-gray-500 dark:text-gray-100">
              Ayat {b.ayat}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
