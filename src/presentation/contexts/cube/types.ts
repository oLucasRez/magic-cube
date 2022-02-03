// ----------------------------------------------------------------------< deps
import React from 'react';
// ---------------------------------------------------------------------< types
import { Cube, Movement } from '../../../domain/models';
// ============================================================================
interface CubeContextBase {}

export interface CubeContextValue extends CubeContextBase {
  current: Cube;
  rotate(movement: Movement | null): void;
}

export interface CubeContextProviderProps extends CubeContextBase {
  children?: React.ReactNode;
}
