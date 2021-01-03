class Boss {
    constructor(ctx, x, y,){
    this.ctx= ctx
    this.x = x
    this.y = y

    this.sprite = new Image()
    this.sprite.src = './sprites/boss/boss2.png'
    this.sprite.isReady = false



    }


    isReady(){
     return this.sprite.isReady
    }

    draw(){

    }


    move(){


    }


}