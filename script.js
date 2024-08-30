window.onload = () => {
    //navbar
    document.querySelector('nav li#open').onclick = () => {
        document.querySelector('.sidebar').style.display = 'flex'
    }
    document.querySelector('.sidebar #close').onclick = () => {
        document.querySelector('.sidebar').style.display = 'none'
    }
    
}