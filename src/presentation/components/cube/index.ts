// ----------------------------------------------------------------------< deps
import React from 'react';
// -------------------------------------------------------------------< helpers
import { extractInfoFromRotation, mapCube } from '../../../data/helpers';
// ----------------------------------------------------------------------< view
import { CubeView } from './view';
// ------------------------------------------------------------------< contexts
import { CubeContext, RotationContext } from '../../contexts';
// ---------------------------------------------------------------------< utils
import { parsePosition } from '../../../data/utils';
// ---------------------------------------------------------------------< types
import { XCubeAxes, YCubeAxes, ZCubeAxes } from '../../../domain/models';
import { CubieProps } from '../cubie/types';
// ============================================================================
export function Cube() {
  const { currentCube } = React.useContext(CubeContext);
  const { currentRotation } = React.useContext(RotationContext);

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

  const [staticCubies, dynamicCubies] = React.useMemo<
    [CubieProps[], CubieProps[]]
  >(() => {
    if (!currentCube) return [[], []];

    const { axis } = currentRotation
      ? extractInfoFromRotation(currentRotation)
      : { axis: null };

    const statics: CubieProps[] = [];
    const dynamics: CubieProps[] = [];

    mapCube(currentCube, 'all', (cubie, address) => {
      const cubieProps = {
        position: getCubiePosition(address),
        cubie,
      };

      if (axis && address.includes(axis)) dynamics.push(cubieProps);
      else statics.push(cubieProps);
    }).filter((a) => a);

    return [statics, dynamics];
  }, [currentCube, getCubiePosition, currentRotation]);

  return CubeView({ staticCubies, dynamicCubies });
}
