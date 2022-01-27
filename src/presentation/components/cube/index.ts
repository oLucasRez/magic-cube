// ----------------------------------------------------------------------< deps
import React from 'react';
// -------------------------------------------------------------------< helpers
import { makeCube } from '../../../main';
// ----------------------------------------------------------------------< view
import { CubeView } from './view';
// ---------------------------------------------------------------------< types
import { CubeProps } from './types';
// ============================================================================
export function Cube(props: CubeProps) {
  const [cube] = React.useState(() => makeCube());

  return CubeView({ cube });
}
