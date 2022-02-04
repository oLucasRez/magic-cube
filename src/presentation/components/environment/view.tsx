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
    <Canvas onClick={() => console.log('sdasd')}>
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
        <MovementsContextProvider shuffleLength={10} clock_ms={50} autoStart>
          {children}
        </MovementsContextProvider>
      </CubeContextProvider>
    </Canvas>
  );
}
