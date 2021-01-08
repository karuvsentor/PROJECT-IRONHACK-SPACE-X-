class fastEnemy {
    constructor(ctx, x, y, ) {
      this.ctx = ctx
      this.x = x
      this.y = y
      this.maxX = 585
      this.minX = 0
      this.sprite = new Image()
      this.sprite.src = './sprites/enemies/enemy1.png'
      this.sprite.isReady = false
      this.sprite.verticalFrames = 4
      this.sprite.horizontalFrames = 4
      this.sprite.verticalFrameIndex = 1
      this.sprite.horizontalFrameIndex = 1
  
      this.width = 0
      this.height = 0
  
      this.sprite.onload = () => { //sprite de inicio
        this.sprite.isReady = true
  
        this.sprite.frameWidth = this.sprite.width / this.sprite.horizontalFrames
        this.sprite.frameHeight = this.sprite.height / this.sprite.verticalFrames
  
        //Codigo para modificar el tamaño de la nave
        this.width = this.sprite.frameWidth
        this.height = this.sprite.frameHeight
      }
  
  
      this.vx = 0
      this.vy = Speed 
    }
  
    isReady() {
      return this.sprite.isReady
    }
  
    draw() {
      if (this.isReady()) {
        this.ctx.drawImage(
          this.sprite,
          this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
          this.sprite.verticalFrameIndex * this.sprite.frameHeight,
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
      this.x += this.vx
      this.y += this.vy
  
  
      if (this.x >= this.maxX) {
        this.x = this.maxX
        this.vx = 0
      }
      if (this.x <= this.minX) {
        this.x = this.minX
        this.vx = 0
      }
  
    }
  
  
  }
  
  let Speed = 10