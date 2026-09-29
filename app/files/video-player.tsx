"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, Maximize2, Minimize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Lesson } from "./course-data";
import { formatDuration } from "./course-progress";

const RATES = [0.75, 1, 1.25, 1.5, 2];

export default function VideoPlayer({
  lesson,
  onEnded,
}: {
  lesson: Lesson;
  onEnded: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>();

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [rateIndex, setRateIndex] = useState(1); // 1x
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [scrubbing, setScrubbing] = useState(false);

  const locked = Boolean(lesson.locked);

  function bumpControls() {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      setShowControls((prev) => (playing ? false : prev));
    }, 2500);
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function cycleRate() {
    const video = videoRef.current;
    if (!video) return;
    const next = (rateIndex + 1) % RATES.length;
    video.playbackRate = RATES[next];
    setRateIndex(next);
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen();
  }

  function seekFromClientX(clientX: number) {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video || !duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  }

  useEffect(() => {
    function onFsChange() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    if (!scrubbing) return;
    function onMove(e: PointerEvent) {
      seekFromClientX(e.clientX);
    }
    function onUp() {
      setScrubbing(false);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrubbing, duration]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code !== "Space" || document.activeElement?.tagName === "INPUT") return;
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement !== containerRef.current) {
        return;
      }
      e.preventDefault();
      togglePlay();
    }
    const el = containerRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (locked) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[28px] bg-foreground/[0.04] text-center">
        <Lock className="size-6 text-muted-foreground" />
        <p className="med-font max-w-xs text-sm text-muted-foreground">
          This lesson unlocks once you finish the module before it.
        </p>
      </div>
    );
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseMove={bumpControls}
      onMouseLeave={() => playing && setShowControls(false)}
      className="group relative aspect-video w-full overflow-hidden rounded-[28px] bg-black outline-none"
    >
      <video
        ref={videoRef}
        src={"/bgm.mp4"}
        className="size-full object-contain"
        onClick={togglePlay}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          setShowControls(true);
        }}
        onEnded={() => {
          setPlaying(false);
          onEnded();
        }}
      />

      {/* center play/pause button */}
      {(!playing || showControls) && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute inset-0 m-auto grid size-16 place-items-center rounded-full bg-white/90 text-black backdrop-blur transition-transform hover:scale-105"
          style={{ opacity: playing ? (showControls ? 1 : 0) : 1, pointerEvents: playing && !showControls ? "none" : "auto" }}
        >
          {playing ? <Pause className="size-6" fill="currentColor" /> : <Play className="ml-0.5 size-6" fill="currentColor" />}
        </button>
      )}

      {/* controls bar */}
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-3 pt-8 transition-opacity ${
          showControls ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* scrubber */}
        <div
          ref={trackRef}
          onPointerDown={(e) => {
            setScrubbing(true);
            seekFromClientX(e.clientX);
          }}
          className="group/track relative h-3 w-full cursor-pointer"
        >
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white" style={{ width: `${progressPercent}%` }} />
          </div>
          <div
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover/track:opacity-100"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-white">
            {playing ? <Pause className="size-4" fill="currentColor" /> : <Play className="size-4" fill="currentColor" />}
          </button>
          <button type="button" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="text-white">
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
          <span className="med-font text-xs tabular-nums text-white/80">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </span>
          <div className="flex-1" />
          <button type="button" onClick={cycleRate} className="med-font rounded-full px-2 py-1 text-xs text-white/80 hover:bg-white/10">
            {RATES[rateIndex]}x
          </button>
          <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} className="text-white">
            {fullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
