function debounce(fn, delay, immediate) {
  let timeoutId;
  return function(...args) {
    let context = this;
    let callNow = immediate && !timeoutId;
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (!immediate) {
        fn.apply(context, args);
      }
      timeoutId = null;
    }, delay);
    if (callNow) {
      fn.apply(context, args);
    }
  }
}