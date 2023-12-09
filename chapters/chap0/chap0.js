const questions = [
    {
        question: "T'es qui ?",
        options: ["Alex", "Alexandre", "Thomas", "Batman"],
        correctAnswer: "Batman"
    },
    {
        question: "T'as quel age ?",
        options: ["20", "21", "0", "100"],
        correctAnswer: "0"
    },
    {
        question: "D'ou vient Pingu ?",
        options: ["LA CHINE", "Gotham city", "LA STREET", "NARNIA"],
        correctAnswer: "Gotham city"
    },
    {
        question: "Ou est nee Ines?",
        options: ["Alfortville", "Sartrouville", "Moneyville", "Quoicoubakawaiiville"],
        correctAnswer: "Alfortville"
    },
    {
        question: "Qui a ramasse le caca sur la cuvette pendant le voyage caillou ?",
        options: ["Mika", "Billal", "Alex", "Nicolas"],
        correctAnswer: "Mika"
    },
    {
        question: "Quel est le nom anglais de metamorph ?",
        options: ["Dito", "Dildo", "Newjeans", "Ditto"],
        correctAnswer: "Ditto"
    },
    {
        question: "Jour d'adoption de Pingu ?",
        options: ["11/11/2023", "12/11/2023", "09/12/2002", "13/11/2023"],
        correctAnswer: "12/11/2023"
    },
    {
        question: "Combien d'episodes dans Arcane ?",
        options: ["7", "8", "9", "10"],
        correctAnswer: "9"
    },
    {
        question: "Quel etait ton maquillage pour Halloween 2022 ?",
        options: ["Batman", "Cicatrices", "Une bouche dechiree", "Alexandre"],
        correctAnswer: "Une bouche dechiree"
    },
    {
        question: "Quelle est la marque de la premiere board de william ?",
        options: ["Flip", "Baker", "Supreme", "L'echoppe"],
        correctAnswer: "Flip"
    },
    
    // Add more questions as needed
];

let currentQuestionIndex = 0;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const resetButton = document.getElementById('reset-btn');
const questionCounterElement = document.getElementById('question-counter');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionCounterElement.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    questionElement.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.onclick = function () {
            checkAnswer(this);
        };
        optionsContainer.appendChild(button);
    });

    nextButton.style.display = 'none';
    resetButton.style.display = 'none';
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = selectedOption.textContent;

    if (selectedAnswer === currentQuestion.correctAnswer) {
        selectedOption.style.backgroundColor = 'green';
        nextButton.style.display = 'block';
        resetButton.style.display = 'none';
    } else {
        selectedOption.style.backgroundColor = 'red';
        nextButton.style.display = 'none';
        resetButton.style.display = 'block';
    }

    optionsContainer.querySelectorAll('.option').forEach(option => {
        option.disabled = true; // Disable other options after selecting one
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Display completion message
        questionCounterElement.textContent = "Bien ouej le A, voici ton premier indice : U";
        questionElement.textContent = ""; // Clear question text
        optionsContainer.innerHTML = ""; // Clear options
        nextButton.style.display = 'none';
    }
}

function resetQuestion() {
    optionsContainer.querySelectorAll('.option').forEach(option => {
        option.style.backgroundColor = ''; // Reset background color
        option.disabled = false; // Enable options
    });

    nextButton.style.display = 'none';
    resetButton.style.display = 'none';

    currentQuestionIndex = 0;
    loadQuestion();
}

// Initial load
loadQuestion();
