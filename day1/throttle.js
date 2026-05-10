function throttle(fn, delay) {
  let timeoutId;
  return function (...args) {
    let context = this;
    if (timeoutId) {
      return;
    }
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
      timeoutId = null;
    }, delay);
  };
}
