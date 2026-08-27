export class HarmoniumSynth {
  private ctx: AudioContext | null = null;
  private activeNotes: Map<number, { oscs: OscillatorNode[], gain: GainNode }> = new Map();

  // Initialize the audio context on first user interaction
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Calculate frequency based on key index (assuming 0 is C3)
  private getFrequency(keyIndex: number): number {
    const rootFrequency = 130.81; // C3
    return rootFrequency * Math.pow(2, keyIndex / 12);
  }

  playNote(keyId: number) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    this.stopNote(keyId);
    const freq = this.getFrequency(keyId);

    // Master ADSR Envelope for this note
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.15); // Slower attack for harmonium
    
    // Lowpass Filter to make the sound "sweeter" and less harsh
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1500; // Roll off harsh highs
    filter.Q.value = 1;
    
    masterGain.connect(filter);
    filter.connect(this.ctx.destination);

    // Tremolo (Amplitude Modulation) to simulate air pumping
    const lfo = this.ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 3.5; // 3.5 Hz wobble
    
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.15; // Depth of tremolo
    lfo.connect(lfoGain.gain);
    lfo.start();

    // Osc 1 (Sawtooth - Main Reed)
    const osc1 = this.ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.value = freq;
    
    // Osc 2 (Sawtooth Detuned - Chorus/Thickening)
    const osc2 = this.ctx.createOscillator();
    osc2.type = "sawtooth";
    osc2.frequency.value = freq * 1.004;
    
    // Osc 3 (Triangle - Adds warm body/fundamental without harshness)
    const osc3 = this.ctx.createOscillator();
    osc3.type = "triangle";
    osc3.frequency.value = freq * 0.5; // Sub octave

    // Mix and apply tremolo
    const mixer = this.ctx.createGain();
    mixer.gain.value = 0.7; // Headroom
    
    // Connect oscillators to mixer
    osc1.connect(mixer);
    osc2.connect(mixer);
    osc3.connect(mixer);
    
    // Connect mixer to master envelope, while modulating gain with LFO
    mixer.connect(masterGain);
    
    osc1.start();
    osc2.start();
    osc3.start();

    this.activeNotes.set(keyId, { oscs: [osc1, osc2, osc3, lfo], gain: masterGain });
  }

  stopNote(keyId: number) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const note = this.activeNotes.get(keyId);
    
    if (note) {
      // Release envelope
      note.gain.gain.setValueAtTime(note.gain.gain.value, ctx.currentTime);
      note.gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      // Stop oscillators after release
      note.oscs.forEach(osc => {
        osc.stop(ctx.currentTime + 0.3);
      });
      
      this.activeNotes.delete(keyId);
    }
  }
}

// Singleton instance
export const harmoniumSynth = typeof window !== 'undefined' ? new HarmoniumSynth() : null;
