// ---------------------------------------------------------------------< types
import { CubeAxes } from '../../domain/models';
// ============================================================================
export function isY(axis: CubeAxes) {
  return ['up', 'down'].includes(axis);
}
