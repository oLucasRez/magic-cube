// ---------------------------------------------------------------------< enums
import { Colors } from '../../domain/enums';
// ---------------------------------------------------------------------< types
import {
  CubeAxes,
  Cube,
  Cubie,
  XCubeAxes,
  YCubeAxes,
  ZCubeAxes,
  CubieAxes,
  XCubieAxes,
  ZCubieAxes,
} from '../../domain/models';
// ============================================================================
export class CubeHelper {
  cube: Cube = [];

  constructor() {
    this.newCube();
    this.colorfyCube();
    this.connectCubies();

    this.rotateUp();
  }

  private newCube() {
    for (let i = 0; i < 3; i++) {
      this.cube.push([]);
      for (let j = 0; j < 3; j++) {
        this.cube[i].push([]);
        for (let k = 0; k < 3; k++) {
          this.cube[i][j].push({});
        }
      }
    }
  }

  private colorfyCube() {
    this.mapCube(
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

  private connectCubies() {
    this.mapCube(
      ['left', 'middle_x', 'right'],
      ([leftCubie, middleCubie, rightCubie]) => {
        leftCubie.right = rightCubie.left = middleCubie;
        middleCubie.left = leftCubie;
        middleCubie.right = rightCubie;
      }
    );
    this.mapCube(
      ['up', 'middle_y', 'down'],
      ([upCubie, middleCubie, downCubie]) => {
        upCubie.down = downCubie.up = middleCubie;
        middleCubie.up = upCubie;
        middleCubie.down = downCubie;
      }
    );
    this.mapCube(
      ['front', 'middle_z', 'back'],
      ([frontCubie, middleCubie, backCubie]) => {
        frontCubie.back = backCubie.front = middleCubie;
        middleCubie.front = frontCubie;
        middleCubie.back = backCubie;
      }
    );
  }

  mapCube(axes: CubeAxes[], callback: (cubies: Cubie[]) => void) {
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

            return this.cube[x][y][z];
          });

          callback(cubies);
        }
  }

  getCubie(x: XCubeAxes, y: YCubeAxes, z: ZCubeAxes) {
    const xAxes: Record<XCubeAxes, number> = { left: 0, middle_x: 1, right: 2 };
    const yAxes: Record<YCubeAxes, number> = { up: 0, middle_y: 1, down: 2 };
    const zAxes: Record<ZCubeAxes, number> = { front: 0, middle_z: 1, back: 2 };

    const cubie = this.cube[xAxes[x]][yAxes[y]][zAxes[z]];

    return cubie;
  }

  isVertex(cubie: Cubie) {
    const countColors = Object.values(cubie).filter(
      (value) => typeof value === 'string'
    ).length;

    return countColors === 3;
  }

  isEdge(cubie: Cubie) {
    const countColors = Object.values(cubie).filter(
      (value) => typeof value === 'string'
    ).length;

    return countColors === 2;
  }

  isFace(cubie: Cubie) {
    const countColors = Object.values(cubie).filter(
      (value) => typeof value === 'string'
    ).length;

    return countColors === 1;
  }

  isCubie(connection: Cubie | Colors) {
    return typeof connection !== 'string';
  }

  isColor(connection: Cubie | Colors) {
    return typeof connection === 'string';
  }

  connect2CubiesInX(leftCubie: Cubie, rightCubie: Cubie) {
    leftCubie.right = rightCubie;
    rightCubie.left = leftCubie;
  }

  connect2CubiesInY(upCubie: Cubie, downCubie: Cubie) {
    upCubie.down = downCubie;
    downCubie.up = upCubie;
  }

  connect2CubiesInZ(frontCubie: Cubie, backCubie: Cubie) {
    frontCubie.back = backCubie;
    backCubie.front = frontCubie;
  }

  private rotateCubie(
    axis: 'x' | 'y' | 'z',
    side: 'clockwise' | 'counterclockwise'
  ) {}

  rotateUp() {
    const flow: [XCubieAxes, ZCubieAxes][] = [
      ['left', 'front'],
      ['right', 'front'],
      ['right', 'back'],
      ['left', 'back'],
    ];

    const upVertices = flow.map(([x, z]) => this.getCubie(x, 'up', z));
    const middleVertices = flow.map(([x, z]) =>
      this.getCubie(x, 'middle_y', z)
    );

    console.log({ upVertices, middleVertices });

    // for (let i = 0; i < flow.length; i++) {
    //   this.connect2CubiesInY(
    //     upVertices[i],
    //     middleVertices[(i + 1) % flow.length]
    //   );
    // }

    // // vertices
    // const lufCubie = this.getCubie('left', 'up', 'front');
    // const rufCubie = this.getCubie('right', 'up', 'front');
    // const rubCubie = this.getCubie('right', 'up', 'back');
    // const lubCubie = this.getCubie('left', 'up', 'back');

    // const lmfCubie = lufCubie.down;
    // const rmfCubie = rufCubie.down;
    // const rmbCubie = rubCubie.down;
    // const lmbCubie = lubCubie.down;

    // lufCubie.down = rmfCubie;
    // rufCubie.down = rmbCubie;
    // rubCubie.down = lmbCubie;
    // lubCubie.down = lmfCubie;

    // (lmfCubie as Cubie).up = lubCubie;
    // (rmfCubie as Cubie).up = lufCubie;
    // (rmbCubie as Cubie).up = rufCubie;
    // (lmbCubie as Cubie).up = rubCubie;

    // // edges
    // const ufCubie = this.getCubie('middle_x', 'up', 'front');
    // const ruCubie = this.getCubie('right', 'up', 'middle_z');
    // const ubCubie = this.getCubie('middle_x', 'up', 'back');
    // const luCubie = this.getCubie('left', 'up', 'middle_z');

    // const mfCubie = ufCubie.down;
    // const rmCubie = ruCubie.down;
    // const mbCubie = ubCubie.down;
    // const lmCubie = luCubie.down;

    // ufCubie.down = rmCubie;
    // ruCubie.down = mbCubie;
    // ubCubie.down = lmCubie;
    // luCubie.down = mfCubie;

    // (mfCubie as Cubie).up = luCubie;
    // (rmCubie as Cubie).up = ufCubie;
    // (mbCubie as Cubie).up = ruCubie;
    // (lmCubie as Cubie).up = ubCubie;

    // // face
    // const uCubie = this.getCubie('middle_x', 'up', 'middle_z');

    // uCubie.front = ufCubie;
    // uCubie.right = ruCubie;
    // uCubie.back = ubCubie;
    // uCubie.left = luCubie;

    // const rotation: CubieAxes[] = ['right', 'back', 'left', 'front'];

    // for(let i, j = 0; j < 8; j++) {

    // }

    // this.mapCube(['left', 'middle_x'], ([leftCubie, middleCubie]) => {
    //   if(this.isVertex(leftCubie)) {
    //     i = (i+1)%rotation.length;

    //     leftCubie[rotation[i]];
    //   }
    // });
  }
}
