"use client";

import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SurahList } from "@/types/surah";
import { toArabicNumber } from "@/lib/utils/number";

export default function SurahCard({ surah }: { surah: SurahList[] }) {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {surah.map((s) => (
        <Link
          href={`/surah/${s.nomor}`}
          key={s.nomor}
          onClick={() => setLoadingId(s.nomor)}
        >
          <Card
            className={`cursor-pointer rounded-xl border-blue-100 transition-all hover:shadow-xl ${loadingId === s.nomor ? "scale-[0.98] opacity-60" : ""}`}
          >
            <CardContent className="mx-3 grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <Badge className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 font-semibold text-white shadow-md ring-2 ring-blue-100 lg:h-10 lg:w-10">
                {toArabicNumber(s.nomor)}
              </Badge>

              <div>
                <p className="text-md font-semibold md:text-lg">
                  {s.namaLatin}
                </p>
                <p className="text-xs text-gray-500 md:text-sm">{s.arti}</p>
                <p className="text-xs text-gray-500 md:text-sm">
                  {s.tempatTurun} • {s.jumlahAyat} Ayat
                </p>
              </div>

              <p className="text-right text-lg font-medium md:text-xl">
                {s.nama}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
