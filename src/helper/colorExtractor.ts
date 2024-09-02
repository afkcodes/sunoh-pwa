import { LRUCache } from './Cache';

const colorCache = new LRUCache<string, string>(50);

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface Lab {
  l: number;
  a: number;
  b: number;
}

// Pre-compute the RGB to Lab conversion table
const rgbToLabTable: Lab[][][] = Array(32)
  .fill(0)
  .map(() =>
    Array(32)
      .fill(0)
      .map(() =>
        Array(32)
          .fill(0)
          .map(() => ({ l: 0, a: 0, b: 0 }))
      )
  );

for (let r = 0; r < 32; r++) {
  for (let g = 0; g < 32; g++) {
    for (let b = 0; b < 32; b++) {
      rgbToLabTable[r][g][b] = rgbToLab(r * 8, g * 8, b * 8);
    }
  }
}

function rgbToLab(r: number, g: number, b: number): Lab {
  r /= 255;
  g /= 255;
  b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  return { l: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
}

function labDistance(lab1: Lab, lab2: Lab): number {
  const dl = lab1.l - lab2.l,
    da = lab1.a - lab2.a,
    db = lab1.b - lab2.b;
  return dl * dl + da * da + db * db; // Squared distance for faster computation
}

function kMeansPlusPlus(colors: Lab[], k: number, maxIterations: number = 10): Lab[] {
  const centroids: Lab[] = [colors[Math.floor(Math.random() * colors.length)]];

  for (let i = 1; i < k; i++) {
    const distances = colors.map((color) =>
      Math.min(...centroids.map((centroid) => labDistance(color, centroid)))
    );
    const sum = distances.reduce((a, b) => a + b, 0);
    let rand = Math.random() * sum;
    let index = 0;
    while (rand > 0) {
      rand -= distances[index];
      index++;
    }
    centroids.push(colors[index - 1]);
  }

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const clusters: Lab[][] = Array.from({ length: k }, () => []);

    for (const color of colors) {
      let minDistance = Infinity;
      let nearestCentroidIndex = 0;

      for (let i = 0; i < k; i++) {
        const distance = labDistance(color, centroids[i]);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCentroidIndex = i;
        }
      }

      clusters[nearestCentroidIndex].push(color);
    }

    let changed = false;
    for (let i = 0; i < k; i++) {
      if (clusters[i].length > 0) {
        const newCentroid = {
          l: clusters[i].reduce((sum, c) => sum + c.l, 0) / clusters[i].length,
          a: clusters[i].reduce((sum, c) => sum + c.a, 0) / clusters[i].length,
          b: clusters[i].reduce((sum, c) => sum + c.b, 0) / clusters[i].length,
        };
        if (labDistance(newCentroid, centroids[i]) > 0.1) {
          centroids[i] = newCentroid;
          changed = true;
        }
      }
    }

    if (!changed) break;
  }

  return centroids;
}

function labToRgb(lab: Lab): RGB {
  let y = (lab.l + 16) / 116;
  let x = lab.a / 500 + y;
  let z = y - lab.b / 200;

  x = 0.95047 * (x * x * x > 0.008856 ? x * x * x : (x - 16 / 116) / 7.787);
  y = 1.0 * (y * y * y > 0.008856 ? y * y * y : (y - 16 / 116) / 7.787);
  z = 1.08883 * (z * z * z > 0.008856 ? z * z * z : (z - 16 / 116) / 7.787);

  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.204 + z * 1.057;

  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  return {
    r: Math.max(0, Math.min(255, Math.round(r * 255))),
    g: Math.max(0, Math.min(255, Math.round(g * 255))),
    b: Math.max(0, Math.min(255, Math.round(b * 255))),
  };
}

export function getDominantColor(imageSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cachedColor = colorCache.get(imageSrc);
    if (cachedColor) {
      resolve(cachedColor);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const size = Math.min(50, img.width, img.height); // Reduced size for faster processing
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;

      const colors: Lab[] = [];
      const colorCounts = new Map<number, number>();

      for (let i = 0; i < data.length; i += 16) {
        // Sample every 4th pixel for speed
        const r = data[i] >> 3;
        const g = data[i + 1] >> 3;
        const b = data[i + 2] >> 3;
        const a = data[i + 3];

        if (a < 128) continue;

        const lab = rgbToLabTable[r][g][b];
        colors.push(lab);

        const key = (r << 10) | (g << 5) | b;
        colorCounts.set(key, (colorCounts.get(key) || 0) + 1);
      }

      const k = 5;
      const centroids = kMeansPlusPlus(colors, k);

      let dominantCentroid: Lab | null = null;
      let maxCount = 0;

      for (const centroid of centroids) {
        let count = 0;
        for (const [key, colorCount] of colorCounts) {
          const r = (key >> 10) & 31;
          const g = (key >> 5) & 31;
          const b = key & 31;
          const lab = rgbToLabTable[r][g][b];
          if (labDistance(centroid, lab) < 400) {
            // Increased threshold for faster computation
            count += colorCount;
          }
        }
        if (count > maxCount) {
          maxCount = count;
          dominantCentroid = centroid;
        }
      }

      if (!dominantCentroid) {
        resolve('mixed');
        return;
      }

      const { r, g, b } = labToRgb(dominantCentroid);
      const dominantColor = `${r},${g},${b}`;

      colorCache.set(imageSrc, dominantColor);
      resolve(dominantColor);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = `https://proxy.ashish-kmr.workers.dev/?url=${imageSrc}`;
  });
}
