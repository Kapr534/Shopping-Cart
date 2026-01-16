import {Link} from "react-router-dom";
import homeBanner from "../assets/home-banner.jpg";

export default function HomePage() {
    return (
        <div className="relative h-[80vh] w-full overflow-hidden">
            <img src={homeBanner} className="absolute inset-0 h-full w-full object-cover" alt="Hero Background"/>

            <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-emerald-900/40 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-center px-10">
                <h1 className="text-white text-6xl font-black italic tracking-tighter">
                    DON'T JUST SHOP <br/>
                    <span className="text-emerald-400">DEFINE YOUR STYLE</span>
                </h1>

                <Link
                    to="/marketplace"
                    className="z-10 mt-8 group inline-flex justify-center px-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-sky-600 rounded-full hover:bg-sky-500 shadow-lg active:scale-95 items-start w-fit">
                    Explore Collection
                </Link>
            </div>

        </div>
    )
}