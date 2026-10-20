
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function CinematicSound() {
  const pathname = usePathname();

  const [enabled, setEnabled] = useState(false);

  const ambienceRef = useRef<HTMLAudioElement>(null);
  const thunderRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(false);

  // Keep audio active only while on the homepage.
  useEffect(() => {
    if (pathname !== "/") {
      ambienceRef.current?.pause();
      thunderRef.current?.pause();
      return;
    }

    if (enabledRef.current && !document.hidden) {
      void ambienceRef.current?.play().catch(() => {});
    }
  }, [pathname]);

  // Synchronize thunder with the homepage lightning.
  useEffect(() => {
    if (pathname !== "/") return;

    const video = document.querySelector<HTMLVideoElement>(
      ".requiem-background-video"
    );

    if (!video) return;

    let previousTime = video.currentTime;
    let thunderPlayed = video.currentTime >= 4.7;

    function synchronizeThunder() {
      if (!video) return;

      const time = video.currentTime;

      // Reset when the 10-second video loops.
      if (time < previousTime - 1) {
        thunderPlayed = false;
      }

      previousTime = time;

      if (
        enabledRef.current &&
        !document.hidden &&
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
  }, [pathname]);

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

    if (ambience) {
      ambience.volume = 0.55;
    }

    if (thunder) {
      thunder.volume = 0.85;
    }

    // Remember the toggle state while navigating,
    // but only play audio on the homepage.
    if (pathname === "/" && ambience) {
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
      } else if (
        enabledRef.current &&
        window.location.pathname === "/"
      ) {
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
            ? "Mute cinematic sound"
            : "Enable cinematic sound"
        }
        aria-pressed={enabled}
        title={
          enabled
            ? "Mute cinematic sound"
            : "Enable cinematic sound"
        }
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/40 bg-violet-950/30 text-lg transition hover:border-violet-400 hover:bg-violet-900/50"
      >
        <span aria-hidden="true">
          {enabled ? "🔊" : "🔇"}
        </span>
      </button>
    </>
  );
}
