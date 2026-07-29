import { Qari } from "@/data/qari";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrentSurahTrack = {
  surahNumber: number;
  surahName: string;
  surahNameLatin: string;
  audio: string;
};

type CurrentAyatTrack = {
  surahNumber: number;
  ayatNumber: number;
  audio: string;
};

type AudioState = {
  selectedQari: Qari;
  setSelectedQari: (qari: Qari) => void;

  currentSurahTrack: CurrentSurahTrack | null;
  setCurrentSurahTrack: (track: CurrentSurahTrack | null) => void;

  currentAyatTrack: CurrentAyatTrack | null;
  setCurrentAyatTrack: (track: CurrentAyatTrack | null) => void;
};

const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      selectedQari: "05",
      setSelectedQari: (qari) => set({ selectedQari: qari }),

      currentSurahTrack: null,
      setCurrentSurahTrack: (track) => set({ currentSurahTrack: track }),

      currentAyatTrack: null,
      setCurrentAyatTrack: (track) => set({ currentAyatTrack: track }),
    }),
    {
      name: "audio-settings",
    },
  ),
);

export default useAudioStore;
