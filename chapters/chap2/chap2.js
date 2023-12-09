let b = 1; // block
let p = 2; // player
let g = 3; // goal
let f = 4; // death
let t = 5; // standstill goal
let px = 0;
let py = 0;
let dir = 0;
let start;
let stage = 0;
let canvasVisible = true;

const level1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 4, 4, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


const levels = [level1];

function preload() {
    // Load the local font
    faceFont = loadFont('../../cryptoftomorrow.ttf');
  }

function setup() {
    console.log("Setup function called");
    createCanvas(1000, 1000);
    start = new Array(levels[stage].length);
    findStart();
    
    startTime = millis(); // Set the start time when the sketch starts
}
function draw() {
    background(55);

    if (canvasVisible) {
        player();
        show();
            // Calculate elapsed time
        let elapsedTime = millis() - startTime;
        
        // Display elapsed time
        fill(0);
        textSize(20);
        textFont(faceFont);
        text("Time: " + nf(elapsedTime / 1000, 0, 2) + " seconds", 10, 50);
        // Check if the goal (3) is present anywhere in the array
        if (levels[stage][py][px] === 3 && dir === 0) {
            levels[stage][py][px] -= 2;
            console.log("coucou");
            noCanvas(); // Stop rendering the canvas
            stage++;
            stage %= levels.length;
        
            if (stage < levels.length) {
                findStart();
                console.log("wesh");
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                canvasVisible = true; // Set canvasVisible to true for the next level
            } else {
                canvasVisible = false;
                console.log("All levels completed!");
            }
        }

        if (dir !== 0) {
            move();
        }
    }
}

function keyPressed() {
    if (canvasVisible && dir === 0) {
        if (key === "w" || key === "W") {
            dir = 1;
        } else if (key === "d" || key === "D") {
            dir = 2;
        } else if (key === "s" || key === "S") {
            dir = 3;
        } else if (key === "a" || key === "A") {
            dir = 4;
        } else if (key === "r" || key === "R") {
            levels[stage][start[stage][0]][start[stage][1]] += 2;
            levels[stage][py][px] -= 2;
            player();
            dir = 0;
        }
    }
}

function move() {
    if (dir === 1) {
        if (py === 0) {
            levels[stage][start[stage][0]][start[stage][1]] += 2;
            levels[stage][py][px] -= 2;
            dir = 0;
            return;
        } else {
            if (levels[stage][py - 1][px] === 1) {
                dir = 0;
                return;
            } else if (levels[stage][py - 1][px] === 3) {
                levels[stage][py][px] -= 2;
                noCanvas();
                $('.special-text').show();
                stage++;
                stage %= levels.length;
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                dir = 0;
                return;
            } else if (levels[stage][py - 1][px] === 4) {
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                levels[stage][py][px] -= 2;
                player();
                dir = 0;
                return;
            } else {
                levels[stage][py][px] -= 2;
                levels[stage][py - 1][px] += 2;
                return;
            }
        }
    }

    if (dir === 2) {
        if (px === levels[stage][py].length - 1) {
            levels[stage][start[stage][0]][start[stage][1]] += 2;
            levels[stage][py][px] -= 2;
            dir = 0;
            return;
        } else {
            if (levels[stage][py][px + 1] === 1) {
                dir = 0;
                return;
            } else if (levels[stage][py][px + 1] === 3) {
                levels[stage][py][px] -= 2;
                noCanvas();
                $('.special-text').show();
                stage++;
                stage %= levels.length;
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                dir = 0;
                return;
            } else if (levels[stage][py][px + 1] === 4) {
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                levels[stage][py][px] -= 2;
                player();
                dir = 0;
                return;
            } else {
                levels[stage][py][px] -= 2;
                levels[stage][py][px + 1] += 2;
                return;
            }
        }
    }

    if (dir === 3) {
        if (py === levels[stage].length - 1) {
            levels[stage][start[stage][0]][start[stage][1]] += 2;
            levels[stage][py][px] -= 2;
            dir = 0;
            return;
        } else {
            if (levels[stage][py + 1][px] === 1) {
                dir = 0;
                return;
            } else if (levels[stage][py + 1][px] === 3) {
                levels[stage][py][px] -= 2;
                noCanvas();
                $('.special-text').show();
                stage++;
                stage %= levels.length;
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                dir = 0;
                return;
            } else if (levels[stage][py + 1][px] === 4) {
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                levels[stage][py][px] -= 2;
                player();
                dir = 0;
                return;
            } else {
                levels[stage][py][px] -= 2;
                levels[stage][py + 1][px] += 2;
                return;
            }
        }
    }

    if (dir === 4) {
        if (px === 0) {
            levels[stage][start[stage][0]][start[stage][1]] += 2;
            levels[stage][py][px] -= 2;
            dir = 0;
            return;
        } else {
            if (levels[stage][py][px - 1] === 1) {
                dir = 0;
            } else if (levels[stage][py][px - 1] === 3) {
                levels[stage][py][px] -= 2;
                noCanvas();
                $('.special-text').show();
                stage++;
                stage %= levels.length;
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                dir = 0;
            } else if (levels[stage][py][px - 1] === 4) {
                levels[stage][start[stage][0]][start[stage][1]] += 2;
                levels[stage][py][px] -= 2;
                player();
                dir = 0;
            } else {
                levels[stage][py][px] -= 2;
                levels[stage][py][px - 1] += 2;
            }
        }
    }
}

function player() {
  for (let i = 0; i < levels[stage].length; i++) {
    for (let j = 0; j < levels[stage][i].length; j++) {
      if (levels[stage][i][j] === 2 || levels[stage][i][j] === 7) {
        px = j;
        py = i;
        return;
      }
    }
  }
}

function findStart() {
    for (let k = 0; k < levels.length; k++) {
        for (let i = 0; i < levels[k].length; i++) {
            for (let j = 0; j < levels[k][i].length; j++) {
                if (levels[k][i][j] === 2) {
                    start[k] = [i, j]; // Store the start position for the current level
                    if (k !== 0) {
                        levels[k][i][j] = 0;
                    }
                }
            }
        }
    }
}


function show() {
    strokeWeight(2);
    for (let i = 0; i < levels[stage].length; i++) {
      for (let j = 0; j < levels[stage][i].length; j++) {
        if (levels[stage][i][j] === 1) {
          fill(255);
          rect(j * 50, i * 50, 50, 50);
        } else if (levels[stage][i][j] === 2) {
          fill(0, 255, 0);
          ellipse(j * 50 + 25, i * 50 + 25, 40, 40);
        } else if (levels[stage][i][j] === 3) {
          fill(255, 0, 0);
          ellipse(j * 50 + 25, i * 50 + 25, 40, 40);
        } else if (levels[stage][i][j] === 4) {
          fill(0);
          rect(j * 50, i * 50, 50, 50);
        } else if (levels[stage][i][j] === 5) {
          fill(0, 0, 255);
          ellipse(j * 50 + 25, i * 50 + 25, 40, 40);
        } else if (levels[stage][i][j] === 7) {
          fill(255, 255, 0);
          ellipse(j * 50 + 25, i * 50 + 25, 40, 40);
        }
      }
    }
  }
  
