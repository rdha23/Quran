import JuzCard from "@/components/juz/JuzCard";
import SurahBookmark from "@/components/home/BookmarkTabs";
import SurahCard from "@/components/surah/SurahCard";
import SurahSearch from "@/components/surah/SurahSearch";
import ThemeToggle from "@/components/theme-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJuzList } from "@/lib/api/juz";

import { getAllSurah } from "@/lib/api/surah";

export default async function Home() {
  const surah = await getAllSurah();
  const juzList = await getJuzList(surah);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 via-white to-white transition-colors duration-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto p-8 md:p-10">
        <ThemeToggle />

        <div className="mx-auto mb-6 flex flex-col items-center justify-center">
          <h1 className="bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl dark:from-blue-400 dark:to-cyan-300">
            Al Qur'an
          </h1>

          <p className="mt-3 max-w-xl px-4 text-center text-base leading-relaxed text-gray-600 md:px-0 md:text-lg dark:text-gray-300">
            Jelajahi seluruh surah Al-Qur'an dengan mudah. Baca dan pelajari
            arti setiap ayat dengan tampilan yang sederhana dan nyaman serta
            bebas iklan.
          </p>

          <SurahSearch surah={surah} />

          <SurahBookmark />
        </div>

        <Tabs defaultValue="surah">
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Tampilkan berdasarkan
            </p>

            <TabsList className="grid w-full max-w-xs grid-cols-2 rounded-xl bg-blue-50 p-1 dark:bg-slate-800">
              <TabsTrigger
                value="surah"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
              >
                Surah
              </TabsTrigger>

              <TabsTrigger
                value="juz"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
              >
                Juz
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="surah">
            <SurahCard surah={surah} />
          </TabsContent>
          <TabsContent value="juz">
            <JuzCard juz={juzList} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
