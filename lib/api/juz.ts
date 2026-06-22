import { juzMapping } from "@/data/juz-mapping";
import { getSurahByNumber } from "./quran";
import { SurahList } from "@/types/quran";

export async function getJuzDetails(juz: number) {
  const ranges = juzMapping.filter((item) => item.juz === juz);

  const result = [];

  for (const range of ranges) {
    const surah = await getSurahByNumber(range.surah);

    const ayat = surah.ayat
      .filter(
        (a) => a.nomorAyat >= range.startAyat && a.nomorAyat <= range.endAyat,
      )
      .map((a) => ({
        ...a,
        surahNomor: surah.nomor,
        surahNama: surah.nama,
        surahNamaLatin: surah.namaLatin,
        surahJumlahAyat: surah.jumlahAyat,
        surahArti: surah.arti,
      }));

    result.push(...ayat);
  }

  return result;
}

export function getJuzList(surahList: SurahList[]) {
  const juzNumbers = [...new Set(juzMapping.map((j) => j.juz))];

  return juzNumbers.map((juz) => {
    const ranges = juzMapping.filter((j) => j.juz === juz);

    const firstSurah = surahList.find((s) => s.nomor === ranges[0].surah);

    const lastSurah = surahList.find(
      (s) => s.nomor === ranges[ranges.length - 1].surah,
    );

    return {
      nomor: juz,
      firstSurah: firstSurah?.namaLatin,
      lastSurah: lastSurah?.namaLatin,
    };
  });
}
