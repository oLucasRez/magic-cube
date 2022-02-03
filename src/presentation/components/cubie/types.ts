// ---------------------------------------------------------------------< types
import { MeshProps } from '@react-three/fiber';
import { Colors, Cubie } from '../../../domain/models';
// ============================================================================
interface CubieBaseProps extends MeshProps {}

export interface CubieProps extends CubieBaseProps {
  cubie: Cubie;
}

export interface CubieViewProps extends CubieBaseProps {
  faces: {
    position: [number, number, number];
    rotation: [number, number, number];
    color: Colors | null;
  }[];
}
