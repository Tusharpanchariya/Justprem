"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./HarmoniumScalesLibrary.module.css";
import { HarmoniumAudioEngine } from "./HarmoniumAudioEngine";
import { HarmoniumControls } from "./HarmoniumControls";
import { HarmoniumKeyboard } from "./HarmoniumKeyboard";
import type { ReedConfiguration } from "./HarmoniumSampleManager";
import { TanpuraMetronome } from "./TanpuraMetronome";

const NOTES = ["C", "C♯ / D♭", "D", "D♯ / E♭", "E", "F", "F♯ / G♭", "G", "G♯ / A♭", "A", "A♯ / B♭", "B"];
const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const AUDIO_NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SCALES = {
  "Major (Ionian)": { intervals: [0, 2, 4, 5, 7, 9, 11], family: "Major & minor", formula: "1 2 3 4 5 6 7" },
  "Natural Minor (Aeolian)": { intervals: [0, 2, 3, 5, 7, 8, 10], family: "Major & minor", formula: "1 2 ♭3 4 5 ♭6 ♭7" },
  "Harmonic Minor": { intervals: [0, 2, 3, 5, 7, 8, 11], family: "Major & minor", formula: "1 2 ♭3 4 5 ♭6 7" },
  "Melodic Minor": { intervals: [0, 2, 3, 5, 7, 9, 11], descending: [0, 2, 3, 5, 7, 8, 10], family: "Major & minor", formula: "Ascending: 1 2 ♭3 4 5 6 7" },
  "Major Pentatonic": { intervals: [0, 2, 4, 7, 9], family: "Pentatonic & blues", formula: "1 2 3 5 6" },
  "Minor Pentatonic": { intervals: [0, 3, 5, 7, 10], family: "Pentatonic & blues", formula: "1 ♭3 4 5 ♭7" },
  "Blues (Minor)": { intervals: [0, 3, 5, 6, 7, 10], family: "Pentatonic & blues", formula: "1 ♭3 4 ♭5 5 ♭7" },
  "Dorian": { intervals: [0, 2, 3, 5, 7, 9, 10], family: "Seven modes", formula: "1 2 ♭3 4 5 6 ♭7" },
  "Phrygian": { intervals: [0, 1, 3, 5, 7, 8, 10], family: "Seven modes", formula: "1 ♭2 ♭3 4 5 ♭6 ♭7" },
  "Lydian": { intervals: [0, 2, 4, 6, 7, 9, 11], family: "Seven modes", formula: "1 2 3 ♯4 5 6 7" },
  "Mixolydian": { intervals: [0, 2, 4, 5, 7, 9, 10], family: "Seven modes", formula: "1 2 3 4 5 6 ♭7" },
  "Locrian": { intervals: [0, 1, 3, 5, 6, 8, 10], family: "Seven modes", formula: "1 ♭2 ♭3 4 ♭5 ♭6 ♭7" },
  "Whole Tone": { intervals: [0, 2, 4, 6, 8, 10], family: "Other scales", formula: "1 2 3 ♯4 ♯5 ♭7" },
  "Diminished (Whole–Half)": { intervals: [0, 2, 3, 5, 6, 8, 9, 11], family: "Other scales", formula: "Whole–half pattern" },
  "Diminished (Half–Whole)": { intervals: [0, 1, 3, 4, 6, 7, 9, 10], family: "Other scales", formula: "Half–whole pattern" },
  "Chromatic": { intervals: Array.from({ length: 12 }, (_, index) => index), family: "Other scales", formula: "All 12 semitones" },
} as const;

type ScaleName = keyof typeof SCALES;
type ScaleGroup = { name: string; types: ScaleName[] };
const SCALE_GROUPS: ScaleGroup[] = [
  { name: "Major & minor", types: ["Major (Ionian)", "Natural Minor (Aeolian)", "Harmonic Minor", "Melodic Minor"] },
  { name: "Pentatonic & blues", types: ["Major Pentatonic", "Minor Pentatonic", "Blues (Minor)"] },
  { name: "Seven modes", types: ["Dorian", "Phrygian", "Lydian", "Mixolydian", "Locrian"] },
  { name: "Other scales", types: ["Whole Tone", "Diminished (Whole–Half)", "Diminished (Half–Whole)", "Chromatic"] },
];

