// ----------------------------------------------------------------------< deps
import React from 'react';
// -----------------------------------------------------------------< factories
import { makeCube } from '../../../main/factories';
// -------------------------------------------------------------------< helpers
import { rotate, getShuffleArray } from '../../../data/helpers';
// ----------------------------------------------------------------------< view
import { CubeView } from './view';
// ---------------------------------------------------------------------< hooks
import { useClock } from '../../hooks';
// ---------------------------------------------------------------------< utils
import { deepCopy } from '../../../data/utils';
// ---------------------------------------------------------------------< types
import { CubeProps } from './types';
import { Rotation } from '../../../domain/models';
// ============================================================================
export function Cube(props: CubeProps) {
  const [cube, setCube] = React.useState(makeCube);

  const [shuffleArray, setShuffleArray] =
    React.useState<Rotation[]>(getShuffleArray);

  const pauseAt = React.useMemo(() => shuffleArray.length, []);

  useClock(
    () => {
      const cubeCopy = deepCopy(cube);

      const mov = shuffleArray.pop();

      if (mov) rotate(cubeCopy, mov);

      setShuffleArray(shuffleArray);

      setCube(cubeCopy);
    },
    1000,
    { pauseAt, autoStart: true }
  );

  return CubeView({ cube });
}
