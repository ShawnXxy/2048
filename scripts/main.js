$(function() {
    newgame();
});

function newgame() {
    // initializing game board
    init();
    // generate two number randomly in two cells
    generateOneNumber();
    generateOneNumber();
}

/** 
 * ==============
 *  GAME BOARD
 * ===============
 */
var board = new Array();
function init() {
    for (var i = 0; i < 4; i++) { // for rows
        board[i] = new Array();
        for (var j = 0; j < 4; j++) { // for columns
            board[i][j] = 0; // initializing each cell to 0
            var gridCell = $("#grid-cell-" + i + "-" + j);
            // set margin-top for each cell
            gridCell.css("top", getPosTop(i, j));
            // set margin-left for each cell
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    updateBoardView();
}
// game cell
var numberCell;
function updateBoardView() {
    $(".number-cell").remove(); // clear previous format
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j +"'></div>");
            numberCell = $("#number-cell-" + i + "-" + j); 
            if (board[i][j] == 0) { // if cell value is zero, set width, height to zero so that not to display
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50); // 50 means to set number shown in the center of cell
                numberCell.css("left", getPosLeft(i, j) + 50);
            } else { 
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
        }
    }
    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "60px");
}

/** 
 * ==============
 *  NUMBERS
 *  generate numbers
 * ===============
 */
var randomNum; // used to store generated number
function generateOneNumber() {
    // 1, generate random cell
    var randomx = parseInt(Math.floor(Math.random() * 4));
    var randomy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randomx][randomy] == 0) {
            break;
        }
        randomx = parseInt(Math.floor(Math.random() * 4));
        randomx = parseInt(Math.floor(Math.random() * 4));
    }
    // 2, generate random number (number should be 2 or 4)
    if (Math.random() < 0.5) {
        randomNum = 2;
    } else {
        randomNum = 4;
    }
    // 3, display random number at random cell
    board[randomx][randomy] = randomNum;
    showNumber(randomx, randomy, randomNum);
}
function showNumber(i, j, num) {
    numberCell = $("#number-cell-" + i + "-" + j); 
    numberCell.css("background-color", getNumberBackgroundColor(randomNum));
    numberCell.css("color", getNumberColor(randomNum));
    numberCell.text(randomNum);
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

/**
 *  ===============
 *  Game Running
 *  ===============
 */
// when a key is pressed
$(document).keydown(function(e) {
    switch (e.keyCode) {
        // left
        case 37: 
            if (moveLeft()) {
                
            }
            break;
        // up
        case 38:
            break;
        // right
        case 39:
            break;
        // down
        case 40:
            break;
    }
});

/** 
 * ==============
 *  HELPER FUNCTION
 * ===============
 */
function getPosTop(i, j) {
    return 20 +  i * 120; // 20px for margin, 
}
function getPosLeft(i, j) {
    return 20 + j * 120;
}

function getNumberBackgroundColor(num) {
    switch (num) {
        case 2: return "#eee4da"; 
                break;
        case 4: return "#ede0c8";
                break;
        case 8: return "#f2b179"; 
                break;
        case 16: return "#f59563";
                break;
        case 32: return "#f67c5f"; 
                break;
        case 64: return "#f65e3b";
                break;
        case 128: return "#edcf72"; 
                break;
        case 256: return "#edcc61";
                break;
        case 512: return "#9c0"; 
                break;
        case 1024: return "#33b5e5";
                break;
        case 2048: return "#09c"; 
                break;
        case 4096: return "#a6c";
                break;
        case 8192: return "#93c"; 
                break;
    }
}

function getNumberColor(num) {
    if (num <= 4) {
        return "#776e65";
    }
    return "white";
}