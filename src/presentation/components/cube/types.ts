// ---------------------------------------------------------------------< types
import { CubieProps } from '../cubie/types';
// ============================================================================
interface CubeBaseProps {}

export interface CubeProps extends CubeBaseProps {}

export interface CubeViewProps extends CubeBaseProps {
  staticCubies: CubieProps[];
  dynamicCubies: CubieProps[];
}
