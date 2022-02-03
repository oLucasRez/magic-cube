// ---------------------------------------------------------------------< types
import { Movement } from '../../domain/models';
// ============================================================================
function getAxis(movement: Movement | undefined) {
  if (!movement) return;

  const axis: string = movement
    .split('')
    .filter((char) => char !== '`' && char !== '2')[0];

  return axis;
}

export function getShuffleSequence(length: number) {
  const movs: Movement[] = [
    ...(['U', 'U`', 'U2'] as Movement[]),
    ...(['F', 'F`', 'F2'] as Movement[]),
    ...(['R', 'R`', 'R2'] as Movement[]),
    ...(['B', 'B`', 'B2'] as Movement[]),
    ...(['L', 'L`', 'L2'] as Movement[]),
    ...(['D', 'D`', 'D2'] as Movement[]),
  ];

  const shuffleArray: Movement[] = [];

  while (shuffleArray.length < length) {
    const i = Math.floor(Math.random() * movs.length);

    const mov = movs[i];
    const lastMov = shuffleArray[shuffleArray.length - 1];

    if (getAxis(mov) !== getAxis(lastMov)) shuffleArray.push(mov);
  }

  return shuffleArray;
}
