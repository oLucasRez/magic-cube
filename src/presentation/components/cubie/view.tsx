// ----------------------------------------------------------------------< deps
import React from 'react';
// ---------------------------------------------------------------------< types
import { CubieViewProps } from './types';
// ============================================================================
export function CubieView(props: CubieViewProps) {
  const { faces, ...meshProps } = props;

  const renderFaces = React.useCallback(() => {
    return faces.map(({ position, rotation, color }, i) => {
      return (
        <mesh key={i} position={position} rotation={rotation}>
          <planeBufferGeometry attach='geometry' />
          <meshLambertMaterial attach='material' color={color ?? 'black'} />
        </mesh>
      );
    });
  }, [faces]);

  return <mesh {...meshProps}>{renderFaces()}</mesh>;
}
