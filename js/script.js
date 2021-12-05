import Ball from "./ball_script.js";
import Paddle from "./paddle_script.js";

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('playerPaddle'));
const computerPaddle = new Paddle(document.getElementById('computerPaddle'));
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');

let lastTime;

function update(time) {

    if (lastTime != null) {

        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

        if (isLose()) handleLose();
    };

    lastTime = time;
    window.requestAnimationFrame(update);
};

function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
};

function handleLose() {
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
/*         if (computerScore.innerHTML == 3) {
            console.log("Works");
        }; */
    };

    ball.reset();
    computerPaddle.reset();
};

document.addEventListener('mousemove', e => {

    playerPaddle.position = (e.y / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);