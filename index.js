let gameOver = document.querySelector('.gameOver');
let btn = document.querySelector('#btn');
let bush = document.querySelector('#bush');
let pine = document.querySelector('#pine');
let cactus = document.querySelector('#cactus');
let dino = document.querySelector('#dino');
let score = document.querySelector('#score');
let currScore = 0;
let overcomeBush = true, overcomeCactus = true, overcomePine = true;

startGame();

btn.addEventListener('click', reload);

function reload() {
    location.reload();
}

function startGame() {
    score.innerHTML = 'Your Score: 0';
    currScore = 0;
    document.body.classList.remove('bg-color');
    gameOver.innerHTML = '';
    btn.innerHTML = '';
    btn.classList.remove('.btn');
    bush.classList.add('bush-comes');
    cactus.classList.add('cactus-comes');
    pine.classList.add('pine-comes');
    keyWorking();
}

function keyWorking() {
    document.addEventListener('keydown', e => {
        let dinoLeft = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (e.keyCode === 38) {
            jump();
            console.log(dinoLeft);
        }
        if (e.keyCode === 39) {
            console.log(dino.style.left);
            if (dinoLeft <= 1248)
                dino.style.left = dinoLeft + 32 + "px";
        }
        if (e.keyCode === 37) {
            if (dinoLeft >= 112)
                dino.style.left = dinoLeft - 32 + 'px';

        }
    })
}

function jump() {
    if (!dino.classList.contains('jumpDino')) {
        dino.classList.add('jumpDino');
        setTimeout(() => {
            dino.classList.remove('jumpDino');
        }, 500);
    }
}

function scoreUpdate(currScore) {
    score.innerHTML = `Your score: ${currScore}`
}

setInterval(() => {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
    let dinoLeft = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    let bushLeft = parseInt(window.getComputedStyle(bush).getPropertyValue('left'));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
    let pineLeft = parseInt(window.getComputedStyle(pine).getPropertyValue('left'));

    //check if its dead
    if ((bushLeft - dinoLeft < 150 && dinoTop > 350 && bushLeft - dinoLeft > 10) || (cactusLeft - dinoLeft < 145 && dinoTop > 350 && cactusLeft - dinoLeft > 10) || (pineLeft - dinoLeft < 145 && dinoTop > 350 && pineLeft - dinoLeft > 10)) {
        bush.classList.remove('bush-comes');
        cactus.classList.remove('cactus-comes');
        pine.classList.remove('pine-comes');
        document.body.classList.add('bg-color');
        gameOver.innerHTML = 'Game Over!';
        btn.innerHTML = 'Restart';
        dino.style.left = '80px';
    }
    //increase points for jump from bush, cactus and pine
    else if (overcomeBush && bushLeft - dinoLeft < 150) {
        currScore += 1;
        overcomeBush = false;
        scoreUpdate(currScore);
        setTimeout(() => {
            overcomeBush = true;
        }, 1000);
    }
    else if (overcomeCactus && cactusLeft - dinoLeft < 145) {
        currScore += 1;
        overcomeCactus = false;
        scoreUpdate(currScore);
        setTimeout(() => {
            overcomeCactus = true;
        }, 2000);
    }
    else if (overcomePine && pineLeft - dinoLeft < 145) {
        currScore += 1;
        overcomePine = false;
        scoreUpdate(currScore);
        setTimeout(() => {
            overcomePine = true;
        }, 4000);
    }
    //check for win
    else if (dinoLeft >= 1248) {
        bush.classList.remove('bush-comes');
        cactus.classList.remove('cactus-comes');
        pine.classList.remove('pine-comes');
        document.body.classList.add('bg-color');
        gameOver.innerHTML = 'Yay! You Won';
        btn.innerHTML = 'Restart';
        dino.style.left = '80px';
    }
}, 10)
