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
type FlowMold =
  | {
      middle: {
        [Y in YCubieAxes]: {
          [Z in ZCubieAxes]: {
            [W in Y]: Record<Orientation, [XCubieAxes, Y, 'middle']>;
          } & {
            [W in Z]: Record<Orientation, [XCubieAxes, 'middle', Z]>;
          };
        };
      };
    }
  | {
      [X in XCubieAxes]: {
        middle: {
          [Z in ZCubieAxes]: {
            [W in X]: Record<Orientation, [X, YCubieAxes, 'middle']>;
          } & {
            [W in Z]: Record<Orientation, ['middle', YCubieAxes, Z]>;
          };
        };
      };
    }
  | {
      [X in XCubieAxes]: {
        [Y in YCubieAxes]: {
          middle: {
            [W in X]: Record<Orientation, [X, 'middle', ZCubieAxes]>;
          } & {
            [W in Y]: Record<Orientation, ['middle', Y, ZCubieAxes]>;
          };
        };
      };
    };

// flow.prevX.prevY.prevZ.axis.orientation = [nextX, nextY, nextZ]
export const edgesFlow: FlowMold = {
  left: {
    up: {
      middle: {
        // left up middle
        left: {
          cw: ['left', 'middle', 'front'],
          acw: ['left', 'middle', opposite().front],
        },
        up: {
          cw: ['middle', 'up', 'back'],
          acw: ['middle', 'up', opposite().back],
        },
      },
    },
    middle: {
      front: {
        // left middle front
        left: {
          cw: ['left', 'down', 'middle'],
          acw: ['left', opposite().down, 'middle'],
        },
        front: {
          cw: ['middle', 'up', 'front'],
          acw: ['middle', opposite().up, 'front'],
        },
      },
      back: {
        // left middle back
        left: {
          cw: ['left', 'up', 'middle'],
          acw: ['left', opposite().up, 'middle'],
        },
        back: {
          cw: ['middle', 'down', 'back'],
          acw: ['middle', opposite().down, 'back'],
        },
      },
    },
    down: {
      middle: {
        // left down middle
        left: {
          cw: ['left', 'middle', 'back'],
          acw: ['left', 'middle', opposite().back],
        },
        down: {
          cw: ['middle', 'down', 'front'],
          acw: ['middle', 'down', opposite().front],
        },
      },
    },
  },
  middle: {
    up: {
      front: {
        // middle up front
        up: {
          cw: ['left', 'up', 'middle'],
          acw: [opposite().left, 'up', 'middle'],
        },
        front: {
          cw: ['right', 'middle', 'front'],
          acw: [opposite().right, 'middle', 'front'],
        },
      },
      back: {
        // middle up back
        up: {
          cw: ['right', 'up', 'middle'],
          acw: [opposite().right, 'up', 'middle'],
        },
        back: {
          cw: ['left', 'middle', 'back'],
          acw: [opposite().left, 'middle', 'back'],
        },
      },
    },
    down: {
      front: {
        // middle down front
        down: {
          cw: ['right', 'down', 'middle'],
          acw: [opposite().right, 'down', 'middle'],
        },
        front: {
          cw: ['left', 'middle', 'front'],
          acw: [opposite().left, 'middle', 'front'],
        },
      },
      back: {
        // middle down back
        down: {
          cw: ['left', 'down', 'middle'],
          acw: [opposite().left, 'down', 'middle'],
        },
        back: {
          cw: ['right', 'middle', 'back'],
          acw: [opposite().left, 'middle', 'back'],
        },
      },
    },
  },
  right: {
    up: {
      middle: {
        // right up middle
        right: {
          cw: ['right', 'middle', 'back'],
          acw: ['right', 'middle', opposite().back],
        },
        up: {
          cw: ['middle', 'up', 'front'],
          acw: ['middle', 'up', opposite().front],
        },
      },
    },
    middle: {
      front: {
        // right middle front
        right: {
          cw: ['right', 'up', 'middle'],
          acw: ['right', opposite().up, 'middle'],
        },
        front: {
          cw: ['middle', 'down', 'front'],
          acw: ['middle', opposite().down, 'front'],
        },
      },
      back: {
        // right middle back
        right: {
          cw: ['right', 'down', 'middle'],
          acw: ['right', opposite().down, 'middle'],
        },
        back: {
          cw: ['middle', 'up', 'back'],
          acw: ['middle', opposite().up, 'back'],
        },
      },
    },
    down: {
      middle: {
        // right down middle
        right: {
          cw: ['right', 'middle', 'front'],
          acw: ['right', 'middle', opposite().front],
        },
        down: {
          cw: ['middle', 'down', 'back'],
          acw: ['middle', 'down', opposite().back],
        },
      },
    },
  },
};
