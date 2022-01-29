// ---------------------------------------------------------------------< types
import { CubeAxes } from '../../domain/models';
// ============================================================================
export function isZ(axis: CubeAxes) {
  return ['front', 'back'].includes(axis);
}