function pitchClass(midi: number) { return ((midi % 12) + 12) % 12; }
function noteName(midi: number) { return `${NOTE_NAMES[pitchClass(midi)]}${Math.floor(midi / 12) - 1}`; }
function audioNoteName(midi: number) { return `${AUDIO_NOTE_NAMES[pitchClass(midi)]}${Math.floor(midi / 12) - 1}`; }
function swara(interval: number) {
  return (["Sa", "komal Re", "Re", "komal Ga", "Ga", "Ma", "tīvra Ma", "Pa", "komal Dha", "Dha", "komal Ni", "Ni"] as const)[interval % 12];
}
function makeScale(root: number, type: ScaleName, octave: number, descending = false) {
  const rootMidi = 60 + root + (octave - 4) * 12;
  const definition = SCALES[type] as { intervals: readonly number[]; descending?: readonly number[] };
  const intervals = descending && definition.descending ? definition.descending : definition.intervals;
  const notes = intervals.map((interval) => rootMidi + interval);
  return descending ? [...notes, rootMidi + 12].reverse() : [...notes, rootMidi + 12];
}

export function HarmoniumPlayer() {
  const [root, setRoot] = useState(0);
  const [scaleType, setScaleType] = useState<ScaleName>("Major (Ionian)");
  const [tempo, setTempo] = useState(80);
  const [octave, setOctave] = useState(2);
  const [showSwaras, setShowSwaras] = useState(true);
  const [loop, setLoop] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [configuration, setConfiguration] = useState<ReedConfiguration>("recorded");
  const [volume, setVolume] = useState(75);
  const [loading, setLoading] = useState(false);
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState("Recorded harmonium ready · samples load on first play.");
  const engineRef = useRef<HarmoniumAudioEngine | null>(null);
  if (engineRef.current == null) engineRef.current = new HarmoniumAudioEngine();
  const getEngine = () => engineRef.current!;
  const timersRef = useRef<number[]>([]);
  const cancelledRef = useRef(false);
  const loopRef = useRef(false);
  const heldNotesRef = useRef(new Set<number>());
  const loadGenerationRef = useRef(0);
  const noteReleaseTimersRef = useRef(new Map<number, number>());

  const scale = useMemo(() => makeScale(root, scaleType, octave), [root, scaleType, octave]);
  const selectedPitches = useMemo(() => new Set(scale.map(pitchClass)), [scale]);
  useEffect(() => { loopRef.current = loop; }, [loop]);
  useEffect(() => {
    if (engineRef.current?.isDisposed) engineRef.current = new HarmoniumAudioEngine();
    return () => engineRef.current?.dispose();
  }, []);
  const stopNote = useCallback((midi: number) => {
    heldNotesRef.current.delete(midi);
    const timer = noteReleaseTimersRef.current.get(midi);
    if (timer !== undefined) { window.clearTimeout(timer); noteReleaseTimersRef.current.delete(midi); }
    getEngine().release(audioNoteName(midi));
    setActiveNotes((current) => { const next = new Set(current); next.delete(midi); return next; });
  }, []);
  const startNote = useCallback(async (midi: number, velocity = 0.8) => {
    if (activeNotes.has(midi) || heldNotesRef.current.has(midi)) return;
    const generation = loadGenerationRef.current;
    heldNotesRef.current.add(midi);
    setLoading(true);
    try {
      await getEngine().load(configuration);
      if (generation !== loadGenerationRef.current) { heldNotesRef.current.delete(midi); return; }
      getEngine().setVolume(volume <= 0 ? -Infinity : -36 + volume * 0.36);
      getEngine().attack(audioNoteName(midi), velocity);
      setActiveNotes((current) => new Set(current).add(midi));
      setMessage(`Playing sampled note ${noteName(midi)}${showSwaras ? ` · ${swara((pitchClass(midi) - root + 12) % 12)}` : ""}`);
      if (!heldNotesRef.current.has(midi)) {
        const timer = window.setTimeout(() => { noteReleaseTimersRef.current.delete(midi); stopNote(midi); }, 650);
        noteReleaseTimersRef.current.set(midi, timer);
      }
    } catch (error) {
      heldNotesRef.current.delete(midi);
      setMessage(error instanceof Error ? error.message : "Unable to load the harmonium recording.");
    } finally { setLoading(false); }
  }, [activeNotes, configuration, root, showSwaras, stopNote, volume]);

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
    setMessage("Playback stopped.");
  }, []);

  const playSequence = useCallback(async (sequence: number[], shouldLoop = loop) => {
    stopPlayback();
    cancelledRef.current = false;
    setPlaying(true);
    setLoading(true);
    try {
      await getEngine().load(configuration);
      getEngine().setVolume(volume <= 0 ? -Infinity : -36 + volume * 0.36);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load the harmonium recordings.");
      setPlaying(false);
      setLoading(false);
      return;
    }
    setLoading(false);
    if (cancelledRef.current) return;
    const beat = 60000 / tempo;
    const noteDuration = Math.max(180, beat * 0.78);
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
          void startNote(midi, 0.68);
          schedule(() => stopNote(midi), noteDuration);
        }, index * beat);
      });
      schedule(() => {
        if (cancelledRef.current) return;
        if (shouldLoop && loopRef.current) playPass();
        else {
          setPlaying(false);
          setMessage("Scale complete. Play again or choose another scale.");
        }
      }, sequence.length * beat + 40);
    };
    playPass();
  }, [configuration, loop, startNote, stopNote, stopPlayback, tempo, volume]);

  useEffect(() => () => { cancelledRef.current = true; timersRef.current.forEach(window.clearTimeout); noteReleaseTimersRef.current.forEach(window.clearTimeout); }, []);

  const ascending = () => playSequence(scale);
  const descending = () => playSequence(makeScale(root, scaleType, octave, true));
  const both = () => {
    const up = makeScale(root, scaleType, octave);
    const down = makeScale(root, scaleType, octave, true);
    playSequence([...up, ...down.slice(1)]);
  };

  return (
    <section className={styles["jp-scales"]} aria-label="Interactive harmonium scale practice">
      <div className={styles["jp-scales__hero"]}>
        <p className={styles["jp-scales__eyebrow"]}>JUST PREM · SOUND OF DEVOTION</p>
        <h2>Explore the harmonium</h2>
        <p className={styles["jp-scales__intro"]}>Choose a key and scale, see each note highlighted, and play authentic recorded harmonium notes on the virtual keyboard.</p>
      </div>

      <div className={styles["jp-scales__panel"]}>
        <div className={styles["jp-scales__selectors"]}>
          <label className={styles["jp-scales__field"]}><span>Root note</span><select value={root} onChange={(event) => { stopPlayback(); setRoot(Number(event.target.value)); }}>{NOTES.map((name, index) => <option key={name} value={index}>{name}</option>)}</select></label>
          <label className={`${styles["jp-scales__field"]} ${styles["jp-scales__field--wide"]}`}><span>Scale type</span><select value={scaleType} onChange={(event) => { stopPlayback(); setScaleType(event.target.value as ScaleName); }}>{SCALE_GROUPS.map((group) => <optgroup key={group.name} label={group.name}>{group.types.map((type) => <option key={type} value={type}>{type}</option>)}</optgroup>)}</select></label>
          <label className={styles["jp-scales__field"]}><span>Octave</span><select value={octave} onChange={(event) => { stopPlayback(); setOctave(Number(event.target.value)); }}>{[2, 3].map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        </div>

        <div className={styles["jp-scales__scale-info"]}>
          <div><p className={styles["jp-scales__eyebrow"]}>SELECTED SCALE</p><h3>{NOTES[root].split(" / ")[0]} {scaleType}</h3><p className={styles["jp-scales__formula"]}>{SCALES[scaleType].formula}</p></div>
          <label className={styles["jp-scales__toggle"]}><input type="checkbox" checked={showSwaras} onChange={(event) => setShowSwaras(event.target.checked)} /><span>Show swaras</span></label>
        </div>

        <div className={styles["jp-scales__notes"]} aria-label="Notes in selected scale">
          {scale.map((midi, index) => {
            const interval = (pitchClass(midi) - root + 12) % 12;
            return <span className={styles["jp-scales__note-chip"]} key={`${midi}-${index}`}><strong>{noteName(midi)}</strong>{showSwaras && <small>{interval === 0 && index === scale.length - 1 ? "Sa′" : swara(interval)}</small>}</span>;
          })}
        </div>

        <div className={styles["jp-scales__keyboard-wrap"]}>
          <div className={styles["jp-scales__keyboard-caption"]}><span>Press and hold a key to hear it</span><span>Recorded harmonium · C2–C5 source range</span></div>
          <HarmoniumKeyboard octave={octave} root={root} selectedPitches={selectedPitches} activeNotes={activeNotes} onAttack={(midi) => void startNote(midi)} onRelease={stopNote} />
          <div className={styles["jp-scales__legend"]}><span><i className={`${styles["jp-scales__legend-dot"]} ${styles["jp-scales__legend-dot--root"]}`} /> Tonic / Sa</span><span><i className={`${styles["jp-scales__legend-dot"]} ${styles["jp-scales__legend-dot--scale"]}`} /> Scale note</span></div>
          <HarmoniumControls configuration={configuration} onConfigurationChange={(value) => { stopPlayback(); setConfiguration(value); setMessage(`Selected ${value.replace("-", " ")} · licensed recordings needed`); }} volume={volume} onVolumeChange={(value) => { setVolume(value); getEngine().setVolume(value <= 0 ? -Infinity : -36 + value * 0.36); }} loading={loading} status={message} onStop={stopPlayback} />
        </div>

        <TanpuraMetronome />

        <div className={styles["jp-scales__player"]}>
          <div className={styles["jp-scales__player-heading"]}><div><p className={styles["jp-scales__eyebrow"]}>LISTEN & PRACTISE</p><h3>Play the scale</h3></div><label className={styles["jp-scales__toggle"]}><input type="checkbox" checked={loop} onChange={(event) => setLoop(event.target.checked)} /><span>Loop</span></label></div>
          <div className={styles["jp-scales__buttons"]}><button type="button" className={`${styles["jp-scales__button"]} ${styles["jp-scales__button--primary"]}`} onClick={ascending}>↑ Ascending</button><button type="button" className={styles["jp-scales__button"]} onClick={descending}>↓ Descending</button><button type="button" className={styles["jp-scales__button"]} onClick={both}>↕ Both</button><button type="button" className={`${styles["jp-scales__button"]} ${styles["jp-scales__button--stop"]}`} onClick={stopPlayback} disabled={!playing}>Stop</button></div>
          <label className={styles["jp-scales__tempo"]}><span>Tempo <strong>{tempo} BPM</strong></span><input type="range" min="40" max="160" step="5" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} /><span className={styles["jp-scales__tempo-ends"]}><small>Slow</small><small>Fast</small></span></label>
          <p className={styles["jp-scales__status"]} aria-live="polite">{message}</p>
        </div>
      </div>
      <div className={styles["jp-scales__footer"]}><p><strong>Your practice, your offering.</strong> Choose a scale and practise slowly with recorded harmonium notes. The source files do not identify single, double, or triple reed configurations.</p><p className={styles["jp-scales__disclaimer"]}>Recordings: Donya Quick, “Harmonium Samples – All Keys and Drones,” edited by Nicholaus P. Brosowsky. Licensed CC BY 3.0 (<a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">license</a>). <a href="https://github.com/nbrosowsky/tonejs-instruments" target="_blank" rel="noreferrer">Sample source ↗</a></p></div>
    </section>
  );
}

export const HarmoniumScalesLibrary = HarmoniumPlayer;
