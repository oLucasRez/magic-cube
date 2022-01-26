// -------------------------------------------------------------------< helpers
import { opposite } from '../..';
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
  up: { cw: 'front', acw: opposite().front },
  front: { cw: 'down', acw: opposite().down },
  down: { cw: 'back', acw: opposite().back },
  back: { cw: 'up', acw: opposite().up },
};

const right: XFlow = {
  up: { cw: 'back', acw: opposite().back },
  back: { cw: 'down', acw: opposite().down },
  down: { cw: 'front', acw: opposite().front },
  front: { cw: 'up', acw: opposite().up },
};

const up: YFlow = {
  front: { cw: 'left', acw: opposite().left },
  left: { cw: 'back', acw: opposite().back },
  back: { cw: 'right', acw: opposite().right },
  right: { cw: 'front', acw: opposite().front },
};

const down: YFlow = {
  front: { cw: 'right', acw: opposite().right },
  right: { cw: 'back', acw: opposite().back },
  back: { cw: 'left', acw: opposite().left },
  left: { cw: 'front', acw: opposite().front },
};

const front: ZFlow = {
  up: { cw: 'right', acw: opposite().right },
  right: { cw: 'down', acw: opposite().down },
  down: { cw: 'left', acw: opposite().left },
  left: { cw: 'up', acw: opposite().up },
};

const back: ZFlow = {
  up: { cw: 'left', acw: opposite().left },
  left: { cw: 'down', acw: opposite().down },
  down: { cw: 'right', acw: opposite().right },
  right: { cw: 'up', acw: opposite().up },
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

  const cubieCopy = Object.assign({}, cubie);

  colors.map(([prevAxis, nextAxis]) => (cubie[nextAxis] = cubieCopy[prevAxis]));
}
