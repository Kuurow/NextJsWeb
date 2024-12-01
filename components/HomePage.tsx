export default function HomePage() {
    return (
        <>
            <div className="absolute justify-center text-center z-10 backdrop-blur-xl w-screen bg-transparent p-5 drop-shadow-sm top-0">
                <h1 className="text-5xl text-slate-700">Work in progress...</h1>
            </div>
            <div className="absolute justify-center text-center z-10 backdrop-blur-xl w-screen bg-transparent p-5 drop-shadow-sm bottom-0">
                <h1 className="text-5xl text-slate-700">You can still check the gallery {" "}
                    <a href="/gallery" target="" className="font-semibold hover:text-fuchsia-700" rel="noreferrer"> here </a>
                </h1>
            </div>
        </>
    )
}