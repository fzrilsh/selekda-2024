import { screenController } from "../Main.js"

export default class Gameboard {
    constructor(){
        this.el = document.querySelector('.screen.gameboard')

        this.username = null
        this.level = null
        this.ball = null
        this.my_team = null
        this.opponent_team = null

        this.timer = null
    }

    mount(){
        this.el.classList.add('active')

        this.username = screenController.register.data.username
        this.level = screenController.register.data.level
        this.ball = screenController.register.data.ball
        this.my_team = screenController.register.data.my_team
        this.opponent_team = screenController.register.data.opponent_team

        this.timer = this.level === 'easy' ? '30' : this.level === 'medium' ? 20 : 15
        
    }

    unMount(){
        this.el.classList.remove('active')
    }
}