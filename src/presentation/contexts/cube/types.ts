// ----------------------------------------------------------------------< deps
import React from 'react';
// ---------------------------------------------------------------------< types
import { Cube } from '../../../domain/models';
// ============================================================================
interface CubeContextBase {}

export interface CubeContextValue extends CubeContextBase {
  nextCube?: Cube;
  currentCube?: Cube;
}

export interface CubeContextProviderProps extends CubeContextBase {
  children?: React.ReactNode;
}
