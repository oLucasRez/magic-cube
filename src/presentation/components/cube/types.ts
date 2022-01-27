// ---------------------------------------------------------------------< types
import { Cube } from '../../../domain/models';
// ============================================================================
interface CubeBaseProps {}

export interface CubeProps extends CubeBaseProps {}

export interface CubeViewProps extends CubeBaseProps {
  cube: Cube;
}
