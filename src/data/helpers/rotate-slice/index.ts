// -------------------------------------------------------------------< helpers
import { mapCube, opposite } from '..';
// ---------------------------------------------------------------------< utils
import { rotateCubie, translateEdges, translateVertices } from './utils';
// ---------------------------------------------------------------------< types
import { Cube, CubieAxes, Orientation, Rotation } from '../../../domain/models';
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

function getTimesToRotate(rotation: Rotation) {
  const timesToRotate = rotation.includes('2') ? 2 : 1;

  return timesToRotate;
}

export function rotate(cube: Cube, rotation: Rotation) {
  const axis = getAxis(rotation);
  const orientation = getOrientation(rotation);
  const timesToRotate = getTimesToRotate(rotation);

  console.log(opposite);

  for (let i = 0; i < timesToRotate; i++) {
    mapCube(cube, axis, (cubie) => rotateCubie(cubie, axis, orientation));

    translateEdges(cube, axis, orientation);
    translateVertices(cube, axis, orientation);
  }

  return {
    then: (_rotation: Rotation) => rotate(cube, _rotation),
  };
}
