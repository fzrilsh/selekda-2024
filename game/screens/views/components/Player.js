import { screenController } from "../../Main.js"

export default class Player {
    constructor(isBot = false, region){
        this.el = null
        this.isBot = isBot
        this.region = region
        this.imagePath = `assets/Characters/${region}/Idle/Idle_000.png`
        this.make()
    }

    make(){
        this.el = document.createElement('div')
        this.el.classList.add('player')
        this.el.style.background = `url(${this.imagePath})`
        this.el.style.backgroundSize = '100% 100%'

        if(this.isBot){
            this.el.style.left = '60%'
            this.el.style.transform = 'translate(-50%, -50%) scaleX(-1)'
        }

        screenController.gameboard.mainBoard.appendChild(this.el)
    }
}