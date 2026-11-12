"use client";

import styles from "./HarmoniumScalesLibrary.module.css";
import { HARMONIUM_SAMPLE_SETS, type ReedConfiguration } from "./HarmoniumSampleManager";

type Props = { configuration: ReedConfiguration; onConfigurationChange: (value: ReedConfiguration) => void; volume: number; onVolumeChange: (value: number) => void; loading: boolean; status: string; onStop: () => void };
export function HarmoniumControls({ configuration, onConfigurationChange, volume, onVolumeChange, loading, status, onStop }: Props) {
  return <div className={styles["jp-scales__controls"]}>
    <label className={styles["jp-scales__field"]}><span>Sound set</span><select value={configuration} disabled={loading} onChange={(event) => onConfigurationChange(event.target.value as ReedConfiguration)}>{HARMONIUM_SAMPLE_SETS.map((set) => { const available = Object.keys(set.samples).length > 0; return <option key={set.id} value={set.id} disabled={!available}>{set.label} · {available ? "samples ready" : "samples needed"}</option>; })}</select></label>
    <label className={styles["jp-scales__field"]}><span>Volume · {volume}%</span><input type="range" min="0" max="100" value={volume} onChange={(event) => onVolumeChange(Number(event.target.value))} /></label>
    <button type="button" className={styles["jp-scales__button"]} onClick={onStop} disabled={loading}>Stop notes</button>
    <p className={styles["jp-scales__status"]} aria-live="polite">{loading ? "Loading licensed harmonium recordings…" : status}</p>
  </div>;
}
