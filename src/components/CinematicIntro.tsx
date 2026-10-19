
"use client";

import { useEffect, useRef, useState } from "react";

const INTRO_KEY = "requiem-intro-seen-v1";

export default function CinematicIntro() {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let alreadySeen = false;

    try {
      alreadySeen =
        window.localStorage.getItem(INTRO_KEY) === "true";
    } catch {
      // Storage may be unavailable in some browsers.
    }

    if (!alreadySeen && !reducedMotion) {
      setVisible(true);
    }

    setReady(true);
  }, []);

  function closeIntro() {
    try {
      window.localStorage.setItem(INTRO_KEY, "true");
    } catch {
      // Continue even if storage is unavailable.
    }

    videoRef.current?.pause();
    setVisible(false);
  }

  async function enableSound() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setMuted(false);

    try {
      await video.play();
    } catch {
      video.muted = true;
      setMuted(true);
    }
  }

  if (!ready || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Requiem Esports cinematic introduction"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src="/videos/requiem-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={closeIntro}
        onError={closeIntro}
        className="absolute inset-0 h-full w-full object-contain"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 px-4 sm:bottom-12">
        <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-violet-200 sm:text-sm">
          Welcome to Requiem Esports
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {muted && (
            <button
              type="button"
              onClick={enableSound}
              className="rounded-lg border border-violet-400/50 bg-black/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-900/60"
            >
              Enable Sound
            </button>
          )}

          <button
            type="button"
            onClick={closeIntro}
            className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-violet-500"
          >
            Skip Intro →
          </button>
        </div>
      </div>
    </div>
  );
}
