// ----------------------------------------------------------------------< deps
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
// ------------------------------------------------------------------< contexts
import { CubeContextProvider, RotationContextProvider } from '../../contexts';
// ---------------------------------------------------------------------< types
import { EnvironmentViewProps } from './types';
// ============================================================================
export function EnvironmentView(props: EnvironmentViewProps) {
  const { children } = props;

  return (
    <Canvas>
      <OrbitControls
        makeDefault
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
      />
      <Stars />
      <ambientLight intensity={1} />

      <RotationContextProvider shuffleLength={1} clock_ms={500} autoStart>
        <CubeContextProvider>{children}</CubeContextProvider>
      </RotationContextProvider>
    </Canvas>
  );
}
