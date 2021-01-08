class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.background = new Background(ctx)
        this.interval = null
        this.ship = new Ship(this.ctx, 320, 700) //posicion inicio de la nave
        this.boss = new Boss(this.ctx, 320, 50)
        this.isStart = false
        this.shot = []
        this.enemys = []
        this.life = 75 //ojo!!! 
        this.enemiesDrawCount = 0
        this.score = 0
        this.explosionEnemies = 0
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
                this.drawScore()
                this.checkEnemiesLimit()
                this.enemysMaxSurviver()
                this.scoreLifes()
                this.checkCollitions()
                this.enemiesDrawCount++
                if (this.enemiesDrawCount % 75 === 0) {
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
        this.drawEnemies()
        this.boss.draw()

    }
    move() {
        this.background.move()
        this.ship.move()

        this.enemys.forEach(enem => {
            enem.move()
        })
    }

    drawEnemies() {
        this.enemys.forEach(enem => {
            enem.draw()
        });
    }

    moreNewEnemies() {//metodo para que salgan mas enemigos
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
    stop() {//cuando termina el juego 
        clearInterval(this.interval)
        this.isStart = false
        this.ctx.save()
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.font = '35px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('Has sido destruido!!!',
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 - 50)
        this.ctx.font = '24px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(`Puntuación: ${this.score} puntos`,
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2 + 50)
        this.ctx.restore()
    }
    checkEnemiesLimit() {// contador de naves que superan el height total y restar vida
        if (this.enemys.some(enemy => {
          this.ctx.canvas.height - enemy.height
            return enemy.y >= this.ctx.canvas.height - enemy.height
        })) { this.life--}

    }

    enemysMaxSurviver(){// Si el contador de vida está a cero, se acaba el juego.
        if (this.life === 0) {
            this.stop()
        }
    }

    checkCollitions() {//colisiones Enemy con ship
        if (this.enemys.some(enemy => this.ship.collides(enemy))) {
            this.stop()
        }
        this.enemys.forEach(enemy => {// colisiones Enemy con shots
            const shotToRemove = this.ship.shots.find(shot => shot.collides(enemy))
            if (shotToRemove) {
                this.ship.shots = this.ship.shots.filter(shot => shot != shotToRemove)
                this.explosionEnemies
                this.enemys = this.enemys.filter(en => en != enemy)


            }
        })
    }
    drawScore() {//diseño letrero con puntuación
        ctx.save()
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(`Score: ${this.score}`,
            this.ctx.canvas.width - 50,
            this.ctx.canvas.height - 50)
        ctx.restore()
    }

    scoreLifes() {//diseño letrero de la vida
        ctx.save()
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(`Life: ${this.life}`,
            this.ctx.canvas.width - 50,
            this.ctx.canvas.height - 70)
        ctx.restore()
    }

    setListeners() {
        document.onkeydown = event => {//movimiento de la nave cuando se pulsa la tecla
            switch (event.keyCode) {
                case TOP:
                    this.ship.vy = -7
                    break;
                case RIGHT:
                    this.ship.vx = 7
                    break;
                case LEFT:
                    this.ship.vx = -7
                    break;
                case BOTTOM:
                    this.ship.vy = 7
                    break;
                case SHOT://disparo nave
                    if (this.ship.canFire) {
                        this.ship.shots.push(new Shot(this.ctx, this.ship.x + this.ship.width / 2 - 10, this.ship.y))
                        this.ship.canFire = false
                        setTimeout(() => {
                            this.ship.canFire = true
                        }, 200);
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