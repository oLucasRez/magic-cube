// ----------------------------------------------------------------------< deps
import React from 'react';
// -------------------------------------------------------------------< helpers
import { getResolveSequence, getShuffleSequence } from '../../../data/helpers';
// ------------------------------------------------------------------< contexts
import { CubeContext } from '..';
// ---------------------------------------------------------------------< hooks
import { useClock } from '../../hooks';
// ---------------------------------------------------------------------< types
import { MovementsContextValue, MovementsContextProviderProps } from './types';
import { Movement } from '../../../domain/models';
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

  const [step, setStep] = React.useState<'shuffle' | 'resolve'>('shuffle');

  const [sequence, setSequence] = React.useState<Movement[]>(
    getShuffleSequence(shuffleLength)
  );

  const [current, setCurrent] = React.useState<null | Movement>(null);
  const [next, setNext] = React.useState<Movement | null>(getNext);

  const { pause } = useClock(
    () => {
      if (!next && !current) {
        if (step === 'shuffle') {
          const resolveSequence = getResolveSequence(cube.current);

          setNext(resolveSequence.shift() || null);
          setSequence(resolveSequence);
          setStep('resolve');

          return;
        }
        if (step === 'resolve') return pause();
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
    const newSequence = [...sequence];
    const newMovement = newSequence.shift() || null;

    setSequence(newSequence);

    return newMovement;
  }

  return (
    <MovementsContext.Provider value={{ current, next, clock_ms }}>
      {children}
    </MovementsContext.Provider>
  );
}
