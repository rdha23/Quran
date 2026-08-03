"use client";

import { Qari } from "@/data/qari";
import useAudioStore from "@/stores/useAudioStore";
import { useBookMark } from "@/stores/useBookMarkStore";
import { BookmarkIcon, BookOpenCheck, MicVocal, Scroll } from "lucide-react";
import Link from "next/link";
import AyatAudioPlayer from "../audio/AyatAudioPlayer";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  surah: number;
  ayat: number;
  surahName?: string;
  href: string;
  juz?: number;
  audio: Record<Qari, string>;
};

export default function AyatActions({
  surah,
  ayat,
  surahName,
  href,
  juz,
  audio,
}: Props) {
  const bookmarks = useBookMark((s) => s.bookmarks);
  const lastRead = useBookMark((s) => s.lastRead);
  const toggleBookmark = useBookMark((s) => s.toggleBookmark);
  const toggleLastRead = useBookMark((s) => s.toggleLastRead);
  const selectedQari = useAudioStore((s) => s.selectedQari);
  const currentAyatTrack = useAudioStore((s) => s.currentAyatTrack);
  const setCurrentAyatTrack = useAudioStore((s) => s.setCurrentAyatTrack);

  // cek apakah sudah dibookmark
  const isBookmarked = bookmarks.some(
    (b) => b.surah === surah && b.ayat === ayat,
  );

  // cek apakah last read
  const isLastRead = lastRead?.surah === surah && lastRead?.ayat === ayat;

  const isCurrentAyat =
    currentAyatTrack?.surahNumber === surah &&
    currentAyatTrack?.ayatNumber === ayat;

  return (
    <>
      <div className="mt-4 flex gap-6">
        {/* Bookmark */}
        <Tooltip>
          <TooltipTrigger asChild>
            <BookmarkIcon
              onClick={() =>
                toggleBookmark({ surah, ayat, surahName, href, juz })
              }
              className={`h-5 w-5 cursor-pointer transition-all duration-200 ${
                isBookmarked
                  ? "fill-blue-500 text-blue-500 dark:fill-blue-400 dark:text-blue-400"
                  : "text-gray-400 dark:text-gray-500"
              } hover:scale-110`}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-white text-blue-700 dark:bg-gray-900 dark:text-blue-300">
            <p>Bookmark</p>
          </TooltipContent>
        </Tooltip>

        {/* Last Read */}
        <Tooltip>
          <TooltipTrigger asChild>
            <BookOpenCheck
              onClick={() =>
                toggleLastRead({ surah, ayat, surahName, href, juz })
              }
              className={`h-5 w-5 cursor-pointer transition-all duration-200 ${
                isLastRead
                  ? "text-green-500 dark:text-green-400"
                  : "text-gray-400 dark:text-gray-500"
              } hover:scale-110`}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-white text-blue-700 dark:bg-gray-900 dark:text-blue-300">
            <p>Last Read</p>
          </TooltipContent>
        </Tooltip>

        {/* Tafsir */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/tafsir/${surah}/${ayat}?from=${encodeURIComponent(href)}`}
              className="text-gray-400 hover:scale-110 dark:text-gray-500"
            >
              <Scroll className="h-5 w-5 transition-colors duration-200 hover:text-violet-500 dark:hover:text-violet-400" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-blue-700 dark:bg-gray-900 dark:text-blue-300">
            <p>Tafsir</p>
          </TooltipContent>
        </Tooltip>

        {/* Audio */}
        <div className="flex items-center gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <MicVocal
                className="dark:hover:text-hover-400 h-5 w-5 text-gray-400 transition-colors duration-200 hover:text-orange-500 dark:text-gray-500"
                onClick={() =>
                  setCurrentAyatTrack({
                    surahNumber: surah,
                    ayatNumber: ayat,
                    audio: audio[selectedQari],
                  })
                }
              />
            </TooltipTrigger>
            <TooltipContent className="bg-white text-blue-700 dark:bg-gray-900 dark:text-blue-300">
              <p>Audio</p>
            </TooltipContent>
          </Tooltip>

          {isCurrentAyat && <AyatAudioPlayer audio={currentAyatTrack.audio} />}
        </div>
      </div>
      {/* {isCurrentAyat && <AyatAudioPlayer audio={currentAyatTrack.audio} />} */}
    </>
  );
}
