const places = [
    {
      image: 'places/1.png',
      answer: 'tang freres',
    },
    {
        image: 'places/2.png',
        answer: 'parc de choisy',
    },
    {
        image: 'places/3.png',
        answer: 'mediatheque jean pierre melville',
    },
    {
        image: 'places/4.png',
        answer: 'pro spot',
    },
    {
        image: 'places/5.png',
        answer: 'tricotin',
    },
    {
        image: 'places/6.png',
        answer: 'diderot',
    },
    {
        image: 'places/7.png',
        answer: 'bastille',
    },
    {
        image: 'places/8.png',
        answer: 'andre citroen',
    },
    {
        image: 'places/9.png',
        answer: 'palais de tokyo',
    },
    {
        image: 'places/10.png',
        answer: 'pyramides',
    },
    {
      image: 'places/10.png',
      answer: 'pyramides',
    }


    // Add more places with their images and answers
  ];

  let currentPlaceIndex = 0;

  function areAllQuestionsAnswered() {
    return currentPlaceIndex === places.length - 1;
  }

  function displayCurrentPlace() {
    const placeImage = document.getElementById('placeImage');
    placeImage.src = places[currentPlaceIndex].image;
  
    // Display the current place index
    const placeCounter = document.getElementById('placeCounter');
    placeCounter.textContent = `Place ${currentPlaceIndex + 1} of ${places.length-1}`;
  }

function checkAnswer() {
  const userGuess = document.getElementById('userGuess').value.toLowerCase();
  const correctAnswer = places[currentPlaceIndex].answer.toLowerCase();
  const resultMessage = document.getElementById('resultMessage');

  if (userGuess === correctAnswer) {
    resultMessage.textContent = "t cho tu connais ton quartier toi hein";
    document.getElementById('nextPlaceBtn').style.display = 'inline'; // Show the "Next Place" button
  } else {
    resultMessage.textContent = 'mais noon tu connais pas tes spots ??';
  }
}

function nextPlace() {
    currentPlaceIndex = (currentPlaceIndex + 1) % places.length;
  
    displayCurrentPlace();
    document.getElementById('userGuess').value = ''; // Clear the input field
    document.getElementById('resultMessage').textContent = ''; // Clear the result message
    document.getElementById('nextPlaceBtn').style.display = 'none'; // Hide the "Next Place" button
  
    if (areAllQuestionsAnswered()) {
      document.getElementById('gameContainer').style.display = 'none'; // Hide the game container
      document.getElementById('winMessage').style.display = 'block'; // Show the win message
    }
  }
  
  function handleInputChange() {
    document.getElementById('nextPlaceBtn').style.display = 'none'; // Hide the "Next Place" button
  }

  document.getElementById('userGuess').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });

  // Initial display
  displayCurrentPlace();