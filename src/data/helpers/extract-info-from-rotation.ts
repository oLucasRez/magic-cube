// ---------------------------------------------------------------------< types
import { CubieAxes, Orientation, Rotation } from '../../domain/models';
// ============================================================================
function getAxis(rotation: Rotation) {
  const map: Record<string, CubieAxes> = {
    L: 'left',
    R: 'right',
    U: 'up',
    D: 'down',
    F: 'front',
    B: 'back',
  };
  const axis: CubieAxes =
    map[rotation.split('').filter((char) => char !== '`' && char !== '2')[0]];

  return axis;
}

function getOrientation(rotation: Rotation) {
  const orientation: Orientation = rotation.includes('`') ? 'acw' : 'cw';

  return orientation;
}

function getTimes(rotation: Rotation) {
  const times = rotation.includes('2') ? 2 : 1;

  return times;
}

export function extractInfoFromRotation(rotation: Rotation) {
  const axis = getAxis(rotation);
  const orientation = getOrientation(rotation);
  const times = getTimes(rotation);

  return { axis, orientation, times };
}
