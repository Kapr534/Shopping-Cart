import { NavLink } from "react-router-dom";
import { ShoppingCartIcon as CartOutline } from "@heroicons/react/24/outline";
import { ShoppingCartIcon as CartSolid } from "@heroicons/react/24/solid";
import { Squares2X2Icon } from '@heroicons/react/24/outline';

interface HeaderProps {
    totalInCart: number;
}

export default function Header({totalInCart}: HeaderProps) {

    return (
        <header className="flex flex-row h-25 p-7 text-3xl md:text-5xl tracking-tighter shadow-md">
            <h1>
                <NavLink to="/" className="group flex items-center">

                    <span className="text-emerald-600 font-black transition-colors group-hover:text-emerald-500">Fake</span>
                    <span className="text-sky-600 font-light transition-colors group-hover:text-sky-400">Shop</span>
                </NavLink>
            </h1>

            <div className="ml-auto flex items-center space-x-4">
                {/* Marketplace Button */}
                <NavLink to="/marketplace"
                      className="group flex items-center px-5 py-2.5 rounded-lg transition-all duration-200
                    bg-emerald-600 hover:bg-emerald-500 text-white font-semibold
                      text-sm md:text-base tracking-wide shadow-sm hover:shadow-md aria-[current=page]:bg-emerald-800 aria-[current=page]:scale-105">
                    <Squares2X2Icon className="h-5 w-5 mr-3 opacity-90 group-hover:opacity-100" />
                    <span>Marketplace</span>
                </NavLink>

                {/* Cart Icon */}
                <NavLink
                    to="/cart"
                    aria-label="Shopping Cart"
                    className="relative group p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    {({ isActive }) => (
                        <>
                            {isActive ? (
                                <CartSolid data-testid="icon-solid" className="h-7 w-7 text-sky-600 animate-in zoom-in-75 duration-200" />
                            ) : (
                                <CartOutline data-testid="icon-outline" className="h-7 w-7 text-sky-600 group-hover:text-sky-700" />
                            )}

                            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold
                            rounded-full h-5 w-5 flex items-center justify-center">
                            {totalInCart === 0 ? "" : totalInCart}
                            </span>
                        </>
                    )}
                </NavLink>
            </div>
        </header>
    )
}