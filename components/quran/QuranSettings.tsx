"use client";

import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import useSurahSettings from "@/stores/surah/useSurahSettingsStore";

export default function QuranSettings() {
  const showLatin = useSurahSettings((s) => s.showLatin);
  const setShowLatin = useSurahSettings((s) => s.setShowLatin);
  const showTranslation = useSurahSettings((s) => s.showTranslation);
  const setShowTranslation = useSurahSettings((s) => s.setShowTranslation);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-blue-200 bg-white text-blue-600 transition-colors duration-300 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800"
        >
          Pengaturan
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-64 rounded-xl border border-blue-100 bg-white/80 shadow-lg backdrop-blur-md transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/90">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-blue-50 focus:bg-blue-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
          >
            <Label
              htmlFor="translation"
              className="cursor-pointer text-blue-700 dark:text-blue-300"
            >
              Tampilkan Terjemahan
            </Label>
            <Switch
              id="translation"
              className="cursor-pointer data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-400"
              checked={showTranslation}
              onCheckedChange={setShowTranslation}
            />
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-blue-100 dark:bg-gray-700" />

          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex items-center justify-between rounded-lg px-3 py-3 transition-colors duration-200 hover:bg-blue-50 focus:bg-blue-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
          >
            <Label
              htmlFor="latin"
              className="cursor-pointer text-blue-700 dark:text-blue-300"
            >
              Tampilkan Bahasa Latin
            </Label>
            <Switch
              id="latin"
              className="cursor-pointer data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-400"
              checked={showLatin}
              onCheckedChange={setShowLatin}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
