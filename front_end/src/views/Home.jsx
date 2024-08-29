export default function Home(){
    return <main>

        <section id="banner">
            <div className="slider">
                <img className="active" src="/imgs/images (16).jpg" alt="1" />
            </div>
            <div className="dots">
                <div className="active"></div>
                <div></div>
                <div></div>
            </div>
        </section>

        <section id="text">
            <img src="/imgs/images (5).png" alt="2" height="300" />
            <div className="text">
                <h1>Lorem Ipsum Dolor</h1>
                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
            </div>
        </section>  

        <section id="gallery">
            <header>
                <h1>Gallery</h1>
            </header>
            <aside>
                <img src="/imgs/images (5).webp" alt="gallery" height="300" />
                <img src="/imgs/images (5).webp" alt="gallery" height="300" />
                <img src="/imgs/images (5).webp" alt="gallery" height="300" />
            </aside>
        </section>

        <section id="services">
            <header>
                <h1>Services</h1>
            </header>
            <aside>
                <div className="card">
                    <img src="/imgs/images (6).webp" alt="web" height="160" />
                    <h1 className="card-title">Web Development</h1>
                    <p className="card-content">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                </div>
                <div className="card">
                    <img src="/imgs/images (6).webp" alt="web" height="160" />
                    <h1 className="card-title">Web Development</h1>
                    <p className="card-content">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                </div>
                <div className="card">
                    <img src="/imgs/images (6).webp" alt="web" height="160" />
                    <h1 className="card-title">Web Development</h1>
                    <p className="card-content">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                </div>
            </aside>
        </section>

        <section id="portfolio">
            <header>
                <h1>Portfolio</h1>
            </header>
            <aside>
                <div className="card">
                    <img src="/imgs/images (7).webp" alt="porto" height="180" width="200" />
                    <h1 className="card-title">Web Development</h1>
                    <p className="card-content">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                    <footer>
                        <p className="author">Author</p>
                        <div className="views">
                            <span>100</span>
                            <span>views</span>
                        </div>
                    </footer>
                </div>
                <div className="card">
                    <img src="/imgs/images (7).webp" alt="porto" height="180" width="200" />
                    <h1 className="card-title">Web Development</h1>
                    <p className="card-content">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                    <footer>
                        <p className="author">Author</p>
                        <div className="views">
                            <span>100</span>
                            <span>views</span>
                        </div>
                    </footer>
                </div>
                <div className="card">
                    <img src="/imgs/images (7).webp" alt="porto" height="180" width="200" />
                    <h1 className="card-title">Web Development</h1>
                    <p className="card-content">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                    <footer>
                        <p className="author">Author</p>
                        <div className="views">
                            <span>100</span>
                            <span>views</span>
                        </div>
                    </footer>
                </div>
            </aside>
        </section>

    </main>
}