class Boss {
    constructor(ctx, x, y, ) {
        this.ctx = ctx
        this.x = x
        this.y = y

        this.sprite = new Image()
        this.sprite.src = './sprites/boss/boss2.png'
        this.sprite.isReady = false

        this.width = 0
        this.height = 0

        this.sprite.onload = () => { //sprite de inicio
            this.sprite.isReady = true


        }
    }

    isReady() {
        return this.sprite.isReady
    }




    draw() {
        if(this.isReady())
        this.ctx.drawImage(
            this.sprite,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
    
}