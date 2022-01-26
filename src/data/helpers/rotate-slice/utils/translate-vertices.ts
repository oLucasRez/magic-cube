// -----------------------------------------------------------------< constants
import { verticesFlow } from '../constants';
// ---------------------------------------------------------------------< types
import {
  Cube,
  CubieAxes,
  Orientation,
  XCubieAxes,
  YCubieAxes,
  ZCubieAxes,
} from '../../../../domain/models';
// ============================================================================
type Flow = {
  [X in XCubieAxes]: {
    [Y in YCubieAxes]: {
      [Z in ZCubieAxes]: {
        [W in CubieAxes]?: Record<
          Orientation,
          [XCubieAxes, YCubieAxes, ZCubieAxes]
        >;
      };
    };
  };
};

export function translateVertices(
  cube: Cube,
  axis: CubieAxes,
  orientation: Orientation
) {
  const cubeCopy = Object.assign({}, cube);

  const x: XCubieAxes[] = ['left', 'right'];
  const y: YCubieAxes[] = ['up', 'down'];
  const z: ZCubieAxes[] = ['front', 'back'];

  const flow: Flow = verticesFlow;

  x.forEach((prevX) => {
    y.forEach((prevY) => {
      z.forEach((prevZ) => {
        const next = flow[prevX][prevY][prevZ][axis]?.[orientation];

        if (next) {
          const [nextX, nextY, nextZ] = next;

          cube[nextX][nextY][nextZ] = cubeCopy[prevX][prevY][prevZ];
        }
      });
    });
  });
}
