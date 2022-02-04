// ---------------------------------------------------------------------< types
import { Colors, Cubie, CubieAxes } from '../../../../domain/models';
// ============================================================================
export function getFace(cubie: Cubie, callback: (color: Colors) => boolean) {
  const face =
    Object.entries(cubie)
      .map(([axis, color]) => {
        if (color && callback(color)) return axis as CubieAxes;
        return null;
      })
      .filter((value) => value)[0] || null;

  return face;
}
