import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
// import { makeCube } from '../../main';
import { mapCube } from '../../data/helpers/map-cube';
import { initCube } from '../../data/helpers/init-cube';
import './styles.css';
// ============================================================================
function Box(props: any) {
  const { position, color } = props;

  return (
    <mesh position={position}>
      <boxBufferGeometry attach='geometry' />
      <meshLambertMaterial attach='material' color={color} />
    </mesh>
  );
}

export function AppView() {
  function renderBoxes() {
    const cube = initCube();

    const map = {
      right: -1,
      down: -1,
      back: -1,
      middle: 0,
      left: 1,
      up: 1,
      front: 1,
    };

    return mapCube(cube, 'up', (_, [x, y, z]) => (
      <Box position={[map[x], map[y], map[z]]} color='orange' />
    ));
  }

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
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Box position={[0, 0, 0]} color='orange' />
      {renderBoxes()}
    </Canvas>
  );
}
