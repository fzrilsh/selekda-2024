import { screenController } from "../Main.js"
import Ball from "./components/Ball.js"
import Gawang from "./components/Gawang.js"
import Item from "./components/Item.js"
import Player from "./components/Player.js"

export default class Gameboard {
    constructor(){
        this.gameStarted = false
        this.el = document.querySelector('.screen.gameboard')
        this.mainBoard = this.el.querySelector('.main')

        this.username = null
        this.level = null
        this.ball = null
        this.my_team = null
        this.opponent_team = null
        this.scores = [0,0]

        this.player = null
        this.bot = null

        this.my_gawang = null
        this.opponent_gawang = null
        this.ball = null

        this.timer = null
        this.intervalTimer = null
        this.intervalItem = null

        this.items = []
    }

    mount(){
        this.el.classList.add('active')

        this.username = screenController.register.data.username
        this.level = screenController.register.data.level
        this.ball = screenController.register.data.ball
        this.my_team = screenController.register.data.my_team
        this.opponent_team = screenController.register.data.opponent_team

        this.player = new Player(false, this.my_team)
        this.bot = new Player(true, this.opponent_team)

        this.my_gawang = new Gawang()
        this.opponent_gawang = new Gawang(true)
        this.ball = new Ball()
        this.ball.move('bottom', true)

        this.timer = 2//this.level === 'easy' ? '30' : this.level === 'medium' ? 20 : 15
        this.makeFlag()
        this.intializeInfo()
        this.intializeInterval()

        this.gameStarted = true

        window.addEventListener('keydown', ({key}) => {
            if(key === 'Escape') this.pause()
        })

        this.el.querySelector('#history-button').onclick = async() => {
            if(this.leaderboard) return alert(`Match Leaderboard:\n\n${this.leaderboard.map(v => `Name: ${v.username} | Country: ${v.country} | Score: ${v.score}`).join('\n')}`)

            let data = await fetch('/server/scores', {
                method: 'get',
                headers: {
                    Authorization: 'Bearer '+JSON.parse(localStorage.getItem('user')).token
                }
            })
            this.leaderboard = await data.json()

            alert(`Match Leaderboard:\n\n${this.leaderboard.map(v => `Name: ${v.username} | Country: ${v.country} | Score: ${v.score}`).join('\n')}`)
        }
    }

    unMount(){
        this.el.classList.remove('active')
    }

    gameOver(){
        this.gameStarted = false

        clearInterval(this.intervalItem)
        clearInterval(this.intervalTimer)

        const modal = document.querySelector('.modal')
        modal.classList.add('active')
        modal.querySelector('#username').textContent = this.username
        modal.querySelector('#country').textContent = this.my_team
        modal.querySelector('#score').textContent = this.scores[0]
        modal.querySelector('button#save').onclick = () => {
            fetch('/server/scores', {
                method: 'post',
                body: {
                    'username': this.username,
                    'score': this.scores[0],
                    'country': this.my_team
                },
                headers: {
                    Authorization: 'Bearer '+JSON.parse(localStorage.getItem('user')).token
                }
            }).then(() => {
                alert('Success save the match')
            })
        }
        modal.querySelector('button#restart').onclick = () => {
            document.location.reload()
        }

        this.el.style.filter = 'blur(3px)'
    }

    pause(){
        confirm("Game paused, continue?")
    }

    intializeInterval(){
        let timerEl = this.el.querySelector('header .timer span')
            timerEl.textContent = this.timer
        this.intervalTimer = setInterval(() => {
            if(!screenController.gameboard.gameStarted) return;

            this.timer--
            timerEl.textContent = this.timer

            if(this.timer <= 0){
                clearInterval(this.intervalTimer)
                this.gameOver()
            }
        }, 1000);

        this.intervalItem = setInterval(() => {
            if(!screenController.gameboard.gameStarted) return;

            let types = ['Decrease Ball', 'Diamond Ice', 'Increase Ball']
            this.items.push(new Item(types[Math.floor(Math.random()*types.length)]))
        }, 5000);
    }

    intializeInfo(){
        let playername = this.el.querySelector('header #name')
        let myFlag = this.el.querySelector('header #my-region')
        let opponentFlag = this.el.querySelector('header #opponent-region')

        playername.textContent = this.username.toUpperCase()
        myFlag.querySelector('img').src = `assets/Flag/${this.my_team}.png`
        opponentFlag.querySelector('img').src = `assets/Flag/${this.opponent_team}.png`
        myFlag.querySelector('#caption').textContent = this.my_team
        opponentFlag.querySelector('#caption').textContent = this.opponent_team
    }

    makeFlag(){
        let flags = [this.my_team, this.opponent_team]
        for (let index = 0; index < 12; index++) {
            let el = document.createElement('img')
            el.src = `assets/Flag/${index%2 === 0 ? flags[0] : flags[1]}.png`

            this.el.querySelector('.flags').appendChild(el)
        }
    }
}