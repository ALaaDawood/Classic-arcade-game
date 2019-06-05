//level increases each time player wins
let level = 1;
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
                    this.y = 400;
                    this.x = 200;
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
        playerWin()
        {
            level++;
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


    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function (e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.update(player.handleInput(allowedKeys[e.keyCode]));
    });
 //end of file