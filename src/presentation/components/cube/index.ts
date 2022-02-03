// ----------------------------------------------------------------------< deps
import React from 'react';
// -------------------------------------------------------------------< helpers
import { extractInfoFromMovement, mapCube } from '../../../data/helpers';
// ----------------------------------------------------------------------< view
import { CubeView } from './view';
// ------------------------------------------------------------------< contexts
import { CubeContext, MovementsContext } from '../../contexts';
// ---------------------------------------------------------------------< utils
import { parsePosition } from '../../../data/utils';
// ---------------------------------------------------------------------< types
import { XCubeAxes, YCubeAxes, ZCubeAxes } from '../../../domain/models';
import { CubieProps } from '../cubie/types';
// ============================================================================
export function Cube() {
  const cube = React.useContext(CubeContext);
  const movement = React.useContext(MovementsContext);

  const getCubiePosition = React.useCallback(
    ([i, j, k]: [XCubeAxes, YCubeAxes, ZCubeAxes]) => {
      const position: [number, number, number] = [
        parsePosition(i),
        parsePosition(j),
        parsePosition(k),
      ];

      return position;
    },
    []
  );

  const staticCubies = React.useMemo<CubieProps[]>(() => {
    const { axis } = movement.current
      ? extractInfoFromMovement(movement.current)
      : { axis: null };

    const statics: CubieProps[] = [];

    mapCube(cube.current, 'all', (cubie, address) => {
      const cubieProps = {
        position: getCubiePosition(address),
        cubie,
      };

      if (!(axis && address.includes(axis))) statics.push(cubieProps);
    });

    return statics;
  }, [movement, cube, getCubiePosition]);

  const dynamicCubies = React.useMemo<CubieProps[]>(() => {
    if (!movement.current) return [];

    const { axis } = extractInfoFromMovement(movement.current);

    const dynamics: CubieProps[] = [];

    mapCube(cube.current, axis, (cubie, address) => {
      const cubieProps = {
        position: getCubiePosition(address),
        cubie,
      };

      dynamics.push(cubieProps);
    });

    return dynamics;
  }, [movement, cube, getCubiePosition]);

  return CubeView({ staticCubies, dynamicCubies });
}
