// -------------------------------------------------------------------< helpers
import { cubieIs } from '../..';
// ---------------------------------------------------------------------< utils
import { cubieEntries } from '.';
// ---------------------------------------------------------------------< types
import { Cubie } from '../../../../domain/models';
// ============================================================================
export function logCubie(cubie: Cubie) {
  const colors = cubieEntries(cubie, ([, color]) => color).map(
    ([, color]) => color
  );

  let _type = '';
  if (cubieIs('face', cubie)) _type = '[face]';
  if (cubieIs('edge', cubie)) _type = '[edge]';
  if (cubieIs('vertex', cubie)) _type = '[vertex]';

  return `(${_type} ${colors.join(' ')})`;
}
