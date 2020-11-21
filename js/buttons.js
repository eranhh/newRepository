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
    elEasyBtn.style.backgroundColor = ' rgba(224, 159, 6, 0.979)';
    elMediumBtn.style.backgroundColor = 'lightyellow';
    elHardBtn.style.backgroundColor = 'lightyellow';
    elCusBtn.style.backgroundColor = 'lightyellow';
    gLevel.size = 4
    gLevel.mines = 3
    init()

}

function playMedium() {
    elEasyBtn.style.backgroundColor = 'lightyellow';
    elMediumBtn.style.backgroundColor = ' rgba(224, 159, 6, 0.979)';
    elHardBtn.style.backgroundColor = 'lightyellow';
    elCusBtn.style.backgroundColor = 'lightyellow';
    gLevel.size = 8
    gLevel.mines = 12
    init()
}

function playHard() {
    elEasyBtn.style.backgroundColor = 'lightyellow';
    elMediumBtn.style.backgroundColor = 'lightyellow';
    elHardBtn.style.backgroundColor = ' rgba(224, 159, 6, 0.979)';
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
    gLevel.size = +prompt('please enter number from 5 to 15')
    while (gLevel.size > 15 || gLevel.size < 5) {
        gLevel.size = +prompt('invalid number, please try again! Enter number from 5 to 15')
    }
    gLevel.mines = +prompt('please enter how many mines you want, minimum 3!')
    while (gLevel.mines < 3) {
        gLevel.mines = +prompt('invalid number, please try again! enter how many mines you want, minimum 3')
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