import * as $ from 'jquery';
import {
  ipcRenderer,
  remote,
} from 'electron';

let timeLeft = 0;
let duration;
// "Continue" variable initializes to false, then is turnedtrue by startTimer()
let cont = false;

updateTimeView(timeLeft); // Initially establish time on the page

// Recieve the preset data from the main project; it was sent by the index page
ipcRenderer.on('preset', (event, args) => {
  duration = args || 0; // If no preset was sent, default time is zero
  timeLeft = duration;
  updateTimeView(timeLeft);
});

$(document).ready(function() {
  $('.startButton').click(function() {
    startTimer(duration);
  });

  $('.stopButton').click(() => {
    stopTimer();
  });

  // Increases the time on the timer
  $('.up').click(function() {
    stopTimer(); // Stop the timer before making any changes
    duration = Math.round(duration / 1000) * 1000;
    duration += 1000;
    timeLeft = duration;
    updateTimeView(timeLeft);
  });


  $('.down').click(function() {
    stopTimer(); // Stop the timer before making any changes
    duration = Math.round(duration / 1000) * 1000;
    duration -= 1000;
    timeLeft = duration;
    updateTimeView(timeLeft);
  });

  // Close the window; this is because there are no control buttons
  $('.exit').click(function() {
    remote.getCurrentWindow().close();
  });
});

// Turns epoc time into a time string (mm:ss.sss)
function parseTime(epocNum) {
  let d = new Date(epocNum);
  let iso = d.toISOString();
  let parsed = iso.slice(14, -1);
  return parsed;
}

// Updates the time on the html page
function updateTimeView(epocTime) {
  let timeUpdate = parseTime(epocTime);
  $('.time').text(timeUpdate);
}

// Start the timer
function startTimer(duration) {
  cont = true;
  let startTime = new Date().now();
  while (cont) {
    setTimeout(() => {
      // Algorithm by Priyanka ;)
      timeLeft = duration - (Date().now() - startTime);
    }, 25);
    updateTimeView(timeLeft);
  }
}

// Stops the timer
function stopTimer() {
  cont = false;
}
