export default function HomePage() {
    return (
        <>
            <div id="home-main-top" className="border-2 border-[#7a4230] rounded-tr-[160px] rounded-bl-[160px] h-5/6 m-6 mb-1 bg-custom bg-cover bg-center grid grid-cols-4">
                <div className="h-1/2 w-10 bg-gradient-to-b from-[#140C0A] to-[#7a4230] mt-3 ml-3"></div>
                <div id="temp-home-text" className="ml-2">
                    <h1 className="text-5xl m-auto pt-[12rem] sm:pt-[20rem] sm:pl-10">
                        Welcome to my website
                    </h1>
                    <h2 className="text-xl m-auto pt-[1rem] sm:pl-10 italic">
                        This website is still under construction, weird things can happen
                    </h2>
                </div>
            </div>
            <div id="home-main-bottom" className="border-2 border-[#7a4230] rounded-tl-[160px] rounded-bl-[160px] rounded-br-[160px] h-1/6 m-6 mt-1 bg-[#7a4230] grid grid-cols-4">
                <div className="h-[95%] w-full bg-main rounded-full m-auto ml-2"></div>
                <div id="temp-gal-link" className="ml-2">
                    <h2 className="text-xl text-center m-auto pt-[2rem] sm:pt-[3rem] md:pt-[4rem] sm:text-3xl xl:text-4xl xl:pt-[3rem]">
                        The gallery is still available <a href="/gallery" className="underline">here</a>
                    </h2>
                </div>
            </div>
        </>
    )
}