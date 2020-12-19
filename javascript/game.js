class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.background = new Background(ctx)
        this.interval = null
        this.ship = new Ship(this.ctx, 320, 700) //posicion inicio de la nave
        this.enemy = new Enemy(this.ctx, 320, 50) //posicion inicio de la nave
        this.isStart = false
    }

    start() {
        this.setListeners()
        if (!this.isStart) {

            this.interval = setInterval(() => {
                this.clear()

                this.draw()

                this.move()

            }, 1000 / 60)
            this.isStart = true
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }


    draw() {
        this.background.draw()
        this.ship.draw()
        this.enemy.draw()


    }

    move() {
        this.background.move()
        this.ship.move()
        this.enemy.move()

    }

    drawEnemies() {
        this.enemys.forEach(enem => {
            enem.draw()
        });
    }

    moreNewEnemies() {
        let maxW = 585
        let minW = 0
        let enemiesW = Math.floor(Math.random() * (maxW - minW) + minW)
        let maxX = this.ctx.canvas.width - minW
        let minX = -minW
        let enemyPosition = Math.floor(Math.random() * (maxX - minX) + minX)

        this.enemy.push(new Enemy(
            this.ctx,
            enemyPosition,
            0,
            enemiesW
        ))
    }

    stop() {
        clearInterval(this.interval)
        this.isStart = false


        this.ctx.restore()
    }

    checkCollitions() {
        if (this.enemys.some(enemy => this.ship.collides(enemy))) {
            this.stop()
        }
    }

    setListeners() {
        document.onkeydown = event => {
            switch (event.keyCode) {
                case TOP:
                    this.ship.vy = -10
                    break;
                case RIGHT:
                    this.ship.vx = 10
                    break;
                case LEFT:
                    this.ship.vx = -10
                    break;
                case BOTTOM:
                    this.ship.vy = 10
                    break;
            }
        }

        document.onkeyup = event => {
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