// ---------------------------------------------------------------------< types
import { composeMovement, extractInfoFromMovement } from '..';
import { Movement, Orientation } from '../../../domain/models';
// ============================================================================
export function compressSequence(movements: Movement[]) {
  const compressed: Movement[] = [];

  while (true) {
    const nextMovement = movements.shift();
    const lastMovement = compressed.pop();
    let result: Movement | null = null;

    if (nextMovement) {
      if (lastMovement) {
        const next = extractInfoFromMovement(nextMovement);
        const last = extractInfoFromMovement(lastMovement);

        if (next.axis === last.axis) {
          const { axis } = next;

          const lastOrientation: Orientation | 2 =
            last.times === 2 ? 2 : last.orientation;
          const nextOrientation: Orientation | 2 =
            next.times === 2 ? 2 : next.orientation;

          if (lastOrientation === 'cw') {
            if (nextOrientation === 'cw') result = composeMovement(axis, 2);
            else if (nextOrientation === 'acw') result = null;
            else result = composeMovement(axis, 'acw');
          } else if (lastOrientation === 'acw') {
            if (nextOrientation === 'acw') result = composeMovement(axis, 2);
            else if (nextOrientation === 'cw') result = null;
            else result = composeMovement(axis, 'cw');
          } else {
            if (nextOrientation === 'cw') result = composeMovement(axis, 'acw');
            else if (nextOrientation === 'acw')
              result = composeMovement(axis, 'cw');
            else result = null;
          }
        } else {
          compressed.push(lastMovement);
          result = nextMovement;
        }
      } else result = nextMovement;
    }

    if (result) compressed.push(result);
    if (!movements.length) break;
  }

  return compressed;
}
