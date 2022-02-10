// -------------------------------------------------------------------< helpers
import { cubieIs, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, getCubie, getFace, loop } from './utils';
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

  let t: Record<CubieAxes, CubieAxes> | undefined;

  if (yellows.length === 0) t = translateByAxis({ up: 'down', front: 'front' });
  else if (yellows.length === 2) {
    const hasLShape =
      ['front', 'back'].filter((axis) => yellows.includes(axis as CubieAxes))
        .length === 1;

    if (hasLShape) {
      const _t = translateByAxis({ up: 'down', back: yellows[0] });

      const lum = getCubie(cube, [_t.left, _t.up, 'middle']);

      if (lum[yellows[1]]) t = _t;
      else t = translateByAxis({ up: 'down', left: yellows[0] });
    } else t = translateByAxis({ up: 'down', left: yellows[0] });
  } else return didNothing;

  if (!t) return didNothing;

  movements.push(...rotate(cube, t).do('F', 'R', 'U', 'R`', 'U`', 'F`'));

  didNothing = false;

  return didNothing;
}

function resolveShallowYellowVertices(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  const t = translateByAxis({ up: 'down', front: 'front' });

  let notYet = false;
  mapCube(cube, t.up, (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const hasntDownYellow = cubie[t.up] !== 'yellow';

    if (isEdge && hasntDownYellow) notYet = true;
  });
  if (notYet) return didNothing;

  let ready = true;
  mapCube(cube, t.up, (cubie) => {
    const hasntDownYellow = cubie[t.up] !== 'yellow';

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
    [t.up, t.up, t.up],
    [t.up, t.up, t.up],
    [t.front, t.up, t.front],
  ]);
  configs.push([
    [t.back, t.up, t.up],
    [t.up, t.up, t.up],
    [t.front, t.up, t.up],
  ]);
  configs.push([
    [notUp, t.up, notUp],
    [t.up, t.up, t.up],
    [t.up, t.up, notUp],
  ]);
  configs.push([
    [t.left, t.up, t.back],
    [t.up, t.up, t.up],
    [t.left, t.up, t.front],
  ]);
  configs.push([
    [t.left, t.up, t.right],
    [t.up, t.up, t.up],
    [t.left, t.up, t.right],
  ]);
  configs.push([
    [notUp, t.up, t.up],
    [t.up, t.up, t.up],
    [t.up, t.up, notUp],
  ]);
  configs.push([
    [t.up, t.up, notUp],
    [t.up, t.up, t.up],
    [notUp, t.up, t.up],
  ]);

  mapCube(cube, t.up, (cubie, [i, , k]) => {
    const z = i === t.left ? 0 : i === 'middle' ? 1 : 2;
    const x = k === t.back ? 0 : k === 'middle' ? 1 : 2;

    const yellowFace = getFace(cubie, (color) => color === 'yellow');

    configs = configs.filter(
      (config) =>
        (config[x][z] === notUp && t.up !== yellowFace) ||
        config[x][z] === yellowFace
    );
  });

  const needRotate = !configs.length;
  if (needRotate) {
    movements.push(...rotate(cube, t).do('U'));

    didNothing = false;

    return didNothing;
  }

  movements.push(...rotate(cube, t).do('R', 'U', 'R`', 'U', 'R', 'U2', 'R`'));

  didNothing = false;

  return didNothing;
}

export function resolveYellowFace(cube: Cube, movements: Movement[]) {
  loop((stop) => {
    const resolves = [
      resolveShallowYellowEdges,
      resolveShallowYellowVertices,
    ].map((callback) => callback(cube, movements));

    if (resolves.some((resolved) => !resolved)) return;

    return stop;
  });

  return movements;
}
