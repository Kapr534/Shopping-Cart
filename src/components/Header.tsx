import {Link} from "react-router-dom";
import { ShoppingCartIcon, Squares2X2Icon } from '@heroicons/react/24/outline';


export default function Header() {

    return (
        <header className="flex flex-row h-25 p-7 text-2xl md:text-5xl tracking-tighter shadow-md">
            <h1>
                <Link to="/" className="group flex items-center">
                    <span className="text-emerald-600 font-black transition-colors group-hover:text-emerald-500">Fake</span>
                    <span className="text-sky-600 font-light transition-colors group-hover:text-sky-400">Shop</span>
                </Link>
            </h1>

            <div className="ml-auto flex items-center space-x-4">
                {/* Marketplace Button */}
                <Link to="/marketplace"
                      className="group flex items-center px-4 py-2 rounded-md transition-colors
                     bg-emerald-600 hover:bg-emerald-700 text-white font-medium
                     text-sm md:text-base">
                    <Squares2X2Icon className="h-5 w-5 mr-2" /> {/* Ikona */}
                    Marketplace
                </Link>

                {/* Cart Icon */}
                <Link to="/cart" className="relative group p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ShoppingCartIcon className="h-7 w-7 text-sky-600 transition-colors group-hover:text-sky-700" />
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold
                       rounded-full h-5 w-5 flex items-center justify-center">
        {/* Example: replace with actual cart item count */}
                    </span>
                </Link>
            </div>
        </header>
    )
}