let colors = ['blue', 'yellow', 'violet', 'green', 'red'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let startButton = document.querySelector('.start-game-button');
let music = document.querySelector('.bg-music');

function createBalloon() {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[rand];
    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;
    body.appendChild(div);
    animateBalloon(div);
}

function animateBalloon(elem) {
    let pos = 0;
    let random = Math.floor(Math.random() * (6 - 3));
    let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

    function frame() {
        if (pos >= (windowHeight + 200) && (document.querySelector('[data-number = "' + elem.dataset.number + '"]') !== null)) {
            clearInterval(interval);
            gameOver = true;

        } else {
            pos++;
            elem.style.top = windowHeight - pos + 'px';
        }
    }

}
function playBallSound() {
    let audio1 = document.querySelector('.pop');
    audio1.play();
}

function deleteBalloon(elem) {
	 playBallSound();
    elem.remove();
    num++;
    updateScore();
    
}

document.addEventListener('click', function() {
    if (event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
    }
});

function updateScore() {
    for (let i = 0; i < scores.length; i++) {
        scores[i].textContent = num;
    }
}

function startGame() {
    restartGame();
    let timeout = 0;
    let loop = setInterval(function() {
        timeout = Math.floor(Math.random() * (600 - 100));
        if (!gameOver && num !== total) {
            createBalloon();
        } else if (num !== total) //user let balloon reach the browser
        {

            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block';

        } else {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';

        }
    }, 800 + timeout);
}

function restartGame() {
    let forRemoving = document.querySelectorAll('.balloon')
    for (let i = 0; i < forRemoving.length; i++) {
        forRemoving[i].remove();

    }
    gameOver = false;
    num = 0;
    updateScore();
}
document.querySelector('.restart2').addEventListener('click', function() {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
});
document.querySelector('.cancel2').addEventListener('click', function() {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    let forRemoving = document.querySelectorAll('.balloon');
    for (let i = 0; i < forRemoving.length; i++) {
        forRemoving[i].remove();

    }
    music.pause();
    document.querySelector('.end-game-window').style.display = 'flex';
    document.querySelector('.score-block').style.display = 'none';
});
document.querySelector('.restart1').addEventListener('click', function() {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    startGame();
});
document.querySelector('.cancel1').addEventListener('click', function() {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    let forRemoving = document.querySelectorAll('.balloon');
    for (let i = 0; i < forRemoving.length; i++) {
        forRemoving[i].remove();

    }
    music.pause();
    document.querySelector('.end-game-window').style.display = 'flex';
    document.querySelector('.score-block').style.display = 'none';
});

startButton.addEventListener('click', function() {
    startGame();
    music.play();
    document.querySelector('.start-game-window').style.display = 'none';
});
