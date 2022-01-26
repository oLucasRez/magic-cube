// ---------------------------------------------------------------------< types
import { Cubie, XCubeAxes, YCubeAxes, ZCubeAxes } from '.';
// ============================================================================
export type Cube = Record<
  XCubeAxes,
  Record<YCubeAxes, Record<ZCubeAxes, Cubie>>
>;
