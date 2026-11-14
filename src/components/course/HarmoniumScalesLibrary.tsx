"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./HarmoniumScalesLibrary.module.css";
import { HarmoniumAudioEngine } from "./HarmoniumAudioEngine";
import { HarmoniumKeyboard, SWARA_DATA, type KeyboardDisplayMode } from "./HarmoniumKeyboard";
import type { ReedConfiguration } from "./HarmoniumSampleManager";
import { TanpuraMetronome } from "./TanpuraMetronome";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Square,
  Play,
  RotateCcw,
  Timer,
  Sparkles,
  Music2,
  Piano,
} from "lucide-react";

const NOTES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const AUDIO_NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const SCALES = {
  Major: {
    intervals: [0, 2, 4, 5, 7, 9, 11],
    family: "Core Scales",
    formula: "Sa · Re · Ga · Ma · Pa · Dha · Ni",
    mood: "All natural (Shuddha) swaras",
  },
  Minor: {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    family: "Core Scales",
    formula: "Sa · Re · ga · Ma · Pa · dha · ni",
    mood: "Komal ga, dha, and ni",
  },
} as const;

// Extended scales preserved for future modules
export const EXTENDED_SCALES_ARCHIVE = {
  "Bhairav (Dawn Devotion)": {
    intervals: [0, 1, 4, 5, 7, 8, 11],
    family: "Bhakti & Kirtan Thaats",
    formula: "Sa · re · Ga · Ma · Pa · dha · Ni",
    mood: "Deep, sacred morning meditation (Komal Re & Dha)",
  },
  "Bhairavi (Soulful Surrender)": {
    intervals: [0, 1, 3, 5, 7, 8, 10],
    family: "Bhakti & Kirtan Thaats",
    formula: "Sa · re · ga · Ma · Pa · dha · ni",
    mood: "Deep longing, prayer & closing kirtan (All 4 Komal notes)",
  },
  "Kalyan / Yaman (Evening Light)": {
    intervals: [0, 2, 4, 6, 7, 9, 11],
    family: "Bhakti & Kirtan Thaats",
    formula: "Sa · Re · Ga · Ma′ · Pa · Dha · Ni",
    mood: "Majestic, uplifting divine contemplation (Tīvra Ma)",
  },
  "Khamaj (Sweet Grace)": {
    intervals: [0, 2, 4, 5, 7, 9, 10],
    family: "Bhakti & Kirtan Thaats",
    formula: "Sa · Re · Ga · Ma · Pa · Dha · ni",
    mood: "Love, devotion & sweet bhajans (Komal Ni)",
  },
  "Kafi (Spring Devotion)": {
    intervals: [0, 2, 3, 5, 7, 9, 10],
    family: "Bhakti & Kirtan Thaats",
    formula: "Sa · Re · ga · Ma · Pa · Dha · ni",
    mood: "Devotional folk & celebratory kirtan (Komal Ga & Ni)",
  },
  "Asavari (Natural Minor Thaat)": {
    intervals: [0, 2, 3, 5, 7, 8, 10],
    family: "Bhakti & Kirtan Thaats",
    formula: "Sa · Re · ga · Ma · Pa · dha · ni",
    mood: "Contemplative, surrender & serenity (Komal Ga, Dha, Ni)",
  },
  "Todi (Deep Reverence)": {
    intervals: [0, 1, 3, 6, 7, 8, 11],
    family: "Bhakti & Kirtan Thaats",
    formula: "Sa · re · ga · Ma′ · Pa · dha · Ni",
    mood: "Profound reverence (Komal Re, Ga, Dha + Tīvra Ma)",
  },
  "Bhoopali (Major Pentatonic)": {
    intervals: [0, 2, 4, 7, 9],
    family: "Kirtan & Bhajan Favorites",
    formula: "Sa · Re · Ga · Pa · Dha",
    mood: "Simplicity, serenity & peaceful kirtans (5 notes)",
  },
  "Shivaranjani": {
    intervals: [0, 2, 3, 7, 9],
    family: "Kirtan & Bhajan Favorites",
    formula: "Sa · Re · ga · Pa · Dha",
    mood: "Heart-touching, deeply evocative melody",
  },
  "Dhani (Minor Pentatonic)": {
    intervals: [0, 3, 5, 7, 10],
    family: "Kirtan & Bhajan Favorites",
    formula: "Sa · ga · Ma · Pa · ni",
    mood: "Gentle meditation & acoustic chant (5 notes)",
  },
  "Harmonic Minor": {
    intervals: [0, 2, 3, 5, 7, 8, 11],
    family: "Western Scales & Modes",
    formula: "1 · 2 · ♭3 · 4 · 5 · ♭6 · 7",
    mood: "Dramatic, Middle-Eastern and Spanish flavor",
  },
  "Dorian Mode": {
    intervals: [0, 2, 3, 5, 7, 9, 10],
    family: "Western Scales & Modes",
    formula: "1 · 2 · ♭3 · 4 · 5 · 6 · ♭7",
    mood: "Warm minor with raised 6th",
  },
  "Mixolydian Mode": {
    intervals: [0, 2, 4, 5, 7, 9, 10],
    family: "Western Scales & Modes",
    formula: "1 · 2 · 3 · 4 · 5 · 6 · ♭7",
    mood: "Major with flat 7th",
  },
  "Chromatic Scale": {
    intervals: Array.from({ length: 12 }, (_, i) => i),
    family: "Western Scales & Modes",
    formula: "All 12 semitones",
    mood: "Every single key on the keyboard",
  },
} as const;

