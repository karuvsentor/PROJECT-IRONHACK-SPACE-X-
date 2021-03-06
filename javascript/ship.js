class Ship {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.maxY = this.ctx.canvas.height / 2
    this.minY = 700
    this.maxX = 585
    this.minX = 0
    this.shots = []
    this.canFire = true
    this.sprite = new Image()
    this.sprite.src = './sprites/ships/ship.png'
    this.sprite.isReady = false

    this.sprite.verticalFrames = 8
    this.sprite.horizontalFrames = 3

    this.sprite.verticalFrameIndex = 0
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
    this.vy = 0
  }

  clear(){
   this.shots = this.shots.filter(shots => shots.x < this.ctx.canvas.height)

   
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

      this.shots.forEach(shot=> shot.draw() )

     
    }

  }

  move() {
    this.shots.forEach(shot=> shot.move() )
    this.x += this.vx
    this.y += this.vy

    if (this.y <= this.maxY) {
      this.y = this.maxY
      this.vy = 0
    }

    if (this.y >= this.minY) {
      this.y = this.minY
      this.vy = 0
    }

    if (this.x >= this.maxX) {
      this.x = this.maxX
      this.vx = 0
    }
    if (this.x <= this.minX) {
      this.x = this.minX
      this.vx = 0
    }
     
  }


  collides(enemy) {
    return this.x < enemy.x + enemy.width &&
      this.x + this.width > enemy.x &&
      this.y < enemy.y + enemy.height &&
      this.y + this.height > enemy.y
  }


  
}