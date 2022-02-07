// -------------------------------------------------------------------< helpers
import { cubieIs, mapCube, rotate, translateByAxis } from '..';
// ---------------------------------------------------------------------< utils
import { cubieEntries, getCubie, getFace } from './utils';
// ---------------------------------------------------------------------< types
import { Cube, CubieAxes, Movement } from '../../../domain/models';
// ============================================================================
// function resolve(cube: Cube, movements: Movement[]) {
//   let didNothing = true;

//   const { real } = translateByAxis({ up: 'down', front: 'front' });

//   const colorsMap: any = {};
//   mapCube(cube, real.up, (cubie, [i, , k]) => {
//     const isVertex =
//       cubieIs('vertex', cubie) && i !== 'middle' && k !== 'middle';

//     if (isVertex) {
//       colorsMap[i] =
//         !colorsMap[i] || colorsMap[i] === cubie[i] ? cubie[i] : 'nope';
//       colorsMap[k] =
//         !colorsMap[k] || colorsMap[k] === cubie[k] ? cubie[k] : 'nope';
//     }
//   });

//   const pairs = Object.entries(colorsMap)
//     .filter(([, color]) => color !== 'nope')
//     .map(([axis]) => axis);

//   if (pairs.length === 1 && pairs[0] !== 'back') {
//     movements.push(rotate(cube, 'U', real));

//     didNothing = false;

//     return didNothing;
//   }

//   if (pairs.length <= 1) {
//     movements.push(rotate(cube, 'R`', real));
//     movements.push(rotate(cube, 'F', real));
//     movements.push(rotate(cube, 'R`', real));
//     movements.push(rotate(cube, 'B2', real));
//     movements.push(rotate(cube, 'R', real));
//     movements.push(rotate(cube, 'F`', real));
//     movements.push(rotate(cube, 'R`', real));
//     movements.push(rotate(cube, 'B2', real));
//     movements.push(rotate(cube, 'R2', real));

//     didNothing = false;

//     return didNothing;
//   }

//   // quando n tem nenhum par ou quando so tem 1 par atras
//   // R' F R' B2 R F' R' B2 R2

//   return didNothing;
// }

export function resolveYellowBorders(cube: Cube, movements: Movement[]) {
  // let count = 0;
  // while (true) {
  //   const resolves = [resolve].map((callback) => callback(cube, movements));

  //   count++;
  //   if (count > 100) {
  //     console.error('infinity loop');
  //     break;
  //   }

  //   if (resolves.some((resolved) => !resolved)) continue;

  //   break;
  // }

  // resolve(cube, movements);

  return movements;
}
