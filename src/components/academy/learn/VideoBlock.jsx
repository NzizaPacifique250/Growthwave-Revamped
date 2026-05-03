import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Captions, Gauge } from 'lucide-react';

const SPEEDS = [1, 1.25, 1.5, 2];

// Mock video player — no real video file. A timer ticks the playhead forward
// while "playing" so the progress bar feels alive. Auto-marks the block as
// interacted once the user hits play.
export default function VideoBlock({ block, blockState, updateBlockState, onInteract }) {
  const duration = block.duration;
  const time = blockState.data.time ?? 0;
  const playing = blockState.data.playing ?? false;
  const speed = blockState.data.speed ?? 1;
  const captionsOn = blockState.data.captions ?? true;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!playing) return;
    intervalRef.current = setInterval(() => {
      updateBlockState(block.id, {
        data: {
          time: Math.min(duration, (blockState.data.time ?? 0) + speed),
        },
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, speed, duration, block.id]);

  // When the timer hits the end, pause.
  useEffect(() => {
    if (time >= duration && playing) {
      updateBlockState(block.id, { data: { playing: false } });
    }
  }, [time, duration, playing, block.id, updateBlockState]);

  const togglePlay = () => {
    if (!blockState.interacted) onInteract();
    updateBlockState(block.id, { data: { playing: !playing } });
  };

  const seekTo = (target) => {
    updateBlockState(block.id, { data: { time: target } });
    if (!blockState.interacted) onInteract();
  };

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    updateBlockState(block.id, { data: { speed: next } });
  };

  const toggleCaptions = () => {
    updateBlockState(block.id, { data: { captions: !captionsOn } });
  };

  const percent = Math.min(100, (time / duration) * 100);

  return (
    <article className="rounded-2xl bg-gw-midnightCard text-white overflow-hidden border border-white/10 shadow-cardHover">
      {/* Video stage */}
      <div className="relative aspect-video bg-gradient-to-br from-gw-midnight via-gw-navy to-gw-midnightCard flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,168,150,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,150,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <button
          type="button"
          onClick={togglePlay}
          className="relative h-20 w-20 rounded-full bg-gw-teal text-white flex items-center justify-center shadow-tealGlow hover:scale-105 transition"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause size={32} /> : <Play size={32} />}
        </button>

        {/* Caption overlay */}
        {playing && captionsOn && (
          <div className="absolute bottom-12 left-4 right-4 text-center">
            <span className="inline-block bg-black/70 text-sm text-white px-3 py-1.5 rounded">
              {captionFor(time, block)}
            </span>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-baseline justify-between text-xs">
          <span className="font-semibold">{block.title}</span>
          <span className="bg-black/40 rounded-full px-2 py-0.5">
            {formatTime(duration - time)} left
          </span>
        </div>
      </div>

      {/* Scrubber */}
      <div className="px-4 pt-3">
        <div
          className="relative h-1.5 bg-white/10 rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            seekTo(Math.round(ratio * duration));
          }}
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={time}
        >
          <div
            className="absolute inset-y-0 left-0 bg-gw-teal rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-white/60">
          <span>{formatTime(time)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs font-semibold transition"
        >
          {playing ? <Pause size={12} /> : <Play size={12} />}
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          onClick={cycleSpeed}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs font-semibold transition"
          aria-label="Playback speed"
        >
          <Gauge size={12} /> {speed}x
        </button>
        <button
          type="button"
          onClick={toggleCaptions}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition ${
            captionsOn ? 'bg-gw-teal/20 text-gw-teal' : 'bg-white/5 text-white/70 hover:bg-white/10'
          }`}
          aria-pressed={captionsOn}
        >
          <Captions size={12} /> CC
        </button>
      </div>

      {/* Chapters */}
      {block.chapters?.length > 0 && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-white/50 mb-2">
            Chapters
          </p>
          <ol className="space-y-1">
            {block.chapters.map((c) => (
              <li key={c.at}>
                <button
                  type="button"
                  onClick={() => seekTo(c.at)}
                  className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded text-left text-xs transition ${
                    time >= c.at && (time < (block.chapters[block.chapters.indexOf(c) + 1]?.at ?? Infinity))
                      ? 'bg-gw-teal/10 text-gw-teal'
                      : 'text-white/75 hover:bg-white/5'
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="text-white/50">{formatTime(c.at)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Transcript snippet */}
      {block.transcript && (
        <details className="border-t border-white/10">
          <summary className="px-4 py-2 text-xs font-semibold text-white/70 cursor-pointer hover:text-white">
            Transcript
          </summary>
          <p className="px-4 pb-4 text-xs text-white/65 leading-relaxed">{block.transcript}</p>
        </details>
      )}
    </article>
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function captionFor(time, block) {
  // Find the active chapter and use its label as a stand-in caption.
  const sorted = [...(block.chapters || [])].sort((a, b) => b.at - a.at);
  const active = sorted.find((c) => time >= c.at);
  return active?.label || block.title;
}
