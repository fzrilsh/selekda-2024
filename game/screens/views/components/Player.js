import { screenController } from "../../Main.js"

export default class Player {
    constructor(isBot = false, region){
        this.el = null
        this.isBot = isBot
        this.region = region
        this.imagePath = `assets/Characters/${region}/Idle/Idle_000.png`

        this.state = 'Idle'
        this.stateFrame = 0

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
        this.initEvent()
    }

    move(direction, status){
        this[direction] = status
    }

    listen(){
        if(screenController.gameboard.gameStarted) requestAnimationFrame(this.listen.bind(this))

        //direction
        if(this.left) this.toLeft()
        if(this.right) this.toRight()
        if(this.top) this.toUp()
        if(this.el.offsetTop <= 0) this.toBottom()
    }

    listenAnimation(){
        if(!screenController.gameboard.gameStarted) return;

        //animation
        if(!this.left && !this.right && !this.top) this.state = 'Idle'
        if(this.top) this.state = 'Jump'
        if(this.left) this.state = 'Move Forward'
        if(this.right) this.state = 'Move Backward'
        if(this.kick) this.state = 'Kick'
        if(this.el.offsetTop < 0) this.state = 'Falling Down'

        this.stateFrame++
        this.animate()
    }

    animate(){
        let frameNumber = this.stateFrame.toString().padStart(3, '0')

        let img = document.createElement('img')
        img.src = `assets/Characters/${this.region}/${this.state}/${this.state}_${frameNumber}.png`
        img.onload = () => {
            this.imagePath = img.src
            this.el.style.background = `url(${this.imagePath})`
            this.el.style.backgroundSize = '100% 100%'
        }
        img.onerror = () => {
            this.stateFrame = 0
        }
    }

    toLeft(){
        this.el.style.left = `${this.el.offsetLeft-1}px`
    }
    toRight(){
        this.el.style.left = `${this.el.offsetLeft+0.5}px`
    }
    toUp(){
        this.top = false
        if(this.el.offsetTop <= -80) return;
        this.el.style.top = `${this.el.offsetTop-80}px`
    }
    toBottom(){
        if(this.el.offsetTop >= 0) return;
        this.el.style.top = `${this.el.offsetTop+1.6}px`
    }
    toKick(){
        this.kick = true
        setTimeout(() => {
            this.kick = false
        }, 100);
    }

    initEvent(){
        this.top = false //w
        this.left = false //a
        this.right = false //d
        this.kick = false //space

        window.addEventListener('keydown', ({key}) => {
            if(this.isBot || !screenController.gameboard.gameStarted) return;
            switch(key){
                case 'w':
                    this.move('top', true)
                    this.stateFrame = 0
                    break
                case 'a':
                    this.move('left', true)
                    this.stateFrame = 0
                    break
                case 'd':
                    this.move('right', true)
                    this.stateFrame = 0
                    break
                case ' ':
                    this.toKick()
                    this.stateFrame = 0
                    break;
            }
        })

        window.addEventListener('keyup', ({key}) => {
            if(this.isBot || !screenController.gameboard.gameStarted) return;
            switch(key){
                case 'w':
                    this.move('top', false)
                    break
                case 'a':
                    this.move('left', false)
                    break
                case 'd':
                    this.move('right', false)
                    break
            }
        })

        if(!this.isBot) this.listen()
        this.intervalAnimation = setInterval(this.listenAnimation.bind(this), 40);
    }
}