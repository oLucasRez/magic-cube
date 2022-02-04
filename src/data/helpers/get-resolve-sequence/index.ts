// -------------------------------------------------------------------< helpers
import { resolveWhiteCross } from './resolve-white-cross';
// ---------------------------------------------------------------------< utils
import { deepCopy } from '../../utils';
// ---------------------------------------------------------------------< types
import { Cube, Movement } from '../../../domain/models';
// ============================================================================
export function getResolveSequence(cube: Cube) {
  const cubeCopy = deepCopy(cube);

  const movements = [resolveWhiteCross].reduce(
    (prevMovements, resolve) => resolve(cubeCopy, prevMovements),
    [] as Movement[]
  );

  console.log('movements', ...movements);

  return movements;
}
