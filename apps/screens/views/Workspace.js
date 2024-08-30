import { screenController } from "../Main.js"

export default class Workspace {
    constructor(){
        this.el = document.querySelector('.screen.workspace')

        this.mainCanvas = this.el.querySelector('.main div')
        this.canvas = this.el.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.sizeSlider = this.el.querySelector('#size')

        this.tools = {
            paste: this.el.querySelector('.tool#paste'),
            undo: this.el.querySelector('.tool#undo'),
            redo: this.el.querySelector('.tool#redo'),
            zoomin: this.el.querySelector('.tool#zoom-in'),
            zoomout: this.el.querySelector('.tool#zoom-out'),
            import: this.el.querySelector('.tool#import'),
            export: this.el.querySelector('.tool#export'),
        }

        this.redoHistory = []
        this.groupHistory = []
        this.history = []
        this.allDrawed = []
    }

    mount(){
        this.el.classList.add('active')

        this.canvas.width = screenController.home.canvasSize.width.value
        this.canvas.height = screenController.home.canvasSize.height.value

        this.listen()
    }

    unMount(){
        this.el.classList.remove('active')
    }

    listen(){
        this.tools.zoomin.onclick = () => this.zoomin()
        this.tools.zoomout.onclick = () => this.zoomout()
        this.tools.undo.onclick = () => this.undo()
        this.tools.redo.onclick = () => this.redo()

        this.sizeSlider.onchange = () => {
            this.sizeSlider.nextElementSibling.textContent = this.sizeSlider.value + 'px'
        }

        this.moveEvent()
        this.shortCutEvent()
    }

    shortCutEvent(){
        let control = false

        window.addEventListener('keydown', ({key}) => {
            if(key === 'Control') control = true
        })
        window.addEventListener('keyup', ({key}) => {
            if(key === 'Control') control = false
        })

        window.addEventListener('keypress', ({key}) => {
            if((control && key === 'z') || key === "\x1A") return this.undo()
            if((control && key === 'y') || key === "\x19") return this.redo()

            switch(key){
                case '-':
                    this.zoomout()
                    break
                case '+':
                    this.zoomin()
                    break
                case '5':
                    this.undo()
                    break
                case '0':
                    this.redo()
                    break
            }
        })
    }

    moveEvent(){
        const draw = ({offsetX, offsetY}) => {
            this.ctx.fillStyle = 'black'

            let shape = this.el.querySelector('input[name=shape]:checked')
            let opacity = this.el.querySelector('input[name=opacity]:checked')

            this.ctx.globalAlpha = parseInt(opacity.value) / 100
            if(shape.value === 'bulet'){
                this.ctx.beginPath()
                this.ctx.arc(offsetX, offsetY, this.sizeSlider.value, 0, 2 * Math.PI)
                this.ctx.closePath()
                this.ctx.fill()
            }else{
                this.ctx.fillRect(offsetX, offsetY, this.sizeSlider.value, this.sizeSlider.value)
            }

            let data = {x: offsetX, y: offsetY, size: this.sizeSlider.value, shape: shape.value, opacity: this.ctx.globalAlpha}
            this.history.push(data)
            this.allDrawed.push(data)
        }


        const erase = ({offsetX, offsetY}) => {
            let shape = this.el.querySelector('input[name=shape]:checked')
            
            if(shape.value === 'bulet'){
                this.ctx.beginPath()
                this.ctx.clearRect(offsetX - this.sizeSlider.value - 1, offsetY - this.sizeSlider.value - 1, this.sizeSlider.value * 2 + 2, this.sizeSlider.value * 2 + 2);
            }else{
                this.ctx.clearRect(offsetX, offsetY, this.sizeSlider.value, this.sizeSlider.value)
            }
        }

        window.onload = () => {
            const removeListener = () => {
                if(this.history.length > 0) this.groupHistory.push(this.history)
                if(this.groupHistory.length > 5) this.groupHistory.shift()
                this.canvas.removeEventListener('mousemove', draw, true)
                this.canvas.removeEventListener('mousemove', erase, true)
            }

            window.addEventListener('mouseup', removeListener, false)
            this.canvas.addEventListener('mousedown', () => {
                this.history = []

                let usedTool = this.el.querySelector('input[name=tool]:checked')
                if(usedTool.value === 'brush') this.canvas.addEventListener('mousemove', draw, true)
                if(usedTool.value === 'eraser') this.canvas.addEventListener('mousemove', erase, true)
            }, false)
        }
    }

    zoomin(){
        if(parseFloat(window.getComputedStyle(this.mainCanvas).scale) >= 1) return;
        this.mainCanvas.style.scale = (parseFloat(window.getComputedStyle(this.mainCanvas).scale) + 0.1) * 100 + '%'
    }

    zoomout(){
        if(parseFloat(window.getComputedStyle(this.mainCanvas).scale) <= 0.1) return;
        this.mainCanvas.style.scale = (parseFloat(window.getComputedStyle(this.mainCanvas).scale) - 0.1) * 100 + '%'
    }

    undo(){
        if(this.groupHistory.length < 1) return;
        let history = this.groupHistory.pop()
        this.redoHistory.push(history)

        history.forEach(v => {
            this.ctx.globalAlpha = v.opacity
            if(v.shape === 'bulet'){
                this.ctx.beginPath()
                this.ctx.clearRect(v.x - v.size - 1, v.y - v.size - 1, v.size * 2 + 2, v.size * 2 + 2);
                this.ctx.closePath()
            }else{
                this.ctx.clearRect(v.x, v.y, v.size, v.size)
            }
        });
    }

    redo(){
        if(this.redoHistory.length < 1) return;
        let history = this.redoHistory.pop()
        this.groupHistory.push(history)

        history.forEach(v => {
            this.ctx.globalAlpha = v.opacity
            if(v.shape === 'bulet'){
                this.ctx.beginPath()
                this.ctx.arc(v.x, v.y, v.size, 0, 2 * Math.PI)
                this.ctx.closePath()
                this.ctx.fill()
            }else{
                this.ctx.fillRect(v.x, v.y, v.size, v.size)
            }
        });
    }
}