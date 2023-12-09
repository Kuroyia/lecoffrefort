var cpuIcon = 'X';
var playerIcon = 'O';
var AIMove;
var liveBoard = [1, -1, -1, -1, 1, 1, 1, -1, -1];
var winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

var lossCounter = 1;

function renderBoard(board) {
  board.forEach(function (el, i) {
    var squareId = '#' + i.toString();
    if (el === -1) {
      $(squareId).text(playerIcon);
    } else if (el === 1) {
      $(squareId).text(cpuIcon);
    }
  });

  $('.square:contains(X)').addClass('x-marker');
  $('.square:contains(O)').addClass('o-marker');
}

function animateWinLine() {
  var idxOfArray = winningLines.map(function (winLines) {
    return winLines.map(function (winLine) {
      return liveBoard[winLine];
    }).reduce(function (prev, cur) {
      return prev + cur;
    });
  });
  var squaresToAnimate = winningLines[idxOfArray.indexOf(Math.abs(3))];

  squaresToAnimate.forEach(function (el) {
    $('#' + el).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
  });
}

function chooseMarker() {
  $('.modal-container').css('display', 'block');
  $('.choose-modal').addClass('animated bounceInUp');

  $('.button-area span').click(function () {
    var marker = $(this).text();
    playerIcon = marker === 'X' ? 'X' : 'O';
    cpuIcon = marker === 'X' ? 'O' : 'X';

    $('.choose-modal').addClass('animated bounceOutDown');
    setTimeout(function () {
      $('.modal-container').css('display', 'none');
      $('.choose-modal').css('display', 'none');
      startNewGame();
    }, 700);

    $('.button-area span').off();
  });
}

function hideBoardAndShowText() {
    // Hide the board
    $('.board').hide();
    // Show the special text
    $('.special-text').show();
}

function endGameMessage(result) {
    if(lossCounter === 5){
        hideBoardAndShowText();
    }
  $('.end-game-modal h3').text(result === 'win' ? `Continue ! Loss Streak: ${lossCounter++}` : "T'es pas sur la bonne voie");
  $('.modal-container').css('display', 'block');
  $('.end-game-modal').css('display', 'block').removeClass('animated bounceOutDown').addClass('animated bounceInUp');

  $('.button-area span').click(function () {
    $('.end-game-modal').removeClass('animated bounceInUp').addClass('animated bounceOutDown');

    setTimeout(function () {
      $('.modal-container').css('display', 'none');
      startNewGame();
    }, 700);

    $('.button-area span').off();
  });
}

function startNewGame() {
  liveBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $('.square').text('').removeClass('o-marker x-marker');
  renderBoard(liveBoard);
  playerTakeTurn();
}

function playerTakeTurn() {
  $('.square:empty').hover(
    function () {
      $(this).text(playerIcon).css('cursor', 'pointer');
    },
    function () {
      $(this).text('');
    }
  );

  $('.square:empty').click(function () {
    $(this).css('cursor', 'default');
    liveBoard[parseInt($(this).attr('id'))] = -1;
    renderBoard(liveBoard);

    var result = checkVictory(liveBoard);
    if (result) {
      setTimeout(function () {
        endGameMessage(result);
      }, 100);
    } else {
      setTimeout(aiTakeTurn, 100);
    }
    $('.square').off();
  });
}

function aiTakeTurn() {
  miniMax(liveBoard, 'aiPlayer');
  liveBoard[AIMove] = 1;
  renderBoard(liveBoard);
  var result = checkVictory(liveBoard);
  if (result) {
    animateWinLine();
    setTimeout(function () {
      endGameMessage(result);
    }, 100);
  } else {
    playerTakeTurn();
  }
}

function checkVictory(board) {
  var squaresInPlay = board.reduce(function (prev, cur) {
    return Math.abs(prev) + Math.abs(cur);
  });

  var outcome = winningLines
    .map(function (winLines) {
      return winLines
        .map(function (winLine) {
          return board[winLine];
        })
        .reduce(function (prev, cur) {
          return prev + cur;
        });
    })
    .filter(function (winLineTotal) {
      return Math.abs(winLineTotal) === 3;
    });

  if (outcome[0] === 3) {
    return 'win';
  } else if (outcome[0] === -3) {
    return 'lose';
  } else if (squaresInPlay === 9) {
    return 'draw';
  } else {
    return false;
  }
}

function availableMoves(board) {
  return board
    .map(function (el, i) {
      if (!el) {
        return i;
      }
    })
    .filter(function (e) {
      return typeof e !== 'undefined';
    });
}

function miniMax(state, player) {
  var rv = checkVictory(state);
  if (rv === 'win') {
    return 10;
  }
  if (rv === 'lose') {
    return -10;
  }
  if (rv === 'draw') {
    return 0;
  }

  var moves = [];
  var scores = [];

  availableMoves(state).forEach(function (square) {
    state[square] = player === 'aiPlayer' ? 1 : -1;
    scores.push(miniMax(state, player === 'aiPlayer' ? 'opponent' : 'aiPlayer'));
    moves.push(square);
    state[square] = 0;
  });

  if (player === 'aiPlayer') {
    AIMove = moves[scores.indexOf(Math.max.apply(Math, scores))];
    return Math.max.apply(Math, scores);
  } else {
    AIMove = moves[scores.indexOf(Math.min.apply(Math, scores))];
    return Math.min.apply(Math, scores);
  }
}

renderBoard(liveBoard);
chooseMarker();
