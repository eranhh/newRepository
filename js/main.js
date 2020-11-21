'use strict'
console.log('GO MARK THESE MINES!')

const MINE = '&#128163;';
const FLAG = '&#128681;';
const EMPTY = '';


//  smilies : 128546	128553 128526	128515 //

var gBoard
var gLevel = {
    size: 8,
    mines: 12
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLives = 3
var gIsFirstClick = true;
var gCellsShownCount = 0;

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
            var className = `cell-${i}-${j}`;
            if (currCell.minesAroundCount === 0) cellHTML = EMPTY
            if (currCell.isMine === true) cellHTML = MINE
            if (currCell.isMarked === true) {
                cellHTML = FLAG;
                className += 'marked'
            }
            if (currCell.isShown === false) {
                className += ` hidden`
            }
            strHTML += `<td data-i="${i}" data-j="${j}" class=" board ${className}" onclick = "cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j}); return false;">${cellHTML}</td>`
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


function cellMarked(elCell, i, j) {
    var cell = gBoard[i][j]
    cell.isMarked = true
    elCell.classList.remove('.hidden')
    console.log('elCell',  elCell)
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    if (gIsFirstClick) {
        randMines(i, j, gLevel)
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)
        gIsFirstClick = false;
    }
    if (cell.isMarked === true) {
        elCell.classList.remove('.hidden')
        renderBoard(gBoard)

    } else {
        cell.isShown = true
        renderBoard(gBoard)
        gCellsShownCount++
    }

    console.log('elCell', elCell, i, j)

    if (cell.isMine === true) {
        console.log('mine')
    }

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