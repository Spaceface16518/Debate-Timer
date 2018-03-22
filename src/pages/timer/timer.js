import * as $ from 'jquery';
import {
  ipcRenderer
} from 'electron';

let timeLeft = 0;
let duration;
let cont = true;

updateTimeView(timeLeft)

ipcRenderer.on('preset', (event, args) => {
  duration = args || 0
  timeLeft = duration
  updateTimeView(timeLeft)
})

$('.startButton').click(function () {
  startTimer(duration)
})
$('.stopButton').click(() => {
  cont = false
})

// TODO: add support for up and down arrows and changing the duration based on that.
// Perhaps consider changing code, then updating html instead of basing code on retrieveing html value

function parseTime(epocNum) {
  let d = new Date(epocNum)
  let iso = d.toISOString()
  let parsed = iso.slice(14, -1)
  return parsed
}

function updateTimeView(epocTime) {
  let timeUpdate = parseTime(epocTime)
  $('.time').text(timeUpdate)
}

function startTimer(duration) {
  let startTime = new Date().now()
  while (cont) {
    setTimeout(() => {
      timeLeft = duration - (Date().now() - startTime) // Algorithm by Priyanka
    }, 25)
    updateTimeView(timeLeft)
  }
}