"use client";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../../styles/audio-style.css";
import useAudioStore from "@/stores/useAudioStore";
import { QARI_LIST } from "@/data/qari";
import { toArabicNumber } from "@/lib/utils/number";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function GlobalAudioPlayer() {
  const currentTrack = useAudioStore((state) => state.currentSurahTrack);
  const selectedQari = useAudioStore((state) => state.selectedQari);
  const setCurrentTrack = useAudioStore((state) => state.setCurrentSurahTrack);

  const qariName =
    QARI_LIST.find((qari) => qari.id === selectedQari)?.name ??
    "Qari tidak ditemukan";

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
      <div className="bg-background/80 relative flex flex-col gap-4 rounded-2xl border p-4 shadow-lg backdrop-blur-xl md:flex-row md:items-center md:gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="bg-background/70 hover:bg-background absolute top-2 right-2 h-8 w-8 rounded-full backdrop-blur md:-top-3"
          onClick={() => setCurrentTrack(null)}
        >
          <X className="size-4" />
        </Button>

        {/* Info Surah */}
        <div className="flex min-w-0 items-center gap-3 md:border-r md:pr-6">
          <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold md:h-12 md:w-12">
            {toArabicNumber(currentTrack.surahNumber)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">
              {currentTrack.surahName}{" "}
              <span className="text-muted-foreground font-normal">
                — {currentTrack.surahNameLatin}
              </span>
            </h3>

            <p className="text-muted-foreground text-sm">{qariName}</p>
          </div>
        </div>

        {/* Audio */}
        <div className="flex-1">
          <AudioPlayer autoPlayAfterSrcChange src={currentTrack.audio} />
        </div>
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentTrack(null)}
        >
          <X className="size-4" />
        </Button> */}
      </div>
    </div>
  );
}
