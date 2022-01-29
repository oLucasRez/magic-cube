// ----------------------------------------------------------------------< deps
import React from 'react';
// -----------------------------------------------------------------< factories
import { makeCube } from '../../../main/factories';
// -------------------------------------------------------------------< helpers
import { RotationContext } from '..';
// ------------------------------------------------------------------< contexts
import { rotate } from '../../../data/helpers';
// ---------------------------------------------------------------------< utils
import { deepCopy } from '../../../data/utils';
// ---------------------------------------------------------------------< types
import { CubeContextValue, CubeContextProviderProps } from './types';
import { Cube } from '../../../domain/models';
// ============================================================================
const defaultValue: CubeContextValue = {};

export const CubeContext = React.createContext<CubeContextValue>(defaultValue);

export function CubeContextProvider(props: CubeContextProviderProps) {
  const { children } = props;

  const [nextCube, setNextCube] = React.useState<Cube>(makeCube);
  const [currentCube, setCurrentCube] = React.useState<Cube>(makeCube);

  const { currentRotation, nextRotation } = React.useContext(RotationContext);

  React.useEffect(() => {
    currentRotation &&
      setCurrentCube((previous) => {
        const cubeCopy = deepCopy(previous);

        rotate(cubeCopy, currentRotation);

        return cubeCopy;
      });
  }, [currentRotation]);

  React.useEffect(() => {
    nextRotation &&
      setNextCube((current) => {
        const cubeCopy = deepCopy(current);

        rotate(cubeCopy, nextRotation);

        return cubeCopy;
      });
  }, [nextRotation]);

  return (
    <CubeContext.Provider value={{ currentCube, nextCube }}>
      {children}
    </CubeContext.Provider>
  );
}
