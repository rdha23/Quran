"use client";

import { useEffect } from "react";

import useSurahSettings from "@/stores/useSurahSettingsStore";
import { SurahDetail } from "@/types/surah";
import AyatActions from "../quran/AyatActions";

export default function SurahClient({ surah }: { surah: SurahDetail }) {
  const showLatin = useSurahSettings((s) => s.showLatin);
  const showTranslation = useSurahSettings((s) => s.showTranslation);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const element = document.querySelector(hash);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, []);

  return (
    <>
      {surah.ayat.map((ayat) => (
        <div
          id={`ayat-${ayat.nomorAyat}`}
          key={ayat.nomorAyat}
          className="border-b border-blue-300 py-6 transition-colors duration-300 last:border-none dark:border-gray-700"
        >
          {/* Arab */}
          <p
            dir="rtl"
            className="text-right text-2xl leading-loose font-medium text-gray-800 transition-colors duration-300 md:text-4xl md:leading-loose dark:text-gray-100"
          >
            {ayat.teksArab}
            <span className="text-secondary-500 dark:text-secondary-300 mr-2 inline-block text-xl md:text-2xl">
              ۝{ayat.nomorAyat.toLocaleString("ar-EG")}
            </span>
          </p>

          {/* Latin */}
          {showLatin && (
            <p className="mt-4 text-sm leading-relaxed text-blue-500 italic transition-colors duration-300 md:text-base dark:text-blue-300">
              {ayat.teksLatin}
            </p>
          )}

          {/* Indonesia */}
          {showTranslation && (
            <p className="mt-3 text-sm leading-relaxed text-gray-700 transition-colors duration-300 md:text-base dark:text-gray-300">
              {ayat.teksIndonesia}
            </p>
          )}

          {/* Actions */}
          <AyatActions
            surah={surah.nomor}
            ayat={ayat.nomorAyat}
            surahName={surah.nama}
            href={`/surah/${surah.nomor}#ayat-${ayat.nomorAyat}`}
            audio={ayat.audio}
          />
        </div>
      ))}
    </>
  );
}
