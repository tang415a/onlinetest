var index = ~~(Math.random() * 0xffffff);
function _get_inc() {
  return (index = (index + 1) % 0xffffff);
}

var MACHINE_ID = parseInt(Math.random() * 0xffffff, 10);  
function genId(time) {
  if ('number' !== typeof time) {
    time = ~~(Date.now() / 1000);
  }
  
  // Use pid
  var pid =
    (typeof process === 'undefined' || process.pid === 1
      ? Math.floor(Math.random() * 100000)
      : process.pid) % 0xffff;
  var inc = _get_inc();

  // Buffer used
  var buffer = [];
  // Encode time
  buffer[3] = time & 0xff;
  buffer[2] = (time >> 8) & 0xff;
  buffer[1] = (time >> 16) & 0xff;
  buffer[0] = (time >> 24) & 0xff;
  // Encode machine
  buffer[6] = MACHINE_ID & 0xff;
  buffer[5] = (MACHINE_ID >> 8) & 0xff;
  buffer[4] = (MACHINE_ID >> 16) & 0xff;
  // Encode pid
  buffer[8] = pid & 0xff;
  buffer[7] = (pid >> 8) & 0xff;
  // Encode index
  buffer[11] = inc & 0xff;
  buffer[10] = (inc >> 8) & 0xff;
  buffer[9] = (inc >> 16) & 0xff;
  
  return buffer.map(n => { return ("0" + n.toString(16)).substr(-2); }).reduce((a, c) => { return a + c; });
}

module.exports = genId;