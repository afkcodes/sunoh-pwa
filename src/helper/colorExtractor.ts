type RGB = [number, number, number];
type HexColor = string;

interface ColorPalette {
  dominantColors: HexColor[];
  textColor: HexColor;
}

export function getDominantColorPalette(
  imageUrl: string,
  paletteSize: number = 5
): Promise<ColorPalette> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Resize image for faster processing
      const maxSize = 100;
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      const colorMap = new Map<string, number>();
      for (let i = 0; i < pixels.length; i += 4) {
        // Quantize colors for faster clustering
        const r = Math.floor(pixels[i] / 16) * 16;
        const g = Math.floor(pixels[i + 1] / 16) * 16;
        const b = Math.floor(pixels[i + 2] / 16) * 16;
        const rgb = `${r},${g},${b}`;
        colorMap.set(rgb, (colorMap.get(rgb) || 0) + 1);
      }

      const sortedColors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([color, count]) => ({
          rgb: color.split(',').map(Number) as RGB,
          count,
        }));

      // Always include the most dominant color
      const dominantColors: RGB[] = [sortedColors[0].rgb];
      const minDistance = 75; // Minimum distance between colors

      for (let i = 1; i < sortedColors.length; i++) {
        if (isDistinctColor(sortedColors[i].rgb, dominantColors, minDistance)) {
          dominantColors.push(sortedColors[i].rgb);
        }
        if (dominantColors.length === paletteSize) break;
      }

      const palette = dominantColors.map((rgb) => rgbToHex(...rgb));
      const textColor = getTextColor(dominantColors[0]);

      resolve({ dominantColors: palette, textColor });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}

function isDistinctColor(
  color: RGB,
  existingColors: RGB[],
  minDistance: number
): boolean {
  return existingColors.every(
    (existing) => getColorDistance(color, existing) > minDistance
  );
}

function getColorDistance(color1: RGB, color2: RGB): number {
  const [l1, a1, b1] = rgbToLab(color1);
  const [l2, a2, b2] = rgbToLab(color2);
  return Math.sqrt((l2 - l1) ** 2 + (a2 - a1) ** 2 + (b2 - b1) ** 2);
}

function rgbToLab(rgb: RGB): [number, number, number] {
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255;
  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const l = y > 0.008856 ? 116 * y ** (1 / 3) - 16 : 903.3 * y;
  const a = 500 * (x ** (1 / 3) - y ** (1 / 3));
  const b_val = 200 * (y ** (1 / 3) - z ** (1 / 3));
  return [l, a, b_val];
}

function rgbToHex(r: number, g: number, b: number): HexColor {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function getTextColor(rgb: RGB): HexColor {
  // Calculate the perceived brightness of the background color
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

  // Choose white or black based on the brightness
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
