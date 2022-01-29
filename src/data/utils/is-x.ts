// ---------------------------------------------------------------------< types
import { CubeAxes } from '../../domain/models';
// ============================================================================
export function isX(axis: CubeAxes) {
  return ['left', 'right'].includes(axis);
}
