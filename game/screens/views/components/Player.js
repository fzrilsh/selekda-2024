export default class Player {
    constructor(){
        this.el = null
        this.isBot = null
        this.region = null
    }

    make(){
        this.el = document.createElement('div')
        this.el.classList.add('player')
    }
}