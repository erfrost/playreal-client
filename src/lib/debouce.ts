const debounce = (callee: (...args: any[]) => void, delay: number) => {
  let lastCallTimer: NodeJS.Timeout | null = null;
  let lastCallTimestamp: number | null = null;

  return function perform(this: any, ...args: any[]) {
    const currentTimestamp = Date.now();

    if (lastCallTimestamp && currentTimestamp - lastCallTimestamp <= delay) {
      if (lastCallTimer) clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => {
      callee.apply(this, args);
      lastCallTimestamp = Date.now();
    }, delay);
  };
};

export default debounce;
