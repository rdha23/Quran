import { Tafsir } from "@/types/tafsir";
import { getSurahByNumber } from "./quran";

export async function getAyatTafsir(
  surahNumber: number,
  ayatNumber: number,
): Promise<Tafsir> {
  const res = await fetch(`https://equran.id/api/v2/tafsir/${surahNumber}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tafsir");
  }

  const { data } = await res.json();

  const tafsir = data.tafsir.find(
    (item: { ayat: number }) => item.ayat === ayatNumber,
  );

  if (!tafsir) {
    throw new Error("Tafsir not found");
  }

  return {
    nomor: data.nomor,
    nama: data.nama,
    namaLatin: data.namaLatin,
    arti: data.arti,
    tafsir,
  };
}

export async function getTafsirPageData(
  surahNumber: number,
  ayatNumber: number,
) {
  const [surah, tafsir] = await Promise.all([
    getSurahByNumber(surahNumber),
    getAyatTafsir(surahNumber, ayatNumber),
  ]);

  const ayat = surah.ayat.find((a) => a.nomorAyat === ayatNumber);

  if (!ayat) {
    throw new Error("Ayat not found");
  }

  return {
    nomor: surah.nomor,
    nama: surah.nama,
    namaLatin: surah.namaLatin,
    arti: surah.arti,
    ayat,
    tafsir: tafsir.tafsir,
  };
}
