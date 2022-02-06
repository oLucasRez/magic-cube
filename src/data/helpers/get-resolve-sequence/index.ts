// -------------------------------------------------------------------< helpers
import { resolveWhiteEdges } from './resolve-white-edges';
import { resolveWhiteVertices } from './resolve-white-vertices';
import { resolveMiddleEdges } from './resolve-middle-edges';
import { compressSequence } from './compress-sequence';
// ---------------------------------------------------------------------< utils
import { deepCopy } from '../../utils';
// ---------------------------------------------------------------------< types
import { Cube, Movement } from '../../../domain/models';
// ============================================================================
export function getResolveSequence(cube: Cube) {
  const cubeCopy = deepCopy(cube);

  const movements = [
    resolveWhiteEdges,
    resolveWhiteVertices,
    resolveMiddleEdges,
  ].reduce(
    (prevMovements, resolve) => resolve(cubeCopy, prevMovements),
    [] as Movement[]
  );

  const compressed = compressSequence(movements);

  console.log('compressed', ...compressed);

  return compressed;
}
