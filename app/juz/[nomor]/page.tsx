import QuranReader from "@/components/juz/QuranReader";
import SurahSettings from "@/components/surah/SurahSettings";
import ThemeToggle from "@/components/theme-toggle";
import { getJuzDetails } from "@/lib/api/juz";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function JuzPage({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;

  const ayat = await getJuzDetails(Number(nomor));

  const currentJuz = Number(nomor);

  const previousJuz = currentJuz > 1 ? currentJuz - 1 : null;
  const nextJuz = currentJuz < 30 ? currentJuz + 1 : null;

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

      <div className="mx-auto mb-10 flex items-center justify-center">
        <div className="w-32">
          {previousJuz && (
            <Link
              href={`/juz/${previousJuz}`}
              className="inline-flex max-w-full items-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-blue-700 transition-colors duration-300 hover:bg-blue-50 md:px-4 md:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800"
            >
              ← Juz {previousJuz}
            </Link>
          )}
        </div>

        <h1 className="text-center text-2xl font-bold text-blue-700">
          Juz {nomor}
        </h1>

        <div className="w-32 text-right">
          {nextJuz && (
            <Link
              href={`/juz/${nextJuz}`}
              className="inline-flex max-w-full items-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-blue-700 transition-colors duration-300 hover:bg-blue-50 md:px-4 md:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800"
            >
              Juz {nextJuz} →
            </Link>
          )}
        </div>
      </div>

      <QuranReader ayat={ayat} juzNumber={Number(nomor)} />
    </div>
  );
}
