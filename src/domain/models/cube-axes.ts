// ---------------------------------------------------------------------< types
import { XCubieAxes, YCubieAxes, ZCubieAxes } from '.';
// ============================================================================
export type XCubeAxes = XCubieAxes | 'middle_x';

export type YCubeAxes = YCubieAxes | 'middle_y';

export type ZCubeAxes = ZCubieAxes | 'middle_z';

export type CubeAxes = XCubeAxes | YCubeAxes | ZCubeAxes;
