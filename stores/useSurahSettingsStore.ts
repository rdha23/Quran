import { Qari } from "@/data/qari";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SurahSettingsState = {
  showLatin: boolean;
  setShowLatin: (value: boolean) => void;

  showTranslation: boolean;
  setShowTranslation: (value: boolean) => void;

  selectedQari: Qari;
  setSelectedQari: (qari: Qari) => void;
};

const useSurahSettings = create<SurahSettingsState>()(
  persist(
    (set) => ({
      showLatin: true,
      setShowLatin: (value) => set({ showLatin: value }),

      showTranslation: true,
      setShowTranslation: (value) => set({ showTranslation: value }),

      selectedQari: "05",
      setSelectedQari: (qari) => set({ selectedQari: qari }),
    }),
    {
      name: "surah-settings", // key localStorage
    },
  ),
);

export default useSurahSettings;
