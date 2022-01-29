// ---------------------------------------------------------------------< types
import { CubeAxes } from '../../domain/models';
// ============================================================================
export function parsePosition(axis: CubeAxes) {
  const map: Record<CubeAxes, -1 | 0 | 1> = {
    right: 1,
    up: 1,
    front: 1,
    middle: 0,
    left: -1,
    down: -1,
    back: -1,
  };

  const position = map[axis];

  return position;
}
