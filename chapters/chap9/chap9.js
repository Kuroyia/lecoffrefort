let startTime;
let chronometerInterval;
let level = 1;

const chronometerDisplay = document.getElementById('chronometer');
const targetGoalDisplay = document.getElementById('targetGoal');

function startGame() {
  chronometerDisplay.textContent = 'Press Space to Start';
  targetGoalDisplay.textContent = 'Target Goal: 5.00 seconds';
  document.addEventListener('keydown', handleKeyPress);
}

function startChronometer() {
  startTime = new Date();
  chronometerInterval = setInterval(updateChronometer, 10);
  document.removeEventListener('keydown', startChronometerOnSpace);
}

function stopChronometer() {
  const elapsedTime = (new Date() - startTime) / 1000;
  clearInterval(chronometerInterval);

  if (elapsedTime === 5.00) {
    chronometerDisplay.textContent = `vraiment trop chaud! ton temps : ${elapsedTime.toFixed(2)} seconds. voici le dernier indice : O`;
  } else {
    chronometerDisplay.textContent = `You lost. Your Time: ${elapsedTime.toFixed(2)} seconds. Press Space to Restart`;
  }

  level = 1;
  document.addEventListener('keydown', startChronometerOnSpace); // Reattach the event listener
}

function updateChronometer() {
  const elapsedTime = (new Date() - startTime) / 1000;
  chronometerDisplay.textContent = `Elapsed Time: ${elapsedTime.toFixed(2)} seconds`;
}

function startChronometerOnSpace(event) {
  if (event.code === 'Space') {
    startChronometer();
  }
}

function handleKeyPress(event) {
  if (event.code === 'Space') {
    if (startTime) {
      stopChronometer();
    } else {
      startChronometer();
    }
  }
}

startGame();
