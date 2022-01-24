import { initCube, rotateCubie } from '../data/helpers';
import { CubeHelper } from '../data/helpers/cube-helper';

export function makeCube() {
  // const cubeHelper = new CubeHelper();

  const cube = initCube();

  console.log(cube);

  rotateCubie(cube, 'up', 'acw');

  console.log(cube);
}
