let work = true
let time = 25 * 60
let start = false
let alarm = new Audio("assets/alarm.mp3")
let timerText = document.getElementById("timerText")
let indecator = document.getElementById("mode")
let startBtn = document.getElementById("startBtn")
let resetBtn = document.getElementById("resetBtn")

function updateIndecator() {
  indecator.innerText = work ? "Work" : "Chill"
}

function reset() {
  work = true
  time = 25 * 60
  start = false
  startBtn.innerText = "Start"
  timerText.innerText = formatTime(time)
  updateIndecator()
}

function ss() {
  start = !start
  startBtn.innerText = start ? "Stop" : "Start"
}

function formatTime(s) {
  let m = Math.floor(s / 60)
  let sec = s % 60
  return m + ":" + sec.toString().padStart(2,"0")
}

async function main() {
  timerText.innerText = formatTime(time)
  updateIndecator()

  while (true) {
    if (start) {
      await sleep(1000)
      if (!start) continue
      time--

      if (time <= 0) {
        time = 0
        timerText.innerText = formatTime(time)
        alarm.currentTime = 5
        alarm.play()
        work = !work
        time = work ? 25 * 60 : 5 * 60
        updateIndecator()
        continue
      }

      timerText.innerText = formatTime(time)
    } else {
      await sleep(100)
    }
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

main()
