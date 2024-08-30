import Home from "./views/Home.js"
import Workspace from "./views/Workspace.js"

class ScreenController {
    constructor(){
        this.current = null

        this.home = new Home()
        this.workspace = new Workspace()
    }

    init(){
        this.change('workspace')
    }

    change(screen){
        if(this.current) this.current.unMount()
        this.current = this[screen]
        this.current.mount()
    }
}

export const screenController = new ScreenController()