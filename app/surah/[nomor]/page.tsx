import Link from "next/link";
import { getSurahByNumber } from "@/lib/api/surah";
import { ArrowLeft } from "lucide-react";

import SurahClient from "@/components/surah/SurahClient";
import SurahSettings from "@/components/quran/QuranSettings";
import ThemeToggle from "@/components/theme-toggle";
import AudioPlayer from "@/components/audio/SurahAudioPlayer";

export default async function SurahPage({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;
  const surah = await getSurahByNumber(Number(nomor));

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 via-white to-white px-6 pt-8 pb-8 transition-colors duration-300 md:px-8 md:pt-12 lg:px-20 lg:pt-16 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 hover:dark:text-blue-300"
        >
          <ArrowLeft size={18} />
          Kembali
        </Link>

        <div className="flex items-center gap-4">
          <SurahSettings />
          <ThemeToggle />
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 text-center md:mb-10">
        <h1 className="text-2xl font-bold text-blue-700 transition-colors duration-300 md:text-3xl dark:text-blue-400">
          {surah.nama}
        </h1>

        <div className="mt-2 text-blue-500 transition-colors duration-300 dark:text-blue-300">
          <p className="text-xs tracking-[0.15em] text-blue-600/80 italic md:text-sm md:tracking-[0.2em] dark:text-blue-200/80">
            {surah.arti}
          </p>

          <p className="mt-1 text-sm md:text-base">
            {surah.tempatTurun} • {surah.jumlahAyat} Ayat
          </p>
        </div>
      </div>

      {/* Navigasi */}
      <div className="mb-10 flex justify-between">
        {surah.suratSebelumnya && (
          <Link
            href={`/surah/${surah.suratSebelumnya.nomor}`}
            className="inline-flex max-w-full items-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-blue-700 transition-colors duration-300 hover:bg-blue-50 md:px-4 md:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800"
          >
            <span className="truncate">
              ← {surah.suratSebelumnya.namaLatin}
            </span>
          </Link>
        )}

        {surah.suratSelanjutnya && (
          <Link
            href={`/surah/${surah.suratSelanjutnya.nomor}`}
            className="inline-flex max-w-full items-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-blue-700 transition-colors duration-300 hover:bg-blue-50 md:px-4 md:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800"
          >
            <span className="truncate">
              {surah.suratSelanjutnya.namaLatin} →
            </span>
          </Link>
        )}
      </div>

      {/* Audio Player */}
      <AudioPlayer surah={surah} />

      {/* List Ayat */}
      <SurahClient surah={surah} />
    </div>
  );
}
