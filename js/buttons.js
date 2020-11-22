'use strict'

var elCusBtn = document.querySelector('.customize')
var elEasyBtn = document.querySelector('.easy-btn')
var elMediumBtn = document.querySelector('.medium-btn')
var elHardBtn = document.querySelector('.hard-btn')
var elTimer = document.querySelector('.modal-timer')
var elGameStatusEmoji = document.querySelector('.game-status')
var elFlags = document.querySelector('.flags')
var elLives = document.querySelector('.lives')
var elSafeClicks = document.querySelector('.safe-clicks')



function playAgain() {
    elGameStatusEmoji.innerHTML = '<p class = "game-update"> Game On! <br> Click to restart </p> &#128515; '
    init()
}

function playEasy() {
    elEasyBtn.style.backgroundColor = 'orange';
    elMediumBtn.style.backgroundColor = 'lightyellow';
    elHardBtn.style.backgroundColor = 'lightyellow';
    elCusBtn.style.backgroundColor = 'lightyellow';
    gLevel.size = 5
    gLevel.mines = 3
    init()

}

function playMedium() {
    elEasyBtn.style.backgroundColor = 'lightyellow';
    elMediumBtn.style.backgroundColor = 'orange';
    elHardBtn.style.backgroundColor = 'lightyellow';
    elCusBtn.style.backgroundColor = 'lightyellow';
    gLevel.size = 8
    gLevel.mines = 12
    init()
}

function playHard() {
    elEasyBtn.style.backgroundColor = 'lightyellow';
    elMediumBtn.style.backgroundColor = 'lightyellow';
    elHardBtn.style.backgroundColor = 'orange';
    elCusBtn.style.backgroundColor = 'lightyellow';
    gLevel.size = 12
    gLevel.mines = 30
    init()
}

function customizeLevel() {
    elEasyBtn.style.backgroundColor = 'lightyellow';
    elMediumBtn.style.backgroundColor = 'lightyellow';
    elHardBtn.style.backgroundColor = 'lightyellow';
    elCusBtn.style.backgroundColor = 'orange';
    gLevel.size = +prompt('Please enter a number between 5 and 15')
    while (gLevel.size > 15 || gLevel.size < 5) {
        gLevel.size = +prompt('Invalid number, please try again! Enter a number between 5 and 15')
    }
    gLevel.mines = +prompt('Please enter the number of mines you want, minimum is 3!')
    while (gLevel.mines < 3) {
        gLevel.mines = +prompt('Invalid number, please try again! Enter the number of mines you want, minimum is 3!')
    }
    init()
}

function showSafeClick() {
    if (gSafeClicks === 0) return
    if (gIsFirstClick === false) return
    if (gGame.isOn === false) return
    var i = getRandomInt(0, gBoard.length);
    var j = getRandomInt(0, gBoard.length);
    if (gBoard[i][j].isMine === false && gBoard[i][j].isShown === false && gBoard[i][j].isMarked === false) {
        console.log('gBoard[i][j]',  gBoard[i][j])
        gBoard[i][j].isShown = true;
        renderBoard(gBoard)
        gSafeClicks--;
        elSafeClicks.innerHTML = `Safe Clicks: ${gSafeClicks}`
        setTimeout(function() {
            gBoard[i][j].isShown = false
            renderBoard(gBoard)
        }, 3000);

    } else showSafeClick();
}