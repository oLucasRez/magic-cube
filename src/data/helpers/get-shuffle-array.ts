// ---------------------------------------------------------------------< types
import { Rotation } from '../../domain/models';
// ============================================================================
function getAxis(rotation: Rotation | undefined) {
  if (!rotation) return;

  const axis: string = rotation
    .split('')
    .filter((char) => char !== '`' && char !== '2')[0];

  return axis;
}

export function getShuffleArray() {
  const movs: Rotation[] = [
    ...(['U', 'U`', 'U2'] as Rotation[]),
    ...(['F', 'F`', 'F2'] as Rotation[]),
    ...(['R', 'R`', 'R2'] as Rotation[]),
    ...(['B', 'B`', 'B2'] as Rotation[]),
    ...(['L', 'L`', 'L2'] as Rotation[]),
    ...(['D', 'D`', 'D2'] as Rotation[]),
  ];

  const shuffleArray: Rotation[] = [];

  while (shuffleArray.length < 21) {
    const i = Math.floor(Math.random() * movs.length);

    const mov = movs[i];
    const lastMov = shuffleArray[shuffleArray.length - 1];

    if (getAxis(mov) !== getAxis(lastMov)) shuffleArray.push(mov);
  }

  return shuffleArray;
}
