// -----------------------------------------------------------------< constants
import { edgesFlow } from '../constants';
// ---------------------------------------------------------------------< types
import {
  CubeAxes,
  CubieAxes,
  Orientation,
  XCubeAxes,
  YCubeAxes,
  ZCubeAxes,
  Cube,
} from '../../../../domain/models';
// ============================================================================
type Flow = {
  [X in CubeAxes]?: {
    [Y in CubeAxes]?: {
      [Z in CubeAxes]?: {
        [W in CubieAxes]?: Record<
          Orientation,
          [XCubeAxes, YCubeAxes, ZCubeAxes]
        >;
      };
    };
  };
};

export function translateEdges(
  cube: Cube,
  axis: CubieAxes,
  orientation: Orientation
) {
  const cubeCopy = Object.assign({}, cube);

  const x: XCubeAxes[] = ['left', 'middle', 'right'];
  const y: YCubeAxes[] = ['up', 'middle', 'down'];
  const z: ZCubeAxes[] = ['front', 'middle', 'back'];

  const flow: Flow = edgesFlow;

  x.forEach((prevX) => {
    y.forEach((prevY) => {
      z.forEach((prevZ) => {
        const next = flow[prevX]?.[prevY]?.[prevZ]?.[axis]?.[orientation];

        if (next) {
          const [nextX, nextY, nextZ] = next;

          cube[nextX][nextY][nextZ] = cubeCopy[prevX][prevY][prevZ];
        }
      });
    });
  });
}
