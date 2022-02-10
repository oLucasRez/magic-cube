export function loop(callback: (stop: any) => any) {
  const stop = new Date().toISOString();

  let count = 0;

  while (true) {
    if (callback(stop) === stop) break;

    count++;
    if (count > 50) throw new Error('loop infinito.');
  }
}
