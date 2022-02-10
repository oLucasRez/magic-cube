// ----------------------------------------------------------------------< deps
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
// ------------------------------------------------------------------< contexts
import { CubeContextProvider, MovementsContextProvider } from '../../contexts';
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

      <CubeContextProvider>
        <MovementsContextProvider shuffleLength={21} clock_ms={100} autoStart>
          {children}
        </MovementsContextProvider>
      </CubeContextProvider>
    </Canvas>
  );
}
