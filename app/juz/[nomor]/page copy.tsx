import { getJuzDetails } from "@/lib/api/juz";

export default async function JuzPage({
  params,
}: {
  params: Promise<{ nomor: string }>;
}) {
  const { nomor } = await params;

  const data = await getJuzDetails(Number(nomor));

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
