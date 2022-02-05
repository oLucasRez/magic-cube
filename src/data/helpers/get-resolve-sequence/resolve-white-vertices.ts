/* eslint-disable no-loop-func */
// -------------------------------------------------------------------< helpers
import { cubieIs, hasColor, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< types
import { Cube, Cubie, Movement } from '../../../domain/models';
import { cubieEntries, getCubie, getFace } from './utils';
// ============================================================================
function logCubie(cubie: Cubie) {
  const colors = cubieEntries(cubie, ([, color]) => color).map(
    ([, color]) => color
  );

  let _type = '';
  if (cubieIs('face', cubie)) _type = '[face]';
  if (cubieIs('edge', cubie)) _type = '[edge]';
  if (cubieIs('vertex', cubie)) _type = '[vertex]';

  return `(${_type} ${colors.join(' ')})`;
}

function loop(
  callback: (options: { _break: number; _continue: number }) => any,
  loopout: number = 15
) {
  const options = {
    _break: 65216,
    _continue: 77961,
  };

  while (true) {
    const cmd = callback(options);

    if (cmd === options._break) break;
    if (cmd === options._continue) continue;

    if (!loopout) return console.error('loop infinito.');

    loopout--;
  }
}

function resolveDownSliceFrontWhiteFace(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  const leftCubies: Cubie[] = [];
  const rightCubies: Cubie[] = [];

  mapCube(cube, 'down', (cubie) => {
    const isVertex = cubieIs('vertex', cubie);
    const hasWhite = hasColor(cubie, 'white');
    const hasntWhiteInDown = cubie.down !== 'white';

    if (isVertex && hasWhite && hasntWhiteInDown) {
      const front = getFace(cubie, (color) => color === 'white');
      if (!front) return console.error('face não encontrada.');

      const { real } = translateByAxis({ up: 'down', front });
      if (!real) return console.error('tradução impossível.');

      if (cubie[real.left]) leftCubies.push(cubie);
      if (cubie[real.right]) rightCubies.push(cubie);
    }
  });

  leftCubies.forEach((cubie) => {
    if (!didNothing) return;

    const front = getFace(cubie, (color) => color === 'white');
    if (!front) return console.error('face não encontrada.');

    const { real } = translateByAxis({ up: 'down', front });
    if (!real) return console.error('tradução impossível.');

    const otherColors = [cubie[real.left], cubie[real.up]];

    const mmfColor = getCubie(cube, ['middle', 'middle', real.front])?.[
      real.front
    ];
    if (!mmfColor) return console.error('cor não encontrada.');

    const lmmColor = getCubie(cube, [real.left, 'middle', 'middle'])?.[
      real.left
    ];
    if (!lmmColor) return console.error('cor não encontrada.');

    const correctPlace =
      otherColors.includes(mmfColor) && otherColors.includes(lmmColor);

    if (correctPlace) {
      movements.push(rotate(cube, { axis: real.front, orientation: 'cw' }));
      movements.push(rotate(cube, { axis: real.up, orientation: 'cw' }));
      movements.push(rotate(cube, { axis: real.front, orientation: 'acw' }));

      didNothing = false;
    }
  });

  rightCubies.forEach((cubie) => {
    if (!didNothing) return;

    const front = getFace(cubie, (color) => color === 'white');
    if (!front) return console.error('face não encontrada.');

    const { real } = translateByAxis({ up: 'down', front });
    if (!real) return console.error('tradução impossível.');

    const otherColors = [cubie[real.right], cubie[real.up]];

    const mmfColor = getCubie(cube, ['middle', 'middle', real.front])?.[
      real.front
    ];
    if (!mmfColor) return console.error('cor não encontrada.');

    const rmmColor = getCubie(cube, [real.right, 'middle', 'middle'])?.[
      real.right
    ];
    if (!rmmColor) return console.error('cor não encontrada.');

    const correctPlace =
      otherColors.includes(mmfColor) && otherColors.includes(rmmColor);

    if (correctPlace) {
      movements.push(rotate(cube, { axis: real.front, orientation: 'acw' }));
      movements.push(rotate(cube, { axis: real.up, orientation: 'acw' }));
      movements.push(rotate(cube, { axis: real.front, orientation: 'cw' }));

      didNothing = false;
    }
  });

  if ((leftCubies.length || rightCubies.length) && didNothing) {
    movements.push(rotate(cube, 'D'));

    didNothing = false;
  }

  return didNothing;
}

function resolveDownSliceDownWhiteFace(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  let notYet = false;
  mapCube(cube, 'down', (cubie) => {
    const isVertex = cubieIs('vertex', cubie);
    const hasWhite = hasColor(cubie, 'white');
    const hasntWhiteInDown = cubie.down !== 'white';

    if (isVertex && hasWhite && hasntWhiteInDown) notYet = true;
  });

  if (notYet) return true;

  const cubies: Cubie[] = [];
  mapCube(cube, 'down', (cubie, [i, , k]) => {
    const isVertex = cubieIs('vertex', cubie);
    const hasDownWhite = cubie.down === 'white';
    const emptyInUp = getCubie(cube, [i, 'up', k])?.up !== 'white';

    if (isVertex && hasDownWhite && emptyInUp) cubies.push(cubie);
  });

  cubies.forEach((cubie) => {
    if (!didNothing) return;

    const axes = cubieEntries(
      cubie,
      ([, color]) => color && color !== 'white'
    ).map(([axis]) => axis);
    if (!axes) return console.error('faces não encontradas.');

    const x = axes.includes('right') ? 1 : -1;
    const z = axes.includes('front') ? 1 : -1;

    const axis = axes.includes('front') ? 'front' : 'back';
    const cw = x * z === 1 ? 'cw' : 'acw';
    const acw = -x * z === 1 ? 'cw' : 'acw';

    movements.push(rotate(cube, { axis, orientation: cw }));
    movements.push(rotate(cube, 'D2'));
    movements.push(rotate(cube, { axis, orientation: acw }));

    didNothing = false;
  });

  mapCube(cube, 'down', (cubie) => {
    const isVertex = cubieIs('vertex', cubie);
    const hasDownWhite = cubie.down === 'white';

    if (isVertex && hasDownWhite) {
      if (didNothing) movements.push(rotate(cube, 'D'));

      didNothing = false;
    }
  });

  return didNothing;
}

function resolveUpSliceUpWhiteFace(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  let notYet = false;
  mapCube(cube, 'down', (cubie) => {
    const hasWhite = hasColor(cubie, 'white');

    if (hasWhite) notYet = true;
  });

  if (notYet) return true;

  mapCube(cube, 'up', (cubie, [i, , k]) => {
    if (!didNothing) return;

    const isVertex =
      cubieIs('vertex', cubie) && i !== 'middle' && k !== 'middle';
    const hasUpWhite = cubie.up === 'white';

    if (isVertex && hasUpWhite) {
      const otherColors = cubieEntries(
        cubie,
        ([, color]) => color && color !== 'white'
      ).map(([, color]) => color);

      const mmfColor = getCubie(cube, ['middle', 'middle', k])?.[k];
      if (!mmfColor) return console.error('cor não encontrada.');

      const lmmColor = getCubie(cube, [i, 'middle', 'middle'])?.[i];
      if (!lmmColor) return console.error('cor não encontrada.');

      const x = i === 'right' ? 1 : -1;
      const z = k === 'front' ? 1 : -1;

      const cw = x * z === 1 ? 'cw' : 'acw';
      const acw = -x * z === 1 ? 'cw' : 'acw';

      if (!otherColors.includes(mmfColor) || !otherColors.includes(lmmColor)) {
        movements.push(rotate(cube, { axis: k, orientation: cw }));
        movements.push(rotate(cube, 'D2'));
        movements.push(rotate(cube, { axis: k, orientation: acw }));

        didNothing = false;
      }
    }
  });

  return true;
}

function resolveUpSlideFrontWhiteFace(cube: Cube, movements: Movement[]) {
  let didNothing = true;

  let notYet = false;
  mapCube(cube, 'down', (cubie) => {
    const hasWhite = hasColor(cubie, 'white');

    if (hasWhite) notYet = true;
  });

  if (notYet) return true;

  mapCube(cube, 'up', (cubie, [i, , k]) => {
    if (!didNothing) return;

    const isVertex =
      cubieIs('vertex', cubie) && i !== 'middle' && k !== 'middle';
    const hasWhite = hasColor(cubie, 'white');
    const hasntWhiteInUp = cubie.up !== 'white';

    if (isVertex && hasWhite && hasntWhiteInUp) {
      const front = cubieEntries(
        cubie,
        ([axis, color]) => axis !== 'up' && color && color !== 'white'
      )[0][0];

      console.log(front);

      const { real } = translateByAxis({ up: 'up', front });
      if (!real) return console.error('tradução impossível.');

      const whiteFace = getFace(cubie, (color) => color === 'white');
      if (!whiteFace) return console.error('face não encontrada.');

      const axis = whiteFace;
      const cw = whiteFace === real.left ? 'cw' : 'acw';
      const acw = whiteFace === real.left ? 'acw' : 'cw';

      movements.push(rotate(cube, { axis, orientation: cw }));
      movements.push(rotate(cube, 'D2'));
      movements.push(rotate(cube, { axis, orientation: acw }));

      didNothing = false;
    }
  });

  return didNothing;
}

export function resolveWhiteVertices(cube: Cube, movements: Movement[]) {
  let count = 0;
  while (true) {
    const resolves = [
      resolveDownSliceFrontWhiteFace,
      resolveDownSliceDownWhiteFace,
      resolveUpSliceUpWhiteFace,
      resolveUpSlideFrontWhiteFace,
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
