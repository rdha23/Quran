"use client";

import { useBookMark } from "@/stores/surah/useBookMarkStore";
import { BookmarkIcon, BookOpenCheck, Scroll } from "lucide-react";
import Link from "next/link";

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

      {/* Tafsir */}
      <Link
        href={`/tafsir/${surah}/${ayat}?from=${encodeURIComponent(href)}`}
        className="text-gray-400 hover:scale-110 dark:text-gray-500"
      >
        <Scroll className="h-5 w-5 transition-colors duration-200 hover:text-violet-500 dark:hover:text-violet-400" />
      </Link>
    </div>
  );
}
