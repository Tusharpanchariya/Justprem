import type { Compressor, Sampler, Volume } from "tone";
import * as Tone from "tone";
import { getSampleSet, MissingHarmoniumSamplesError, type ReedConfiguration } from "./HarmoniumSampleManager";

const NOTE_SEMITONES: Record<string, number> = { C: 0, "C#": 1, Cs: 1, D: 2, "D#": 3, Ds: 3, E: 4, F: 5, "F#": 6, Fs: 6, G: 7, "G#": 8, Gs: 8, A: 9, "A#": 10, As: 10, B: 11 };
function sampleMidi(note: string) {
  const match = /^(C#|D#|F#|G#|A#|Cs|Ds|Fs|Gs|As|[A-G])(-?\d+)$/.exec(note);
  return match ? (Number(match[2]) + 1) * 12 + NOTE_SEMITONES[match[1]] : null;
}

/** Lazily created Tone.js sampler; audio is always sourced from the configured recordings. */
export class HarmoniumAudioEngine {
  private sampler: Sampler | null = null;
  private volumeNode: Volume | null = null;
  private compressor: Compressor | null = null;
  private configuration: ReedConfiguration | null = null;
  private loading: Promise<void> | null = null;
  private disposed = false;
  private readonly activeNotes = new Set<string>();

  get isDisposed() { return this.disposed; }

  async load(configuration: ReedConfiguration, onLoad?: () => void, onError?: (error: Error) => void) {
    if (this.disposed) throw new Error("Audio player has been stopped.");
    const sampleSet = getSampleSet(configuration);
    if (!Object.keys(sampleSet.samples).length) throw new MissingHarmoniumSamplesError(configuration);
    if (this.sampler && this.configuration === configuration) return;
    if (this.loading) await this.loading;
    if (this.sampler && this.configuration === configuration) return;

    this.loading = (async () => {
      await Tone.start();
      const sampler = await new Promise<Sampler>((resolve, reject) => {
        const candidateRef: { current: Sampler | null } = { current: null };
        const candidate = new Tone.Sampler({
          urls: { ...sampleSet.samples },
          attack: 0.025,
          release: 0.22,
          onload: () => { onLoad?.(); resolve(candidateRef.current!); },
          onerror: (error) => { onError?.(error); candidateRef.current?.dispose(); reject(error); },
        });
        candidateRef.current = candidate;
      });
      if (this.disposed) {
        sampler.dispose();
        throw new Error("Audio player was closed while samples were loading.");
      }
      const volume = new Tone.Volume(-8);
      const compressor = new Tone.Compressor({ threshold: -8, ratio: 3, attack: 0.01, release: 0.18 });
      sampler.connect(volume);
      volume.connect(compressor);
      compressor.toDestination();
      this.sampler?.dispose();
      this.volumeNode?.dispose();
      this.compressor?.dispose();
      this.sampler = sampler;
      this.volumeNode = volume;
      this.compressor = compressor;
      this.configuration = configuration;
    })();
    try {
      await this.loading;
    } finally {
      this.loading = null;
    }
  }

  setVolume(decibels: number) {
    if (this.volumeNode) this.volumeNode.volume.value = decibels;
  }

  attack(note: string, velocity = 0.8) {
    if (!this.sampler) return false;
    const target = sampleMidi(note);
    const mappedNotes = this.configuration ? Object.keys(getSampleSet(this.configuration).samples).map(sampleMidi).filter((value): value is number => value !== null) : [];
    if (target !== null && mappedNotes.length && Math.min(...mappedNotes.map((mapped) => Math.abs(mapped - target))) > 5) {
      throw new Error(`No nearby recording is mapped for ${note}; add a sample zone within five semitones.`);
    }
    this.sampler.triggerAttack(note, undefined, velocity);
    this.activeNotes.add(note);
    return true;
  }

  release(note: string) {
    if (!this.sampler || !this.activeNotes.has(note)) return;
    this.sampler.triggerRelease(note);
    this.activeNotes.delete(note);
  }

  stop() {
    for (const note of this.activeNotes) this.sampler?.triggerRelease(note);
    this.activeNotes.clear();
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    this.sampler?.dispose();
    this.volumeNode?.dispose();
    this.compressor?.dispose();
    this.sampler = null;
    this.volumeNode = null;
    this.compressor = null;
  }
}
