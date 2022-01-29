// ---------------------------------------------------------------------< types
import { MeshProps } from '@react-three/fiber';
import { Cubie } from '../../../domain/models';
// ============================================================================
interface CubieBaseProps extends MeshProps {}

export interface CubieProps extends CubieBaseProps {
  cubie: Cubie;
}

export interface CubieViewProps extends CubieBaseProps {
  faces: {
    position: [number, number, number];
    rotation: [number, number, number];
    color: string | null;
  }[];
}
