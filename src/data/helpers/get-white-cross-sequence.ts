// -------------------------------------------------------------------< helpers
import {
  composeMovement,
  hasColor,
  cubieIs,
  mapCube,
  rotate,
  translateByAxis,
} from '.';
// ---------------------------------------------------------------------< utils
import { deepCopy } from '../utils';
// ---------------------------------------------------------------------< types
import {
  Cube,
  CubeAxes,
  Cubie,
  CubieAxes,
  Movement,
  XCubeAxes,
  YCubeAxes,
  ZCubeAxes,
  Colors,
} from '../../domain/models';
// ============================================================================
function getFace(
  cubie: Cubie,
  callback: (entry: { axis: CubieAxes; color: Colors }) => boolean
) {
  return Object.entries(cubie).filter(
    ([axis, color]) => color && callback({ axis: axis as CubieAxes, color })
  )[0][0] as CubieAxes;
}

function resolveUpCubieUpWhiteFace(cube: Cube, movements: Movement[]) {
  let resolved = true;

  mapCube(cube, 'up', (cubie, [i, , k]) => {
    const isEdge = cubieIs('edge', cubie);
    const upFaceIsWhite = cubie.up === 'white';

    if (isEdge && upFaceIsWhite) {
      while (true) {
        const downCubie = cube[i].down[k];
        const downCubieDownFaceIsWhite = downCubie.down === 'white';

        if (downCubieDownFaceIsWhite) movements.push(rotate(cube, 'D'));
        else break;
      }

      const notWhiteFace = getFace(cubie, ({ color }) => color !== 'white');

      const movement = composeMovement(notWhiteFace, 2);
      movements.push(rotate(cube, movement));

      resolved = false;
    }
  });

  return resolved;
}

function getCubie(cube: Cube, coord: [CubeAxes, CubeAxes, CubeAxes]) {
  const [i, j, k] = coord;

  const xAxes: CubeAxes[] = ['left', 'right'];
  const yAxes: CubeAxes[] = ['up', 'down'];
  const zAxes: CubeAxes[] = ['front', 'back'];

  const x = xAxes.includes(i)
    ? i
    : xAxes.includes(j)
    ? j
    : xAxes.includes(k)
    ? k
    : 'middle';
  const y = yAxes.includes(i)
    ? i
    : yAxes.includes(j)
    ? j
    : yAxes.includes(k)
    ? k
    : 'middle';
  const z = zAxes.includes(i)
    ? i
    : zAxes.includes(j)
    ? j
    : zAxes.includes(k)
    ? k
    : 'middle';

  try {
    return cube[x as XCubeAxes][y as YCubeAxes][z as ZCubeAxes];
  } catch (e) {}
}

function resolveUpCubieFrontWhiteFace(cube: Cube, movements: Movement[]) {
  let resolved = true;

  mapCube(cube, 'up', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const frontFaceIsWhite = hasColor(cubie, 'white') && cubie.up !== 'white';

    if (isEdge && frontFaceIsWhite) {
      const front = getFace(cubie, ({ color }) => color === 'white');
      const { real } = translateByAxis({ up: 'up', front });

      if (!real) return console.error('erro de trandução.');

      while (true) {
        const rdm = getCubie(cube, [real.right, 'down', 'middle']);
        const rdmHasntWhite = rdm && rdm.down !== 'white';

        if (rdmHasntWhite) {
          movements.push(rotate(cube, composeMovement(real.front, 'cw')));
          movements.push(rotate(cube, composeMovement(real.right, 'acw')));
          movements.push(rotate(cube, composeMovement(real.front, 'acw')));

          resolved = false;
          break;
        }

        const ldm = getCubie(cube, [real.left, 'down', 'middle']);
        const ldmHasntWhite = ldm && ldm.down !== 'white';

        if (ldmHasntWhite) {
          movements.push(rotate(cube, composeMovement(real.front, 'acw')));
          movements.push(rotate(cube, composeMovement(real.left, 'cw')));
          movements.push(rotate(cube, composeMovement(real.front, 'cw')));

          resolved = false;
          break;
        }

        movements.push(rotate(cube, 'D'));
      }
    }
  });

  return resolved;
}

function resolveMiddleCubie(cube: Cube, movements: Movement[]) {
  let resolved = true;

  mapCube(cube, 'middle y', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const hasWhite = hasColor(cubie, 'white');

    if (isEdge && hasWhite) {
      const notWhiteFace = getFace(cubie, ({ color }) => color !== 'white');

      const { real } = translateByAxis({ up: 'up', front: notWhiteFace });

      if (!real) return console.error('erro de trandução.');

      while (true) {
        const mdf = getCubie(cube, ['middle', 'down', real.front]);
        const mdfDownIsWhite = mdf && mdf.down === 'white';

        if (mdfDownIsWhite) movements.push(rotate(cube, 'D'));
        else break;
      }

      const whiteFace = getFace(cubie, ({ color }) => color === 'white');

      const orientation = whiteFace === real.left ? 'acw' : 'cw';
      const movement = composeMovement(real.front, orientation);
      movements.push(rotate(cube, movement));

      resolved = false;
    }
  });

  return resolved;
}

function resolveDownCubie(cube: Cube, movements: Movement[]) {
  let resolved = true;

  mapCube(cube, 'down', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const hasntDownWhite = hasColor(cubie, 'white') && cubie.down !== 'white';

    if (isEdge && hasntDownWhite) {
      const front = getFace(cubie, ({ color }) => color === 'white');

      const { real } = translateByAxis({ up: 'up', front });

      if (!real) return;

      movements.push(rotate(cube, composeMovement(real.front, 'acw')));
      movements.push(rotate(cube, 'D'));
      movements.push(rotate(cube, composeMovement(real.right, 'acw')));

      resolved = false;
    }
  });

  return resolved;
}

export function getWhiteCrossSequence(cube: Cube) {
  const cubeCopy = deepCopy(cube);

  const movements: Movement[] = [];

  let count = 0;

  while (true) {
    const resolves = [
      resolveUpCubieUpWhiteFace,
      resolveUpCubieFrontWhiteFace,
      resolveMiddleCubie,
      resolveDownCubie,
    ].map((callback) => callback(cubeCopy, movements));

    count++;
    if (count > 15) {
      console.error('infinity loop');
      break;
    }

    if (resolves.some((resolved) => !resolved)) continue;

    break;
  }

  console.log('movements', ...movements);

  return movements;
}
