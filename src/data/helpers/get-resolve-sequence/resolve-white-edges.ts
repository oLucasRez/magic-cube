// -------------------------------------------------------------------< helpers
import { cubieIs, hasColor, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, getCubie, getFace, loop } from './utils';
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

      const t = translateByAxis({ up: 'up', front });

      loop((stop) => {
        const mdf = getCubie(cube, ['middle', 'down', t.front]);

        if (mdf.down !== 'white') return stop;

        movements.push(...rotate(cube, t).do('D'));
      });

      const notWhiteFace = getFace(cubie, (color) => color !== 'white');
      if (!notWhiteFace) return console.error('face não encontrada.');

      movements.push(
        ...rotate(cube).do({ axis: notWhiteFace, orientation: 2 })
      );

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

      const t = translateByAxis({ up: 'up', front });

      loop((stop) => {
        const rdm = getCubie(cube, [t.right, 'down', 'middle']);
        const rdmHasntWhite = rdm && rdm.down !== 'white';

        if (rdmHasntWhite) {
          movements.push(...rotate(cube, t).do('F', 'R`', 'F`'));

          resolved = false;
          return stop;
        }

        const ldm = getCubie(cube, [t.left, 'down', 'middle']);
        const ldmHasntWhite = ldm && ldm.down !== 'white';

        if (ldmHasntWhite) {
          movements.push(...rotate(cube, t).do('F`', 'L', 'F'));

          resolved = false;
          return stop;
        }

        movements.push(...rotate(cube, t).do('D'));
      });
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

      const t = translateByAxis({ up: 'up', front: notWhiteFace });

      loop((stop) => {
        const mdf = getCubie(cube, ['middle', 'down', t.front]);
        const mdfDownIsWhite = mdf && mdf.down === 'white';

        if (mdfDownIsWhite) movements.push(...rotate(cube, t).do('D'));
        else return stop;
      });

      const whiteFace = getFace(cubie, (color) => color === 'white');
      if (!whiteFace) return console.error('face não encontrada.');

      const movement = whiteFace === t.left ? 'F`' : 'F';
      movements.push(...rotate(cube, t).do(movement));

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

      const t = translateByAxis({ up: 'up', front });

      movements.push(...rotate(cube, t).do('F`', 'D', 'R`'));

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

      const t = translateByAxis({ up: 'up', front });

      loop((stop) => {
        const mdf = getCubie(cube, ['middle', 'down', t.front]);

        const hasWhite = hasColor(mdf, 'white');
        const sameColor = !!cubieEntries(mdf, ([, _color]) => _color === color)
          .length;

        if (hasWhite && sameColor) return stop;

        movements.push(...rotate(cube, t).do('D'));
      });

      movements.push(...rotate(cube).do({ axis: front, orientation: 2 }));
    }
  });
}

export function resolveWhiteEdges(cube: Cube, movements: Movement[]) {
  loop((stop) => {
    const resolves = [
      resolveUpSliceUpWhiteFace,
      resolveUpSliceFrontWhiteFace,
      resolveMiddleSlice,
      resolveDownSlice,
    ].map((callback) => callback(cube, movements));

    if (resolves.some((resolved) => !resolved)) return;

    flipAllEdgeCubiesToUp(cube, movements);

    return stop;
  });

  return movements;
}
