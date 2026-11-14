"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HarmoniumScalesLibrary.module.css";
import { Play, Square, Volume2, RotateCcw, Timer, Radio, Music, Sparkles } from "lucide-react";

const TANPURA_URL = "/sounds/course/recorded-tanpura/course-tanpura-c.mp3";
const SA_NOTES = ["A", "A#", "B", "C", "C#", "D"] as const;
type SaNote = (typeof SA_NOTES)[number];
const SEMITONES_FROM_C: Record<SaNote, number> = { A: -3, "A#": -2, B: -1, C: 0, "C#": 1, D: 2 };

function playbackRateForSa(note: SaNote) {
  return 2 ** (SEMITONES_FROM_C[note] / 12);
}

function volumeFromSlider(value: number) {
  return value / 100;
}

export function TanpuraMetronome() {
  const [sa, setSa] = useState<SaNote>("C");
  const [volume, setVolume] = useState(65);
  const [tempo, setTempo] = useState(80);
  const [loopEnabled, setLoopEnabled] = useState(true);
  const [tanpuraPlaying, setTanpuraPlaying] = useState(false);
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const [isBeatActive, setIsBeatActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Tanpura & rhythm companion ready. Select Sa pitch or press play.");

  const playerRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const tempoRef = useRef(tempo);
  const nextBeatRef = useRef(0);
  const beatFlashTimerRef = useRef<number | null>(null);

  useEffect(() => {
    tempoRef.current = tempo;
  }, [tempo]);

  const triggerBeatVisual = useCallback(() => {
    setIsBeatActive(true);
    if (beatFlashTimerRef.current !== null) {
      window.clearTimeout(beatFlashTimerRef.current);
    }
    beatFlashTimerRef.current = window.setTimeout(() => {
      setIsBeatActive(false);
    }, 110);
  }, []);

  const stopTanpura = useCallback(() => {
    const player = playerRef.current;
    if (player) {
      player.pause();
      player.currentTime = 0;
    }
    setTanpuraPlaying(false);
    setStatus("Tanpura drone stopped. Ready whenever you wish to resume.");
  }, []);

  const toggleTanpura = useCallback(async () => {
    if (tanpuraPlaying) {
      stopTanpura();
      return;
    }
    setLoading(true);
    try {
      const player = playerRef.current;
      if (player) {
        player.loop = loopEnabled;
        player.volume = volumeFromSlider(volume);
        player.playbackRate = playbackRateForSa(sa);
        await player.play();
      } else {
        const newPlayer = new Audio(TANPURA_URL);
        newPlayer.preload = "none";
        newPlayer.loop = loopEnabled;
        newPlayer.volume = volumeFromSlider(volume);
        newPlayer.playbackRate = playbackRateForSa(sa);
        newPlayer.preservesPitch = false;
        newPlayer.addEventListener("ended", () => {
          setTanpuraPlaying(false);
          setStatus("Tanpura playback finished.");
        });
        playerRef.current = newPlayer;
        await newPlayer.play();
      }
      setTanpuraPlaying(true);
      setStatus(`Tanpura drone active on Sa (${sa}) · ${volume}% volume${loopEnabled ? " · Continuous loop active" : ""}.`);
    } catch {
      setStatus("Tanpura audio could not start. Please check your connection and tap play again.");
    } finally {
      setLoading(false);
    }
  }, [loopEnabled, sa, stopTanpura, tanpuraPlaying, volume]);

  const clickAt = useCallback(
    (context: AudioContext, time: number) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1320, time);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.14, time + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(time);
      oscillator.stop(time + 0.05);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    },
    []
  );

  const stopMetronome = useCallback(() => {
    if (schedulerRef.current !== null) window.clearInterval(schedulerRef.current);
    schedulerRef.current = null;
    setMetronomePlaying(false);
    setIsBeatActive(false);
    setStatus("Metronome stopped.");
  }, []);

  const toggleMetronome = useCallback(async () => {
    if (metronomePlaying) {
      stopMetronome();
      return;
    }
    const AudioContextCtor =
      window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      setStatus("This browser does not support audio playback.");
      return;
    }
    try {
      const context = audioContextRef.current ?? new AudioContextCtor();
      audioContextRef.current = context;
      if (context.state === "suspended") await context.resume();
      nextBeatRef.current = context.currentTime + 0.03;
      schedulerRef.current = window.setInterval(() => {
        const now = context.currentTime;
        while (nextBeatRef.current < now + 0.12) {
          clickAt(context, nextBeatRef.current);
          triggerBeatVisual();
          nextBeatRef.current += 60 / tempoRef.current;
        }
      }, 25);
      setMetronomePlaying(true);
      setStatus(`Metronome ticking at ${tempo} BPM. Practise rhythm and steady breath.`);
    } catch {
      setStatus("Metronome could not start. Try tapping start again.");
    }
  }, [clickAt, metronomePlaying, stopMetronome, tempo, triggerBeatVisual]);

  useEffect(() => {
    if (playerRef.current) playerRef.current.volume = volumeFromSlider(volume);
  }, [volume]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.loop = loopEnabled;
    playerRef.current.playbackRate = playbackRateForSa(sa);
    if (!playerRef.current.paused) {
      setStatus(`Tanpura pitch updated to Sa (${sa})${loopEnabled ? " · Looping" : ""}.`);
    }
  }, [loopEnabled, sa]);

  useEffect(() => {
    return () => {
      if (schedulerRef.current !== null) window.clearInterval(schedulerRef.current);
      if (beatFlashTimerRef.current !== null) window.clearTimeout(beatFlashTimerRef.current);
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current.src = "";
      }
      if (audioContextRef.current) void audioContextRef.current.close();
    };
  }, []);

  return (
    <section className={styles["jp-tanpura-section"]} aria-label="Tanpura Drone and Metronome Rhythm Practice">
      {/* Section Header */}
      <div className={styles["jp-tanpura-header"]}>
        <div>
          <div className={styles["jp-tanpura-eyebrow-row"]}>
            <span className={styles["jp-scales__eyebrow"]}>A STEADY CENTRE · तानपूरा</span>
            <span className={styles["jp-tanpura-badge"]}>
              <Radio className="w-3 h-3 text-[#ad684d]" />
              Authentic C-Tuned Acoustic Tanpura
            </span>
          </div>
          <h3>Tanpura Drone & Rhythm Companion</h3>
          <p>
            The continuous tanpura drone trains your ear to find Sa naturally. Use the acoustic drone alone,
            or combine it with the gentle metronome click for steady kirtan tempo.
          </p>
        </div>
      </div>

      {/* Main Dual Cards Grid */}
      <div className={styles["jp-tanpura-dual-grid"]}>
        {/* Card 1: Tanpura Drone */}
        <div className={`${styles["jp-tanpura-card"]} ${tanpuraPlaying ? styles["jp-tanpura-card--active"] : ""}`}>
          <div className={styles["jp-tanpura-card-top"]}>
            <div className={styles["jp-tanpura-card-title"]}>
              <span className={styles["jp-tanpura-card-icon"]}>
                <Music className="w-4 h-4 text-[#ad684d]" />
              </span>
              <div>
                <h4>Acoustic Tanpura Drone</h4>
                <p>Select your root pitch (Sa) to resonate in harmony</p>
              </div>
            </div>
            {tanpuraPlaying && (
              <span className={styles["jp-active-pill"]}>
                <span className={styles["jp-pulse-dot"]} />
                Drone Active
              </span>
            )}
          </div>

          {/* Sa Pitch Selection Pills */}
          <div className={styles["jp-tanpura-sa-wrapper"]}>
            <label className={styles["jp-tanpura-field-label"]}>
              <span>Tanpura Sa Pitch:</span>
              <strong>{sa}</strong>
            </label>
            <div className={styles["jp-tanpura-sa-pills"]}>
              {SA_NOTES.map((note) => (
                <button
                  key={note}
                  type="button"
                  aria-pressed={sa === note}
                  onClick={() => setSa(note)}
                  className={`${styles["jp-tanpura-sa-btn"]} ${sa === note ? styles["jp-tanpura-sa-btn--active"] : ""}`}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className={styles["jp-tanpura-control-row"]}>
            <label className={styles["jp-tanpura-field-label"]}>
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#567262]" />
                Tanpura Volume
              </span>
              <strong>{volume}%</strong>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={styles["jp-styled-slider"]}
              aria-label="Tanpura volume"
            />
          </div>

          {/* Loop Toggle */}
          <label className={styles["jp-tanpura-toggle"]}>
            <input
              type="checkbox"
              checked={loopEnabled}
              onChange={(e) => setLoopEnabled(e.target.checked)}
            />
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3 text-[#567262]" />
              Continuous seamless loop (recommended for meditation)
            </span>
          </label>

          {/* Large Start/Stop Button */}
          <div className={styles["jp-tanpura-action-slot"]}>
            {tanpuraPlaying ? (
              <button
                type="button"
                onClick={() => void toggleTanpura()}
                disabled={loading}
                className={`${styles["jp-tanpura-primary-btn"]} ${styles["jp-tanpura-primary-btn--stop"]}`}
              >
                <span className={styles["jp-btn-icon-box"]}>
                  <Square className="w-4 h-4 fill-current" />
                </span>
                <div className={styles["jp-btn-labels"]}>
                  <strong>Stop Tanpura Drone</strong>
                  <small>Sounding Sa ({sa}) · Click to silence</small>
                </div>
                <span className={styles["jp-live-badge-glow"]} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void toggleTanpura()}
                disabled={loading}
                className={`${styles["jp-tanpura-primary-btn"]} ${styles["jp-tanpura-primary-btn--play"]}`}
              >
                <span className={styles["jp-btn-icon-box"]}>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                <div className={styles["jp-btn-labels"]}>
                  <strong>{loading ? "Loading Drone…" : "Start Tanpura Drone"}</strong>
                  <small>Resonates authentic strings tuned to Sa ({sa})</small>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Card 2: Rhythm & Metronome */}
        <div className={`${styles["jp-tanpura-card"]} ${metronomePlaying ? styles["jp-tanpura-card--active"] : ""}`}>
          <div className={styles["jp-tanpura-card-top"]}>
            <div className={styles["jp-tanpura-card-title"]}>
              <span className={styles["jp-tanpura-card-icon"]}>
                <Timer className="w-4 h-4 text-[#567262]" />
              </span>
              <div>
                <h4>Acoustic Metronome</h4>
                <p>Gentle rhythmic pulse for steady breathing & singing</p>
              </div>
            </div>
            {metronomePlaying && (
              <span className={`${styles["jp-active-pill"]} ${styles["jp-active-pill--metronome"]}`}>
                <span className={`${styles["jp-pulse-dot"]} ${isBeatActive ? styles["jp-pulse-dot--flash"] : ""}`} />
                {tempo} BPM Active
              </span>
            )}
          </div>

          {/* Tempo Slider & Presets */}
          <div className={styles["jp-tanpura-control-row"]}>
            <div className="flex items-center justify-between">
              <label className={styles["jp-tanpura-field-label"]}>
                <span className="flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5 text-[#567262]" />
                  Metronome Tempo
                </span>
                <strong>{tempo} BPM</strong>
              </label>
              <div
                className={`${styles["jp-beat-flasher"]} ${isBeatActive ? styles["jp-beat-flasher--active"] : ""}`}
                title="Beat visual pulse"
              >
                <span className={styles["jp-beat-flasher-dot"]} />
              </div>
            </div>
            <input
              type="range"
              min="40"
              max="160"
              step="1"
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className={styles["jp-styled-slider"]}
              aria-label="Metronome tempo BPM"
            />
          </div>

          {/* Tempo Quick Presets */}
          <div className={styles["jp-tempo-preset-row"]}>
            <button
              type="button"
              className={`${styles["jp-preset-btn"]} ${tempo === 60 ? styles["jp-preset-btn--active"] : ""}`}
              onClick={() => setTempo(60)}
            >
              Vilambit · 60
            </button>
            <button
              type="button"
              className={`${styles["jp-preset-btn"]} ${tempo === 80 ? styles["jp-preset-btn--active"] : ""}`}
              onClick={() => setTempo(80)}
            >
              Madhya · 80
            </button>
            <button
              type="button"
              className={`${styles["jp-preset-btn"]} ${tempo === 108 ? styles["jp-preset-btn--active"] : ""}`}
              onClick={() => setTempo(108)}
            >
              Sacred 108 · Fast
            </button>
          </div>

          {/* Large Start/Stop Button */}
          <div className={styles["jp-tanpura-action-slot"]} style={{ marginTop: "auto", paddingTop: "14px" }}>
            {metronomePlaying ? (
              <button
                type="button"
                onClick={() => void toggleMetronome()}
                className={`${styles["jp-tanpura-primary-btn"]} ${styles["jp-tanpura-primary-btn--stop"]}`}
              >
                <span className={styles["jp-btn-icon-box"]}>
                  <Square className="w-4 h-4 fill-current" />
                </span>
                <div className={styles["jp-btn-labels"]}>
                  <strong>Stop Metronome</strong>
                  <small>Currently pulsing at {tempo} BPM · Click to pause</small>
                </div>
                <span className={styles["jp-live-badge-glow"]} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void toggleMetronome()}
                className={`${styles["jp-tanpura-primary-btn"]} ${styles["jp-tanpura-primary-btn--metro"]}`}
              >
                <span className={styles["jp-btn-icon-box"]}>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </span>
                <div className={styles["jp-btn-labels"]}>
                  <strong>Start Metronome ({tempo} BPM)</strong>
                  <small>Begins acoustic timing clicks at steady rhythm</small>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Status Card */}
      <div className={styles["jp-tanpura-status-bar"]}>
        <Sparkles className="w-4 h-4 text-[#ad684d] shrink-0" />
        <span className="text-xs leading-relaxed">{status}</span>
      </div>

      {/* Explanatory Footnote */}
      <p className={styles["jp-scales__disclaimer"]}>
        The supplied C-tuned tanpura recording streams directly from the JustPrem sound library and is pitch-shifted
        for the selected Sa. Metronome clicks are timing cues synthesized in real-time.
      </p>
    </section>
  );
}
