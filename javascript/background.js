class Background {
    constructor(ctx) {
        this.ctx = ctx
        this.y = 0
        this.vy = 1

        this.height = this.ctx.canvas.height
        this.width = this.ctx.canvas.width

        this.img = new Image()
        this.img.src = '../scripts/backgrounds/fondo 5.png'

        this.img.isLoad = false
        this.img.onload = () => {
            this.img.isLoad = true
        }

    }

    isReady() {
        return this.img.isReady
    }

    draw() {
        if (this.isReady) {
            this.ctx.drawImage(
                this.img,
                0,
                this.y,
                this.width,
                this.height
            )

            this.ctx.drawImage(
                this.img,
                0,
                this.y + this.height,
                this.width,
                this.height
            )
        }
    }

    move() {
        this.y += this.vy
        console.log(this.y)
        if (this.y + this.height >= this.ctx.canvas.height) {
            this.y = 0
        }

    }
}