// ---------------------------------------------------------------------< types
import {
  Cube,
  Cubie,
  CubieAxes,
  XCubeAxes,
  YCubeAxes,
  ZCubeAxes,
} from '../../domain/models';
// ============================================================================
export function mapCube<ReturnType>(
  cube: Cube,
  axis: CubieAxes,
  callback: (
    cubie: Cubie,
    address: [XCubeAxes, YCubeAxes, ZCubeAxes]
  ) => ReturnType
) {
  const x: XCubeAxes[] = ['left', 'middle', 'right'];
  const y: YCubeAxes[] = ['up', 'middle', 'down'];
  const z: ZCubeAxes[] = ['front', 'middle', 'back'];

  const _return: ReturnType[] = [];

  x.forEach((i) =>
    y.forEach((j) =>
      z.forEach((k) => {
        (axis === i || axis === j || axis === k) &&
          _return.push(callback(cube[i][j][k], [i, j, k]));
      })
    )
  );

  return _return;
}
