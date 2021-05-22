var start = "start"
var scores = 5

var count = 2000;
var timer = setInterval(function() {
  document.getElementById(count);
  count--;
  if(count === 0) {
    stopInterval()
  }
}, 2000);

var stopInterval = function() {
  alert('time is up!');
  clearInterval(timer);
}
