// ----------------------------------------------------------------------< deps
import React from 'react';
// -------------------------------------------------------------------< helpers
import { getShuffleSequence } from '../../../data/helpers';
// ------------------------------------------------------------------< contexts
import { CubeContext } from '..';
// ---------------------------------------------------------------------< hooks
import { useClock } from '../../hooks';
// ---------------------------------------------------------------------< types
import { MovementsContextValue, MovementsContextProviderProps } from './types';
import { Movement } from '../../../domain/models';
import { getWhiteCrossSequence } from '../../../data/helpers/get-white-cross-sequence';
// ============================================================================
const defaultValue: MovementsContextValue = {
  current: null,
  next: null,
  clock_ms: 0,
};

export const MovementsContext =
  React.createContext<MovementsContextValue>(defaultValue);

export function MovementsContextProvider(props: MovementsContextProviderProps) {
  const { shuffleLength, clock_ms, autoStart, children } = props;

  const cube = React.useContext(CubeContext);

  const [shuffleSequence, setShuffleSequence] = React.useState<Movement[]>(() =>
    getShuffleSequence(shuffleLength)
  );

  const [current, setCurrent] = React.useState<null | Movement>(null);
  const [next, setNext] = React.useState<Movement | null>(getNext);

  const { pause } = useClock(
    () => {
      if (!next) {
        getWhiteCrossSequence(cube.current);

        return pause();
      }

      console.log(current);
      cube.rotate(current);

      setCurrent(next);
      setNext(getNext);
    },
    clock_ms,
    { autoStart }
  );

  function getNext() {
    const newShuffleSequence = [...shuffleSequence];
    const nextMovement = newShuffleSequence.pop() || null;

    setShuffleSequence(newShuffleSequence);

    return nextMovement;
  }

  return (
    <MovementsContext.Provider value={{ current, next, clock_ms }}>
      {children}
    </MovementsContext.Provider>
  );
}
