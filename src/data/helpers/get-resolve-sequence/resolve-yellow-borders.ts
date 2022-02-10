// -------------------------------------------------------------------< helpers
import { cubieIs, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, loop } from './utils';
// ---------------------------------------------------------------------< types
import { Cube, CubieAxes, Movement, Orientation } from '../../../domain/models';
// ============================================================================
function resolveVertices(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  const t = translateByAxis({ up: 'down', front: 'front' });

  const colorsMap: any = {};
  mapCube(cube, t.up, (cubie, [i, , k]) => {
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
    movements.push(...rotate(cube, t).do('U'));

    didNothing = false;

    return didNothing;
  }

  if (pairs.length <= 1) {
    movements.push(
      ...rotate(cube, t).do('R`', 'F', 'R`', 'B2', 'R', 'F`', 'R`', 'B2', 'R2')
    );

    didNothing = false;

    return didNothing;
  }

  return didNothing;
}

function resolveEdges(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  const t = translateByAxis({ up: 'down', front: 'front' });

  let metadata: any = {};
  mapCube(cube, t.up, (cubie, [i, , k]) => {
    const isEdge = cubieIs('edge', cubie);
    const isVertex =
      cubieIs('vertex', cubie) && i !== 'middle' && k !== 'middle';

    if (isEdge) {
      const [face] = cubieEntries(
        cubie,
        ([axis, color]) => color && axis !== t.up
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
      movements.push(...rotate(cube, t).do('U'));

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

    if (correct !== t.back) {
      movements.push(...rotate(cube, t).do('U'));

      didNothing = false;
      return didNothing;
    }

    const leftIsOpposite =
      metadata[t.left].vertex === oppositeColor[metadata[t.left].edge];

    mirror = leftIsOpposite ? -1 : 1;
  }

  const axis: CubieAxes = mirror === 1 ? t.left : t.right;
  const cw: Orientation = mirror === 1 ? 'cw' : 'acw';
  const acw: Orientation = mirror === 1 ? 'acw' : 'cw';

  movements.push(
    ...rotate(cube).do(
      { axis, orientation: 2 },
      { axis: t.up, orientation: acw },
      { axis, orientation: acw },
      { axis: t.up, orientation: acw },
      { axis, orientation: cw },
      { axis: t.up, orientation: cw },
      { axis, orientation: cw },
      { axis: t.up, orientation: cw },
      { axis, orientation: cw },
      { axis: t.up, orientation: acw },
      { axis, orientation: cw }
    )
  );

  didNothing = false;

  return didNothing;
}

export function resolveYellowBorders(cube: Cube, movements: Movement[]) {
  loop((stop) => {
    if (resolveVertices(cube, movements)) return stop;
  });

  loop((stop) => {
    if (resolveEdges(cube, movements)) return stop;
  });

  return movements;
}
