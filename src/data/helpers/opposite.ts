// ---------------------------------------------------------------------< types
import { XCubieAxes, YCubieAxes, ZCubieAxes } from '../../domain/models';
// ============================================================================
type Opposite = {
  [key in XCubieAxes]: XCubieAxes;
} & {
  [key in YCubieAxes]: YCubieAxes;
} & {
  [key in ZCubieAxes]: ZCubieAxes;
};

const _opposite: Opposite = {
  left: 'right',
  right: 'left',
  front: 'back',
  back: 'front',
  up: 'down',
  down: 'up',
};

export function opposite() {
  return _opposite;
}
