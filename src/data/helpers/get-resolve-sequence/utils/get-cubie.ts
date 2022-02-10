// ---------------------------------------------------------------------< types
import {
  Cube,
  CubeAxes,
  XCubeAxes,
  YCubeAxes,
  ZCubeAxes,
} from '../../../../domain/models';
// ============================================================================
export function getCubie(cube: Cube, coord: [CubeAxes, CubeAxes, CubeAxes]) {
  const [i, j, k] = coord;

  const xAxes: CubeAxes[] = ['left', 'right'];
  const yAxes: CubeAxes[] = ['up', 'down'];
  const zAxes: CubeAxes[] = ['front', 'back'];

  const x = xAxes.includes(i)
    ? i
    : xAxes.includes(j)
    ? j
    : xAxes.includes(k)
    ? k
    : 'middle';
  const y = yAxes.includes(i)
    ? i
    : yAxes.includes(j)
    ? j
    : yAxes.includes(k)
    ? k
    : 'middle';
  const z = zAxes.includes(i)
    ? i
    : zAxes.includes(j)
    ? j
    : zAxes.includes(k)
    ? k
    : 'middle';

  try {
    return cube[x as XCubeAxes][y as YCubeAxes][z as ZCubeAxes];
  } catch (e) {}

  throw new Error(`cubie[${x},${y},${z}] não encontrado`);
}
