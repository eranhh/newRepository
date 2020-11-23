'use strict'
console.log('GO MARK THESE MINES!')

const MINE = '&#128163;';
const FLAG = '&#128681;';
const MINE_EXPLODED = '&#128165;';

//  smilies :	sad 128553   victory 128526	regular 128515 //

var gBoard
var gLevel = {
    size: 5,
    mines: 3
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: gLevel.mines,
    secsPassed: 0
}
var gLives = 3
var gIsFirstClick = false;
gSafeClicks = 3


function init() {
    gLives = 3
    gSafeClicks = 3
    gGame.isOn = true
    gIsFirstClick = false;
    gGame.markedCount = gLevel.mines;
    elFlags.innerHTML = `${FLAG} = ${gGame.markedCount}`;
    elLives.innerHTML = ` &#128150; = ${gLives}`
    elGameStatusEmoji.innerHTML = '<p class = "game-update"> Game On! <br> click to restart </p> &#128515; '
    elSafeClicks.innerHTML = `Safe Clicks: ${gSafeClicks}`
    reset()
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
                isMarked: false,
                isOver: false,
                isSafe: false
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
            if (currCell.isSafe) className = `cell-${i}-${j} safe-cell`
            if (currCell.minesAroundCount === 0) cellHTML = ''
            if (!currCell.isOver && currCell.isMine) cellHTML = MINE;
            if (currCell.isOver) cellHTML = MINE_EXPLODED;
            if (!currCell.isMarked && !currCell.isShown && !currCell.isSafe) {
                className = ` cell-${i}-${j} hidden`
            } else if (currCell.isMarked === true) {
                cellHTML = FLAG;
                className = `cell-${i}-${j} marked`
            }
            strHTML += `<td class=" board ${className}" onclick = "cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j}); return false;">${cellHTML}</td>`
        }
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector('.board');
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
    if (gGame.isOn === false) return
    if (!gIsFirstClick) return
    var cell = gBoard[i][j]
    if (cell.isShown === true) return
    if (cell.isMarked === false) {
        if (gGame.markedCount <= 0) return
        cell.isMarked = true
        cell.isShown = false
        playSound(audio1)
        renderBoard(gBoard)
        gGame.markedCount--;
        elFlags.innerHTML = `${FLAG} = ${gGame.markedCount}`;
        checkVictory()
    } else if (cell.isMarked === true) {
        cell.isMarked = false
        cell.isShown = false
        renderBoard(gBoard)
        gGame.markedCount++;
        elFlags.innerHTML = `${FLAG} = ${gGame.markedCount}`;
    }
    console.log('elCell',  elCell)
}


function cellClicked(elCell, i, j) {
    if (gGame.isOn === false) return
    var cell = gBoard[i][j]
    if (!gIsFirstClick) {
        randMines(i, j, gLevel)
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)
        start()
        gIsFirstClick = true;
    }
    if (cell.isShown === true) return
    if (cell.isMarked === true) return
    if (cell.isMine === true && gLives > 1) {
        cell.isShown = false
        gLives--
        elLives.innerHTML = ` &#128150; = ${gLives}`
        openLivesModal()
        renderBoard(gBoard)
    } else if (cell.isMine === true) {
        cell.isOver = true;
        cell.isShown = true;
        playSound(audio2)
        gameOver()
        renderBoard(gBoard)
    } else {
        cell.isShown = true
        expandShown(gBoard, elCell, i, j)
        renderBoard(gBoard)
        checkVictory()
    }

    console.log('elCell', elCell, i, j)
    if (cell.isMine === true) console.log('mine')

}


function gameOver() {
    gGame.isOn = false;
    stop()
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine === true) {
                gBoard[i][j].isMarked = false
                gBoard[i][j].isShown = true
            }
        }
    }
    elGameStatusEmoji.innerHTML = '<p class = "game-update"> GAME OVER! <br> click to play again! </p> &#128553;'
    elLives.innerHTML = ` &#128148;`
    console.log('game over')
}


function checkVictory() {
    gGame.shownCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isShown === true) gGame.shownCount++
        }
    }
    console.log('gGame.shownCount:',  gGame.shownCount)
    if (gGame.markedCount === 0 && gGame.shownCount === (gLevel.size ** 2) - gLevel.mines) {
        victory()
        console.log('victory!')
    }
}


function victory() {
    gGame.isOn = false
    stop()
    elGameStatusEmoji.innerHTML = '<p class = "game-update"> VICTORY! <br> click to play again! </p> &#128526;'
}


function expandShown(board, elCell, i, j) {
    console.log('elCell',  elCell)
    for (var k = i - 1; k <= i + 1; k++) {
        if (k < 0 || k >= board.length) continue
        for (var l = j - 1; l <= j + 1; l++) {
            if (l < 0 || l >= board.length) continue
            if (k === i && l === j) continue
            if (board[i][j].minesAroundCount === 0 && board[i][j].isMarked === false) {
                board[k][l].isShown = true
                renderBoard(board)
            }
        }
    }
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