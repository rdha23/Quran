import { create } from "zustand";
import { persist } from "zustand/middleware";

type SurahSettingsState = {
  showLatin: boolean;
  setShowLatin: (value: boolean) => void;
  showTranslation: boolean;
  setShowTranslation: (value: boolean) => void;
};

const useSurahSettings = create<SurahSettingsState>()(
  persist(
    (set) => ({
      showLatin: true,
      setShowLatin: (value) => set({ showLatin: value }),

      showTranslation: true,
      setShowTranslation: (value) => set({ showTranslation: value }),
    }),
    {
      name: "surah-settings", // key localStorage
    },
  ),
);

export default useSurahSettings;
