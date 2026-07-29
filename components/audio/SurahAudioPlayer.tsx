"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Qari, QARI_LIST } from "@/data/qari";
import { PlayCircle } from "lucide-react";
import { Button } from "../ui/button";
import useAudioStore from "@/stores/useAudioStore";
import { SurahDetail } from "@/types/surah";

type Props = {
  surah: SurahDetail;
};

export default function AudioPlayer({ surah }: Props) {
  const selectedQari = useAudioStore((state) => state.selectedQari);
  const setSelectedQari = useAudioStore((state) => state.setSelectedQari);
  const setCurrentTrack = useAudioStore((state) => state.setCurrentSurahTrack);

  return (
    <div className="flex items-center gap-2">
      <label className="text-muted-foreground text-sm font-medium">Qari</label>

      <Select
        value={selectedQari}
        onValueChange={(value) => setSelectedQari(value as Qari)}
      >
        <SelectTrigger className="w-56 rounded-lg border-blue-200 bg-white text-blue-700 focus:ring-blue-500 dark:border-gray-700 dark:text-blue-300">
          <SelectValue placeholder="Pilih qari" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Qari</SelectLabel>

            {QARI_LIST.map((qari) => (
              <SelectItem key={qari.id} value={qari.id}>
                {qari.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        className="inline-flex max-w-full items-center rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm text-blue-700 transition-colors duration-300 hover:bg-blue-50 md:px-4 md:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800"
        onClick={() =>
          setCurrentTrack({
            surahNumber: surah.nomor,
            surahName: surah.nama,
            surahNameLatin: surah.namaLatin,
            audio: surah.audioFull[selectedQari],
          })
        }
      >
        <PlayCircle className="size-5" />
        <span className="font-medium">Mainkan Surah</span>
      </Button>
    </div>
  );
}
