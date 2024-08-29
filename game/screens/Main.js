import Countdown from "./views/Countdown.js"
import Gameboard from "./views/Gameboard.js"
import Register from "./views/Register.js"

class ScreenController {
    constructor(){
        this.current = null

        this.register = new Register()
        this.countdown = new Countdown()
        this.gameboard = new Gameboard()
    }

    init(){
        this.change('gameboard')
    }

    change(screen){
        if(this.current) this.current.unMount()

        this.current = this[screen]
        this.current.mount()
    }
}

export const screenController = new ScreenController()
screenController.init()