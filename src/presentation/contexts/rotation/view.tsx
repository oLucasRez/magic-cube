// ----------------------------------------------------------------------< deps
import React from 'react';
// -------------------------------------------------------------------< helpers
import { getShuffleSequence } from '../../../data/helpers';
// ---------------------------------------------------------------------< hooks
import { useClock } from '../../hooks';
// ---------------------------------------------------------------------< types
import { RotationContextValue, RotationContextProviderProps } from './types';
import { Rotation } from '../../../domain/models';
// ============================================================================
const defaultValue: RotationContextValue = {
  clock_ms: 0,
  resume: () => {},
};

export const RotationContext =
  React.createContext<RotationContextValue>(defaultValue);

export function RotationContextProvider(props: RotationContextProviderProps) {
  const { shuffleLength, clock_ms, autoStart, children } = props;

  const [shuffleSequence, setShuffleSequence] = React.useState<Rotation[]>(() =>
    getShuffleSequence(shuffleLength)
  );

  const [currentRotation, setCurrentRotation] = React.useState<Rotation>();
  const [nextRotation, setNextRotation] = React.useState<Rotation | undefined>(
    getNextRotation
  );

  const { resume } = useClock(
    () => {
      setNextRotation((current) => {
        if (current) setCurrentRotation(current);

        return getNextRotation();
      });
    },
    clock_ms,
    { pauseAt: shuffleLength, autoStart }
  );

  function getNextRotation() {
    const rotation = shuffleSequence.pop();

    setShuffleSequence(shuffleSequence);

    return rotation;
  }

  return (
    <RotationContext.Provider
      value={{ currentRotation, nextRotation, clock_ms, resume }}
    >
      {children}
    </RotationContext.Provider>
  );
}
