import { screenController } from "./screens/Main.js";

if(config.env === 'production'){
    if(!localStorage.getItem('user')){
        window.location.href = '/'
    }
}

screenController.init()