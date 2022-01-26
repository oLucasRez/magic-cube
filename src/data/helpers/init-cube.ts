// -------------------------------------------------------------------< helpers
import { mapCube } from '.';
// ---------------------------------------------------------------------< enums
import { Colors } from '../../domain/enums';
// ---------------------------------------------------------------------< types
import { Cube, XCubeAxes, YCubeAxes, ZCubeAxes } from '../../domain/models';
// ============================================================================
function newCube(): Cube {
  const x: XCubeAxes[] = ['left', 'middle', 'right'];
  const y: YCubeAxes[] = ['up', 'middle', 'down'];
  const z: ZCubeAxes[] = ['front', 'middle', 'back'];

  const cube: any = {};

  x.forEach((i) =>
    y.forEach((j) =>
      z.forEach((k) => {
        if (!cube[i]) cube[i] = {};
        if (!cube[i][j]) cube[i][j] = {};
        if (!cube[i][j][k]) cube[i][j][k] = {};
      })
    )
  );

  return cube;
}

function colorfyCube(cube: Cube) {
  mapCube(cube, 'up', (cubie) => (cubie.up = Colors.WHITE));
  mapCube(cube, 'down', (cubie) => (cubie.down = Colors.YELLOW));
  mapCube(cube, 'right', (cubie) => (cubie.right = Colors.RED));
  mapCube(cube, 'left', (cubie) => (cubie.left = Colors.ORANGE));
  mapCube(cube, 'front', (cubie) => (cubie.front = Colors.GREEN));
  mapCube(cube, 'back', (cubie) => (cubie.back = Colors.BLUE));
}

export function initCube() {
  const cube = newCube();

  colorfyCube(cube);

  return cube;
}
