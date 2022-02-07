// -------------------------------------------------------------------< helpers
import { cubieIs, hasColor, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, getCubie, getFace } from './utils';
// ---------------------------------------------------------------------< types
import { Cube, Movement } from '../../../domain/models';
// ============================================================================
function resolveUpSliceUpWhiteFace(cube: Cube, movements: Movement[]) {
  let resolved = true;

  mapCube(cube, 'up', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const upFaceIsWhite = cubie.up === 'white';

    if (isEdge && upFaceIsWhite) {
      const front = getFace(cubie, (color) => color !== 'white');
      if (!front) return console.error('face não encontrada.');

      const { real } = translateByAxis({ up: 'up', front });
      if (!real) return console.error('tradução impossível.');

      while (true) {
        const mdf = getCubie(cube, ['middle', 'down', real.front]);
        if (!mdf) return console.error('cubie não encontrado.');

        if (mdf.down !== 'white') break;

        movements.push(rotate(cube, 'D'));
      }

      const notWhiteFace = getFace(cubie, (color) => color !== 'white');
      if (!notWhiteFace) return console.error('face não encontrada.');

      movements.push(rotate(cube, { axis: notWhiteFace, orientation: 2 }));

      resolved = false;
    }
  });

  return resolved;
}

function resolveUpSliceFrontWhiteFace(cube: Cube, movements: Movement[]) {
  let resolved = true;

  mapCube(cube, 'up', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const frontFaceIsWhite = hasColor(cubie, 'white') && cubie.up !== 'white';

    if (isEdge && frontFaceIsWhite) {
      const front = getFace(cubie, (color) => color === 'white');
      if (!front) return console.error('face não encontrada.');

      const { real } = translateByAxis({ up: 'up', front });
      if (!real) return console.error('tradução impossível.');

      while (true) {
        const rdm = getCubie(cube, [real.right, 'down', 'middle']);
        const rdmHasntWhite = rdm && rdm.down !== 'white';

        if (rdmHasntWhite) {
          movements.push(rotate(cube, { axis: real.front, orientation: 'cw' }));
          movements.push(
            rotate(cube, { axis: real.right, orientation: 'acw' })
          );
          movements.push(
            rotate(cube, { axis: real.front, orientation: 'acw' })
          );

          resolved = false;
          break;
        }

        const ldm = getCubie(cube, [real.left, 'down', 'middle']);
        const ldmHasntWhite = ldm && ldm.down !== 'white';

        if (ldmHasntWhite) {
          movements.push(
            rotate(cube, { axis: real.front, orientation: 'acw' })
          );
          movements.push(rotate(cube, { axis: real.left, orientation: 'cw' }));
          movements.push(rotate(cube, { axis: real.front, orientation: 'cw' }));

          resolved = false;
          break;
        }

        movements.push(rotate(cube, 'D'));
      }
    }
  });

  return resolved;
}

function resolveMiddleSlice(cube: Cube, movements: Movement[]) {
  let resolved = true;

  mapCube(cube, 'middle y', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const hasWhite = hasColor(cubie, 'white');

    if (isEdge && hasWhite) {
      const notWhiteFace = getFace(cubie, (color) => color !== 'white');
      if (!notWhiteFace) return console.error('face não encontrada.');

      const { real } = translateByAxis({ up: 'up', front: notWhiteFace });
      if (!real) return console.error('tradução impossível.');

      while (true) {
        const mdf = getCubie(cube, ['middle', 'down', real.front]);
        const mdfDownIsWhite = mdf && mdf.down === 'white';

        if (mdfDownIsWhite) movements.push(rotate(cube, 'D'));
        else break;
      }

      const whiteFace = getFace(cubie, (color) => color === 'white');
      if (!whiteFace) return console.error('face não encontrada.');

      const orientation = whiteFace === real.left ? 'acw' : 'cw';
      movements.push(rotate(cube, { axis: real.front, orientation }));

      resolved = false;
    }
  });

  return resolved;
}

function resolveDownSlice(cube: Cube, movements: Movement[]) {
  let resolved = true;

  mapCube(cube, 'down', (cubie) => {
    const isEdge = cubieIs('edge', cubie);
    const hasntDownWhite = hasColor(cubie, 'white') && cubie.down !== 'white';

    if (isEdge && hasntDownWhite) {
      const front = getFace(cubie, (color) => color === 'white');
      if (!front) return console.error('face não encontrada.');

      const { real } = translateByAxis({ up: 'up', front });
      if (!real) return console.error('tradução impossível.');

      movements.push(rotate(cube, { axis: real.front, orientation: 'acw' }));
      movements.push(rotate(cube, 'D'));
      movements.push(rotate(cube, { axis: real.right, orientation: 'acw' }));

      resolved = false;
    }
  });

  return resolved;
}

function flipAllEdgeCubiesToUp(cube: Cube, movements: Movement[]) {
  mapCube(cube, 'middle y', (cubie) => {
    const isFace = cubieIs('face', cubie);

    if (isFace) {
      const [front, color] = cubieEntries(cubie, ([, color]) => color)[0];
      if (!color) return console.error('cor não encontrada.');

      const { real } = translateByAxis({ up: 'up', front });
      if (!real) return console.error('tradução impossível.');

      while (true) {
        const mdf = getCubie(cube, ['middle', 'down', real.front]);
        if (!mdf) return console.error('cubie não encontrado.');

        const hasWhite = hasColor(mdf, 'white');
        const sameColor = !!cubieEntries(mdf, ([, _color]) => _color === color)
          .length;

        if (hasWhite && sameColor) break;

        movements.push(rotate(cube, 'D'));
      }

      movements.push(rotate(cube, { axis: front, orientation: 2 }));
    }
  });
}

export function resolveWhiteEdges(cube: Cube, movements: Movement[]) {
  let count = 0;

  while (true) {
    const resolves = [
      resolveUpSliceUpWhiteFace,
      resolveUpSliceFrontWhiteFace,
      resolveMiddleSlice,
      resolveDownSlice,
    ].map((callback) => callback(cube, movements));

    count++;
    if (count > 15) {
      console.error('infinity loop');
      break;
    }

    if (resolves.some((resolved) => !resolved)) continue;

    flipAllEdgeCubiesToUp(cube, movements);

    break;
  }

  return movements;
}
