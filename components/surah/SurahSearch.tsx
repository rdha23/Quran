"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { SurahList } from "@/types/quran";

export default function SurahSearch({ surah }: { surah: SurahList[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-xl mt-6">
      <Command className="rounded-xl border shadow-md">
        <CommandInput
          placeholder="Search surah..."
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />

        {open && (
          <CommandList>
            <CommandEmpty>Surah tidak ditemukan</CommandEmpty>

            {surah.map((s) => (
              <CommandItem
                key={s.nomor}
                value={`${s.namaLatin} ${s.nama} ${s.arti}`}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  router.push(`/surah/${s.nomor}`);
                  setOpen(false);
                }}
              >
                <div className="flex justify-between w-full">
                  <span>{s.namaLatin}</span>
                  <span className="text-gray-400 text-sm">{s.nama}</span>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
