"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SurahCard from "../surah/SurahCard";
import JuzCard from "../juz/JuzCard";
import { useState } from "react";
const STORAGE_KEY = "quran-view";

export default function QuranTabs({ surah, juzList }) {
  const [view, setView] = useState(() => {
    if (typeof window === "undefined") {
      return "surah";
    }

    const saved = localStorage.getItem(STORAGE_KEY);

    return saved === "juz" ? "juz" : "surah";
  });

  return (
    <Tabs
      value={view}
      onValueChange={(value) => {
        setView(value);
        localStorage.setItem(STORAGE_KEY, value);
      }}
    >
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
  );
}
