// ---------------------------------------------------------------------< types
import { Cubie } from '../../domain/models';
// ============================================================================
export function cubieIs(shape: 'face' | 'edge' | 'vertex', cubie: Cubie) {
  const map = { face: 1, edge: 2, vertex: 3 };

  return Object.values(cubie).filter((color) => color).length === map[shape];
}
