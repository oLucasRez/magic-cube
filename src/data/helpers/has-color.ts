// ---------------------------------------------------------------------< types
import { Cubie, Colors } from '../../domain/models';
// ============================================================================
export function hasColor(cubie: Cubie, color: Colors) {
  return Object.values(cubie).some((_color) => _color === color);
}
