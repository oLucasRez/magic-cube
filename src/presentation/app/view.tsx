// ----------------------------------------------------------------------< deps
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
// ----------------------------------------------------------------< components
import { Cube } from '../components';
// ---------------------------------------------------------------------< types
import './styles.css';
// ============================================================================
export function AppView() {
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

      <Cube />
    </Canvas>
  );
}
