// -------------------------------------------------------------------< helpers
import { cubieIs, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, getCubie, getFace } from './utils';
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

      const { real } = translateByAxis({ up: 'down', front });
      if (!real) return console.error('tradução impossível.');

      const mmfColor = getCubie(cube, ['middle', 'middle', real.front])?.[
        real.front
      ];
      if (!mmfColor) return console.error('cor não encontrada.');

      const correctPlace = cubie[front] === mmfColor;

      if (correctPlace) {
        const rmmColor = getCubie(cube, [real.right, 'middle', 'middle'])?.[
          real.right
        ];
        if (!rmmColor) return console.error('cor não encontrada.');

        if (rmmColor === cubie[real.up]) {
          cw = 'cw';
          acw = 'acw';
          mirror = real.right;
        } else {
          cw = 'acw';
          acw = 'cw';
          mirror = real.left;
        }

        currentCubie = cubie;
      }
    }
  });

  if (done) return didNothing;

  if (!currentCubie) {
    movements.push(rotate(cube, 'D'));

    didNothing = false;

    return didNothing;
  }

  const [front] = cubieEntries(
    currentCubie,
    ([axis, color]) => color && axis !== 'down'
  )[0];

  const { real } = translateByAxis({ up: 'down', front });
  if (!real) return console.error('tradução impossível.');

  movements.push(rotate(cube, { axis: real.up, orientation: cw }));
  movements.push(rotate(cube, { axis: mirror, orientation: cw }));
  movements.push(rotate(cube, { axis: real.up, orientation: cw }));
  movements.push(rotate(cube, { axis: mirror, orientation: acw }));
  movements.push(rotate(cube, { axis: real.up, orientation: acw }));
  movements.push(rotate(cube, { axis: real.front, orientation: acw }));
  movements.push(rotate(cube, { axis: real.up, orientation: acw }));
  movements.push(rotate(cube, { axis: real.front, orientation: cw }));

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
  let traslation: Record<CubieAxes, CubieAxes> = {} as Record<
    CubieAxes,
    CubieAxes
  >;

  mapCube(cube, 'middle y', (cubie) => {
    const isEdge = cubieIs('edge', cubie);

    if (isEdge) {
      const entries = cubieEntries(cubie, ([, color]) => color);
      const colors = entries.map(([, color]) => color);

      const faceColors = entries.map(([axis]) => {
        const face = getCubie(cube, [axis, 'middle', 'middle']);
        if (!face) {
          console.error('cubie não encontrado.');
          return null;
        }

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

        const { real } = translateByAxis({ up: 'down', front });
        if (!real) return console.error('tradução impossível.');

        traslation = real;

        if (cubie[real.right]) {
          cw = 'cw';
          acw = 'acw';
          mirror = real.right;
        } else {
          cw = 'acw';
          acw = 'cw';
          mirror = real.left;
        }
      }
    }
  });

  if (!currentCubie) return didNothing;

  movements.push(rotate(cube, { axis: mirror, orientation: cw }));
  movements.push(rotate(cube, { axis: traslation.up, orientation: cw }));
  movements.push(rotate(cube, { axis: mirror, orientation: acw }));
  movements.push(rotate(cube, { axis: traslation.up, orientation: acw }));
  movements.push(rotate(cube, { axis: traslation.front, orientation: acw }));
  movements.push(rotate(cube, { axis: traslation.up, orientation: acw }));
  movements.push(rotate(cube, { axis: traslation.front, orientation: cw }));

  didNothing = false;

  return didNothing;
}

function resolveMiddleEdgesCorrectPlace(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  let currentCubie: Cubie | null = null;
  let orientation: 1 | -1 = 1;
  let real: Record<CubieAxes, CubieAxes> = {} as Record<CubieAxes, CubieAxes>;

  mapCube(cube, 'middle y', (cubie) => {
    const isEdge = cubieIs('edge', cubie);

    if (isEdge) {
      const [right, front] = cubieEntries(cubie, ([, color]) => color).map(
        ([axis]) => axis
      );

      const rmm = getCubie(cube, [right, 'middle', 'middle']);
      const mmf = getCubie(cube, ['middle', 'middle', front]);
      if (!rmm || !mmf) return console.error('cubie não encontrado.');

      if (rmm[right] === cubie[front] && mmf[front] === cubie[right]) {
        const translation = translateByAxis({ up: 'down', front });
        if (!translation.real) return console.error('tradução impossível.');

        currentCubie = cubie;
        real = translation.real;

        if (cubie[translation.real.right]) orientation = 1;
        else orientation = -1;
      }
    }
  });

  if (!currentCubie) return didNothing;

  const cw: Orientation = orientation === 1 ? 'cw' : 'acw';
  const acw: Orientation = orientation === 1 ? 'acw' : 'cw';
  const axis: CubieAxes = orientation === 1 ? real.right : real.left;

  movements.push(rotate(cube, { axis, orientation: cw }));
  movements.push(rotate(cube, { axis: real.up, orientation: cw }));
  movements.push(rotate(cube, { axis, orientation: acw }));
  movements.push(rotate(cube, { axis: real.up, orientation: 2 }));
  movements.push(rotate(cube, { axis, orientation: cw }));
  movements.push(rotate(cube, { axis: real.up, orientation: 2 }));
  movements.push(rotate(cube, { axis, orientation: acw }));
  movements.push(rotate(cube, { axis: real.up, orientation: cw }));
  movements.push(rotate(cube, { axis: real.front, orientation: acw }));
  movements.push(rotate(cube, { axis: real.up, orientation: acw }));
  movements.push(rotate(cube, { axis: real.front, orientation: cw }));

  didNothing = false;

  return didNothing;
}

export function resolveMiddleEdges(cube: Cube, movements: Movement[]) {
  let count = 0;
  while (true) {
    const resolves = [
      resolveUpEdges,
      resolveMiddleEdgesWrongPlace,
      resolveMiddleEdgesCorrectPlace,
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
