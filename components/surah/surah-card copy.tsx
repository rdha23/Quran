"use client";

import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SurahList } from "@/types/quran";
import { Spinner } from "../ui/spinner";

export default function SurahCard({ surah }: { surah: SurahList[] }) {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  return (
    <>
      {loadingId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-b from-blue-100/80 via-white/70 to-white/80 backdrop-blur-md">
          <div className="flex flex-col items-center gap-3">
            <Spinner className="text-blue-600 size-12" />

            {/* Optional text */}
            <p className="text-blue-600 text-sm font-medium">Memuat surah...</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {surah.map((s) => (
          <Link
            href={`/surah/${s.nomor}`}
            key={s.nomor}
            onClick={() => setLoadingId(s.nomor)}
          >
            <Card className="hover:shadow-xl transition-all cursor-pointer border-blue-100 rounded-xl">
              <CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-3 mx-3">
                <Badge className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-br from-blue-500 to-blue-600 text-white font-semibold shadow-md ring-2 ring-blue-100">
                  {s.nomor}
                </Badge>

                <div>
                  <p className="font-semibold text-lg">{s.namaLatin}</p>
                  <p className="text-gray-500 text-sm">{s.arti}</p>
                  <p className="text-gray-500 text-sm">
                    {s.tempatTurun} • {s.jumlahAyat} Ayat
                  </p>
                </div>

                <p className="text-right text-xl font-medium">{s.nama}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
