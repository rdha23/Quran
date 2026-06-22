"use client";

import { useBookMark } from "@/stores/surah/useBookMarkStore";
import { BookmarkIcon, BookOpenCheck } from "lucide-react";

type Props = {
  surah: number;
  ayat: number;
  surahName?: string;
  href: string;
  juz?: number;
};

export default function AyatActions({
  surah,
  ayat,
  surahName,
  href,
  juz,
}: Props) {
  const bookmarks = useBookMark((s) => s.bookmarks);
  const lastRead = useBookMark((s) => s.lastRead);
  const toggleBookmark = useBookMark((s) => s.toggleBookmark);
  const toggleLastRead = useBookMark((s) => s.toggleLastRead);

  // cek apakah sudah dibookmark
  const isBookmarked = bookmarks.some(
    (b) => b.surah === surah && b.ayat === ayat,
  );

  // cek apakah last read
  const isLastRead = lastRead?.surah === surah && lastRead?.ayat === ayat;

  return (
    <div className="mt-4 flex gap-6">
      {/* Bookmark */}
      <BookmarkIcon
        onClick={() => toggleBookmark({ surah, ayat, surahName, href, juz })}
        className={`h-5 w-5 cursor-pointer transition-all duration-200 ${
          isBookmarked
            ? "fill-blue-500 text-blue-500 dark:fill-blue-400 dark:text-blue-400"
            : "text-gray-400 dark:text-gray-500"
        } hover:scale-110`}
      />

      {/* Last Read */}
      <BookOpenCheck
        onClick={() => toggleLastRead({ surah, ayat, surahName, href, juz })}
        className={`h-5 w-5 cursor-pointer transition-all duration-200 ${
          isLastRead
            ? "text-green-500 dark:text-green-400"
            : "text-gray-400 dark:text-gray-500"
        } hover:scale-110`}
      />
    </div>
  );
}
