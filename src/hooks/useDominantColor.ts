import { useEffect, useState } from 'react';
import { getDominantColorPalette } from '~helper/colorExtractor';

type HexColor = string;

interface UseDominantColorPaletteResult {
  palette: HexColor[];
  isLoading: boolean;
  error: string | null;
  textColor: string | null;
}

function useDominantColorPalette(
  imageUrl: string,
  paletteSize: number = 5
): UseDominantColorPaletteResult {
  const [palette, setPalette] = useState<HexColor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [textColor, setTextColor] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getDominantColorPalette(
      `https://proxy.ashish-kmr.workers.dev/?url=${imageUrl}`,
      paletteSize
    )
      .then(({ dominantColors, textColor }) => {
        setPalette(dominantColors);
        setIsLoading(false);
        setTextColor(textColor);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [imageUrl, paletteSize]);

  return { palette, isLoading, error, textColor };
}

export default useDominantColorPalette;
