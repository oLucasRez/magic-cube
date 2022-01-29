// ----------------------------------------------------------------< components
import { Cubie } from '../cubie';
// ---------------------------------------------------------------------< types
import { CubeViewProps } from './types';
// ============================================================================
export function CubeView(props: CubeViewProps) {
  const { staticCubies, dynamicCubies } = props;

  function renderStaticCubies() {
    return staticCubies.map((cubieProps, key) => (
      <Cubie key={key} {...cubieProps} />
    ));
  }

  function renderDynamicCubies() {
    return (
      <group>
        {dynamicCubies.map((cubieProps, key) => (
          <Cubie key={key} {...cubieProps} />
        ))}
      </group>
    );
  }

  return (
    <>
      {renderStaticCubies()}
      {renderDynamicCubies()}
    </>
  );
}
