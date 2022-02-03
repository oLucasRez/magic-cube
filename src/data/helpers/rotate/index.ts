// -------------------------------------------------------------------< helpers
import { composeMovement, mapCube } from '..';
// ---------------------------------------------------------------------< utils
import { rotateCubie, translateEdges, translateVertices } from './utils';
// ---------------------------------------------------------------------< types
import { Cube, CubieAxes, Orientation, Movement } from '../../../domain/models';
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
  const timesToRotate = movement.includes('2') ? 2 : 1;

  return timesToRotate;
}

export function rotate(
  cube: Cube,
  movement: Movement,
  translation?: Record<CubieAxes, CubieAxes>
) {
  const axis = translation ? translation[getAxis(movement)] : getAxis(movement);
  const orientation = getOrientation(movement);
  const times = getTimes(movement);

  for (let i = 0; i < times; i++) {
    mapCube(cube, axis, (cubie) => rotateCubie(cubie, axis, orientation));
    translateEdges(cube, axis, orientation);
    translateVertices(cube, axis, orientation);
  }

  return composeMovement(axis, times === 2 ? 2 : orientation);
}
