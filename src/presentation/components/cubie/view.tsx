// ----------------------------------------------------------------------< deps
import React from 'react';
// ---------------------------------------------------------------------< types
import { Colors } from '../../../domain/models';
import { CubieViewProps } from './types';
// ============================================================================
export function CubieView(props: CubieViewProps) {
  const { faces, ...meshProps } = props;

  const renderFaces = React.useCallback(() => {
    const map: Record<Colors, string> = {
      blue: '#39C1DB',
      green: '#60E433',
      white: '#EFE8EB',
      orange: '#FF6414',
      red: '#FE1934',
      yellow: '#F3F905',
    };

    return faces.map(({ position, rotation, color }, i) => {
      return (
        <mesh key={i} position={position} rotation={rotation}>
          <planeBufferGeometry attach='geometry' />
          <meshLambertMaterial
            attach='material'
            color={color ? map[color] : 'black'}
          />
        </mesh>
      );
    });
  }, [faces]);

  return <mesh {...meshProps}>{renderFaces()}</mesh>;
}
