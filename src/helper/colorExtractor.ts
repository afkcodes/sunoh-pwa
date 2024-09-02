type RGB = [number, number, number];
type HexColor = string;

export function getDominantColorPalette(
  imageUrl: string,
  paletteSize: number = 5
): Promise<HexColor[]> {
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
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      const colors: Record<string, number> = {};
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const rgb = `${r},${g},${b}`;
        colors[rgb] = (colors[rgb] || 0) + 1;
      }

      const sortedColors = Object.entries(colors).sort((a, b) => b[1] - a[1]);

      interface Cluster {
        center: RGB;
        colors: Array<[...RGB, number]>;
        totalCount: number;
      }

      const clusters: Cluster[] = [];

      for (const [color, count] of sortedColors) {
        const [r, g, b] = color.split(',').map(Number) as RGB;
        let foundCluster = false;

        for (const cluster of clusters) {
          const [cr, cg, cb] = cluster.center;
          const distance = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);

          if (distance < 50) {
            cluster.colors.push([r, g, b, count]);
            cluster.totalCount += count;
            foundCluster = true;
            break;
          }
        }

        if (!foundCluster) {
          clusters.push({
            center: [r, g, b],
            colors: [[r, g, b, count]],
            totalCount: count,
          });
        }

        if (clusters.length >= paletteSize) break;
      }

      // Sort clusters by total count (descending order)
      clusters.sort((a, b) => b.totalCount - a.totalCount);

      const palette = clusters.map((cluster) => {
        let totalR = 0,
          totalG = 0,
          totalB = 0,
          totalCount = 0;
        for (const [r, g, b, count] of cluster.colors) {
          totalR += r * count;
          totalG += g * count;
          totalB += b * count;
          totalCount += count;
        }
        const avgR = Math.round(totalR / totalCount);
        const avgG = Math.round(totalG / totalCount);
        const avgB = Math.round(totalB / totalCount);
        return rgbToHex(avgR, avgG, avgB);
      });

      resolve(palette);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
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
