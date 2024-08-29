export default function Navbar(){
    return <nav>
        <ul>
            <li><img src="/Computer_Logo.png" alt="Logo" /></li>
            <li id="nav-link"><a href="#gallery">Gallery</a></li>
            <li id="nav-link"><a href="#services">Services</a></li>
            <li id="nav-link"><a href="#portfolio">Portfolio</a></li>
            <li id="nav-link"><a href="#">News</a></li>
            <li id="nav-link"><a href="#">Testimonials</a></li>
            <li id="nav-link"><a href="#">Login</a></li>
            <li id="open">Open</li>
        </ul>

        <ul className="sidebar">
            <li id="close">X</li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Login</a></li>
        </ul>
    </nav>
}