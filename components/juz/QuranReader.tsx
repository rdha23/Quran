"use client";

import { useEffect } from "react";
import useSurahSettings from "@/stores/surah/useSurahSettingsStore";
import AyatActions from "../quran/AyatActions";
import { JuzAyat } from "@/types/juz";

type QuranReaderProps = {
  ayat: JuzAyat[];
  juzNumber: number;
};

export default function QuranReader({ ayat, juzNumber }: QuranReaderProps) {
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
      {ayat.map((item, index) => {
        const isNewSurah =
          index === 0 || ayat[index - 1].surahNomor !== item.surahNomor;

        const showBismillah =
          item.nomorAyat === 1 &&
          item.surahNomor !== 1 &&
          item.surahNomor !== 9;

        return (
          <div
            key={`${item.surahNomor}-${item.nomorAyat}`}
            className="border-b border-blue-300 py-6 last:border-none dark:border-gray-700"
          >
            {isNewSurah && (
              <div className="mb-8 text-center">
                <h2 className="text-xl font-bold text-blue-700 md:text-2xl dark:text-blue-400">
                  {item.surahNamaLatin}
                </h2>
                <span className="block text-sm font-medium text-gray-500 md:text-base dark:text-gray-400">
                  {item.surahArti} • {item.surahJumlahAyat} Ayat
                </span>

                {showBismillah && (
                  <p
                    dir="rtl"
                    className="mt-4 text-3xl leading-loose md:text-4xl"
                  >
                    بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </p>
                )}
              </div>
            )}

            <div id={`ayat-${item.nomorAyat}`}>
              <p
                dir="rtl"
                className="text-right text-2xl leading-loose md:text-4xl"
              >
                {item.teksArab}
                <span className="mr-2">
                  ۝{item.nomorAyat.toLocaleString("ar-EG")}
                </span>
              </p>

              {showLatin && (
                <p className="mt-4 text-sm text-blue-500 italic">
                  {item.teksLatin}
                </p>
              )}

              {showTranslation && (
                <p className="mt-3 text-sm">{item.teksIndonesia}</p>
              )}

              <AyatActions
                surah={item.surahNomor}
                ayat={item.nomorAyat}
                surahName={item.surahNama}
                href={`/juz/${juzNumber}#ayat-${item.nomorAyat}`}
                juz={juzNumber}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
