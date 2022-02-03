// ---------------------------------------------------------------------< types
import { CubieAxes, Orientation, Movement } from '../../domain/models';
// ============================================================================
function getAxis(movement: Movement) {
  const map: Record<string, CubieAxes> = {
    L: 'left',
    R: 'right',
    U: 'up',
    D: 'down',
    F: 'front',
    B: 'back',
  };
  const axis: CubieAxes =
    map[movement.split('').filter((char) => char !== '`' && char !== '2')[0]];

  return axis;
}

function getOrientation(movement: Movement) {
  const orientation: Orientation = movement.includes('`') ? 'acw' : 'cw';

  return orientation;
}

function getTimes(movement: Movement) {
  const times = movement.includes('2') ? 2 : 1;

  return times;
}

export function extractInfoFromMovement(movement: Movement) {
  const axis = getAxis(movement);
  const orientation = getOrientation(movement);
  const times = getTimes(movement);

  return { axis, orientation, times };
}
