let currentIndex = 0;
let startTime;
let chronometerInterval;
const arrowSymbols = ['←', '→', '↑', '↓'];
let sequence = generateRandomSequence(20); // Adjust the length as needed

const sequenceDisplay = document.getElementById('sequence-display');
const chronometerDisplay = document.getElementById('chronometer');
const specialText = document.querySelector('.special-text');
const failMessageElement = document.getElementById('fail-message');
const winMessageElement = document.getElementById('win-message');

function generateRandomSequence(length) {
  const sequence = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * arrowSymbols.length);
    sequence.push(arrowSymbols[randomIndex]);
  }
  return sequence;
}

function displaySequence() {
  const displayText = sequence.join(' ');
  sequenceDisplay.innerHTML = displayText;
}

function updateSequenceDisplay() {
  const sequenceText = sequence.map((key, index) => {
    if (index < currentIndex) {
      return `<span class="green">${key}</span>`;
    } else {
      return key;
    }
  }).join(' ');

  sequenceDisplay.innerHTML = sequenceText;
}

function showFailMessage() {
  failMessageElement.textContent = 'You failed. You have to retry.';
  specialText.style.display = 'block';
  sequenceDisplay.style.display = 'none';
  clearInterval(chronometerInterval); // Stop the chronometer
}

function showWinMessage() {
  winMessageElement.textContent = "T'as fini en moins de 5 secondes bien ouej, voici ton indice : B comme baltringue";
  specialText.style.display = 'block';
  sequenceDisplay.style.display = 'none';
  clearInterval(chronometerInterval); // Stop the chronometer
}

function handleKeyPress(event) {
  if (event.code === 'Space') {
    resetGame();
    return;
  }

  if (currentIndex === 0) {
    startTime = new Date();
    chronometerInterval = setInterval(updateChronometer, 50);
  }

  const expectedKey = sequence[currentIndex];

  // Convert arrow symbols to 'Arrow' values
  const arrowMapping = {
    'ArrowLeft': '←',
    'ArrowRight': '→',
    'ArrowUp': '↑',
    'ArrowDown': '↓',
  };

  const pressedKey = arrowMapping[event.code] || event.code;

  if (pressedKey === expectedKey) {
    currentIndex++;
    updateSequenceDisplay();

    if (currentIndex === sequence.length) {
      const elapsedTime = (new Date() - startTime) / 1000;
      if (elapsedTime > 5) {
        showFailMessage();
      } else {
        showWinMessage(elapsedTime);
      }
    }
  } else {
    currentIndex = 0;
    updateSequenceDisplay();
    sequenceDisplay.classList.add('red');
    setTimeout(() => {
      sequenceDisplay.classList.remove('red');
    }, 500);
  }
}

function resetGame() {
  currentIndex = 0;
  startTime = null;
  sequence = generateRandomSequence(20); // Adjust the length as needed
  displaySequence();
  resetChronometer();
  hideFailMessage(); // Add this line to hide the fail message
}

function hideFailMessage() {
  failMessageElement.textContent = ''; // Clear the fail message
  specialText.style.display = 'none';
  sequenceDisplay.style.display = 'block';
}
function updateChronometer() {
  const elapsedTime = (new Date() - startTime) / 1000;
  chronometerDisplay.textContent = `Elapsed Time: ${elapsedTime.toFixed(2)} seconds`;
}

function resetChronometer() {
  chronometerDisplay.textContent = 'Elapsed Time: 0.00 seconds';
  clearInterval(chronometerInterval);
}

document.addEventListener('keydown', handleKeyPress);
displaySequence();
updateSequenceDisplay();  // Initial display
