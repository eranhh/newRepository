'use strict'

var audio2 = new Audio('audio/minecrash.wav')
var audio1 = new Audio('audio/flag.wav')
var elLivesModal = document.querySelector('.lives-modal')


function playSound(audio) {
    audio.play();
}

function openLivesModal() {
    elLivesModal.innerText = `Oops! \n You clicked on a mine \n and lost a life!`
    elLivesModal.style.display = 'block'
    setTimeout(closeLivesModal, 2500)
}

function closeLivesModal() {
    elLivesModal.style.display = 'none';

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}




















// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

function printMat(mat, selector) {
    var strHTML = '<table border="1" class = "table"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}