// for resolve generic 'Service worker registration failed' error
// ref: https://stackoverflow.com/a/66437283
try {
  require('./dynamicallyCreateContextMenu');
} catch (e) {
  console.error(e);
}
