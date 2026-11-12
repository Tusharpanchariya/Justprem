"use client";

import type { KeyboardEvent, PointerEvent } from "react";
import styles from "./HarmoniumScalesLibrary.module.css";

const BLACK_PITCHES = new Set([1, 3, 6, 8, 10]);
const NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const pitchClass = (midi: number) => ((midi % 12) + 12) % 12;
const noteName = (midi: number) => `${NAMES[pitchClass(midi)]}${Math.floor(midi / 12) - 1}`;

type Props = {
  octave: number;
  root: number;
  selectedPitches: ReadonlySet<number>;
  activeNotes: ReadonlySet<number>;
  onAttack: (midi: number) => void;
  onRelease: (midi: number) => void;
};

export function HarmoniumKeyboard({ octave, root, selectedPitches, activeNotes, onAttack, onRelease }: Props) {
  const notes = Array.from({ length: 25 }, (_, index) => 60 + (octave - 4) * 12 + index);
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, midi: number) => {
    if ((event.code === "Space" || event.code === "Enter") && !event.repeat) {
      event.preventDefault();
      onAttack(midi);
    }
  };
  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>, midi: number) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
      onRelease(midi);
    }
  };
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>, midi: number) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    onAttack(midi);
  };
  const onPointerUp = (event: PointerEvent<HTMLButtonElement>, midi: number) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    onRelease(midi);
  };
  const keyProps = (midi: number) => ({
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => onPointerDown(event, midi),
    onPointerUp: (event: PointerEvent<HTMLButtonElement>) => onPointerUp(event, midi),
    onPointerCancel: (event: PointerEvent<HTMLButtonElement>) => onPointerUp(event, midi),
    onLostPointerCapture: () => onRelease(midi),
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => handleKeyDown(event, midi),
    onKeyUp: (event: KeyboardEvent<HTMLButtonElement>) => handleKeyUp(event, midi),
    onBlur: () => onRelease(midi),
  });
  return <div className={styles["jp-scales__keyboard"]} role="group" aria-label="Virtual harmonium keyboard">
    {notes.filter((midi) => !BLACK_PITCHES.has(pitchClass(midi))).map((midi) => {
      const pc = pitchClass(midi);
      const active = activeNotes.has(midi);
      return <button key={midi} type="button" className={`${styles["jp-scales__white-key"]} ${selectedPitches.has(pc) ? styles["is-in-scale"] : ""} ${pc === root ? styles["is-root"] : ""} ${active ? styles["is-active"] : ""}`} aria-label={`Play ${noteName(midi)}`} aria-pressed={active} {...keyProps(midi)}><span className={styles["jp-scales__key-note"]}>{NAMES[pc]}</span>{pc === root && <span className={styles["jp-scales__key-root"]}>Sa</span>}</button>;
    })}
    <div className={styles["jp-scales__black-layer"]}>{notes.filter((midi) => BLACK_PITCHES.has(pitchClass(midi))).map((midi) => {
      const pc = pitchClass(midi);
      const whiteBefore = notes.filter((note) => note < midi && !BLACK_PITCHES.has(pitchClass(note))).length;
      const active = activeNotes.has(midi);
      return <button key={midi} type="button" style={{ left: `calc(${whiteBefore} * (100% / 15) - (100% / 15 * 0.31))` }} className={`${styles["jp-scales__black-key"]} ${selectedPitches.has(pc) ? styles["is-in-scale"] : ""} ${pc === root ? styles["is-root"] : ""} ${active ? styles["is-active"] : ""}`} aria-label={`Play ${noteName(midi)}`} aria-pressed={active} {...keyProps(midi)}><span>{NAMES[pc]}</span></button>;
    })}</div>
  </div>;
}