export type ScaleName = keyof typeof SCALES;

const CHORD_TYPES = {
  Major: { intervals: [0, 4, 7], formula: "1 · 3 · 5 (Root · Major 3rd · 5th)" },
  Minor: { intervals: [0, 3, 7], formula: "1 · ♭3 · 5 (Root · Minor 3rd · 5th)" },
  "Suspended 2 (Sus2)": { intervals: [0, 2, 7], formula: "1 · 2 · 5 (Open, floating)" },
  "Suspended 4 (Sus4)": { intervals: [0, 5, 7], formula: "1 · 4 · 5 (Anticipation, unresolved)" },
  "Major 7th": { intervals: [0, 4, 7, 11], formula: "1 · 3 · 5 · 7 (Lush, meditative)" },
  "Minor 7th": { intervals: [0, 3, 7, 10], formula: "1 · ♭3 · 5 · ♭7 (Gentle, soulful)" },
  "Dominant 7th": { intervals: [0, 4, 7, 10], formula: "1 · 3 · 5 · ♭7 (Bluesy, tension)" },
  Diminished: { intervals: [0, 3, 6], formula: "1 · ♭3 · ♭5" },
  Augmented: { intervals: [0, 4, 8], formula: "1 · 3 · ♯5" },
} as const;

type ChordType = keyof typeof CHORD_TYPES;
type PracticeMode = "scales" | "chords";

function pitchClass(midi: number) {
  return ((midi % 12) + 12) % 12;
}

function noteName(midi: number) {
  return `${NOTE_NAMES[pitchClass(midi)]}${Math.floor(midi / 12) - 1}`;
}

function audioNoteName(midi: number) {
  return `${AUDIO_NOTE_NAMES[pitchClass(midi)]}${Math.floor(midi / 12) - 1}`;
}

function makeScale(root: number, type: ScaleName, octave: number, descending = false) {
  const rootMidi = 60 + root + (octave - 4) * 12;
  const definition = SCALES[type];
  const intervals = definition.intervals;
  const notes = intervals.map((interval) => rootMidi + interval);
  return descending ? [...notes, rootMidi + 12].reverse() : [...notes, rootMidi + 12];
}

