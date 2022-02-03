// ----------------------------------------------------------------------< deps
import React from 'react';
// -----------------------------------------------------------------< factories
import { makeCube } from '../../../main/factories';
// -------------------------------------------------------------------< helpers
import { rotate as rotateCube } from '../../../data/helpers';
// ---------------------------------------------------------------------< utils
import { deepCopy } from '../../../data/utils';
// ---------------------------------------------------------------------< types
import { CubeContextValue, CubeContextProviderProps } from './types';
import { Cube, Movement } from '../../../domain/models';
// ============================================================================
const defaultValue: CubeContextValue = {
  current: makeCube(),
  rotate: () => {},
};

export const CubeContext = React.createContext<CubeContextValue>(defaultValue);

export function CubeContextProvider(props: CubeContextProviderProps) {
  const { children } = props;

  const [current, setCurrent] = React.useState<Cube>(makeCube);

  const rotate = React.useCallback((movement: Movement | null) => {
    setCurrent((previous) => {
      const cube = deepCopy(previous);

      if (movement) rotateCube(cube, movement);

      return cube;
    });
  }, []);

  return (
    <CubeContext.Provider value={{ current, rotate }}>
      {children}
    </CubeContext.Provider>
  );
}
