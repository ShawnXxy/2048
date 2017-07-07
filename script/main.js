$(function() {
    newgame();
});

function newgame() {
    // initializing
    init();
    // generate two number randomly in two cells
    generateOneNumber();
    generateTwoNumber();
}

var board = new Array();
function init() {
    for (var i = 0; i < 4; i++) { // for rows
        board[i] = new Array();
        for (var j = 0; j < 4; j++) { // for columns
            board[i][j] = 0; // initializing each cell to 0
            var gridCell = $("#grid-cell-" + i + "-" + j);
            // set margin-top for each cell
            gridCell.css("top", getPostTop(i, j));
            // set margin-left for each cell
            gridCell.css("left", getPostLeft(i, j));
        }
    }
}