export function HarmoniumPlayer() {
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("scales");
  const [root, setRoot] = useState(0); // 0 = C
  const [scaleType, setScaleType] = useState<ScaleName>("Major");
  const [octave, setOctave] = useState(2); // Octave 2 = C2 to C4 (standard harmonium range)
  const [tempo, setTempo] = useState(80);
  const [loop, setLoop] = useState(false);
  const [displayMode, setDisplayMode] = useState<KeyboardDisplayMode>("both");
  const [showSwaras, setShowSwaras] = useState(true);

  // Chords State
  const [chordRoot, setChordRoot] = useState(0);
  const [chordType, setChordType] = useState<ChordType>("Major");
  const [chordPlaying, setChordPlaying] = useState(false);

  // Audio & Playback
  const [playing, setPlaying] = useState(false);
  const [activeExercise, setActiveExercise] = useState<"aaroh" | "avroh" | "both" | null>(null);
  const [currentPlayingMidi, setCurrentPlayingMidi] = useState<number | null>(null);
  const [configuration, setConfiguration] = useState<ReedConfiguration>("recorded");
  const [volume, setVolume] = useState(80);
  const [loading, setLoading] = useState(false);
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState("Authentic recorded harmonium ready · Play any key or exercise below.");

  const engineRef = useRef<HarmoniumAudioEngine | null>(null);
  if (engineRef.current == null) engineRef.current = new HarmoniumAudioEngine();
  const getEngine = () => engineRef.current!;

  const timersRef = useRef<number[]>([]);
  const cancelledRef = useRef(false);
  const loopRef = useRef(false);
  const heldNotesRef = useRef(new Set<number>());
  const loadGenerationRef = useRef(0);
  const noteReleaseTimersRef = useRef(new Map<number, number>());

  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  useEffect(() => {
    if (engineRef.current?.isDisposed) engineRef.current = new HarmoniumAudioEngine();
    return () => engineRef.current?.dispose();
  }, []);

  const scale = useMemo(() => makeScale(root, scaleType, octave), [root, scaleType, octave]);

  // Aaroh swaras formatted progression (e.g. "Sa → Re → Ga → Ma → Pa → Dha → Ni → Sa′")
  const aarohSwaraString = useMemo(() => {
    return scale
      .map((midi, index) => {
        if (index === scale.length - 1) return "Sa′";
        const pc = pitchClass(midi);
        const interval = (pc - root + 12) % 12;
        return SWARA_DATA[interval]?.token || "Sa";
      })
      .join(" → ");
  }, [root, scale]);

  // Avroh swaras formatted progression (e.g. "Sa′ → Ni → Dha → Pa → Ma → Ga → Re → Sa")
  const avrohSwaraString = useMemo(() => {
    const descScale = makeScale(root, scaleType, octave, true);
    return descScale
      .map((midi, index) => {
        if (index === 0) return "Sa′";
        const pc = pitchClass(midi);
        const interval = (pc - root + 12) % 12;
        return SWARA_DATA[interval]?.token || "Sa";
      })
      .join(" → ");
  }, [octave, root, scaleType]);

  const chordNotes = useMemo(() => {
    const baseMidi = 60 + (octave - 4) * 12 + chordRoot;
    return CHORD_TYPES[chordType].intervals.map((interval) => baseMidi + interval);
  }, [chordRoot, chordType, octave]);

  const selectedChordNotes = useMemo(() => new Set(chordNotes), [chordNotes]);
  const selectedPitches = useMemo(
    () => new Set((practiceMode === "chords" ? chordNotes : scale).map(pitchClass)),
    [chordNotes, practiceMode, scale]
  );
  const keyboardRoot = practiceMode === "chords" ? chordRoot : root;
  const chordName = `${NOTES[chordRoot]} ${chordType}`;

  // Stop note callback
  const stopNote = useCallback((midi: number) => {
    heldNotesRef.current.delete(midi);
    const timer = noteReleaseTimersRef.current.get(midi);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      noteReleaseTimersRef.current.delete(midi);
    }
    getEngine().release(audioNoteName(midi));
    setActiveNotes((current) => {
      const next = new Set(current);
      next.delete(midi);
      return next;
    });
  }, []);

  // Play single note on key press
  const startNote = useCallback(
    async (midi: number, velocity = 0.8) => {
      if (activeNotes.has(midi) || heldNotesRef.current.has(midi)) return;
      const generation = loadGenerationRef.current;
      heldNotesRef.current.add(midi);
      setLoading(true);
      try {
        await getEngine().load(configuration);
        if (generation !== loadGenerationRef.current) {
          heldNotesRef.current.delete(midi);
          return;
        }
        getEngine().setVolume(volume <= 0 ? -Infinity : -36 + volume * 0.36);
        getEngine().attack(audioNoteName(midi), velocity);
        setActiveNotes((current) => new Set(current).add(midi));

        const interval = (pitchClass(midi) - root + 12) % 12;
        const swara = SWARA_DATA[interval];
        setMessage(`Playing ${noteName(midi)} · ${swara.name} (${swara.devanagari})`);

        if (!heldNotesRef.current.has(midi)) {
          const timer = window.setTimeout(() => {
            noteReleaseTimersRef.current.delete(midi);
            stopNote(midi);
          }, 650);
          noteReleaseTimersRef.current.set(midi, timer);
        }
      } catch (error) {
        heldNotesRef.current.delete(midi);
        setMessage(error instanceof Error ? error.message : "Unable to load harmonium sample.");
      } finally {
        setLoading(false);
      }
    },
    [activeNotes, configuration, root, stopNote, volume]
  );

  // Play a single note from swara card and release automatically
  const previewNote = useCallback(
    async (midi: number) => {
      await startNote(midi);
      setTimeout(() => {
        stopNote(midi);
      }, 700);
    },
    [startNote, stopNote]
  );

  // Stop all active notes & loops
  const stopPlayback = useCallback(() => {
    loadGenerationRef.current += 1;
    cancelledRef.current = true;
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
    heldNotesRef.current.clear();
    noteReleaseTimersRef.current.forEach(window.clearTimeout);
    noteReleaseTimersRef.current.clear();
    getEngine().stop();
    setActiveNotes(new Set());
    setPlaying(false);
    setActiveExercise(null);
    setCurrentPlayingMidi(null);
    setChordPlaying(false);
    setMessage("Playback stopped. Ready to play.");
  }, []);

  // Set Home Key (Sa / Root) for both scale and chord practice synchronously
  const handleHomeKeyChange = useCallback(
    (newRoot: number) => {
      stopPlayback();
      setRoot(newRoot);
      setChordRoot(newRoot);
      setMessage(`Selected home key (Sa) is ${NOTES[newRoot]}. Scale and chords updated.`);
    },
    [stopPlayback]
  );

  // Sequence player for Aaroh / Avroh
  const playSequence = useCallback(
    async (sequence: number[], type: "aaroh" | "avroh" | "both", shouldLoop = loop) => {
      stopPlayback();
      cancelledRef.current = false;
      setActiveExercise(type);
      setPlaying(true);
      setLoading(true);
      try {
        await getEngine().load(configuration);
        getEngine().setVolume(volume <= 0 ? -Infinity : -36 + volume * 0.36);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to load the harmonium recordings.");
        setPlaying(false);
        setActiveExercise(null);
        setLoading(false);
        return;
      }
      setLoading(false);
      if (cancelledRef.current) return;

      const beat = 60000 / tempo;
      const noteDuration = Math.max(180, beat * 0.82);

      const schedule = (callback: () => void, delay: number) => {
        let timer = 0;
        timer = window.setTimeout(() => {
          timersRef.current = timersRef.current.filter((activeTimer) => activeTimer !== timer);
          callback();
        }, delay);
        timersRef.current.push(timer);
      };

      const playPass = () => {
        if (cancelledRef.current) return;
        sequence.forEach((midi, index) => {
          schedule(() => {
            if (cancelledRef.current) return;
            setCurrentPlayingMidi(midi);
            const pc = pitchClass(midi);
            const interval = (pc - root + 12) % 12;
            const isTaarSa =
              (index === sequence.length - 1 && type === "aaroh") ||
              (index === 0 && type === "avroh");
            const swara = isTaarSa ? "Sa′" : SWARA_DATA[interval]?.token || "Sa";
            setMessage(`Playing ${scaleType}: ${swara} (${NOTE_NAMES[pc]}) · Step ${index + 1} of ${sequence.length}`);
            void startNote(midi, 0.72);
            schedule(() => {
              stopNote(midi);
              if (index === sequence.length - 1 && !shouldLoop) {
                setCurrentPlayingMidi(null);
              }
            }, noteDuration);
          }, index * beat);
        });

        schedule(() => {
          if (cancelledRef.current) return;
          if (shouldLoop && loopRef.current) {
            playPass();
          } else {
            setPlaying(false);
            setActiveExercise(null);
            setCurrentPlayingMidi(null);
            setMessage("Practice exercise completed. Try singing or playing along!");
          }
        }, sequence.length * beat + 60);
      };

      playPass();
    },
    [configuration, loop, root, scaleType, startNote, stopNote, stopPlayback, tempo, volume]
  );

  const playAscending = () => playSequence(scale, "aaroh");
  const playDescending = () => playSequence(makeScale(root, scaleType, octave, true), "avroh");
  const playBoth = () => {
    const up = makeScale(root, scaleType, octave);
    const down = makeScale(root, scaleType, octave, true);
    playSequence([...up, ...down.slice(1)], "both");
  };

  // Play entire chord together
  const playChord = useCallback(async () => {
    stopPlayback();
    const generation = loadGenerationRef.current;
    setLoading(true);
    try {
      await getEngine().load(configuration);
      if (generation !== loadGenerationRef.current) return;
      getEngine().setVolume(volume <= 0 ? -Infinity : -36 + volume * 0.36);
      chordNotes.forEach((midi) => getEngine().attack(audioNoteName(midi), 0.75));
      heldNotesRef.current = new Set(chordNotes);
      setActiveNotes(new Set(chordNotes));
      setChordPlaying(true);
      setMessage(`Sustaining ${chordName} chord · Listen to the reeds resonate together.`);
      const timer = window.setTimeout(() => {
        timersRef.current = timersRef.current.filter((activeTimer) => activeTimer !== timer);
        setActiveNotes((current) => {
          const next = new Set(current);
          chordNotes.forEach((midi) => next.delete(midi));
          return next;
        });
        setChordPlaying(false);
        setMessage(`${chordName} chord complete.`);
      }, 2000);
      timersRef.current.push(timer);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to play the selected chord.");
    } finally {
      setLoading(false);
    }
  }, [chordName, chordNotes, configuration, stopPlayback, volume]);

  // Grouped scales for select dropdown
  const groupedScales = useMemo(() => {
    const groups: Record<string, ScaleName[]> = {};
    (Object.keys(SCALES) as ScaleName[]).forEach((name) => {
      const family = SCALES[name].family;
      if (!groups[family]) groups[family] = [];
      groups[family].push(name);
    });
    return groups;
  }, []);

  return (
    <section className={styles["jp-scales"]} aria-label="Interactive Harmonium Practice Section">
      {/* Hero Header */}
      <div className={styles["jp-scales__hero"]}>
        <p className={styles["jp-scales__eyebrow"]}>JUST PREM · HARMONIUM SANCTUARY</p>
        <h2>Interactive Harmonium Practice</h2>
        <p className={styles["jp-scales__intro"]}>
          Explore sacred scales, understand swaras, and connect your voice with authentic recorded harmonium sounds.
          Select your home note (Sa) below to begin.
        </p>

        {/* Practice Mode Switcher */}
        <div className={styles["jp-scales__mode-tabs"]} role="group" aria-label="Harmonium practice mode">
          <button
            type="button"
            className={styles["jp-scales__mode-btn"]}
            aria-pressed={practiceMode === "scales"}
            onClick={() => {
              stopPlayback();
              setPracticeMode("scales");
            }}
          >
            <Music2 className="w-4 h-4 text-[#ad684d] shrink-0" />
            <span>Swara Practice</span>
          </button>
          <button
            type="button"
            className={styles["jp-scales__mode-btn"]}
            aria-pressed={practiceMode === "chords"}
            onClick={() => {
              stopPlayback();
              setPracticeMode("chords");
            }}
          >
            <Piano className="w-4 h-4 text-[#ad684d] shrink-0" />
            <span>Chords Library</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          Section A: Practice Setup Toolbar
          ==================================================================== */}
      <div className={styles["jp-setup-panel"]}>
        <div className={styles["jp-setup-grid"]}>
          {/* 1. Choose Your Sa (Root) */}
          <div className={styles["jp-setup-card"]}>
            <div className={styles["jp-setup-label"]}>
              <span>1. Choose Your Sa (Home Key)</span>
              <span className={styles["jp-setup-sub"]}>Selected: {NOTES[root]}</span>
            </div>
            <div className={styles["jp-sa-pill-row"]}>
              {NOTES.map((note, index) => (
                <button
                  key={note}
                  type="button"
                  aria-pressed={root === index}
                  onClick={() => handleHomeKeyChange(index)}
                  className={styles["jp-sa-pill"]}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Choose Scale */}
          <div className={styles["jp-setup-card"]}>
            <div className={styles["jp-setup-label"]}>
              <span>2. Choose Scale</span>
            </div>
            {practiceMode === "scales" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <select
                  value={root}
                  onChange={(event) => {
                    handleHomeKeyChange(Number(event.target.value));
                  }}
                  className={styles["jp-select-styled"]}
                  aria-label="Scale root note"
                >
                  {NOTES.map((name, index) => (
                    <option key={name} value={index}>
                      Root: {name}
                    </option>
                  ))}
                </select>
                <select
                  value={scaleType}
                  onChange={(event) => {
                    stopPlayback();
                    setScaleType(event.target.value as ScaleName);
                  }}
                  className={styles["jp-select-styled"]}
                  aria-label="Scale type"
                >
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                </select>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <select
                  value={chordRoot}
                  onChange={(event) => {
                    handleHomeKeyChange(Number(event.target.value));
                  }}
                  className={styles["jp-select-styled"]}
                  aria-label="Chord root note"
                >
                  {NOTES.map((name, index) => (
                    <option key={name} value={index}>
                      Root: {name}
                    </option>
                  ))}
                </select>
                <select
                  value={chordType}
                  onChange={(event) => {
                    stopPlayback();
                    setChordType(event.target.value as ChordType);
                  }}
                  className={styles["jp-select-styled"]}
                  aria-label="Chord type"
                >
                  {(Object.keys(CHORD_TYPES) as ChordType[]).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* 3. Display & Audio Settings */}
          <div className={styles["jp-setup-card"]}>
            <div className={styles["jp-setup-label"]}>
              <span>3. Key Display & Volume</span>
            </div>
            <div className={styles["jp-setup-toggle-row"]}>
              <select
                value={displayMode}
                onChange={(e) => setDisplayMode(e.target.value as KeyboardDisplayMode)}
                className={styles["jp-select-styled"]}
                style={{ padding: "8px 10px", fontSize: "12px" }}
              >
                <option value="both">Labels: Swaras + Notes</option>
                <option value="swaras">Labels: Swaras Only</option>
                <option value="notes">Labels: Notes Only</option>
              </select>
              <select
                value={octave}
                onChange={(e) => {
                  stopPlayback();
                  setOctave(Number(e.target.value));
                }}
                className={styles["jp-select-styled"]}
                style={{ padding: "8px 10px", fontSize: "12px" }}
              >
                <option value={2}>Octave: Mandra (C2–C4)</option>
                <option value={3}>Octave: Madhya (C3–C5)</option>
              </select>
            </div>
            <div className={styles["jp-volume-wrap"]}>
              <span style={{ fontSize: "12px", color: "#5d6459" }}>🔊 Volume</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVolume(val);
                  getEngine().setVolume(val <= 0 ? -Infinity : -36 + val * 0.36);
                }}
              />
              <span className={styles["jp-volume-badge"]}>{volume}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          Section B: Virtual Harmonium Keyboard Hero
          ==================================================================== */}
      <div className={styles["jp-keyboard-section"]}>
        {/* Header & Formula */}
        <div className={styles["jp-keyboard-header"]}>
          <div className={styles["jp-keyboard-title"]}>
            <h3>
              {practiceMode === "scales"
                ? `${NOTES[root]} ${scaleType}`
                : `${NOTES[chordRoot]} ${chordType} Chord`}
            </h3>
            <span className={styles["jp-scale-formula-tag"]}>
              <span>Formula:</span>
              <strong>
                {practiceMode === "scales" ? SCALES[scaleType].formula : CHORD_TYPES[chordType].formula}
              </strong>
            </span>
          </div>

          <label className={styles["jp-toggle-label"]}>
            <input
              type="checkbox"
              checked={showSwaras}
              onChange={(e) => setShowSwaras(e.target.checked)}
            />
            <span>Show Swara badges</span>
          </label>
        </div>

        {/* Beginner Legend Bar */}
        <div className={styles["jp-legend-bar"]}>
          <div className={styles["jp-legend-item"]}>
            <span className={`${styles["jp-legend-badge"]} ${styles["jp-legend-badge--sa"]}`}>Sa</span>
            <span>Sa (Selected Tonic / Home)</span>
          </div>
          <div className={styles["jp-legend-item"]}>
            <span className={`${styles["jp-legend-badge"]} ${styles["jp-legend-badge--shuddha"]}`}>Re</span>
            <span>Shuddha (Natural)</span>
          </div>
          <div className={styles["jp-legend-item"]}>
            <span className={`${styles["jp-legend-badge"]} ${styles["jp-legend-badge--komal"]}`}>ga</span>
            <span>Komal (Soft / Flat)</span>
          </div>
          <div className={styles["jp-legend-item"]}>
            <span className={`${styles["jp-legend-badge"]} ${styles["jp-legend-badge--tivra"]}`}>Ma′</span>
            <span>Tīvra Ma (Sharp)</span>
          </div>
          <div className={styles["jp-legend-item"]}>
            <span className={`${styles["jp-legend-badge"]} ${styles["jp-legend-badge--active"]}`}>●</span>
            <span>Playing Note</span>
          </div>
        </div>

        {/* The Keyboard */}
        <HarmoniumKeyboard
          octave={octave}
          root={keyboardRoot}
          rootLabel={practiceMode === "chords" ? "Root" : "Sa"}
          rootMidi={practiceMode === "chords" ? chordNotes[0] : undefined}
          selectedPitches={selectedPitches}
          selectedNotes={practiceMode === "chords" ? selectedChordNotes : undefined}
          showSwaras={showSwaras}
          displayMode={displayMode}
          activeNotes={activeNotes}
          onAttack={(midi) => void startNote(midi)}
          onRelease={stopNote}
        />
      </div>

      {/* ====================================================================
          Section C: Understand the Swaras (Sargam Explorer)
          ==================================================================== */}
      {practiceMode === "scales" && (
        <div className={styles["jp-swara-explorer"]}>
          <div className={styles["jp-swara-explorer-header"]}>
            <p className={styles["jp-scales__eyebrow"]}>SARGAM LEARNING GUIDE</p>
            <h3>Understand the Notes in {NOTES[root]} {scaleType}</h3>
            <p>
              In Indian classical music, every scale is an ordered journey starting and ending in <strong>Sa</strong>.
              Click <strong>Hear note</strong> on any card to listen and see its exact key press on the harmonium.
            </p>
          </div>

          {/* Cards for each note in the scale */}
          <div className={styles["jp-swara-cards-grid"]}>
            {scale.map((midi, index) => {
              const pc = pitchClass(midi);
              const interval = (pc - root + 12) % 12;
              const isOctave = index === scale.length - 1;
              const swara = isOctave ? SWARA_DATA[0] : SWARA_DATA[interval];
              const token = isOctave ? "Sa′" : swara.token;
              const swaraKind = isOctave ? "sa" : swara.kind;
              const isPlayingThis = currentPlayingMidi === midi || activeNotes.has(midi);

              return (
                <div
                  key={`${midi}-${index}`}
                  className={styles["jp-swara-card"]}
                  style={isPlayingThis ? { borderColor: "#ad684d", background: "#fbf3ea" } : undefined}
                >
                  <div className={styles["jp-swara-card-step"]}>
                    {isOctave ? "Step 8 · Octave" : `Step ${index + 1}`}
                  </div>
                  <div
                    className={`
                      ${styles["jp-swara-card-token"]}
                      ${styles[`jp-swara-card-token--${swaraKind}`]}
                    `}
                  >
                    {token}
                  </div>
                  <div className={styles["jp-swara-card-name"]}>
                    {isOctave ? "Taar Sa (Higher)" : swara.name}
                  </div>
                  <div className={styles["jp-swara-card-devanagari"]}>
                    {isOctave ? "तार षड्ज" : swara.devanagari}
                  </div>
                  <div className={styles["jp-swara-card-key"]}>
                    Key: [ {NOTE_NAMES[pc]} ]
                  </div>
                  <div className={styles["jp-swara-card-role"]}>
                    {isOctave ? "Higher Octave Anchor" : swara.role}
                  </div>
                  <button
                    type="button"
                    onClick={() => previewNote(midi)}
                    className={styles["jp-swara-card-play-btn"]}
                  >
                    <span>🔊</span> Hear note
                  </button>
                </div>
              );
            })}
          </div>

          {/* Educational Primer Cards for Beginners */}
          <div className={styles["jp-primer-grid"]}>
            <div className={styles["jp-primer-card"]}>
              <h4><span>🟠</span> What is Sa?</h4>
              <p>
                Sa (Shadja) is the unchanging home note of Indian music. Unlike Western C which is fixed in pitch,
                Sa can be placed on <strong>any key</strong> (C, C♯, D, D♯, etc.) that best suits your vocal range.
              </p>
            </div>
            <div className={styles["jp-primer-card"]}>
              <h4><span>🟢</span> Shuddha Swaras</h4>
              <p>
                The 7 natural notes: Sa, Re, Ga, Ma, Pa, Dha, Ni. When a scale has only Shuddha notes (like Bilawal),
                it expresses joy, clarity, and upliftment.
              </p>
            </div>
            <div className={styles["jp-primer-card"]}>
              <h4><span>🔴</span> Komal & Tīvra Swaras</h4>
              <p>
                <strong>Komal swaras</strong> (Re, Ga, Dha, Ni) are lowered half a step for a softer, deeply meditative feel.
                <strong>Tīvra Ma</strong> is raised half a step for spiritual elevation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          Section D: Practice Tools (Major & Minor Scale Practice)
          ==================================================================== */}
      <div className={styles["jp-tools-panel"]}>
        <div className={styles["jp-tools-header"]}>
          <p className={styles["jp-scales__eyebrow"]}>PRACTICE CONTROLS</p>
          <h3>
            {practiceMode === "scales" ? "Listen & Practise the Scale" : `Play ${chordName} Chord`}
          </h3>
          <p>
            {practiceMode === "scales"
              ? "Select Major or Minor scale below to hear and play along with the harmonium."
              : "Listen to how all 3 chord notes resonate together on the harmonium reeds."}
          </p>
        </div>

        {practiceMode === "scales" ? (
          <>
            {/* Scale Choice Dropdown */}
            <div className={styles["jp-scale-select-bar"]}>
              <label className={styles["jp-scale-select-label"]}>
                <span>Scale:</span>
                <select
                  value={scaleType}
                  onChange={(e) => {
                    stopPlayback();
                    setScaleType(e.target.value as ScaleName);
                  }}
                  className={styles["jp-select-styled"]}
                  style={{ width: "auto", minWidth: "160px" }}
                >
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                </select>
              </label>
              <div className={styles["jp-scale-trail-inline"]}>
                <span>Progression in {NOTES[root]} {scaleType}:</span>
                <strong>{aarohSwaraString}</strong>
              </div>
            </div>

            {/* 3 Playback Action Cards */}
            <div className={styles["jp-practice-grid"]}>
              {/* 1. Ascending (Aaroh) */}
              <button
                type="button"
                className={`${styles["jp-practice-card"]} ${
                  activeExercise === "aaroh" && playing ? styles["jp-practice-card--active"] : ""
                }`}
                onClick={() => {
                  if (activeExercise === "aaroh" && playing) {
                    stopPlayback();
                  } else {
                    playAscending();
                  }
                }}
                disabled={loading}
              >
                <div className={styles["jp-practice-card-top"]}>
                  <span className={`${styles["jp-practice-card-icon"]} ${styles["jp-practice-card-icon--up"]}`}>
                    <ArrowUp className="w-4 h-4" />
                  </span>
                  <div className={styles["jp-practice-card-titles"]}>
                    <span className={styles["jp-practice-card-title"]}>Ascending</span>
                    <span className={styles["jp-practice-card-badge"]}>Aaroh · आरोह</span>
                  </div>
                </div>
                <div className={styles["jp-practice-card-sequence"]}>
                  {aarohSwaraString}
                </div>
                <div className={styles["jp-practice-card-action"]}>
                  {activeExercise === "aaroh" && playing ? (
                    <span className={styles["jp-practice-card-playing"]}>
                      <span className={styles["jp-pulse-dot"]} /> Playing now…
                    </span>
                  ) : (
                    <span className={styles["jp-practice-card-btn-text"]}>
                      <Play className="w-3.5 h-3.5 fill-current" /> Practise Ascending
                    </span>
                  )}
                </div>
              </button>

              {/* 2. Descending (Avroh) */}
              <button
                type="button"
                className={`${styles["jp-practice-card"]} ${
                  activeExercise === "avroh" && playing ? styles["jp-practice-card--active"] : ""
                }`}
                onClick={() => {
                  if (activeExercise === "avroh" && playing) {
                    stopPlayback();
                  } else {
                    playDescending();
                  }
                }}
                disabled={loading}
              >
                <div className={styles["jp-practice-card-top"]}>
                  <span className={`${styles["jp-practice-card-icon"]} ${styles["jp-practice-card-icon--down"]}`}>
                    <ArrowDown className="w-4 h-4" />
                  </span>
                  <div className={styles["jp-practice-card-titles"]}>
                    <span className={styles["jp-practice-card-title"]}>Descending</span>
                    <span className={styles["jp-practice-card-badge"]}>Avroh · अवरोह</span>
                  </div>
                </div>
                <div className={styles["jp-practice-card-sequence"]}>
                  {avrohSwaraString}
                </div>
                <div className={styles["jp-practice-card-action"]}>
                  {activeExercise === "avroh" && playing ? (
                    <span className={styles["jp-practice-card-playing"]}>
                      <span className={styles["jp-pulse-dot"]} /> Playing now…
                    </span>
                  ) : (
                    <span className={styles["jp-practice-card-btn-text"]}>
                      <Play className="w-3.5 h-3.5 fill-current" /> Practise Descending
                    </span>
                  )}
                </div>
              </button>

              {/* 3. Full Scale (Both) */}
              <button
                type="button"
                className={`${styles["jp-practice-card"]} ${
                  activeExercise === "both" && playing ? styles["jp-practice-card--active"] : ""
                }`}
                onClick={() => {
                  if (activeExercise === "both" && playing) {
                    stopPlayback();
                  } else {
                    playBoth();
                  }
                }}
                disabled={loading}
              >
                <div className={styles["jp-practice-card-top"]}>
                  <span className={`${styles["jp-practice-card-icon"]} ${styles["jp-practice-card-icon--both"]}`}>
                    <ArrowUpDown className="w-4 h-4" />
                  </span>
                  <div className={styles["jp-practice-card-titles"]}>
                    <span className={styles["jp-practice-card-title"]}>Full Scale</span>
                    <span className={styles["jp-practice-card-badge"]}>Aaroh &amp; Avroh</span>
                  </div>
                </div>
                <div className={styles["jp-practice-card-sequence"]}>
                  Ascent &amp; descent full cycle
                </div>
                <div className={styles["jp-practice-card-action"]}>
                  {activeExercise === "both" && playing ? (
                    <span className={styles["jp-practice-card-playing"]}>
                      <span className={styles["jp-pulse-dot"]} /> Playing now…
                    </span>
                  ) : (
                    <span className={styles["jp-practice-card-btn-text"]}>
                      <Play className="w-3.5 h-3.5 fill-current" /> Practise Full Cycle
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Transport Bar: Stop & Loop Switch */}
            <div className={styles["jp-transport-bar"]}>
              <button
                type="button"
                className={`${styles["jp-stop-action-btn"]} ${
                  playing || activeNotes.size > 0 ? styles["jp-stop-action-btn--active"] : ""
                }`}
                onClick={stopPlayback}
                disabled={!playing && activeNotes.size === 0}
              >
                <Square className="w-4 h-4 fill-current" />
                <span>{playing ? "Stop Playback" : "Playback Stopped"}</span>
              </button>

              <button
                type="button"
                className={`${styles["jp-loop-toggle-btn"]} ${
                  loop ? styles["jp-loop-toggle-btn--active"] : ""
                }`}
                onClick={() => setLoop(!loop)}
                aria-pressed={loop}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Continuous Loop</span>
                <span className={styles["jp-loop-status-pill"]}>{loop ? "ON" : "OFF"}</span>
              </button>
            </div>

            {/* Tempo Slider & Presets */}
            <div className={styles["jp-tempo-bar"]}>
              <div className={styles["jp-tempo-control"]}>
                <div className={styles["jp-tempo-header"]}>
                  <span className="flex items-center gap-1.5">
                    <Timer className="w-4 h-4 text-[#567262]" />
                    Practice Speed
                  </span>
                  <strong>
                    {tempo} BPM · {tempo <= 65 ? "Slow (Vilambit)" : tempo <= 95 ? "Moderate (Madhya)" : "Fast (Drut)"}
                  </strong>
                </div>
                <input
                  type="range"
                  min="45"
                  max="140"
                  step="5"
                  value={tempo}
                  onChange={(e) => setTempo(Number(e.target.value))}
                  className={styles["jp-tempo-slider"]}
                />
              </div>
              <div className={styles["jp-tempo-presets"]}>
                <button
                  type="button"
                  className={styles["jp-tempo-preset-btn"]}
                  aria-pressed={tempo === 60}
                  onClick={() => setTempo(60)}
                >
                  Slow (60)
                </button>
                <button
                  type="button"
                  className={styles["jp-tempo-preset-btn"]}
                  aria-pressed={tempo === 80}
                  onClick={() => setTempo(80)}
                >
                  Medium (80)
                </button>
                <button
                  type="button"
                  className={styles["jp-tempo-preset-btn"]}
                  aria-pressed={tempo === 110}
                  onClick={() => setTempo(110)}
                >
                  Fast (110)
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles["jp-chord-panel"]}>
            <div className={styles["jp-chord-chips"]}>
              {chordNotes.map((midi, idx) => (
                <div key={midi} className={styles["jp-chord-chip"]}>
                  <strong>{noteName(midi)}</strong>
                  <small>{idx === 0 ? "Root (Sa)" : idx === 1 ? "Third" : "Fifth"}</small>
                </div>
              ))}
            </div>
            <div className={styles["jp-transport-bar"]}>
              <button
                type="button"
                className={`${styles["jp-btn"]} ${styles["jp-btn--primary"]}`}
                disabled={loading}
                onClick={() => (chordPlaying ? stopPlayback() : void playChord())}
              >
                {chordPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                <span>{chordPlaying ? "Stop Chord" : `Play ${chordName} Chord`}</span>
              </button>
            </div>
          </div>
        )}

        {/* Live Practice Status Banner */}
        <div className={styles["jp-status-banner"]} aria-live="polite">
          <Sparkles className="w-4 h-4 text-[#ad684d] flex-shrink-0" />
          <span>{loading ? "Loading harmonium audio recordings…" : message}</span>
        </div>
      </div>

      {/* ====================================================================
          Section E: Tanpura & Drone Companion
          ==================================================================== */}
      <TanpuraMetronome />

      {/* Footer Credits */}
      <div className={styles["jp-scales__footer"]}>
        <p>
          <strong>Devotion in Sound.</strong> Recorded from authentic harmonium reeds to accompany your sacred
          journey.
        </p>
        <p className={styles["jp-scales__disclaimer"]}>
          Recordings: Donya Quick, “Harmonium Samples – All Keys and Drones,” edited by Nicholaus P. Brosowsky.
          Licensed CC BY 3.0 (<a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">license</a>).
        </p>
      </div>
    </section>
  );
}

export const HarmoniumScalesLibrary = HarmoniumPlayer;
