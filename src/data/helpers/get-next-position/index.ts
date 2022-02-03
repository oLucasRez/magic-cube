// -------------------------------------------------------------------< helpers
import { extractInfoFromMovement } from '..';
// -----------------------------------------------------------------< constants
import { edgesFlow, verticesFlow } from './constants';
// ---------------------------------------------------------------------< types
import {
  CubeAxes,
  Cubie,
  CubieAxes,
  Orientation,
  Movement,
  XCubeAxes,
  YCubeAxes,
  ZCubeAxes,
} from '../../../domain/models';
// ============================================================================
type Flow = {
  [X in CubeAxes]?: {
    [Y in CubeAxes]?: {
      [Z in CubeAxes]?: {
        [W in CubieAxes]?: Record<
          Orientation,
          [XCubeAxes, YCubeAxes, ZCubeAxes]
        >;
      };
    };
  };
};

function isVertex(cubie: Cubie) {
  return Object.values(cubie).filter((value) => value).length === 3;
}

function isEdge(cubie: Cubie) {
  return Object.values(cubie).filter((value) => value).length === 2;
}

export function getNextPosition(
  cubie: Cubie,
  address: [XCubeAxes, YCubeAxes, ZCubeAxes],
  movement: Movement
) {
  const { axis, orientation, times } = extractInfoFromMovement(movement);

  const flow: Flow = isEdge(cubie)
    ? edgesFlow
    : isVertex(cubie)
    ? verticesFlow
    : {};

  let current = address;

  for (let i = 0; i < times; i++) {
    const [prevX, prevY, prevZ] = current;

    const next = flow[prevX]?.[prevY]?.[prevZ]?.[axis]?.[orientation];

    if (next) current = next;
  }

  return current;
}
