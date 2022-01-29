// ----------------------------------------------------------------------< deps
import React from 'react';
// ---------------------------------------------------------------------< types
import { Rotation } from '../../../domain/models';
// ============================================================================
interface RotationContextBase {
  clock_ms: number;
  autoStart?: boolean;
}

export interface RotationContextValue extends RotationContextBase {
  currentRotation?: Rotation;
  nextRotation?: Rotation;
  resume(): void;
}

export interface RotationContextProviderProps extends RotationContextBase {
  shuffleLength: number;

  children?: React.ReactNode;
}
