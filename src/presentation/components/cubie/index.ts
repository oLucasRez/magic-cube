// ----------------------------------------------------------------------< deps
import React from 'react';
// ----------------------------------------------------------------------< view
import { CubieView } from './view';
// ---------------------------------------------------------------------< types
import { CubieProps } from './types';
import {
  XCubeAxes,
  XCubieAxes,
  YCubeAxes,
  YCubieAxes,
  ZCubeAxes,
  ZCubieAxes,
} from '../../../domain/models';
// ============================================================================
export function Cubie(props: CubieProps) {
  const { cubie, address } = props;

  const faces = React.useMemo(
    () =>
      Object.entries({
        up: null,
        down: null,
        left: null,
        right: null,
        front: null,
        back: null,
        ...cubie,
      }).map(([axis, color]) => {
        const [outerX, outerY, outerZ] = address;

        const x: Record<XCubeAxes, number> = { left: -1, middle: 0, right: 1 };
        const y: Record<YCubeAxes, number> = { down: -1, middle: 0, up: 1 };
        const z: Record<ZCubeAxes, number> = { back: -1, middle: 0, front: 1 };

        const position: [number, number, number] = [
          x[outerX],
          y[outerY],
          z[outerZ],
        ];
        const rotation: [number, number, number] = [0, 0, 0];

        if (['left', 'right'].includes(axis)) {
          const angle = axis === 'left' ? -Math.PI / 2 : Math.PI / 2;

          position[0] += 0.5 * x[axis as XCubieAxes];
          rotation[1] = angle;
        }

        if (['down', 'up'].includes(axis)) {
          const angle = axis === 'down' ? Math.PI / 2 : -Math.PI / 2;

          position[1] += 0.5 * y[axis as YCubieAxes];
          rotation[0] = angle;
        }

        if (['back', 'front'].includes(axis)) {
          const angle = axis === 'back' ? Math.PI : 0;

          position[2] += 0.5 * z[axis as ZCubieAxes];
          rotation[1] = angle;
        }

        return { position, rotation, color };
      }),
    [cubie, address]
  );

  return CubieView({ faces });
}
