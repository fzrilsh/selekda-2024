import { screenController } from "../Main.js"

export default class Home {
    constructor(){
        this.el = document.querySelector('.screen.home')

        this.form = this.el.querySelector('form')
        this.filename = this.form.querySelector('#filename')
        this.canvasSize = {
            width: this.form.querySelector('#width'),
            height: this.form.querySelector('#height')
        }

        this.interval = null
    }

    mount(){
        let modal = document.querySelector('.welcome-modal')
        modal.classList.add('active')
        setTimeout(() => {
            modal.classList.remove('active')
        }, 1000);

        this.el.classList.add('active')
        this.interval = setInterval(this.listen.bind(this));
    }

    unMount(){
        this.el.classList.remove('active')
        clearInterval(this.interval)
        this.form.onsubmit = (e) => e.preventDefault()
    }

    listen(){
        this.form.querySelector('button').disabled = !this.filename.value

        this.form.onsubmit = (e) => {
            e.preventDefault()
            screenController.change('workspace')
        }
    }
}