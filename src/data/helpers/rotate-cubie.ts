// ---------------------------------------------------------------------< types
import {
  Cubie,
  CubieAxes,
  XCubieAxes,
  YCubieAxes,
  ZCubieAxes,
} from '../../domain/models';
// ============================================================================
type Orientation = 'cw' | 'acw';

function rotateZ(cubie: Cubie, axis: ZCubieAxes, orientation: Orientation) {
  const _orientation = {
    front: { cw: 1, acw: -1 },
    back: { cw: -1, acw: 1 },
  }[axis][orientation];

  const sides: (XCubieAxes | YCubieAxes)[] = ['up', 'right', 'down', 'left'];

  const cubies = sides.map((side) => cubie[side]);
  for (let i = 0; i < 4; i++) cubie[sides[i]] = cubies[(i + _orientation) % 4];
}

function rotateY(cubie: Cubie, axis: YCubieAxes, orientation: Orientation) {
  const _orientation = {
    up: { cw: 1, acw: -1 },
    down: { cw: -1, acw: 1 },
  }[axis][orientation];

  const sides: (XCubieAxes | ZCubieAxes)[] = ['front', 'left', 'back', 'right'];

  const cubies = sides.map((side) => cubie[side]);
  for (let i = 0; i < 4; i++) cubie[sides[i]] = cubies[(i + _orientation) % 4];
}

function rotateX(cubie: Cubie, axis: XCubieAxes, orientation: Orientation) {
  const _orientation = {
    left: { cw: 1, acw: -1 },
    right: { cw: -1, acw: 1 },
  }[axis][orientation];

  const sides: (YCubieAxes | ZCubieAxes)[] = ['front', 'down', 'back', 'up'];

  const cubies = sides.map((side) => cubie[side]);
  for (let i = 0; i < 4; i++) cubie[sides[i]] = cubies[(i + _orientation) % 4];
}

export function rotateCubie(
  cubie: Cubie,
  axis: CubieAxes,
  orientation: Orientation
) {
  switch (axis) {
    case 'left':
    case 'right':
      rotateX(cubie, axis, orientation);
      break;
    case 'up':
    case 'down':
      rotateY(cubie, axis, orientation);
      break;
    case 'front':
    case 'back':
      rotateZ(cubie, axis, orientation);
      break;
    default:
      break;
  }
}
