import { SurahDetail, SurahList } from "@/types/surah";

export async function getAllSurah(): Promise<SurahList[]> {
  const res = await fetch("https://equran.id/api/v2/surat", {
    next: { revalidate: 86400 },
  });

  const json = await res.json();

  return json.data.map((surah: any) => ({
    nomor: surah.nomor,
    nama: surah.nama,
    namaLatin: surah.namaLatin,
    arti: surah.arti,
    jumlahAyat: surah.jumlahAyat,
    tempatTurun: surah.tempatTurun,
  }));
}

export async function getSurahByNumber(number: number): Promise<SurahDetail> {
  const res = await fetch(`https://equran.id/api/v2/surat/${number}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch surah");
  }

  const json = await res.json();

  if (!json.data) {
    throw new Error("Surah not found");
  }

  const data = json.data;

  return {
    nomor: data.nomor,
    nama: data.nama,
    namaLatin: data.namaLatin,
    jumlahAyat: data.jumlahAyat,
    tempatTurun: data.tempatTurun,
    arti: data.arti,
    audioFull: data.audioFull,
    ayat: data.ayat,
    suratSelanjutnya: data.suratSelanjutnya,
    suratSebelumnya: data.suratSebelumnya,
  };
}
