import { screenController } from "../../Main.js"

export default class Item {
    constructor(type){
        this.el = null
        this.type = type
        this.removed = false

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
        if(!this.removed) requestAnimationFrame(this.listen.bind(this))

        if(this.el.offsetTop >= 480) return;
        this.el.style.top = this.el.offsetTop + 2 + 'px'

        if(screenController.gameboard.collisions(this.el, screenController.gameboard.ball.el)){
            this.removed = true
            this.el.remove()

            if(this.type === 'Increase Ball'){
                screenController.gameboard.ball.el.style.width = screenController.gameboard.ball.el.offsetWidth + 5 + 'px'
                screenController.gameboard.ball.el.style.height = screenController.gameboard.ball.el.offsetHeight + 5 + 'px'
            }
            if(this.type === 'Decrease Ball'){
                screenController.gameboard.ball.el.style.width = screenController.gameboard.ball.el.offsetWidth - 2 + 'px'
                screenController.gameboard.ball.el.style.height = screenController.gameboard.ball.el.offsetHeight - 2 + 'px'
            }
            if(this.type === 'Diamond Ice'){
                screenController.gameboard.ball.freeze()
            }
        }
    }
}