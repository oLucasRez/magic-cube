// ---------------------------------------------------------------------< enums
import { Colors } from '../enums';
// ---------------------------------------------------------------------< types
import { CubieAxes } from '.';
// ============================================================================
export type Cubie = {
  [key in CubieAxes]?: Colors;
};
