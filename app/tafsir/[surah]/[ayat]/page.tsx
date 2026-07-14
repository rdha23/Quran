import { getTafsirPageData } from "@/lib/api/tafsir";
import { ArrowLeft } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { getAllSurah } from "@/lib/api/quran";
import { getNavigation } from "@/lib/utils/navigation";

type Props = {
  params: Promise<{
    surah: string;
    ayat: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
};

export default async function TafsirPage({ params, searchParams }: Props) {
  const { surah, ayat } = await params;
  const { from } = await searchParams;

  const {
    nama,
    arti,
    ayat: ayattafsir,
    tafsir,
  } = await getTafsirPageData(Number(surah), Number(ayat));

  const surahList = await getAllSurah();
  const { previous, next } = getNavigation(
    Number(surah),
    Number(ayat),
    surahList,
  );

  // return <pre>{JSON.stringify(tafsir, null, 2)}</pre>;

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 via-white to-white px-6 pt-8 pb-8 transition-colors duration-300 md:px-8 md:pt-12 lg:px-20 lg:pt-16 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="mb-10 flex items-center justify-between">
        <Link
          href={from ?? `/surah/${surah}#ayat-${ayat}`}
          className="inline-flex items-center gap-2 ..."
        >
          <ArrowLeft size={18} />
          Kembali
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
      <div className="mb-8 text-center md:mb-10">
        <h1 className="text-2xl font-bold text-blue-700 transition-colors duration-300 md:text-3xl dark:text-blue-400">
          {nama}
        </h1>

        <div className="mt-2 text-blue-500 transition-colors duration-300 dark:text-blue-300">
          <p className="text-xs tracking-[0.15em] text-blue-600/80 italic md:text-sm md:tracking-[0.2em] dark:text-blue-200/80">
            {arti}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Ayat */}
        <section className="rounded-3xl border border-blue-100 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-colors dark:border-gray-800 dark:bg-gray-900/60">
          <p
            dir="rtl"
            className="text-right text-3xl leading-[2.5] font-medium text-gray-800 md:text-5xl dark:text-gray-100"
          >
            {ayattafsir.teksArab}
            <span className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {ayattafsir.nomorAyat.toLocaleString("ar-EG")}
            </span>
          </p>
        </section>

        {/* Latin */}
        <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 transition-colors dark:border-blue-900/50 dark:bg-blue-950/30">
          <h2 className="mb-2 text-sm font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
            Latin
          </h2>

          <p className="text-base leading-8 text-blue-700 italic dark:text-blue-200">
            {ayattafsir.teksLatin}
          </p>
        </section>

        {/* Terjemahan */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            Terjemahan
          </h2>

          <p className="text-base leading-8 text-gray-700 dark:text-gray-300">
            {ayattafsir.teksIndonesia}
          </p>
        </section>

        {/* Tafsir */}
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 transition-colors dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-6 w-1 rounded-full bg-emerald-500" />
            <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
              Tafsir
            </h2>
          </div>

          <p className="text-base leading-9 text-gray-700 dark:text-gray-300">
            {tafsir.teks}
          </p>
        </section>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {previous ? (
          <Link
            href={`/tafsir/${previous.surah}/${previous.ayat}`}
            className="rounded-2xl border p-5 transition hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <p className="text-sm text-gray-500">← Ayat Sebelumnya</p>

            <p className="mt-1 font-semibold">
              {previous.namaLatin} : {previous.ayat}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/tafsir/${next.surah}/${next.ayat}`}
            className="rounded-2xl border p-5 text-right transition hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <p className="text-sm text-gray-500">Ayat Selanjutnya →</p>

            <p className="mt-1 font-semibold">
              {next.namaLatin} : {next.ayat}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
