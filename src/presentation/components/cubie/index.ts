// ----------------------------------------------------------------------< deps
import React from 'react';
// ----------------------------------------------------------------------< view
import { CubieView } from './view';
// ---------------------------------------------------------------------< utils
import { parsePosition, isX, isY, isZ } from '../../../data/utils';
// ---------------------------------------------------------------------< types
import { CubieProps } from './types';
import { CubieAxes } from '../../../domain/models';
// ============================================================================
export function Cubie(props: CubieProps) {
  const { cubie, ...meshProps } = props;

  const getFacePosition = React.useCallback((axis: CubieAxes) => {
    const facePosition: [number, number, number] = [0, 0, 0];

    isX(axis) && (facePosition[0] += 0.5 * parsePosition(axis));
    isY(axis) && (facePosition[1] += 0.5 * parsePosition(axis));
    isZ(axis) && (facePosition[2] += 0.5 * parsePosition(axis));

    return facePosition;
  }, []);

  const getFaceRotation = React.useCallback((axis: CubieAxes) => {
    const _90deg = Math.PI / 2;

    const rotation: [number, number, number] = [0, 0, 0];

    isX(axis) && (rotation[1] += _90deg * parsePosition(axis));
    isY(axis) && (rotation[0] -= _90deg * parsePosition(axis));
    isZ(axis) && (rotation[1] += _90deg - _90deg * parsePosition(axis));

    return rotation;
  }, []);

  const faces = React.useMemo(() => {
    return Object.entries(cubie).map(([axis, color]) => ({
      position: getFacePosition(axis as CubieAxes),
      rotation: getFaceRotation(axis as CubieAxes),
      color,
    }));
  }, [cubie, getFacePosition, getFaceRotation]);

  return CubieView({ faces, ...meshProps });
}
