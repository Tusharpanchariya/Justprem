"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HarmoniumScalesLibrary.module.css";

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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Play the C-tuned tanpura, with or without the metronome.");
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const tempoRef = useRef(tempo);
  const nextBeatRef = useRef(0);

  useEffect(() => { tempoRef.current = tempo; }, [tempo]);

  const stopTanpura = useCallback(() => {
    const player = playerRef.current;
    if (player) {
      player.pause();
      player.currentTime = 0;
    }
    setTanpuraPlaying(false);
    setStatus("Tanpura stopped.");
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
      setStatus(`Tanpura playing · Sa ${sa}${loopEnabled ? " · looping" : ""}.`);
    } catch {
      setStatus("Tanpura recording could not play. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [loopEnabled, sa, stopTanpura, tanpuraPlaying, volume]);

  const clickAt = useCallback((context: AudioContext, time: number) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1320, time);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.13, time + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.045);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.05);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }, []);

  const stopMetronome = useCallback(() => {
    if (schedulerRef.current !== null) window.clearInterval(schedulerRef.current);
    schedulerRef.current = null;
    setMetronomePlaying(false);
    setStatus("Metronome stopped.");
  }, []);

  const toggleMetronome = useCallback(async () => {
    if (metronomePlaying) { stopMetronome(); return; }
    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) { setStatus("This browser does not support audio playback."); return; }
    try {
      const context = audioContextRef.current ?? new AudioContextCtor();
      audioContextRef.current = context;
      if (context.state === "suspended") await context.resume();
      nextBeatRef.current = context.currentTime + 0.03;
      schedulerRef.current = window.setInterval(() => {
        const now = context.currentTime;
        while (nextBeatRef.current < now + 0.12) {
          clickAt(context, nextBeatRef.current);
          nextBeatRef.current += 60 / tempoRef.current;
        }
      }, 25);
      setMetronomePlaying(true);
      setStatus(`Metronome running · ${tempo} BPM.`);
    } catch {
      setStatus("Metronome audio could not start. Try pressing play again.");
    }
  }, [clickAt, metronomePlaying, stopMetronome, tempo]);

  useEffect(() => {
    if (playerRef.current) playerRef.current.volume = volumeFromSlider(volume);
  }, [volume]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.loop = loopEnabled;
    playerRef.current.playbackRate = playbackRateForSa(sa);
    if (!playerRef.current.paused) {
      setStatus(`Tanpura playing · Sa ${sa}${loopEnabled ? " · looping" : ""}.`);
    }
  }, [loopEnabled, sa]);

  useEffect(() => () => {
    if (schedulerRef.current !== null) window.clearInterval(schedulerRef.current);
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.src = "";
    }
    if (audioContextRef.current) void audioContextRef.current.close();
  }, []);

  return <section className={styles["jp-scales__tanpura"]} aria-label="Tanpura and metronome practice">
    <div className={styles["jp-scales__tanpura-heading"]}>
      <div><p className={styles["jp-scales__eyebrow"]}>A STEADY CENTRE</p><h3>Tanpura &amp; rhythm practice</h3><p>Choose your Sa pitch for the C-tuned tanpura recording, with an independent tempo click.</p></div>
      <span className={styles["jp-scales__recorded-badge"]}>Recorded tanpura · C source</span>
    </div>

    <fieldset className={styles["jp-scales__sa-picker"]}><legend>Tanpura Sa · {sa}</legend><div>{SA_NOTES.map((note) => <button key={note} type="button" aria-pressed={sa === note} className={sa === note ? styles["jp-scales__sa-active"] : ""} onClick={() => setSa(note)}>{note}</button>)}</div></fieldset>

    <div className={styles["jp-scales__tanpura-controls"]}>
      <label className={styles["jp-scales__field"]}><span>Tanpura volume · {volume}%</span><input type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /></label>
      <label className={styles["jp-scales__field"]}><span>Metronome tempo · {tempo} BPM</span><input type="range" min="40" max="160" step="1" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} /></label>
    </div>
    <label className={styles["jp-scales__toggle"]} style={{ marginTop: 16 }}><input type="checkbox" checked={loopEnabled} onChange={(event) => setLoopEnabled(event.target.checked)} /> Loop tanpura recording</label>

    <div className={styles["jp-scales__tanpura-actions"]}>
      <button type="button" className={`${styles["jp-scales__button"]} ${styles["jp-scales__button--primary"]}`} disabled={loading} onClick={() => void toggleTanpura()}>{loading ? "Loading tanpura…" : tanpuraPlaying ? "Stop tanpura" : "Play tanpura"}</button>
      <button type="button" className={styles["jp-scales__button"]} onClick={() => void toggleMetronome()}>{metronomePlaying ? "Stop metronome" : "Start metronome"}</button>
      <p className={styles["jp-scales__status"]} aria-live="polite">{status}</p>
    </div>

    <p className={styles["jp-scales__disclaimer"]}>The supplied C-tuned tanpura recording streams directly from the course audio library and is pitch-shifted for the selected Sa. Metronome clicks are timing cues, not an instrument recording.</p>
  </section>;
}
