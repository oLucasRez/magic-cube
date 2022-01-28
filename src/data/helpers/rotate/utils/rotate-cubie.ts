// ---------------------------------------------------------------------< utils
import { deepCopy } from '../../../utils';
// ---------------------------------------------------------------------< types
import {
  Cubie,
  CubieAxes,
  XCubieAxes,
  YCubieAxes,
  ZCubieAxes,
} from '../../../../domain/models';
// ============================================================================
type Orientation = 'cw' | 'acw';

type XFlow = Record<YCubieAxes | ZCubieAxes, Record<Orientation, CubieAxes>>;
type YFlow = Record<XCubieAxes | ZCubieAxes, Record<Orientation, CubieAxes>>;
type ZFlow = Record<XCubieAxes | YCubieAxes, Record<Orientation, CubieAxes>>;

const left: XFlow = {
  up: { cw: 'front', acw: 'back' },
  front: { cw: 'down', acw: 'up' },
  down: { cw: 'back', acw: 'front' },
  back: { cw: 'up', acw: 'down' },
};

const right: XFlow = {
  up: { cw: 'back', acw: 'front' },
  back: { cw: 'down', acw: 'up' },
  down: { cw: 'front', acw: 'back' },
  front: { cw: 'up', acw: 'down' },
};

const up: YFlow = {
  front: { cw: 'left', acw: 'right' },
  left: { cw: 'back', acw: 'front' },
  back: { cw: 'right', acw: 'left' },
  right: { cw: 'front', acw: 'back' },
};

const down: YFlow = {
  front: { cw: 'right', acw: 'left' },
  right: { cw: 'back', acw: 'front' },
  back: { cw: 'left', acw: 'right' },
  left: { cw: 'front', acw: 'back' },
};

const front: ZFlow = {
  up: { cw: 'right', acw: 'left' },
  right: { cw: 'down', acw: 'up' },
  down: { cw: 'left', acw: 'right' },
  left: { cw: 'up', acw: 'down' },
};

const back: ZFlow = {
  up: { cw: 'left', acw: 'right' },
  left: { cw: 'down', acw: 'up' },
  down: { cw: 'right', acw: 'left' },
  right: { cw: 'up', acw: 'down' },
};

const flow: Record<CubieAxes, XFlow | YFlow | ZFlow> = {
  left,
  right,
  up,
  down,
  front,
  back,
};

export function rotateCubie(
  cubie: Cubie,
  axis: CubieAxes,
  orientation: Orientation
) {
  const colors: [CubieAxes, CubieAxes][] = Object.entries(flow[axis]).map(
    ([prevAxis, nextAxis]) => [prevAxis as CubieAxes, nextAxis[orientation]]
  );

  const cubieCopy = deepCopy(cubie);

  colors.map(([prevAxis, nextAxis]) => (cubie[nextAxis] = cubieCopy[prevAxis]));

  return cubie;
}
