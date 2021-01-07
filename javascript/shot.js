class Shot {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y

        this.maxX = 585
        this.minX = 0



        this.sprite = new Image()
        this.sprite.src = './sprites/shots/laser-shot.jpeg'
        this.sprite.isReady = false

        this.sprite.horizontalFrames = 1
        this.sprite.verticalFrames = 1

        this.sprite.horizontalFramesIndex = 0
        this.sprite.verticalFramesIndex = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.width = this.sprite.frameWidth
            this.height = this.sprite.frameHeight
        }

        this.vx = 0
        this.vy = SpeedShot
    }

    isReady() {
        return this.sprite.isReady
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFramesIndex * this.sprite.frameWidth,
                this.sprite.verticalFramesIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            )

        }
    
    }

    move() {
      
        this.y += this.vy

    }

    collides(enemy) {
        return this.x < enemy.x + enemy.width &&
        this.x + this.width > enemy.x &&
        this.y < enemy.y + enemy.height &&
        this.y + this.height > enemy.y
      }
}

const SpeedShot = -6