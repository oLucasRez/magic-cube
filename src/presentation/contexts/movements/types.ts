// ----------------------------------------------------------------------< deps
import React from 'react';
// ---------------------------------------------------------------------< types
import { Movement } from '../../../domain/models';
// ============================================================================
interface MovementsContextBase {
  clock_ms: number;
}

export interface MovementsContextValue extends MovementsContextBase {
  current: Movement | null;
  next: Movement | null;
}

export interface MovementsContextProviderProps extends MovementsContextBase {
  shuffleLength: number;
  autoStart?: boolean;

  children?: React.ReactNode;
}
