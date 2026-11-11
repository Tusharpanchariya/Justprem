"use client";

import { useEffect, useState } from "react";

export const AURA_MINI_FINISHES = [
  { name: "#70291D", hex: "#70291D" },
  { name: "#65366F", hex: "#65366F" },
  { name: "#C49A3A", hex: "#C49A3A" },
  { name: "#8A503B", hex: "#8A503B" },
  { name: "#D5B875", hex: "#D5B875" },
  { name: "#60432F", hex: "#60432F" },
  { name: "#8B5A35", hex: "#8B5A35" },
  { name: "#A9784F", hex: "#A9784F" },
  { name: "#2F1C0E", hex: "#2F1C0E" },
  { name: "#8E5C2F", hex: "#8E5C2F" },
  { name: "#F2CFA0", hex: "#F2CFA0" },
  { name: "#633A78", hex: "#633A78" },
  { name: "#3B174D", hex: "#3B174D" },
];

function hslFromHex(hex: string) {
  const red = parseInt(hex.slice(1, 3), 16) / 255;
  const green = parseInt(hex.slice(3, 5), 16) / 255;
  const blue = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;
  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue = (hue * 60 + 360) % 360;
  }

  return { hue, saturation, lightness };
}

function recolorBody(source: HTMLImageElement, hex: string) {
  const { hue, saturation, lightness: targetLightness } = hslFromHex(hex);
  const canvas = document.createElement("canvas");
  canvas.width = source.naturalWidth;
  canvas.height = source.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return source.src;

  context.drawImage(source, 0, 0);
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = image.data;
  for (let index = 0; index < pixels.length; index += 4) {
    const red = pixels[index] / 255;
    const green = pixels[index + 1] / 255;
    const blue = pixels[index + 2] / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    const lightness = (max + min) / 2;
    const originalSaturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
    let originalHue = 0;

    if (delta !== 0) {
      if (max === red) originalHue = ((green - blue) / delta) % 6;
      else if (max === green) originalHue = (blue - red) / delta + 2;
      else originalHue = (red - green) / delta + 4;
      originalHue = (originalHue * 60 + 360) % 360;
    }
    // Recolor lavender/purple wood only, keeping the background, keys and metalwork intact.
    if (originalSaturation < 0.035 || originalHue < 220 || originalHue > 320) continue;

    // Match the selected swatch's lightness, keeping only a small amount of the
    // source image's tonal variation so wood grain and shadows remain visible.
    const previewLightness = Math.min(0.96, Math.max(0.035, targetLightness + (lightness - 0.66) * 0.32));
    const chroma = (1 - Math.abs(2 * previewLightness - 1)) * saturation;
    const section = hue / 60;
    const secondary = chroma * (1 - Math.abs((section % 2) - 1));
    let [nextRed, nextGreen, nextBlue] = [0, 0, 0];
    if (section < 1) [nextRed, nextGreen, nextBlue] = [chroma, secondary, 0];
    else if (section < 2) [nextRed, nextGreen, nextBlue] = [secondary, chroma, 0];
    else if (section < 3) [nextRed, nextGreen, nextBlue] = [0, chroma, secondary];
    else if (section < 4) [nextRed, nextGreen, nextBlue] = [0, secondary, chroma];
    else if (section < 5) [nextRed, nextGreen, nextBlue] = [secondary, 0, chroma];
    else [nextRed, nextGreen, nextBlue] = [chroma, 0, secondary];

    const offset = previewLightness - chroma / 2;
    pixels[index] = Math.round((nextRed + offset) * 255);
    pixels[index + 1] = Math.round((nextGreen + offset) * 255);
    pixels[index + 2] = Math.round((nextBlue + offset) * 255);
  }

  context.putImageData(image, 0, 0);
  return canvas.toDataURL("image/webp", 0.92);
}

export function AuraFinishPreview({ src, finish }: { src: string; finish: (typeof AURA_MINI_FINISHES)[number] }) {
  const [previewSrc, setPreviewSrc] = useState(src);

  useEffect(() => {
    let current = true;
    const image = new window.Image();
    image.onload = () => {
      if (current) setPreviewSrc(recolorBody(image, finish.hex));
    };
    image.onerror = () => {
      if (current) setPreviewSrc(src);
    };
    image.src = src;
    return () => { current = false; };
  }, [src, finish]);

  return <img src={previewSrc} alt="Aura Mini harmonium colour preview" className="block h-auto w-full object-contain object-center transition-opacity duration-300 lg:max-h-[calc(100vh-9rem)]" />;
}
