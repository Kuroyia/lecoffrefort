const game = () => {
    let pScore = 0;
    let cScore = 0;
  
    //Start the Game
    const startGame = () => {
      const playBtn = document.querySelector(".intro button");
      const introScreen = document.querySelector(".intro");
      const match = document.querySelector(".match");
      const game = document.querySelector(".game");
      
  
      playBtn.addEventListener("click", () => {
        introScreen.classList.add("fadeOut");
        match.classList.add("fadeIn");
      });
    };
    //Play Match
    const playMatch = () => {
      const options = document.querySelectorAll(".options button");
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");
      const hands = document.querySelectorAll(".hands img");
  
      hands.forEach(hand => {
        hand.addEventListener("animationend", function() {
          this.style.animation = "";
        });
      });
      //Computer Options
      const computerOptions = ["thomas", "mika", "william"];
  
      options.forEach(option => {
        option.addEventListener("click", function() {
          //Computer Choice
          const computerNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[computerNumber];
  
          setTimeout(() => {
            //Here is where we call compare hands
            compareHands(this.textContent, computerChoice);
            //Update Images
            playerHand.src = `./img/${this.textContent}.png`;
            computerHand.src = `./img/${computerChoice}.png`;
          }, 2000);
          //Animation
          playerHand.style.animation = "shakePlayer 2s ease";
          computerHand.style.animation = "shakeComputer 2s ease";
        });
      });
    };
  
    const updateScore = () => {
      const playerScore = document.querySelector(".player-score p");
      const computerScore = document.querySelector(".computer-score p");
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    };
  
    const compareHands = (playerChoice, computerChoice) => {
        // Update Text
        const winner = document.querySelector(".winner");
      
        // Checking for a tie
        if (playerChoice === computerChoice) {
          winner.textContent = "oh non";
          return;
        }
      
        // Make the computer always win
        winner.textContent = "Continue chef";
        cScore++;
        updateScore();
      
        // Check if the player has reached 20 losses
        if (cScore === 20) {
          // Display win message and hide the board
          winner.textContent = "non";
          document.querySelector(".game").style.display = "none";
          $('.special-text').show();
        }
      };
      
  
    //Is call all the inner function
    startGame();
    playMatch();
  };
  
  //start the game function
  game();