// ---------------------------------------------------------------------< types
import { mapCube } from '../../../data/helpers';
import { Cubie } from '../cubie';
import { CubeViewProps } from './types';
// ============================================================================
export function CubeView(props: CubeViewProps) {
  const { cube } = props;

  function renderCubies() {
    return mapCube(cube, 'all', (cubie, address, i) => (
      <Cubie key={i} cubie={cubie} address={address} />
    ));
  }

  return <>{renderCubies()}</>;
}
