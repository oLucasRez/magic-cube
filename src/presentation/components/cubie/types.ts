// ---------------------------------------------------------------------< types
import { Cubie, XCubeAxes, YCubeAxes, ZCubeAxes } from '../../../domain/models';
// ============================================================================
interface CubieBaseProps {}

export interface CubieProps extends CubieBaseProps {
  cubie: Cubie;
  address: [XCubeAxes, YCubeAxes, ZCubeAxes];
}

export interface CubieViewProps extends CubieBaseProps {
  faces: {
    position: [number, number, number];
    rotation: [number, number, number];
    color: string | null;
  }[];
}
