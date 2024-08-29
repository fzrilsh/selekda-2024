import { screenController } from "../../Main.js"

export default class Item {
    constructor(type){
        this.el = null
        this.type = type

        this.make()
    }

    make(){
        this.el = document.createElement('div')
        this.el.classList.add('item')
        this.el.style.left = this.random(500, 500) + 'px'
        this.el.style.background = `url("assets/${this.type}.png")`
        this.el.style.backgroundSize = '100% 100%'

        screenController.gameboard.el.appendChild(this.el)
        this.listen()
    }

    random(min, max){
        return Math.floor(Math.random()*(max - min)+min)
    }

    listen(){
        requestAnimationFrame(this.listen.bind(this))

        if(this.el.offsetTop >= 480) return;
        this.el.style.top = this.el.offsetTop + 2 + 'px'

        console.log(screenController.gameboard.collisions(this.el, screenController.gameboard.ball.el))
    }
}