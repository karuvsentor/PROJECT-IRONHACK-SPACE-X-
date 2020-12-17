class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.background = new Background(ctx)
        this.interval = null
        this.ship = new Ship(this.ctx, 400, 700) //posicion inicio de la nave
    }

    start() {
        this.setListeners()

        this.interval = setInterval(() => {
            this.clear()

            this.draw()
0.
            this.move()

        }, 1000 / 60)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }


    draw() {
        this.background.draw()
        this.ship.draw()
    
    }

    move() {
        this.background.move()
        this.ship.move()
       
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