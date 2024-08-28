export default class Gameboard {
    constructor(){
        this.el = document.querySelector('.screen.gameboard')
    }

    mount(){
        this.el.classList.add('active')
    }

    unMount(){
        this.el.classList.remove('active')
    }
}