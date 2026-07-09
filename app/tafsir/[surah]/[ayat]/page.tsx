import { getTafsirPageData } from "@/lib/api/tafsir";

type Props = {
  params: Promise<{
    surah: string;
    ayat: string;
  }>;
};

export default async function TafsirPage({ params }: Props) {
  const { surah, ayat } = await params;

  const tafsir = await getTafsirPageData(Number(surah), Number(ayat));

  return <pre>{JSON.stringify(tafsir, null, 2)}</pre>;
}
