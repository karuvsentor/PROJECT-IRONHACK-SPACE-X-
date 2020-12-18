class Ship {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.maxY = this.ctx.canvas.height / 2
    this.minY = 700
    this.maxX = 585
    this.minX = 0

    this.sprite = new Image()
    this.sprite.src = './scripts/ships/ship.png'
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

      /*ESTO ESTA EN PRUEBAS
      this.animate(  

      )     */
    }

  }

  move() {
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

  /* NO FUNCIONA REVISAR, POSIBLE CAMBIO DE CONCEPTO DE CODIGO PARA EL MOVIMIENTO DE LA NAVE 
   animate() {
     if (this.movements.left {
         this.animateSprite()
       } else {
         this.resetAnimation()
       }

     }

     resetAnimation() {
       this.sprite.verticalFrameIndex = 0
       this.sprite.horizontalFrameIndex = 1
     }

     animateSprite() {
       if (this.sprite.horizontalFrameIndex + 1 === this.sprite.horizontalFrames) {
         this.sprite.horizontalFrameIndexhorizontalFrameIndex = 0
       } else {
         this.sprite.horizontalFrameIndex++
       }
     } */
}