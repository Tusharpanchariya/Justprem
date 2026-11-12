export type ReedConfiguration = "recorded" | "single-reed" | "double-reed" | "triple-reed" | "bass" | "treble";

export type HarmoniumSampleSet = {
  id: ReedConfiguration;
  label: string;
  /** Map scientific-pitch note names (for example C3) to verified public asset URLs. */
  samples: Readonly<Record<string, string>>;
};

const RECORDED_NOTE_FILES = [
  "A2", "A3", "A4", "As2", "As3", "As4", "B2", "B3", "B4",
  "C2", "C3", "C4", "C5", "Cs2", "Cs3", "Cs4", "Cs5",
  "D2", "D3", "D4", "D5", "Ds2", "Ds3", "Ds4", "E2", "E3", "E4",
  "F2", "F3", "F4", "Fs2", "Fs3", "G2", "G3", "G4", "Gs2", "Gs3", "Gs4",
];
const recordedHarmoniumSamples = Object.fromEntries(RECORDED_NOTE_FILES.map((fileNote) => {
  const toneNote = fileNote.replace("s", "#");
  return [toneNote, `/sounds/harmonium/recorded/${fileNote}.mp3`];
}));

// This is a generic recorded harmonium set; its source does not identify reed count or register.
export const HARMONIUM_SAMPLE_SETS: readonly HarmoniumSampleSet[] = [
  { id: "recorded", label: "Recorded harmonium", samples: recordedHarmoniumSamples },
  { id: "single-reed", label: "Single reed", samples: {} },
  { id: "double-reed", label: "Double reed", samples: {} },
  { id: "triple-reed", label: "Triple reed", samples: {} },
  { id: "bass", label: "Bass harmonium", samples: {} },
  { id: "treble", label: "Treble harmonium", samples: {} },
];

export class MissingHarmoniumSamplesError extends Error {
  constructor(readonly configuration: ReedConfiguration) {
    super(`No licensed harmonium recordings are configured for ${configuration}.`);
    this.name = "MissingHarmoniumSamplesError";
  }
}

export function getSampleSet(configuration: ReedConfiguration) {
  return HARMONIUM_SAMPLE_SETS.find((sampleSet) => sampleSet.id === configuration)!;
}

export function getMissingSampleSets() {
  return HARMONIUM_SAMPLE_SETS.filter((sampleSet) => Object.keys(sampleSet.samples).length === 0);
}
