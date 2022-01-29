// ----------------------------------------------------------------------< deps
import React from 'react';
// ============================================================================
type Callback = () => void;

type Config = {
  autoStart?: boolean;
  pauseAt?: number;
};

export function useClock(callback: Callback, ms: number, config?: Config) {
  const { autoStart = false, pauseAt } = config ?? {};

  const [count, setCount] = React.useState<number>(0);

  const [isRunning, setIsRunning] = React.useState(autoStart);

  function resume() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  React.useEffect(() => {
    if (!isRunning) return;

    if (count === pauseAt) return;

    const id = setTimeout(() => {
      callback();

      setCount(count + 1);
    }, ms);

    return () => clearTimeout(id);
  }, [isRunning, count, pauseAt, callback, ms]);

  return { resume, pause };
}
