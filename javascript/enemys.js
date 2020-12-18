class Enemy {
    constructor(ctx, x, y) {
      this.ctx = ctx
      this.x = x 
      this.y = y
      
    this.sprite = new Image()
    this.sprite.src = './scrips/enemies/enemy1.png'
    this.sprite.isReady = false
    this.sprite.verticalFrames = 4
    this.sprite.horizontalFrames = 4

    this.sprite.verticalFrameIndex = 1
    this.sprite.horizontalFrameIndex = 3

    this.width = 0
    this.height = 0

    }
  }