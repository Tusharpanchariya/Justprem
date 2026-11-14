"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import styles from "./HarmoniumScalesLibrary.module.css";

const BLACK_PITCHES = new Set([1, 3, 6, 8, 10]);
const NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const pitchClass = (midi: number) => ((midi % 12) + 12) % 12;
const noteName = (midi: number) => `${NAMES[pitchClass(midi)]}${Math.floor(midi / 12) - 1}`;

export type SwaraKind = "sa" | "shuddha" | "komal" | "tivra";

export type SwaraData = {
  interval: number;
  token: string;
  name: string;
  kind: SwaraKind;
  full: string;
  devanagari: string;
  role: string;
};

export const SWARA_DATA: readonly SwaraData[] = [
  { interval: 0, token: "Sa", name: "Sa", kind: "sa", full: "Sa (ṣaḍja)", devanagari: "षड्ज", role: "Tonic / Home Note" },
  { interval: 1, token: "re", name: "Komal Re", kind: "komal", full: "Komal Re (ṛṣabha)", devanagari: "कोमल ऋषभ", role: "Flat 2nd" },
  { interval: 2, token: "Re", name: "Shuddha Re", kind: "shuddha", full: "Shuddha Re (ṛṣabha)", devanagari: "शुद्ध ऋषभ", role: "Natural 2nd" },
  { interval: 3, token: "ga", name: "Komal Ga", kind: "komal", full: "Komal Ga (gāndhāra)", devanagari: "कोमल गान्धार", role: "Flat 3rd" },
  { interval: 4, token: "Ga", name: "Shuddha Ga", kind: "shuddha", full: "Shuddha Ga (gāndhāra)", devanagari: "शुद्ध गान्धार", role: "Natural 3rd" },
  { interval: 5, token: "Ma", name: "Shuddha Ma", kind: "shuddha", full: "Shuddha Ma (madhyama)", devanagari: "शुद्ध मध्यम", role: "Natural 4th" },
  { interval: 6, token: "Ma′", name: "Tīvra Ma", kind: "tivra", full: "Tīvra Ma (madhyama)", devanagari: "तीव्र मध्यम", role: "Sharp 4th" },
  { interval: 7, token: "Pa", name: "Pa", kind: "shuddha", full: "Pa (pañchama)", devanagari: "पञ्चम", role: "Pure 5th" },
  { interval: 8, token: "dha", name: "Komal Dha", kind: "komal", full: "Komal Dha (dhaivata)", devanagari: "कोमल धैवत", role: "Flat 6th" },
  { interval: 9, token: "Dha", name: "Shuddha Dha", kind: "shuddha", full: "Shuddha Dha (dhaivata)", devanagari: "शुद्ध धैवत", role: "Natural 6th" },
  { interval: 10, token: "ni", name: "Komal Ni", kind: "komal", full: "Komal Ni (niṣāda)", devanagari: "कोमल निषाद", role: "Flat 7th" },
  { interval: 11, token: "Ni", name: "Shuddha Ni", kind: "shuddha", full: "Shuddha Ni (niṣāda)", devanagari: "शुद्ध निषाद", role: "Natural 7th" },
] as const;

export type KeyboardDisplayMode = "both" | "swaras" | "notes";

type Props = {
  octave: number;
  root: number;
  rootLabel?: string;
  rootMidi?: number;
  selectedPitches: ReadonlySet<number>;
  selectedNotes?: ReadonlySet<number>;
  showSwaras?: boolean;
  displayMode?: KeyboardDisplayMode;
  activeNotes: ReadonlySet<number>;
  onAttack: (midi: number) => void;
  onRelease: (midi: number) => void;
};

