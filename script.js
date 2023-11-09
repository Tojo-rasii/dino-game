let highScore = localStorage.getItem('highScore') || 0;

const dino = document.querySelector('.dino');
const obstacle = document.querySelector('.obstacle');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverAudio = new Audio('ohno.mp3');
const wowAudio = new Audio('wow.mp3');
const jumpAudio = new Audio('jump1.mp3');

const body = document.body;
let isJumping = false;
let isGameOver = false;
let score = 0;


    
    document.addEventListener('keydown', jump);

    function jump(event) {
        if (event.keyCode === 32 && !isJumping && !isGameOver) {
            isJumping = true;
            let position = 0;

            const upInterval = setInterval(() => {
                if (position >= 150) {
                    clearInterval(upInterval);

                    const downInterval = setInterval(() => {
                        if (position <= 0) {
                            clearInterval(downInterval);
                            isJumping = false;
                        } else {
                            position -= 20;
                            dino.style.bottom = position + 'px';
                        }
                    }, 20);
                } else {
                    position += 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
            jumpAudio.play();
        }
    }

    function checkCollision() {
        const dinoTop = parseInt(getComputedStyle(dino).getPropertyValue('bottom'));
        const obstacleLeft = parseInt(getComputedStyle(obstacle).getPropertyValue('left'));

        if (obstacleLeft < 65 && obstacleLeft > 0 && dinoTop === 0) {
            isGameOver = true;
            gameOverAudio.play();
            alert('Game Over. Your Score: ' + score);
            document.location.reload();
        }
        if (!isGameOver) {
            requestAnimationFrame(checkCollision);
        }
    }

    function moveObstacle() {
        let obstaclePosition = 500;
        let speed = 10;

        function animate() {
            if (!isGameOver) {
                obstaclePosition -= speed;
                obstacle.style.left = obstaclePosition + 'px';

                if (obstaclePosition < -20) {
                    obstaclePosition = 500;
                    updateScore();
                }

                requestAnimationFrame(animate);
            }
        }

        animate();
    }

    function updateScore() {
        score++;
        scoreDisplay.textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        highScoreDisplay.textContent = highScore;

        if (score == 10) {
            wowAudio.play();
        }
        if (score > 11) {
            obstacle.style.height = '100px';
            //   body.classList.add('dark-mode'); // Double la hauteur de l'obstacle
        }
    }

    function resetObstacleHeight() {
        obstacle.style.height = '50px'; // Réinitialise la hauteur de l'obstacle
    }

    function moveObstacle() {
        let obstaclePosition = 500;
        let speed = 8;

        function animate() {
            if (!isGameOver) {
                obstaclePosition -= speed;
                obstacle.style.left = obstaclePosition + 'px';

                if (obstaclePosition < -20) {
                    obstaclePosition = 500;
                    updateScore();
                    if (score > 50) {
                        resetObstacleHeight(); // Réinitialise la hauteur de l'obstacle après le passage
                    }
                }

                requestAnimationFrame(animate);
            }
        }

        animate();
    }
    // Masque le bouton après le clic

    // Reste du code pour initialiser et démarrer le jeu
    // ...

    // Exemple : réinitialiser les variables et démarrer le mouvement de l'obstacle




    moveObstacle();
    requestAnimationFrame(checkCollision);
