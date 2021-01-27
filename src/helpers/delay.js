export function delay(callback, time) {
  let timeout = null;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, arguments), time);
  };
}
