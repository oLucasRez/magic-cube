// ---------------------------------------------------------------------< utils
import { iterateObject } from '../utils';
// ---------------------------------------------------------------------< types
import { CubieAxes, Colors } from '../../domain/models';
// ============================================================================
const white_green: Record<'up' | 'front' | 'right', Colors> = {
  up: 'white',
  front: 'green',
  right: 'red',
};
const white_red: Record<'up' | 'front' | 'right', Colors> = {
  up: 'white',
  front: 'red',
  right: 'blue',
};
const white_blue: Record<'up' | 'front' | 'right', Colors> = {
  up: 'white',
  front: 'blue',
  right: 'orange',
};
const white_orange: Record<'up' | 'front' | 'right', Colors> = {
  up: 'white',
  front: 'orange',
  right: 'green',
};

const orange_green: Record<'up' | 'front' | 'right', Colors> = {
  up: 'orange',
  front: 'green',
  right: 'white',
};
const orange_white: Record<'up' | 'front' | 'right', Colors> = {
  up: 'orange',
  front: 'white',
  right: 'blue',
};
const orange_blue: Record<'up' | 'front' | 'right', Colors> = {
  up: 'orange',
  front: 'blue',
  right: 'yellow',
};
const orange_yellow: Record<'up' | 'front' | 'right', Colors> = {
  up: 'orange',
  front: 'yellow',
  right: 'green',
};

const green_white: Record<'up' | 'front' | 'right', Colors> = {
  up: 'green',
  front: 'white',
  right: 'orange',
};
const green_orange: Record<'up' | 'front' | 'right', Colors> = {
  up: 'green',
  front: 'orange',
  right: 'yellow',
};
const green_yellow: Record<'up' | 'front' | 'right', Colors> = {
  up: 'green',
  front: 'yellow',
  right: 'red',
};
const green_red: Record<'up' | 'front' | 'right', Colors> = {
  up: 'green',
  front: 'red',
  right: 'white',
};

const yellow_blue: Record<'up' | 'front' | 'right', Colors> = {
  up: 'yellow',
  front: 'blue',
  right: 'red',
};
const yellow_red: Record<'up' | 'front' | 'right', Colors> = {
  up: 'yellow',
  front: 'red',
  right: 'green',
};
const yellow_green: Record<'up' | 'front' | 'right', Colors> = {
  up: 'yellow',
  front: 'green',
  right: 'orange',
};
const yellow_orange: Record<'up' | 'front' | 'right', Colors> = {
  up: 'yellow',
  front: 'orange',
  right: 'blue',
};

const blue_yellow: Record<'up' | 'front' | 'right', Colors> = {
  up: 'blue',
  front: 'yellow',
  right: 'orange',
};
const blue_orange: Record<'up' | 'front' | 'right', Colors> = {
  up: 'blue',
  front: 'orange',
  right: 'white',
};
const blue_white: Record<'up' | 'front' | 'right', Colors> = {
  up: 'blue',
  front: 'white',
  right: 'red',
};
const blue_red: Record<'up' | 'front' | 'right', Colors> = {
  up: 'blue',
  front: 'red',
  right: 'yellow',
};

const red_green: Record<'up' | 'front' | 'right', Colors> = {
  up: 'red',
  front: 'green',
  right: 'yellow',
};
const red_yellow: Record<'up' | 'front' | 'right', Colors> = {
  up: 'red',
  front: 'yellow',
  right: 'blue',
};
const red_blue: Record<'up' | 'front' | 'right', Colors> = {
  up: 'red',
  front: 'blue',
  right: 'white',
};
const red_white: Record<'up' | 'front' | 'right', Colors> = {
  up: 'red',
  front: 'white',
  right: 'green',
};

const empty: Record<CubieAxes, null> = {
  ...{ left: null, right: null },
  ...{ up: null, down: null },
  ...{ front: null, back: null },
};

const possibilities = [
  ...[white_green, white_blue, white_orange, white_red],
  ...[green_orange, green_red, green_white, green_yellow],
  ...[blue_orange, blue_red, blue_white, blue_yellow],
  ...[orange_blue, orange_green, orange_white, orange_yellow],
  ...[red_blue, red_green, red_white, red_yellow],
  ...[yellow_blue, yellow_green, yellow_orange, yellow_red],
];

type Reference<ValueType> =
  | { up: ValueType; front: ValueType }
  | { up: ValueType; right: ValueType }
  | { up: ValueType; left: ValueType }
  | { up: ValueType; back: ValueType }
  | { down: ValueType; front: ValueType }
  | { down: ValueType; right: ValueType }
  | { down: ValueType; left: ValueType }
  | { down: ValueType; back: ValueType }
  | { left: ValueType; front: ValueType }
  | { left: ValueType; back: ValueType }
  | { right: ValueType; front: ValueType }
  | { right: ValueType; back: ValueType };

function oppositeColor(color: Colors) {
  const map: Record<Colors, Colors> = {
    blue: 'green',
    green: 'blue',
    orange: 'red',
    red: 'orange',
    white: 'yellow',
    yellow: 'white',
  };

  return map[color];
}

function oppositeAxis(color: CubieAxes) {
  const map: Record<CubieAxes, CubieAxes> = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up',
    front: 'back',
    back: 'front',
  };

  return map[color];
}

function parseAxis(color: Colors) {
  const map: Record<Colors, CubieAxes> = {
    blue: 'back',
    green: 'front',
    orange: 'left',
    red: 'right',
    white: 'up',
    yellow: 'down',
  };

  return map[color];
}

function getColorPossibilities() {
  const colorPossibilities: Record<CubieAxes, Colors>[] = possibilities.map(
    (possibility) => ({
      up: possibility.up,
      right: possibility.right,
      front: possibility.front,
      down: oppositeColor(possibility.up),
      left: oppositeColor(possibility.right),
      back: oppositeColor(possibility.front),
    })
  );

  return colorPossibilities;
}

function getAxisPossibilities() {
  const axisPossibilities: Record<CubieAxes, CubieAxes>[] = possibilities.map(
    (possibility) => ({
      up: parseAxis(possibility.up),
      right: parseAxis(possibility.right),
      front: parseAxis(possibility.front),
      down: oppositeAxis(parseAxis(possibility.up)),
      left: oppositeAxis(parseAxis(possibility.right)),
      back: oppositeAxis(parseAxis(possibility.front)),
    })
  );

  return axisPossibilities;
}

export function translateByColor(reference: Reference<Colors>) {
  const ref: Record<CubieAxes, Colors | null> = { ...empty, ...reference };

  const match = getColorPossibilities().find((possibility) => {
    return !iterateObject(
      possibility,
      ([from, to]) => !(ref[from] && ref[from] !== to)
    ).some((match) => !match);
  });

  return match;
}

export function translateByAxis(reference: Reference<CubieAxes>): {
  real?: Record<CubieAxes, CubieAxes>;
  virtual?: Record<CubieAxes, CubieAxes>;
} {
  const ref: Record<CubieAxes, CubieAxes | null> = { ...empty, ...reference };

  const match = getAxisPossibilities().find((possibility) => {
    return !iterateObject(
      possibility,
      ([from, to]) => !(ref[from] && ref[from] !== to)
    ).some((match) => !match);
  });

  const real = match;
  const virtual: Record<CubieAxes, CubieAxes> | undefined = real
    ? (Object.fromEntries(
        Object.entries(real).map(([key, value]) => [value, key])
      ) as Record<CubieAxes, CubieAxes>)
    : undefined;

  return { real, virtual };
}
