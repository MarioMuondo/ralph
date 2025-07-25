const state={
    view:{
    squares:document.querySelectorAll('.square'),
    enemy:document.querySelector('.enemy'),
    timeleft:document.querySelector('#time-left'),
    score:document.querySelector('#score'),
    lives:document.querySelector('#lives'), // Assuming lives is displayed in the HTML
    },
    
    values:{
        timerid:null,
        gamevelocity:1000,
        hitposition:0,
        currentime:60,
        score:0,
        lives:3, // Assuming lives is part of the game state
    },
    actions:{
            countDownTimerId:setInterval(countDown, 1000),
}
};
function playSound() {
    const audio = new Audio('../audios/hit.m4a'); // Replace with your sound file path
    audio.volume = 0.2; // Adjust volume if needed
    audio.play();
}
function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener('click', () => {
            if (square.id === state.values.hitposition) {
                square.classList.remove('enemy');
                state.values.score++;
                state.view.score.textContent = state.values.score;
                state.values.hitposition = null;
                playSound();
            }else{
                state.values.lives--;
                state.view.lives.textContent = state.values.lives;
            }
        });
    });
}
function randomSquare(){
state.view.squares.forEach((square) => {
square.classList.remove('enemy');
});
let randomPosition = Math.floor(Math.random() * 9);
let randomSquare = state.view.squares[randomPosition];
randomSquare.classList.add('enemy');
state.values.hitposition = randomSquare.id;
}
function countDown() {
    state.values.currentime--;
    state.view.timeleft.textContent = state.values.currentime;
    if (state.values.currentime <= 0|| state.values.lives <= 0) {
        clearInterval(state.values.timerid);
        alert('Game Over! Your final score is ' + state.values.score);
        state.values.currentime = 60; // Reset time for next game
           
    }
}
function moveEnemy(){
    state.values.timerid = setInterval(randomSquare, state.values.gamevelocity);
}
function initialize(){
    moveEnemy();
   addListenerHitBox();
}

initialize();