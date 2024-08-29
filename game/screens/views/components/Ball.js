import { screenController } from "../../Main.js"

export default class Ball {
    constructor(){
        this.el = null
        this.make()
    }

    make(){
        this.el = document.createElement('div')
        this.el.classList.add('ball')

        screenController.gameboard.mainBoard.appendChild(this.el)
    }

    listen(){
        
    }

    Bottom(){
        let interval = setInterval(() => {
            this.el.style.left = `${parseInt(this.el.style.left)-20}px`
        }, 60);
    }
}