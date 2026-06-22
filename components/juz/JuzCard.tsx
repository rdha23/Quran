import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { toArabicNumber } from "@/lib/utils/number";

type JuzItem = {
  nomor: number;
  firstSurah?: string;
  lastSurah?: string;
};

export default function JuzCard({ juz }: { juz: JuzItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {juz.map((j) => (
        <Link href={`/juz/${j.nomor}`} key={j.nomor}>
          <Card className="cursor-pointer rounded-xl border-blue-100 transition-all hover:shadow-xl">
            <CardContent className="mx-3 grid grid-cols-[auto_1fr] items-center gap-3">
              <Badge className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 font-semibold text-white shadow-md ring-2 ring-blue-100 lg:h-10 lg:w-10">
                {toArabicNumber(j.nomor)}
              </Badge>

              <div>
                <p className="text-md font-semibold md:text-lg">
                  Juz {j.nomor}
                </p>

                <p className="text-xs text-gray-500 md:text-sm">
                  {j.firstSurah}
                  {j.firstSurah !== j.lastSurah && ` - ${j.lastSurah}`}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
