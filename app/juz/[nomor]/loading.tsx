import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-100 via-white to-white px-6 pt-8 pb-8 transition-colors duration-300 md:px-8 md:pt-12 lg:px-20 lg:pt-16 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <Skeleton className="h-8 w-24 dark:bg-gray-800" />

        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg dark:bg-gray-800" />
          <Skeleton className="h-10 w-10 rounded-lg dark:bg-gray-800" />
        </div>
      </div>

      {/* Navigasi Juz */}
      <div className="mx-auto mb-10 flex items-center justify-center">
        <div className="w-32">
          <Skeleton className="h-10 w-24 rounded-lg dark:bg-gray-800" />
        </div>

        <Skeleton className="mx-4 h-8 w-24 dark:bg-gray-800" />

        <div className="w-32 text-right">
          <Skeleton className="ml-auto h-10 w-24 rounded-lg dark:bg-gray-800" />
        </div>
      </div>

      {/* List Ayat */}
      <div className="space-y-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border-b border-blue-100 pb-6 dark:border-gray-800"
          >
            {/* Header Ayat */}
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-8 w-8 rounded-full dark:bg-gray-800" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-md dark:bg-gray-800" />
                <Skeleton className="h-8 w-8 rounded-md dark:bg-gray-800" />
              </div>
            </div>

            {/* Arab */}
            <div className="space-y-3">
              <Skeleton className="ml-auto h-8 w-full dark:bg-gray-800" />
              <Skeleton className="ml-auto h-8 w-5/6 dark:bg-gray-800" />
            </div>

            {/* Latin */}
            <Skeleton className="mt-4 h-4 w-3/4 dark:bg-gray-800" />

            {/* Indonesia */}
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-full dark:bg-gray-800" />
              <Skeleton className="h-4 w-11/12 dark:bg-gray-800" />
              <Skeleton className="h-4 w-4/5 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
