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
 *  SCORE
 * 
 *  score updates only when numbers added up
 */
var score = 0;
function showScore(score) {
    $("#score").text(score);
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
 *  Game Play Logic
 *  ===============
 * 
 *  current cell is movable
 *  1, if target cell is 0 and current cell's neighbour is 0
 *          update target value to current cell's value and change current value to 0
 *  2, if target cell value is as same as current cell value
 *          change target cell's value to sum(cur, target) and change current value to 0
 */
// when a key is pressed
$(document).keydown(function(e) {
    switch (e.keyCode) {
        // left
        case 37: 
            if (moveLeft()) {
                generateOneNumber();
                isOver();
            }
            break;
        // up
        case 38:
            if (moveUp()) {
                generateOneNumber();
                isOver();
            }
            break;
        // right
        case 39:
            if (moveRight()) {
                generateOneNumber();
                isOver();
            }
            break;
        // down
        case 40:
            if (moveDown()) {
                generateOneNumber();
                isOver();
            }
            break;
    }
});
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    //row
    for (var i = 0; i < 4; i++) {
       // col
        for (var j = 1; j < 4; j++) { // column starts from 1 because 0 is the most left 
            if (board[i][j] != 0) { // current cell has value
                // new col
                for (var k = 0; k < j; k++) { 
                    // if target cell is 0 and neighbored cells are 0 too
                    if (board[i][k] == 0 && noBlockCol(i, j, k, board)) {
                        // update target cell value to moving cell value
                        moveAnimation(i, j, i, k); // show animation effect
                        board[i][k] = board[i][j];
                        board[i][j] = 0; // change moving cell value to 0;
                    }
                    // if target cell value equals to moving cell value and neighbored cells are 0
                    else if (board[i][k] == board[i][j] && noBlockCol(i, j, k, board)){
                        moveAnimation(i, j, i, k); // show animation effect
                        // update target value to sum and change current moving cell to 0
                        board[i][k] = board[i][k] + board[i][j];
                        board[i][j] = 0;
                        // score update
                        score += board[i][k];
                        showScore(score);
                    }
                }
            }
        }
    }
    updateBoardView();
    return true;
}
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    //row
    for (var i = 0; i < 4; i++) {
       // col
        for (var j = 2; j >= 0; j--) { // column starts from 1 because 0 is the most left 
            if (board[i][j] != 0) { // current cell has value
                // new col
                for (var k = 3; k > j; k--) { 
                    // if target cell is 0 and neighbored cells are 0 too
                    if (board[i][k] == 0 && noBlockCol(i, j, k, board)) {
                        // update target cell value to moving cell value
                        moveAnimation(i, j, i, k); // show animation effect
                        board[i][k] = board[i][j];
                        board[i][j] = 0; // change moving cell value to 0;
                    }
                    // if target cell value equals to moving cell value and neighbored cells are 0
                    else if (board[i][k] == board[i][j] && noBlockCol(i, j, k, board)){
                        moveAnimation(i, j, i, k); // show animation effect
                        // update target value to sum and change current moving cell to 0
                        board[i][k] = board[i][k] + board[i][j];
                        board[i][j] = 0;
                        // score update
                        score += board[i][k];
                        showScore(score);
                    }
                }
            }
        }
    }
    updateBoardView();
    return true;
}
function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    // row
    for (var i = 1; i < 4; i++) { // row starts from 1 because 0 is the most top 
        // col
        for (var j = 0; j < 4; j++) { 
            if (board[i][j] != 0) { // current cell has value
                // new row
                for (var k = 0; k < i; k++) { 
                    // if target cell is 0 and neighbored cells are 0 too
                    if (board[k][j] == 0 && noBlockRow(i, j, k, board)) {
                        // update target cell value to moving cell value
                        moveAnimation(i, j, k, j); // show animation effect
                        board[k][j] = board[i][j];
                        board[i][j] = 0; // change moving cell value to 0;
                    }
                    // if target cell value equals to moving cell value and neighbored cells are 0
                    else if (board[k][j] == board[i][j] && noBlockRow(i, j, k, board)){
                        moveAnimation(i, j, k, j); // show animation effect
                        // update target value to sum and change current moving cell to 0
                        board[k][j] = board[k][j] + board[i][j];
                        board[i][j] = 0;
                        // score update
                        score += board[k][j];
                        showScore(score);
                    }
                }
            }
        }
    }
    updateBoardView();
    return true;
}
function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    // row
    for (var i = 2; i >= 0; i--) {
        // col
        for (var j = 0; j < 4; j++) { // column starts from 1 because 0 is the most left 
            if (board[i][j] != 0) { // current cell has value
                // new row
                for (var k = 3; k > i; k--) { 
                    // if target cell is 0 and neighbored cells are 0 too
                    if (board[k][j] == 0 && noBlockRow(i, j, k, board)) {
                        // update target cell value to moving cell value
                        moveAnimation(i, j, k, j); // show animation effect
                        board[k][j] = board[i][j];
                        board[i][j] = 0; // change moving cell value to 0;
                    }
                    // if target cell value equals to moving cell value and neighbored cells are 0
                    else if (board[k][j] == board[i][j] && noBlockRow(i, j, k, board)){
                        moveAnimation(i, j, k, j); // show animation effect
                        // update target value to sum and change current moving cell to 0
                        board[k][j] = board[k][j] + board[i][j];
                        board[i][j] = 0;
                        // score update
                        score += board[k][j];
                        showScore(score);
                    }
                }
            }
        }
    }
    updateBoardView();
    return true;
}
function moveAnimation(fromX, fromY, toX, toY) {
        numberCell = $("#number-cell-" + fromX + "-" + fromY);
        numberCell.animate({
            top: getPosLeft(toX, toY),
            left: getPosLeft(toX, toY)
        }, 200);
}
// check if cols and rows are blocked
function noBlockCol(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}
function noBlockRow(row1, col, row2, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}
// check if is movable: can only move when neighboured cell are zero or neighbored cells have the same value
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j > i; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(board) {
    for (var i = 2; i >= 0; i--) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[ + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 *  GAME OVER
 */


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