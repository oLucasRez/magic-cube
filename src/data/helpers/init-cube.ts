// ---------------------------------------------------------------------< enums
import { Colors } from '../../domain/enums';
// ---------------------------------------------------------------------< types
import { CubeAxes, Cubie } from '../../domain/models';
// ============================================================================
function newCube() {
  const cube: Cubie[][][] = [];

  for (let i = 0; i < 3; i++) {
    cube.push([]);
    for (let j = 0; j < 3; j++) {
      cube[i].push([]);
      for (let k = 0; k < 3; k++) cube[i][j].push({});
    }
  }

  return cube;
}

function mapCube(
  cube: Cubie[][][],
  axes: CubeAxes[],
  callback: (cubies: Cubie[]) => void
) {
  const xAxes: Partial<Record<CubeAxes, number>> = {
    left: 0,
    middle_x: 1,
    right: 2,
  };
  const yAxes: Partial<Record<CubeAxes, number>> = {
    up: 0,
    middle_y: 1,
    down: 2,
  };
  const zAxes: Partial<Record<CubeAxes, number>> = {
    front: 0,
    middle_z: 1,
    back: 2,
  };

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++) {
        const cubies = axes.map((axis) => {
          const x = xAxes[axis] ?? i;
          const y = yAxes[axis] ?? j;
          const z = zAxes[axis] ?? k;

          return cube[x][y][z];
        });

        callback(cubies);
      }
}

function colorfyCube(cube: Cubie[][][]) {
  mapCube(
    cube,
    ['up', 'down', 'right', 'left', 'front', 'back'],
    ([upCubie, downCubie, rightCubie, leftCubie, frontCubie, backCubie]) => {
      upCubie.up = Colors.WHITE;
      downCubie.down = Colors.YELLOW;
      rightCubie.right = Colors.RED;
      leftCubie.left = Colors.ORANGE;
      frontCubie.front = Colors.GREEN;
      backCubie.back = Colors.BLUE;
    }
  );
}

function connectCubies(cube: Cubie[][][]) {
  mapCube(
    cube,
    ['left', 'middle_x', 'right'],
    ([leftCubie, middleCubie, rightCubie]) => {
      leftCubie.right = rightCubie.left = middleCubie;
      middleCubie.left = leftCubie;
      middleCubie.right = rightCubie;
    }
  );
  mapCube(
    cube,
    ['up', 'middle_y', 'down'],
    ([upCubie, middleCubie, downCubie]) => {
      upCubie.down = downCubie.up = middleCubie;
      middleCubie.up = upCubie;
      middleCubie.down = downCubie;
    }
  );
  mapCube(
    cube,
    ['front', 'middle_z', 'back'],
    ([frontCubie, middleCubie, backCubie]) => {
      frontCubie.back = backCubie.front = middleCubie;
      middleCubie.front = frontCubie;
      middleCubie.back = backCubie;
    }
  );
}

export function initCube() {
  const cube = newCube();

  colorfyCube(cube);
  connectCubies(cube);

  return cube[1][1][1];
}
