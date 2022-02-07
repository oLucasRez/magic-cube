// -------------------------------------------------------------------< helpers
import { cubieIs, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, getCubie, getFace } from './utils';
// ---------------------------------------------------------------------< types
import { Cube, CubieAxes, Movement } from '../../../domain/models';
// ============================================================================
function resolveShallowYellowEdges(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  let yellows: CubieAxes[] = [];
  mapCube(cube, 'down', (cubie) => {
    const isEdge = cubieIs('edge', cubie);

    if (isEdge) {
      const [face] = cubieEntries(
        cubie,
        ([axis, color]) => color && axis !== 'down'
      )[0];

      const hasDownYellow = cubie.down === 'yellow';

      if (hasDownYellow) yellows.push(face);
    }
  });

  let real: Record<CubieAxes, CubieAxes> | undefined;

  if (yellows.length === 0)
    real = translateByAxis({ up: 'down', front: 'front' }).real;
  else if (yellows.length === 2) {
    const hasLShape =
      ['front', 'back'].filter((axis) => yellows.includes(axis as CubieAxes))
        .length === 1;

    if (hasLShape) {
      const _ = translateByAxis({ up: 'down', back: yellows[0] });

      if (!_.real) {
        console.error('tradução impossível.');

        return didNothing;
      }

      const lum = getCubie(cube, [_.real.left, _.real.up, 'middle']);
      if (!lum) {
        console.error('cubie não encontrado.');

        return didNothing;
      }

      if (lum[yellows[1]]) real = _.real;
      else real = translateByAxis({ up: 'down', left: yellows[0] }).real;
    } else real = translateByAxis({ up: 'down', left: yellows[0] }).real;
  } else return didNothing;

  if (!real) {
    console.error('tradução impossível.');

    return didNothing;
  }

  movements.push(rotate(cube, 'F', real));
  movements.push(rotate(cube, 'R', real));
  movements.push(rotate(cube, 'U', real));
  movements.push(rotate(cube, 'R`', real));
  movements.push(rotate(cube, 'U`', real));
  movements.push(rotate(cube, 'F`', real));

  didNothing = false;

  return didNothing;
}

function resolveShallowYellowVertices(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  const { real } = translateByAxis({ up: 'down', front: 'front' });
  if (!real) {
    console.error('tradução impossível.');

    return didNothing;
  }

  let notYet = false;
  mapCube(cube, real.up, (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const hasntDownYellow = cubie[real.up] !== 'yellow';

    if (isEdge && hasntDownYellow) notYet = true;
  });
  if (notYet) return didNothing;

  let ready = true;
  mapCube(cube, real.up, (cubie) => {
    const hasntDownYellow = cubie[real.up] !== 'yellow';

    if (hasntDownYellow) ready = false;
  });
  if (ready) return didNothing;

  let configs: [
    [CubieAxes | null, CubieAxes | null, CubieAxes | null],
    [CubieAxes | null, CubieAxes | null, CubieAxes | null],
    [CubieAxes | null, CubieAxes | null, CubieAxes | null]
  ][] = [];

  const notUp = null;

  configs.push([
    [real.up, real.up, real.up],
    [real.up, real.up, real.up],
    [real.front, real.up, real.front],
  ]);
  configs.push([
    [real.back, real.up, real.up],
    [real.up, real.up, real.up],
    [real.front, real.up, real.up],
  ]);
  configs.push([
    [notUp, real.up, notUp],
    [real.up, real.up, real.up],
    [real.up, real.up, notUp],
  ]);
  configs.push([
    [real.left, real.up, real.back],
    [real.up, real.up, real.up],
    [real.left, real.up, real.front],
  ]);
  configs.push([
    [real.left, real.up, real.right],
    [real.up, real.up, real.up],
    [real.left, real.up, real.right],
  ]);
  configs.push([
    [notUp, real.up, real.up],
    [real.up, real.up, real.up],
    [real.up, real.up, notUp],
  ]);
  configs.push([
    [real.up, real.up, notUp],
    [real.up, real.up, real.up],
    [notUp, real.up, real.up],
  ]);

  mapCube(cube, real.up, (cubie, [i, , k]) => {
    const z = i === real.left ? 0 : i === 'middle' ? 1 : 2;
    const x = k === real.back ? 0 : k === 'middle' ? 1 : 2;

    const yellowFace = getFace(cubie, (color) => color === 'yellow');

    configs = configs.filter(
      (config) =>
        (config[x][z] === notUp && real.up !== yellowFace) ||
        config[x][z] === yellowFace
    );
  });

  const needRotate = !configs.length;
  if (needRotate) {
    movements.push(rotate(cube, 'U', real));

    didNothing = false;

    return didNothing;
  }
  movements.push(rotate(cube, 'R', real));
  movements.push(rotate(cube, 'U', real));
  movements.push(rotate(cube, 'R`', real));
  movements.push(rotate(cube, 'U', real));
  movements.push(rotate(cube, 'R', real));
  movements.push(rotate(cube, 'U2', real));
  movements.push(rotate(cube, 'R`', real));

  didNothing = false;

  return didNothing;
}

export function resolveYellowFace(cube: Cube, movements: Movement[]) {
  let count = 0;
  while (true) {
    const resolves = [
      resolveShallowYellowEdges,
      resolveShallowYellowVertices,
    ].map((callback) => callback(cube, movements));

    count++;
    if (count > 100) {
      console.error('infinity loop');
      break;
    }

    if (resolves.some((resolved) => !resolved)) continue;

    break;
  }

  return movements;
}
