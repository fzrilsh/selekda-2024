import { screenController } from "../Main.js"

export default class Register {
    constructor(){
        this.el = document.querySelector('.screen.register')

        this.form = this.el.querySelector('form')
        this.username = this.form.querySelector('#username')
        this.level = this.form.querySelector('#level')
        this.myTeam = this.form.querySelector('#my_team')
        this.opponentTeam = this.form.querySelector('#opponent_team')
        this.button = this.form.querySelector('button[type=submit]')

        this.instructionButton = this.form.querySelector('button#instruction')
        this.randomButton = this.form.querySelector('button#random')

        this.interval = null
        this.data = {
            username: 'fazril',
            my_team: 'Brazil',
            opponent_team: 'Germany',
            ball: 'Ball 01.png',
            level: 'easy'
        }
    }

    mount(){
        this.el.classList.add('active')
        this.username.focus()

        this.interval = setInterval(this.listen.bind(this));
    }

    unMount(){
        this.el.classList.remove('active')
        clearInterval(this.interval)
    }

    listen(){
        this.button.disabled = !this.username.value

        let instEl = document.querySelector('.instruction')
        let controlInstruc = () => instEl.style.display = instEl.style.display === 'block' ? 'none' : 'block'
        this.instructionButton.onclick = controlInstruc
        instEl.querySelector('span').onclick = controlInstruc

        
        let randomOpponent = () => {
            let teams = ['Brazil', 'England', 'Germany', 'Italy', 'Japan', 'Netherlands', 'Portugal', 'Spain']
            teams = teams.filter(v => v !== this.myTeam.value)
            
            this.opponentTeam.value = teams[Math.floor(Math.random()*teams.length)]
        }
        this.myTeam.onchange = randomOpponent
        this.randomButton.onclick = randomOpponent
        

        this.form.onsubmit = (e) => {
            e.preventDefault()

            let value = Object.fromEntries(new FormData(e.target))
            if(value.my_team === value.opponent_team) return alert('Your choosen team and opponent team cant be same.')
            
            this.data = value
            screenController.change('countdown')
        }
    }
}