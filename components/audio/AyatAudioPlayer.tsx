"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "../ui/progress";

type Props = {
  audio: string;
};

export default function AyatAudioPlayer({ audio }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // autoplay ketika src berubah
  useEffect(() => {
    const player = audioRef.current;

    if (!player) return;

    player.load();

    player.play().catch(() => {
      // autoplay mungkin diblokir browser
    });
  }, [audio]);

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    setCurrentTime(current);

    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setProgress(0);
  };

  return (
    <>
      <Progress
        value={progress}
        className="h-1.5 w-20 bg-blue-500 dark:bg-blue-400"
      />

      <audio
        ref={audioRef}
        src={audio}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </>
  );
}
