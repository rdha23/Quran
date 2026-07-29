import { SurahList } from "@/types/surah";

export type NavigationItem = {
  surah: number;
  ayat: number;
  namaLatin: string;
};

export type AyatNavigation = {
  previous: NavigationItem | null;
  next: NavigationItem | null;
};

export function getNavigation(
  surah: number,
  ayat: number,
  surahList: SurahList[],
): AyatNavigation {
  const current = surahList.find((s) => s.nomor === surah);

  if (!current) {
    return {
      previous: null,
      next: null,
    };
  }

  let previous: NavigationItem | null = null;
  let next: NavigationItem | null = null;

  if (ayat > 1) {
    previous = {
      surah,
      ayat: ayat - 1,
      namaLatin: current.namaLatin,
    };
  } else {
    const prevSurah = surahList.find((s) => s.nomor === surah - 1);

    if (prevSurah) {
      previous = {
        surah: prevSurah.nomor,
        ayat: prevSurah.jumlahAyat,
        namaLatin: prevSurah.namaLatin,
      };
    }
  }

  if (ayat < current.jumlahAyat) {
    next = {
      surah,
      ayat: ayat + 1,
      namaLatin: current.namaLatin,
    };
  } else {
    const nextSurah = surahList.find((s) => s.nomor === surah + 1);

    if (nextSurah) {
      next = {
        surah: nextSurah.nomor,
        ayat: 1,
        namaLatin: nextSurah.namaLatin,
      };
    }
  }

  return {
    previous,
    next,
  };
}
