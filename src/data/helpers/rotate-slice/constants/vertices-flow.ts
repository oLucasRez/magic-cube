// -------------------------------------------------------------------< helpers
import { opposite } from '../..';
// ---------------------------------------------------------------------< types
import {
  Orientation,
  XCubieAxes,
  YCubieAxes,
  ZCubieAxes,
} from '../../../../domain/models';
// ============================================================================
type FlowMold = {
  [X in XCubieAxes]: {
    [Y in YCubieAxes]: {
      [Z in ZCubieAxes]: {
        [W in X]: Record<Orientation, [X, YCubieAxes, ZCubieAxes]>;
      } & {
        [W in Y]: Record<Orientation, [XCubieAxes, Y, ZCubieAxes]>;
      } & {
        [W in Z]: Record<Orientation, [XCubieAxes, YCubieAxes, Z]>;
      };
    };
  };
};

// flow.prevX.prevY.prevZ.axis.orientation = [nextX, nextY, nextZ]
export const verticesFlow: FlowMold = {
  left: {
    up: {
      front: {
        // left up front
        left: {
          cw: ['left', 'down', 'front'],
          acw: ['left', opposite().down, opposite().front],
        },
        up: {
          cw: ['left', 'up', 'back'],
          acw: [opposite().left, 'up', opposite().back],
        },
        front: {
          cw: ['right', 'up', 'front'],
          acw: [opposite().right, opposite().up, 'front'],
        },
      },
      back: {
        // left up back
        left: {
          cw: ['left', 'up', 'front'],
          acw: ['left', opposite().up, opposite().front],
        },
        up: {
          cw: ['right', 'up', 'back'],
          acw: [opposite().right, 'up', opposite().back],
        },
        back: {
          cw: ['left', 'down', 'back'],
          acw: [opposite().left, opposite().down, 'back'],
        },
      },
    },
    down: {
      front: {
        // left down front
        left: {
          cw: ['left', 'down', 'back'],
          acw: ['left', opposite().down, opposite().back],
        },
        down: {
          cw: ['right', 'down', 'front'],
          acw: [opposite().right, 'down', opposite().back],
        },
        front: {
          cw: ['left', 'up', 'front'],
          acw: [opposite().left, opposite().up, 'front'],
        },
      },
      back: {
        // left down back
        left: {
          cw: ['left', 'up', 'back'],
          acw: ['left', opposite().up, opposite().back],
        },
        down: {
          cw: ['left', 'down', 'front'],
          acw: [opposite().left, 'down', opposite().front],
        },
        back: {
          cw: ['right', 'down', 'back'],
          acw: [opposite().right, opposite().down, 'back'],
        },
      },
    },
  },
  right: {
    up: {
      front: {
        // right up front
        right: {
          cw: ['right', 'up', 'back'],
          acw: ['right', opposite().up, opposite().back],
        },
        up: {
          cw: ['left', 'up', 'front'],
          acw: [opposite().left, 'up', opposite().front],
        },
        front: {
          cw: ['right', 'down', 'front'],
          acw: [opposite().right, opposite().down, 'front'],
        },
      },
      back: {
        // right up back
        right: {
          cw: ['right', 'down', 'back'],
          acw: ['right', opposite().down, opposite().back],
        },
        up: {
          cw: ['right', 'up', 'front'],
          acw: [opposite().right, 'up', opposite().front],
        },
        back: {
          cw: ['left', 'up', 'back'],
          acw: [opposite().left, opposite().up, 'back'],
        },
      },
    },
    down: {
      front: {
        // right down front
        right: {
          cw: ['right', 'up', 'front'],
          acw: ['right', opposite().up, opposite().front],
        },
        down: {
          cw: ['right', 'down', 'back'],
          acw: [opposite().right, 'down', opposite().back],
        },
        front: {
          cw: ['left', 'down', 'front'],
          acw: [opposite().left, opposite().down, 'front'],
        },
      },
      back: {
        // right down back
        right: {
          cw: ['right', 'down', 'front'],
          acw: ['right', opposite().down, opposite().front],
        },
        down: {
          cw: ['left', 'down', 'back'],
          acw: [opposite().left, 'down', opposite().back],
        },
        back: {
          cw: ['right', 'up', 'back'],
          acw: [opposite().right, opposite().up, 'back'],
        },
      },
    },
  },
};
