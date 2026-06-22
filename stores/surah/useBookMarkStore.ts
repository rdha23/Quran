import { create } from "zustand";
import { persist } from "zustand/middleware";

type AyatRef = {
  surah: number;
  ayat: number;
  surahName?: string;
  href?: string;
  juz?: number;
};

type BookMarkState = {
  bookmarks: AyatRef[];
  lastRead: AyatRef | null;

  toggleBookmark: (item: AyatRef) => void;
  toggleLastRead: (item: AyatRef) => void;
};

export const useBookMark = create<BookMarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      lastRead: null,
      toggleBookmark: (item) => {
        const { bookmarks } = get();

        const exists = bookmarks.some(
          (b) => b.surah === item.surah && b.ayat === item.ayat,
        );

        if (exists) {
          set({
            bookmarks: bookmarks.filter(
              (b) => !(b.surah === item.surah && b.ayat === item.ayat),
            ),
          });
        } else {
          set({
            bookmarks: [...bookmarks, item],
          });
        }
      },
      toggleLastRead: (item) => {
        const { lastRead } = get();

        const isSame =
          lastRead?.surah === item.surah && lastRead?.ayat === item.ayat;

        if (isSame) {
          set({ lastRead: null }); // hapus
        } else {
          set({ lastRead: item }); // set baru
        }
      },
    }),
    {
      name: "bookmarks", // unique name
    },
  ),
);
