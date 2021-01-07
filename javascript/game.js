class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.background = new Background(ctx)
        this.interval = null
        this.ship = new Ship(this.ctx, 320, 700) //posicion inicio de la nave
        this.enemy = new Enemy(this.ctx, 320, 50) //posicion inicio de la nave
        this.boss = new Boss(this.ctx, 320, 50)
        this.isStart = false
        this.shot = []
        this.enemys = []
        this.enemiesDrawCount = 0
        this.score = 0
        const theme = new Audio('./sounds/inicio.ogg')
        theme.volume = 0.1
        const game = new Audio('./sounds/game.wav')
        game.volume = 0.2
        this.sounds = {
            theme: theme,
            game: game,
            laserShot: new Audio('./sounds/laser.mp3')
        }
    }
    start() {
        this.setListeners()
        if (!this.isStart) {
            // this.sounds.theme.play() sonido antes de empezar el juego ...
            this.sounds.game.play()
            this.interval = setInterval(() => {
                this.clear()
                this.draw()
                this.move()
                this.drawEnemies()
                this.checkCollitions()
                this.enemiesDrawCount++
                if (this.enemiesDrawCount % 50 === 0) {
                    this.moreNewEnemies()
                    this.enemiesDrawCount = 1
                }
            }, 1000 / 60)
            this.isStart = true
        }   
    }

    reset() {
        this.start()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.enemys = this.enemys.filter(enem => enem.y < this.ctx.canvas.height)
        this.ship.clear()
    }
    draw() {
        this.background.draw()
        this.ship.draw()
        this.enemy.draw()
        this.drawEnemies()
        this.boss.draw()
    }
    move() {
        this.background.move()
        this.ship.move()
        this.enemy.move()
        this.enemys.forEach(enem => {
            enem.move()
        })
    }
    drawEnemies() {
        this.enemys.forEach(enem => {
            enem.draw()
        });
    }
    moreNewEnemies() {
        let maxW = 585
        let minW = 10
        let enemiesW = Math.floor(Math.random() * (maxW - minW) + minW)
        let maxX = this.ctx.canvas.width - minW
        let minX = -minW
        let enemyPosition = Math.floor(Math.random() * (maxX - minX) + minX)
        this.enemys.push(new Enemy(
            this.ctx,
            enemyPosition,
            0,
            enemiesW
        ))
        this.score++
    }
    stop() {
        clearInterval(this.interval)
        this.isStart = false
        this.ctx.save()
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.font = '35px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('Game Over!',
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 - 50)
        this.ctx.font = '24px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`Your final score: ${this.score} points`,
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 + 50)
        this.ctx.restore()
    }
    checkCollitions() {//colisiones Enemy con ship
        if (this.enemys.some(enemy => this.ship.collides(enemy))) {
            this.stop()
        }
        this.enemys.forEach(enemy => {// colisiones Enemy con shots
            const shotToRemove = this.ship.shots.find(shot => shot.collides(enemy))
            if (shotToRemove) {
                this.ship.shots = this.ship.shots.filter(shot => shot != shotToRemove)
                this.enemy.sprite.src = './sprites/enemies/Explosión.png'
                this.enemys = this.enemys.filter(en => en != enemy) 
                    
                
            }
         })
    }
    drawScore() {//diseño letrero con puntución
        ctx.save()
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'black'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(`Score: ${this.score}`,
            this.ctx.canvas.width - 50,
            this.ctx.canvas.height - 50)
        ctx.restore()
    }
    setListeners() {
        document.onkeydown = event => {//movimiento de la nave cuando se pulsa la tecla
            switch (event.keyCode) {
                case TOP:
                    this.ship.vy = -5
                    break;
                case RIGHT:
                    this.ship.vx = 5
                    break;
                case LEFT:
                    this.ship.vx = -5
                    break;
                case BOTTOM:
                    this.ship.vy = 5
                    break;
                case SHOT://disparo nave
                    if (this.ship.canFire) {
                        this.ship.shots.push(new Shot(this.ctx, this.ship.x + this.ship.width / 2 - 10, this.ship.y))
                        this.ship.canFire = false
                        setTimeout(() => {
                            this.ship.canFire = true
                        }, 400);
                    }//sonidos disparos nave
                    this.sounds.laserShot.currentTime = 0
                    this.sounds.laserShot.play()
                    break;
            }
        }
        document.onkeyup = event => {// parar el movimiento de la nave cuando no se pulsa la tecla
            switch (event.keyCode) {
                case RIGHT:
                case LEFT:
                    this.ship.vx = 0
                    break;
                case BOTTOM:
                case TOP:
                    this.ship.vy = 0
                    break;
            }
        }
    }
}