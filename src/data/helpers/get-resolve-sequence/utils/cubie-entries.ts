// ---------------------------------------------------------------------< types
import { Colors, Cubie, CubieAxes } from '../../../../domain/models';
// ============================================================================
export function cubieEntries(
  cubie: Cubie,
  callback: (entry: [CubieAxes, Colors | null]) => any
) {
  const face: [CubieAxes, Colors | null][] = Object.entries(cubie)
    .filter(([axis, color]) => callback([axis as CubieAxes, color]))
    .map(([axis, color]) => [axis as CubieAxes, color]);

  return face;
}
