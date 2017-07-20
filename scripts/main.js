$(function() {
    newgame();
});

function newgame() {
    // initializing game board
    init();
    // generate two number randomly in two cells
    generateOneNumber();
    generateTwoNumber();
}

// game board
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
function getPosTop(i, j) {
    return 20 +  i * 120; // 20px for margin, 
}
function getPosLeft(i, j) {
    return 20 + j * 120;
}
// game cell
function updateBoardView() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j +"'></div>");
            
        }
    }
}