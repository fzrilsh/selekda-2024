import { screenController } from "../Main.js"

export default class Countdown {
    constructor(){
        this.counter = 3

        this.el = document.querySelector('.screen.countdown')
        this.interval = null
    }

    mount(){
        this.el.classList.add('active')

        this.counter = 3
        this.el.textContent = this.counter

        this.interval = setInterval(this.listen.bind(this), 1000);
    }

    unMount(){
        this.el.classList.remove('active')
        clearInterval(this.interval)
    }

    listen(){
        this.counter--
        this.el.textContent = this.counter

        if(this.counter < 0){
            clearInterval(this.interval)
            screenController.change('gameboard')
        }
    }
}