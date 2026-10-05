"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";

const subscribeToHydration = () => () => {};

/** The poster is the server-rendered default. Video is an optional enhancement. */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    let visible = false;
    const sync = () => {
      if (
        preference.matches ||
        connection?.saveData ||
        document.hidden ||
        !visible ||
        userPaused.current
      ) {
        element.pause();
        return;
      }
      if (!element.getAttribute("src")) element.src = src;
      void element.play().catch(() => {
        /* Autoplay can be blocked; the play control remains available. */
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, [src]);

  function toggle() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) {
      userPaused.current = true;
      element.pause();
    } else {
      userPaused.current = false;
      if (!element.getAttribute("src")) element.src = src;
      void element.play().catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <img
        className="hero-image"
        src={poster}
        alt=""
        width={1920}
        height={1280}
        fetchPriority="high"
      />
      <video
        ref={video}
        className="hero-video"
        data-ready={ready && !failed}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => {
          setPlaying(true);
          setReady(true);
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      />
      {hydrated && !failed && (
        <button
          type="button"
          className="video-toggle"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
        >
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? "Pause film" : "Play film"}</span>
        </button>
      )}
    </>
  );
}
