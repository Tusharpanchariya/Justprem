"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from "lucide-react";

export function TanpuraAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [pitch, setPitch] = useState<"C" | "C#" | "D">("C");
  const [volume, setVolume] = useState(0.5);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Base frequencies for Sa (root) and Pa (5th)
  const pitchFrequencies = {
    C: { sa: 130.81, pa: 196.0, saHigh: 261.63 },
    "C#": { sa: 138.59, pa: 207.65, saHigh: 277.18 },
    D: { sa: 146.83, pa: 220.0, saHigh: 293.66 },
  };

  const stopDrone = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // already stopped
      }
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  const startDrone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Stop existing oscillators if any
      stopDrone();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const freqs = pitchFrequencies[pitch];

      // Create Tanpura string harmonics: Pa, Sa High, Sa High, Sa Low
      const stringTuning = [
        { freq: freqs.pa, detune: -2, type: "triangle" as OscillatorType, vol: 0.8 },
        { freq: freqs.saHigh, detune: 0, type: "sawtooth" as OscillatorType, vol: 0.5 },
        { freq: freqs.saHigh, detune: 3, type: "sine" as OscillatorType, vol: 0.6 },
        { freq: freqs.sa, detune: 0, type: "triangle" as OscillatorType, vol: 1.0 },
      ];

      const newOscs: OscillatorNode[] = [];

      stringTuning.forEach((str) => {
        const osc = ctx.createOscillator();
        const strGain = ctx.createGain();
        osc.type = str.type;
        osc.frequency.setValueAtTime(str.freq, ctx.currentTime);
        osc.detune.setValueAtTime(str.detune, ctx.currentTime);

        strGain.gain.setValueAtTime(str.vol, ctx.currentTime);
        osc.connect(strGain);
        strGain.connect(masterGain);

        osc.start();
        newOscs.push(osc);
      });

      oscillatorsRef.current = newOscs;
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio Drone Error", err);
    }
  };

  const toggleDrone = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Restart drone when pitch changes if currently playing
  useEffect(() => {
    if (isPlaying) {
      startDrone();
    }
  }, [pitch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDrone();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="border border-charcoal/15 bg-white/70 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#567262]/10 text-[#567262] flex items-center justify-center shrink-0">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#ad684d] font-semibold">
                INTERACTIVE PRACTICE TOOL
              </span>
              <span className="text-[10px] uppercase px-1.5 py-0.5 bg-[#567262]/10 text-[#567262] rounded font-medium">
                Live Acoustic Drone
              </span>
            </div>
            <h4 className="font-serif text-lg text-charcoal font-medium">
              Vocal Pitch Matching Drone ({pitch} Sa)
            </h4>
          </div>
        </div>

        {/* Pitch selector & controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#f4efe5] p-1 rounded border border-charcoal/10 text-xs">
            <span className="text-[10px] uppercase text-charcoal/60 px-1 font-medium">Pitch:</span>
            {(["C", "C#", "D"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPitch(p)}
                className={`px-2 py-1 text-xs font-mono font-medium rounded transition-colors ${
                  pitch === p ? "bg-[#567262] text-ivory" : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleDrone}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-medium rounded transition-all ${
              isPlaying
                ? "bg-[#ad684d] text-ivory hover:bg-[#8e5239]"
                : "bg-[#567262] text-ivory hover:bg-forest"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                Stop Drone
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Play Drone
              </>
            )}
          </button>
        </div>
      </div>

      {isPlaying && (
        <div className="mt-4 pt-3 border-t border-charcoal/10 flex items-center justify-between text-xs text-charcoal/70 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#567262] animate-pulse" />
            <span className="font-serif italic">
              Drone active on {pitch} Sa · Close your eyes and sing a gentle &ldquo;Aaaah&rdquo; in unison
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-charcoal/50" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-[#567262] cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
