export type TafsirAyat = {
  ayat: number;
  teks: string;
};

export type Tafsir = {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  tafsir: TafsirAyat;
};
