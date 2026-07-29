export type SurahList = {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  jumlahAyat: number;
  tempatTurun: string;
};

export type AudioQari = {
  "01": string;
  "02": string;
  "03": string;
  "04": string;
  "05": string;
  "06": string;
};

export type Ayat = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioQari;
};

export type SurahNav = {
  nomor: number;
  namaLatin: string;
};

export type SurahDetail = {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  audioFull: AudioQari;
  ayat: Ayat[];
  suratSelanjutnya?: SurahNav;
  suratSebelumnya?: SurahNav;
};
