// ---------------------------------------------------------------------< types
import { CubieViewProps } from './types';
// ============================================================================
export function CubieView(props: CubieViewProps) {
  const { faces } = props;

  function renderFaces() {
    return faces.map(({ position, rotation, color }, i) => {
      return (
        <mesh
          key={i}
          position={position}
          rotation={rotation}
          scale={color ? 0.98 : 1}
        >
          <planeBufferGeometry attach='geometry' />
          <meshLambertMaterial attach='material' color={color ?? 'black'} />
        </mesh>
      );
    });
  }

  return <>{renderFaces()}</>;
}
