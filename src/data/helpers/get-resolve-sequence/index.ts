// -------------------------------------------------------------------< helpers
import { resolveWhiteEdges } from './resolve-white-edges';
import { resolveWhiteVertices } from './resolve-white-vertices';
// ---------------------------------------------------------------------< utils
import { deepCopy } from '../../utils';
// ---------------------------------------------------------------------< types
import { Cube, Movement } from '../../../domain/models';
// ============================================================================
export function getResolveSequence(cube: Cube) {
  const cubeCopy = deepCopy(cube);

  const movements = [resolveWhiteEdges, resolveWhiteVertices].reduce(
    (prevMovements, resolve) => resolve(cubeCopy, prevMovements),
    [] as Movement[]
  );

  console.log('movements', ...movements);

  return movements;
}