export function HarmoniumKeyboard({
  octave,
  root,
  rootLabel = "Sa",
  rootMidi,
  selectedPitches,
  selectedNotes,
  showSwaras = true,
  displayMode = "both",
  activeNotes,
  onAttack,
  onRelease,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const notes = Array.from({ length: 25 }, (_, index) => 60 + (octave - 4) * 12 + index);
  const baseRootMidi = 60 + (octave - 4) * 12 + root;

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
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
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

  const scrollByAmount = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollToRoot = () => {
    if (!scrollRef.current) return;
    const targetKey = scrollRef.current.querySelector<HTMLElement>('[data-is-root="true"]');
    if (targetKey) {
      const containerRect = scrollRef.current.getBoundingClientRect();
      const keyRect = targetKey.getBoundingClientRect();
      const scrollPos =
        scrollRef.current.scrollLeft +
        (keyRect.left - containerRect.left) -
        containerRect.width / 2 +
        keyRect.width / 2;
      scrollRef.current.scrollTo({ left: Math.max(0, scrollPos), behavior: "smooth" });
    }
  };

  return (
    <div className={styles["jp-keyboard-wrapper"]}>
      {/* Mobile Scroll Assistant Bar */}
      <div className={styles["jp-keyboard-nav-mobile"]}>
        <button
          type="button"
          onClick={() => scrollByAmount(-220)}
          className={styles["jp-keyboard-nav-btn"]}
          aria-label="Scroll to lower notes"
        >
          ← Lower Octave
        </button>
        <button
          type="button"
          onClick={scrollToRoot}
          className={`${styles["jp-keyboard-nav-btn"]} ${styles["jp-keyboard-nav-btn--sa"]}`}
          aria-label="Center on Sa key"
        >
          🎯 Focus on Sa ({NAMES[root]})
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(220)}
          className={styles["jp-keyboard-nav-btn"]}
          aria-label="Scroll to higher notes"
        >
          Higher Octave →
        </button>
      </div>

      {/* Main Harmonium Chassis & Key Bed */}
      <div className={styles["jp-harmonium-chassis"]} ref={scrollRef}>
        {/* Authentic Harmonium Red Velvet Felt Damper Strip */}
        <div className={styles["jp-harmonium-felt"]} aria-hidden="true">
          <div className={styles["jp-harmonium-felt-texture"]} />
        </div>

        {/* Keyboard Surface */}
        <div className={styles["jp-scales__keyboard"]} role="group" aria-label="Interactive 25-key Harmonium Keyboard">
          {/* White Keys Layer */}
          {notes
            .filter((midi) => !BLACK_PITCHES.has(pitchClass(midi)))
            .map((midi) => {
              const pc = pitchClass(midi);
              const active = activeNotes.has(midi);
              const selected = selectedNotes ? selectedNotes.has(midi) : selectedPitches.has(pc);
              const isRoot = rootMidi === undefined ? pc === root : midi === rootMidi;
              const isHigherSa = isRoot && midi > baseRootMidi;
              const interval = (pc - root + 12) % 12;
              const swara = SWARA_DATA[interval];
              const token = isHigherSa ? "Sa′" : isRoot ? rootLabel : swara.token;
              const swaraKind = isRoot ? "sa" : swara.kind;

              return (
                <button
                  key={midi}
                  type="button"
                  data-is-root={isRoot ? "true" : undefined}
                  className={`
                    ${styles["jp-scales__white-key"]}
                    ${selected ? styles["is-in-scale"] : styles["is-out-of-scale"]}
                    ${selected ? styles[`jp-swara-bg--${swaraKind}`] : ""}
                    ${isRoot ? styles["is-root"] : ""}
                    ${active ? styles["is-active"] : ""}
                  `}
                  aria-label={`Play ${noteName(midi)}${selected ? ` · ${isHigherSa ? "Higher Sa (Taar Shadja)" : swara.full}` : ""}`}
                  aria-pressed={active}
                  {...keyProps(midi)}
                >
                  <div className={styles["jp-key-badge-container"]}>
                    {/* Swara Badge */}
                    {selected && showSwaras && displayMode !== "notes" && (
                      <span
                        className={`
                          ${styles["jp-swara-badge"]}
                          ${styles[`jp-swara-badge--${swaraKind}`]}
                        `}
                      >
                        {token}
                      </span>
                    )}

                    {/* Western Note Name */}
                    {displayMode !== "swaras" && (
                      <span
                        className={`
                          ${styles["jp-scales__key-note"]}
                          ${selected ? styles["jp-scales__key-note--selected"] : styles["jp-scales__key-note--muted"]}
                        `}
                      >
                        {NAMES[pc]}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

          {/* Black Keys Layer */}
          <div className={styles["jp-scales__black-layer"]}>
            {notes
              .filter((midi) => BLACK_PITCHES.has(pitchClass(midi)))
              .map((midi) => {
                const pc = pitchClass(midi);
                const whiteBefore = notes.filter((note) => note < midi && !BLACK_PITCHES.has(pitchClass(note))).length;
                const active = activeNotes.has(midi);
                const selected = selectedNotes ? selectedNotes.has(midi) : selectedPitches.has(pc);
                const isRoot = rootMidi === undefined ? pc === root : midi === rootMidi;
                const isHigherSa = isRoot && midi > baseRootMidi;
                const interval = (pc - root + 12) % 12;
                const swara = SWARA_DATA[interval];
                const token = isHigherSa ? "Sa′" : isRoot ? rootLabel : swara.token;
                const swaraKind = isRoot ? "sa" : swara.kind;

                return (
                  <button
                    key={midi}
                    type="button"
                    data-is-root={isRoot ? "true" : undefined}
                    style={{ left: `calc(${whiteBefore} * (100% / 15) - (100% / 15 * 0.31))` }}
                    className={`
                      ${styles["jp-scales__black-key"]}
                      ${selected ? styles["is-in-scale"] : styles["is-out-of-scale"]}
                      ${selected ? styles[`jp-swara-bg--${swaraKind}`] : ""}
                      ${isRoot ? styles["is-root"] : ""}
                      ${active ? styles["is-active"] : ""}
                    `}
                    aria-label={`Play ${noteName(midi)}${selected ? ` · ${isHigherSa ? "Higher Sa (Taar Shadja)" : swara.full}` : ""}`}
                    aria-pressed={active}
                    {...keyProps(midi)}
                  >
                    <div className={styles["jp-key-badge-container"]}>
                      {/* Swara Badge */}
                      {selected && showSwaras && displayMode !== "notes" && (
                        <span
                          className={`
                            ${styles["jp-swara-badge"]}
                            ${styles["jp-swara-badge--black"]}
                            ${styles[`jp-swara-badge--${swaraKind}`]}
                          `}
                        >
                          {token}
                        </span>
                      )}

                      {/* Western Note Name */}
                      {displayMode !== "swaras" && (
                        <span
                          className={`
                            ${styles["jp-scales__key-note"]}
                            ${styles["jp-scales__key-note--black"]}
                            ${selected ? styles["jp-scales__key-note--selected"] : styles["jp-scales__key-note--muted"]}
                          `}
                        >
                          {NAMES[pc]}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Lower Octave Label Bar */}
        <div className={styles["jp-harmonium-octaves"]} aria-hidden="true">
          <div className={styles["jp-harmonium-octave-zone"]}>
            <span>Mandra Saptak (Lower Octave)</span>
          </div>
          <div className={styles["jp-harmonium-octave-zone"]}>
            <span>Madhya Saptak (Middle Octave)</span>
          </div>
          <div className={styles["jp-harmonium-octave-zone-end"]}>
            <span>Taar Sa (High)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
