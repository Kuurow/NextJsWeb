import Sphere from "./Sphere";

export default function HomePage() {
    return (
        <div id="home-container" className="h-screen">
            <div id="home-content" className="h-[80%] lg:h[70%]">
                <div id="home-sphere" className="pt-[10rem] md:pt-[10rem] lg:pt-[5rem]">
                    <Sphere/>
                </div>
                <h1 id="welcomer-heading" className="pt-[2rem] font-neuropol text-center text-4xl font-extrabold tracking-wider pl-2 pr-2">
                    Welcome to my website
                </h1>
                <p id="welcomer-paragraph" className="pt-[2rem] font-neuropol text-center text-lg text-zinc-100 pl-12 pr-12 italic tracking-tight">
                    This website is still under construction, some elements may change or disappear
                </p>
            </div>
            <div id="home-footer" className="h-[20%] lg:h[30%] p-12">
                <div className="border border-r-0 border-l-0  grid grid-flow-col grid-cols-3 h-full items-center">
                    <div id="footer-logo" className="align-middle">
                        <img src="./img/logo.webp" className="w-[4vh]"/>
                    </div>
                    <div id="footer-link" className="align-middle text-center">
                        <a href="/gallery" className="underline">Pictures gallery</a>
                    </div>
                    <div id="footer-link2" className="align-middle ">
                        <a href="https://github.com/Kuurow/NextJsWeb" target="_blank"><img src="./img/github-logo.png" className="w-[4vh] invert float-right"/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}