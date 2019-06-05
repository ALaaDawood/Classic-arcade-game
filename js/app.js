//level increases each time player wins
let level = 1;
//get all the lives to decrease when player loses
let lives = 5;
let livesArr = document.querySelectorAll('li');
//implement restart button
const restartBtn = document.querySelector('.restart');
/*restart button reloads the page to start the game again*/
restartBtn.addEventListener('click', function () {
    reset();
});
//get the span update the level of the user 
let lspan = document.querySelector('.levelSpan');
// Get the modal
let modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on play again, close the modal and restart the game
span.onclick = function () {
    modal.style.display = "none";
    reset();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//get the container 
let container = document.querySelector('.container');
const body = document.querySelector('body');
    // Enemies our player must avoid
    class Enemy {
        constructor(_x, _y, _speed) {
            // The image/sprite for our enemies
            this.sprite = 'images/enemy-bug.png';
            this.x = _x;
            this.y = _y;
            this.speed = _speed;
        }
            // Update the enemy's position
            // Parameter: dt, a time delta between ticks
        update(dt) {
            // multiply any movement by the dt parameter
            //  will ensure the game runs at the same speed for
            // all computers.
            this.x = this.x + this.speed * level* dt;
            if (this.x > 500)
                this.x = -50;
        }
        // Draw the enemy on the screen, required method for game
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            //handle collision with enemies
            if (player.x >= this.x - 50 && player.x <= this.x + 50) {
                if (player.y >= this.y - 40 && player.y <= this.y + 40) {
                    player.playerLose();
                }
            }
        }
    };
       //Our Player's Class
    class Player {
        constructor(_x, _y) {
            // The image/sprite for our enemies
            this.sprite = 'images/char-horn-girl.png';
            this.x = _x;
            this.y = _y;
        }
        // Update the enemy's position, required method for game
        // Parameter: dt, a time delta between ticks
        update(dir) {
            // multiply any movement by the dt parameter
            //  will ensure the game runs at the same speed for
            // all computers.
            if (dir == 'left') {
                this.x -= 50;
                if (this.x < 0)
                    this.x = 0;

            }
            else if (dir == 'right') {
                this.x += 50;
                if (this.x > 400)
                    this.x = 400;
            }
            else if (dir == 'up') {
                this.y -= 50;
                if (this.y < -10) {
                    this.playerWin();
                }
            }
            else if (dir == 'down') {
                this.y += 50;
                if (this.y > 400)
                    this.y = 400;
            }
      
        }
        // Draw the enemy on the screen, required method for game
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
        handleInput(key) {
            if (key == 'left')
                return 'left';
            else if (key == 'right')
                return 'right';
            else if (key == 'up')
                return 'up';
            else if (key == 'down')
                return 'down';
        }
        //handle when player reaches water
        playerWin()
        {
            this.y = 400;
            this.x = 200;
            level++;
            lspan.innerText = level - 1;
            if (level == 10)
            {
                displayWin();
            }
        }
        //handle when player collides with enemy
        //reset the game, Lose one life
        playerLose() {
            player.x = 200;
            player.y = 400;
            if (lives == 1) {
                gameOver();
            } else {
                lives--;
                livesArr[lives].style.display = 'none';
            }
        }
    };

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    var allEnemies = [
        new Enemy(10, 50, 70),
        new Enemy(150, 150, 70),
        new Enemy(250, 230, 70),
        new Enemy(400, 50, 70),
        new Enemy(600, 230, 70),
    ];
    // Place the player object in a variable called player
    let player = new Player(200, 400);
    //restart the game
    function reset() {
        window.location.reload();
    }
    // When the player loses, open the modal
    function gameOver() {
        modal.style.display = "block";
    }
    //when player gets to level 10(the final level)
    function displayWin() {
        container.parentNode.removeChild(container);
        /****************Create Score Board Container********************/
        const scoreContainer = document.createElement('div');
        scoreContainer.setAttribute('class', 'scoreContainer');
        body.appendChild(scoreContainer);

        const checkImg = document.createElement('img');
        checkImg.setAttribute('src', '../images/win.gif');

        const congrats = document.createElement('h1');
        congrats.innerText = "Congratulations! You completed all levels";
        const againBtn = document.createElement('button');
        againBtn.innerText = "Play Again";
        againBtn.setAttribute('class', 'btnSuccess');
        againBtn.addEventListener('click', function () {
            window.location.reload();
        });
        scoreContainer.appendChild(checkImg);
        scoreContainer.appendChild(congrats);
        scoreContainer.appendChild(againBtn);
    }
    // This listens for key presses and sends the keys to
    // Player.handleInput() method.
    document.addEventListener('keyup', function (e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.update(player.handleInput(allowedKeys[e.keyCode]));
    });