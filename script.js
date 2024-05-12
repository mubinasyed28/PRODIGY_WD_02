let timer;
let isRunning = false;
let startTime;
let lapTimes = [];
let lapCounter = 0;

document.getElementById("startStop").addEventListener("click", startStop);
document.getElementById("lap").addEventListener("click", lap);
document.getElementById("reset").addEventListener("click", reset);

function startStop() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b, 0) : 0);
    timer = setInterval(updateStopwatch, 10); // Update every 10 milliseconds for milliseconds display
    document.getElementById("startStop").innerText = "Stop";
  } else {
    isRunning = false;
    clearInterval(timer);
    document.getElementById("startStop").innerText = "Start";
  }
}

function updateStopwatch() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById("stopwatch").innerHTML = formattedTime;
}

function formatTime(milliseconds) {
  const totalMilliseconds = Math.floor(milliseconds);
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const millisecondsPart = pad(totalMilliseconds % 1000, 3);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${millisecondsPart}`;
}

function pad(num, size) {
  return num.toString().padStart(size, "0");
}

function lap() {
  if (isRunning) {
    const elapsedTime = Date.now() - startTime;
    lapTimes.push(elapsedTime);
    const formattedTime = formatTime(elapsedTime);
    const lapDiv = document.createElement("div");
    lapCounter++;
    lapDiv.innerText = `Lap ${lapCounter}: ${formattedTime}`;
    document.getElementById("laps").appendChild(lapDiv);
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  document.getElementById("startStop").innerText = "Start";
  document.getElementById("stopwatch").innerHTML = "00:00:00<span id=\"milliseconds\">.000</span>";
  document.getElementById("laps").innerHTML = "";
  lapTimes = [];
  lapCounter = 0;
}
