// -------------------------------------------------------------------< helpers
import { cubieIs, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, getCubie, getFace, loop } from './utils';
// ---------------------------------------------------------------------< types
import {
  Cube,
  Cubie,
  CubieAxes,
  Movement,
  Orientation,
} from '../../../domain/models';
// ============================================================================
function resolveUpEdges(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  let currentCubie: Cubie | null = null;
  let cw: Orientation = 'cw';
  let acw: Orientation = 'acw';
  let mirror: CubieAxes = 'up';

  let done = true;

  mapCube(cube, 'down', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const hasntYellow = !getFace(cubie, (color) => color === 'yellow');

    if (isEdge && hasntYellow) {
      done = false;

      const front = cubieEntries(
        cubie,
        ([axis, color]) => color && axis !== 'down'
      )[0][0];

      const t = translateByAxis({ up: 'down', front });

      const mmfColor = getCubie(cube, ['middle', 'middle', t.front])[t.front];
      if (!mmfColor) return console.error('cor não encontrada.');

      const correctPlace = cubie[front] === mmfColor;

      if (correctPlace) {
        const rmmColor = getCubie(cube, [t.right, 'middle', 'middle'])[t.right];
        if (!rmmColor) return console.error('cor não encontrada.');

        if (rmmColor === cubie[t.up]) {
          cw = 'cw';
          acw = 'acw';
          mirror = t.right;
        } else {
          cw = 'acw';
          acw = 'cw';
          mirror = t.left;
        }

        currentCubie = cubie;
      }
    }
  });

  if (done) return didNothing;

  if (!currentCubie) {
    movements.push(...rotate(cube).do('D'));

    didNothing = false;

    return didNothing;
  }

  const [front] = cubieEntries(
    currentCubie,
    ([axis, color]) => color && axis !== 'down'
  )[0];

  const t = translateByAxis({ up: 'down', front });

  movements.push(
    ...rotate(cube).do(
      { axis: t.up, orientation: cw },
      { axis: mirror, orientation: cw },
      { axis: t.up, orientation: cw },
      { axis: mirror, orientation: acw },
      { axis: t.up, orientation: acw },
      { axis: t.front, orientation: acw },
      { axis: t.up, orientation: acw },
      { axis: t.front, orientation: cw }
    )
  );

  didNothing = false;

  return didNothing;
}

function resolveMiddleEdgesWrongPlace(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  let notYet = false;
  mapCube(cube, 'down', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const hasntYellow = !getFace(cubie, (color) => color === 'yellow');

    if (isEdge && hasntYellow) notYet = true;
  });

  if (notYet) return didNothing;

  let currentCubie: Cubie | null = null;
  let cw: Orientation = 'cw';
  let acw: Orientation = 'acw';
  let mirror: CubieAxes = 'up';
  let t: Record<CubieAxes, CubieAxes> = {} as Record<CubieAxes, CubieAxes>;

  mapCube(cube, 'middle y', (cubie) => {
    const isEdge = cubieIs('edge', cubie);

    if (isEdge) {
      const entries = cubieEntries(cubie, ([, color]) => color);
      const colors = entries.map(([, color]) => color);

      const faceColors = entries.map(([axis]) => {
        const face = getCubie(cube, [axis, 'middle', 'middle']);

        const [, color] = cubieEntries(face, ([, color]) => color)[0];
        if (!color) {
          console.error('cor não encontrada.');
          return null;
        }

        return color;
      });

      if (!faceColors.includes(colors[0]) || !faceColors.includes(colors[1])) {
        currentCubie = cubie;

        const [front] = entries.map(([axis]) => axis);

        t = translateByAxis({ up: 'down', front });

        if (cubie[t.right]) {
          cw = 'cw';
          acw = 'acw';
          mirror = t.right;
        } else {
          cw = 'acw';
          acw = 'cw';
          mirror = t.left;
        }
      }
    }
  });

  if (!currentCubie) return didNothing;

  movements.push(
    ...rotate(cube).do(
      { axis: mirror, orientation: cw },
      { axis: t.up, orientation: cw },
      { axis: mirror, orientation: acw },
      { axis: t.up, orientation: acw },
      { axis: t.front, orientation: acw },
      { axis: t.up, orientation: acw },
      { axis: t.front, orientation: cw }
    )
  );

  didNothing = false;

  return didNothing;
}

function resolveMiddleEdgesCorrectPlace(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  let currentCubie: Cubie | null = null;
  let orientation: 1 | -1 = 1;
  let t: Record<CubieAxes, CubieAxes> = {} as Record<CubieAxes, CubieAxes>;

  mapCube(cube, 'middle y', (cubie) => {
    const isEdge = cubieIs('edge', cubie);

    if (isEdge) {
      const [right, front] = cubieEntries(cubie, ([, color]) => color).map(
        ([axis]) => axis
      );

      const rmm = getCubie(cube, [right, 'middle', 'middle']);
      const mmf = getCubie(cube, ['middle', 'middle', front]);

      if (rmm[right] === cubie[front] && mmf[front] === cubie[right]) {
        t = translateByAxis({ up: 'down', front });

        currentCubie = cubie;

        if (cubie[t.right]) orientation = 1;
        else orientation = -1;
      }
    }
  });

  if (!currentCubie) return didNothing;

  const cw: Orientation = orientation === 1 ? 'cw' : 'acw';
  const acw: Orientation = orientation === 1 ? 'acw' : 'cw';
  const axis: CubieAxes = orientation === 1 ? t.right : t.left;

  movements.push(
    ...rotate(cube).do(
      { axis, orientation: cw },
      { axis: t.up, orientation: cw },
      { axis, orientation: acw },
      { axis: t.up, orientation: 2 },
      { axis, orientation: cw },
      { axis: t.up, orientation: 2 },
      { axis, orientation: acw },
      { axis: t.up, orientation: cw },
      { axis: t.front, orientation: acw },
      { axis: t.up, orientation: acw },
      { axis: t.front, orientation: cw }
    )
  );

  didNothing = false;

  return didNothing;
}

export function resolveMiddleEdges(cube: Cube, movements: Movement[]) {
  loop((stop) => {
    const resolves = [
      resolveUpEdges,
      resolveMiddleEdgesWrongPlace,
      resolveMiddleEdgesCorrectPlace,
    ].map((callback) => callback(cube, movements));

    if (resolves.some((resolved) => !resolved)) return;

    return stop;
  });

  return movements;
}
