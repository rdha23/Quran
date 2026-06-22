import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 via-white to-white px-4 pt-16 pb-8 transition-colors duration-300 md:px-24 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="mb-10 space-y-3 text-center">
        <Skeleton className="mx-auto h-8 w-40 dark:bg-gray-800" />
        <Skeleton className="mx-auto h-4 w-52 dark:bg-gray-800" />
      </div>

      {/* Navigasi */}
      <div className="mb-10 flex justify-between">
        <Skeleton className="h-10 w-32 rounded-lg dark:bg-gray-800" />
        <Skeleton className="h-10 w-32 rounded-lg dark:bg-gray-800" />
      </div>

      {/* List Ayat */}
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="space-y-4 border-b border-blue-100 pb-6 transition-colors duration-300 dark:border-gray-800"
          >
            {/* Arab (panjang) */}
            <Skeleton className="h-8 w-full dark:bg-gray-800" />
            <Skeleton className="ml-auto h-8 w-5/6 dark:bg-gray-800" />

            {/* Latin */}
            <Skeleton className="h-4 w-3/4 dark:bg-gray-800" />

            {/* Indonesia */}
            <Skeleton className="h-4 w-full dark:bg-gray-800" />
            <Skeleton className="h-4 w-5/6 dark:bg-gray-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
