'use strict'
console.log('GO MARK THESE MINES!')

const MINE = '&#128163;';
const FLAG = '&#128681;';
const EMPTY = '';

//  smilies : 128546	128553 128526	128515 //

var gBoard
var gLevel = {
    size: 4,
    mines: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gMineCounter = 0;

function init() {
    gBoard = buildBoard();
    renderBoard(gBoard)
}

function buildBoard() {
    var SIZE = gLevel.size
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;


        }

    }
    board[1][3].isMine = true
    board[2][2].isMine = true
    setMinesNegsCount(board)

    return board;
}

function renderBoard(board) {
    var strHTML = '<table border="1" class = "board"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellHTML = currCell.minesAroundCount
            if (currCell.minesAroundCount === 0) cellHTML = EMPTY
            if (currCell.isMine === true) cellHTML = MINE
            var className = `cell-${i}-${j}`;

            className += ' hide'
            strHTML += `<td data-i="${i}" data-j="${j}" class=" board ${className}" onclick = "cellClicked(this,${i},${j})">${cellHTML}</td>`
        }
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector('.board');
    console.log('elBoard',  elBoard)
    elBoard.innerHTML = strHTML;
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var minesCount = countMinesAround(board, i, j)
            cell.minesAroundCount = minesCount
        }
    }



}


function countMinesAround(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat.length) continue
            if (rowIdx === i && colIdx === j) continue
            if (mat[i][j].isMine) count++
        }
    }
    return count
}


function generalMinesCounter(gBoard) {

}


function cellClicked(elCell, i, j) {
    randMines(i, j, gLevel)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
    console.log('elCell', elCell, i, j)
}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}

function randMines(posI, posJ, gLevel) {
    var mineCount = 0;
    while (mineCount < gLevel.mines) {
        var collIdx = getRandomInt(0, gLevel.size)
        var rowIdx = getRandomInt(0, gLevel.size)
        if (collIdx === posI && rowIdx === posJ) continue
        if (gBoard[collIdx][rowIdx].isMine === true) continue
        gBoard[collIdx][rowIdx].isMine = true;
        mineCount++

    }
}