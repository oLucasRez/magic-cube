// -------------------------------------------------------------------< helpers
import { cubieIs, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, getCubie, getFace } from './utils';
// ---------------------------------------------------------------------< types
import {
  Colors,
  Cube,
  CubieAxes,
  Movement,
  Orientation,
} from '../../../domain/models';
// ============================================================================
function resolveVertices(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  const { real } = translateByAxis({ up: 'down', front: 'front' });

  const colorsMap: any = {};
  mapCube(cube, real.up, (cubie, [i, , k]) => {
    const isVertex =
      cubieIs('vertex', cubie) && i !== 'middle' && k !== 'middle';

    if (isVertex) {
      colorsMap[i] =
        !colorsMap[i] || colorsMap[i] === cubie[i] ? cubie[i] : 'nope';
      colorsMap[k] =
        !colorsMap[k] || colorsMap[k] === cubie[k] ? cubie[k] : 'nope';
    }
  });

  const pairs = Object.entries(colorsMap)
    .filter(([, color]) => color !== 'nope')
    .map(([axis]) => axis);

  if (pairs.length === 1 && pairs[0] !== 'back') {
    movements.push(rotate(cube, 'U', real));

    didNothing = false;

    return didNothing;
  }

  if (pairs.length <= 1) {
    movements.push(rotate(cube, 'R`', real));
    movements.push(rotate(cube, 'F', real));
    movements.push(rotate(cube, 'R`', real));
    movements.push(rotate(cube, 'B2', real));
    movements.push(rotate(cube, 'R', real));
    movements.push(rotate(cube, 'F`', real));
    movements.push(rotate(cube, 'R`', real));
    movements.push(rotate(cube, 'B2', real));
    movements.push(rotate(cube, 'R2', real));

    didNothing = false;

    return didNothing;
  }

  // quando n tem nenhum par ou quando so tem 1 par atras
  // R' F R' B2 R F' R' B2 R2

  return didNothing;
}

function resolveEdges(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  const { real } = translateByAxis({ up: 'down', front: 'front' });

  let metadata: any = {};
  mapCube(cube, real.up, (cubie, [i, , k]) => {
    const isEdge = cubieIs('edge', cubie);
    const isVertex =
      cubieIs('vertex', cubie) && i !== 'middle' && k !== 'middle';

    if (isEdge) {
      const [face] = cubieEntries(
        cubie,
        ([axis, color]) => color && axis !== real.up
      )[0];

      if (!metadata[face]) metadata[face] = {};
      metadata[face].edge = cubie[face];
    }

    if (isVertex) {
      if (!metadata[i]) metadata[i] = {};
      metadata[i].vertex = cubie[i];

      if (!metadata[k]) metadata[k] = {};
      metadata[k].vertex = cubie[k];
    }
  });

  const wrongs = Object.values(metadata).filter(
    (value: any) => value.edge !== value.vertex
  ).length;

  if (wrongs === 0) {
    if (cube.middle.middle.front.front !== cube.middle.down.front.front) {
      movements.push(rotate(cube, 'D'));

      didNothing = false;
    }

    return didNothing;
  }

  let mirror = 1;

  const oppositeColor: any = {
    green: 'blue',
    blue: 'green',
    red: 'orange',
    orange: 'red',
  };

  if (wrongs === 3) {
    const [correct] = Object.entries(metadata)
      .filter(([, value]: any) => value.edge === value.vertex)
      .map(([face]) => face);

    if (correct !== real.back) {
      movements.push(rotate(cube, 'U', real));

      didNothing = false;
      return didNothing;
    }

    const leftIsOpposite =
      metadata[real.left].vertex === oppositeColor[metadata[real.left].edge];

    mirror = leftIsOpposite ? -1 : 1;
  }

  const axis: CubieAxes = mirror === 1 ? real.left : real.right;
  const cw: Orientation = mirror === 1 ? 'cw' : 'acw';
  const acw: Orientation = mirror === 1 ? 'acw' : 'cw';

  movements.push(rotate(cube, { axis, orientation: 2 }));
  movements.push(rotate(cube, { axis: real.up, orientation: acw }));
  movements.push(rotate(cube, { axis, orientation: acw }));
  movements.push(rotate(cube, { axis: real.up, orientation: acw }));
  movements.push(rotate(cube, { axis, orientation: cw }));
  movements.push(rotate(cube, { axis: real.up, orientation: cw }));
  movements.push(rotate(cube, { axis, orientation: cw }));
  movements.push(rotate(cube, { axis: real.up, orientation: cw }));
  movements.push(rotate(cube, { axis, orientation: cw }));
  movements.push(rotate(cube, { axis: real.up, orientation: acw }));
  movements.push(rotate(cube, { axis, orientation: cw }));

  didNothing = false;

  return didNothing;
}

export function resolveYellowBorders(cube: Cube, movements: Movement[]) {
  let count = 0;
  while (true) {
    const resolves = [resolveVertices].map((callback) =>
      callback(cube, movements)
    );

    count++;
    if (count > 100) {
      console.error('infinity loop');
      break;
    }

    if (resolves.some((resolved) => !resolved)) continue;

    break;
  }

  while (true) {
    const resolves = [resolveEdges].map((callback) =>
      callback(cube, movements)
    );

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
