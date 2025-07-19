import { useMemo } from "react";
import { Blurhash } from "react-native-blurhash";
import rgbToHsl from "@lib/rgbTohsl";

export default function useBlurhashColor(blurhash) {
  const hslColor = useMemo(() => {
    const color = Blurhash.getAverageColor(blurhash);
    if (!color) return "hsl(0, 0%, 0%)";

    let { h, s, l } = rgbToHsl(color.r, color.g, color.b);

    if (l > 55) l = 55;

    return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
  }, [blurhash]);

  return hslColor;
}
