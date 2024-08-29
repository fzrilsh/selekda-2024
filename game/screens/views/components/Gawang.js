import { screenController } from "../../Main.js"

export default class Gawang {
    constructor(opponent = false){
        this.el = null
        this.opponent = opponent
        this.make()
    }

    make(){
        this.el = document.createElement('div')
        this.el.classList.add('gawang')

        if(this.opponent){
            this.el.style.left = '900px'
            this.el.style.transform = 'translate(-50%, -50%) scaleX(-1)'
        }

        screenController.gameboard.mainBoard.appendChild(this.el);
    }
}