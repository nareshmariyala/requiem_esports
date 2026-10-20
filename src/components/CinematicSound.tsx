
"use client";

import { useEffect, useRef, useState } from "react";

export default function CinematicSound() {
  const [enabled, setEnabled] = useState(false);

  const ambienceRef = useRef<HTMLAudioElement>(null);
  const thunderRef = useRef<HTMLAudioElement>(null);

  const enabledRef = useRef(false);

  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>(
      ".requiem-background-video"
    );

    if (!video) return;

    let previousTime = 0;
    let thunderPlayed = false;

    function synchronizeThunder() {
      if (!video) return;

      const time = video.currentTime;

      if (time < previousTime - 1) {
        thunderPlayed = false;
      }

      previousTime = time;

      if (
        enabledRef.current &&
        !thunderPlayed &&
        time >= 4.7 &&
        time < 6
      ) {
        thunderPlayed = true;

        const thunder = thunderRef.current;

        if (thunder) {
          thunder.currentTime = 0;
          void thunder.play().catch(() => {});
        }
      }
    }

    video.addEventListener("timeupdate", synchronizeThunder);

    return () => {
      video.removeEventListener(
        "timeupdate",
        synchronizeThunder
      );
    };
  }, []);

  async function toggleSound() {
    const nextEnabled = !enabledRef.current;

    enabledRef.current = nextEnabled;
    setEnabled(nextEnabled);

    const ambience = ambienceRef.current;
    const thunder = thunderRef.current;

    if (!nextEnabled) {
      ambience?.pause();
      thunder?.pause();
      return;
    }

    if (thunder) {
        thunder.volume = 0.85;
        }

    if (ambience) {
      ambience.volume = 0.55;

      try {
        await ambience.play();
      } catch {
        enabledRef.current = false;
        setEnabled(false);
      }
    }
  }

  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        ambienceRef.current?.pause();
        thunderRef.current?.pause();
      } else if (enabledRef.current) {
        void ambienceRef.current?.play().catch(() => {});
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, []);

  return (
    <>
      <audio
        ref={ambienceRef}
        src="/audio/requiem-ambience.mp3"
        loop
        preload="none"
      />

      <audio
        ref={thunderRef}
        src="/audio/requiem-thunder.mp3"
        preload="none"
      />

      <button
        type="button"
        onClick={toggleSound}
        aria-label={
          enabled
            ? "Mute cinematic sounds"
            : "Enable cinematic sounds"
        }
        aria-pressed={enabled}
        className="inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-black/65 px-4 py-2.5 text-xs font-bold tracking-wider text-violet-200 backdrop-blur-md transition hover:border-violet-300 hover:bg-violet-900/50"
      >
        <span aria-hidden="true">
          {enabled ? "🔊" : "🔇"}
        </span>
        {enabled ? "SOUND ON" : "ENABLE SOUND"}
      </button>
    </>
  );
}
