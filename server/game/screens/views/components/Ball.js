import { screenController } from "../../Main.js"

export default class Ball {
    constructor(){
        this.el = null
        this.make()

        this.bottom = false
        this.top = false
        this.left = false
        this.right = false

        this.freezee = false
    }

    make(){
        this.el = document.createElement('div')
        this.el.classList.add('ball')
        this.el.style.background = `url("assets/${screenController.register.data.ball}")`
        this.el.style.backgroundSize = '100% 100%'

        screenController.gameboard.el.appendChild(this.el)
        this.listen()
    }

    listen(){
        // setInterval(this.listen.bind(this), 30);
        requestAnimationFrame(this.listen.bind(this))

        if(this.bottom) this.Bottom()
    }

    move(direction, status){
        if(this.freezee) return;
        
        this[direction] = status
    }

    Bottom(){
        if(this.el.offsetTop >= 470){
            this.bottom = false
            return false
        }

        this.el.style.top = `${this.el.offsetTop+2}px`
    }

    freeze(){
        this.freezee = true
        this.el.style.filter = `sepia(100%) hue-rotate(150deg) saturate(500%)`
        setTimeout(() => {
            this.freezee = false
            this.el.style.filter = 'none'
        }, 3000);
    }
}