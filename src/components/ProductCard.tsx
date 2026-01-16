import type { Product } from "../App.tsx";
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    handleQuantityChange: (operation: string, id: number) => void;
}

export default function ProductCard({ product, handleQuantityChange }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

            {/* Image Container */}
            <div className="relative h-64 w-full flex justify-center items-center p-8 bg-slate-50/50 overflow-hidden">
                <img
                    src={product.image}
                    className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    alt={product.title}
                />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-slate-100">
                    <span className="text-xs font-bold text-slate-700">{product.rating.rate}</span>
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                </div>

                {/* Category Tag */}
                <div className="absolute top-3 left-3">
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col p-5 flex-grow">
                <h3 className="text-slate-800 font-semibold text-sm leading-tight h-10 line-clamp-2 mb-4 group-hover:text-sky-600 transition-colors">
                    {product.title}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">Price</span>
                        <span className="text-xl font-black text-slate-900 leading-none">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center">
                        {product.quantity > 0 ? (
                            <div className="flex items-center bg-sky-50 rounded-lg border border-sky-100 overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange("-", product.id)}
                                    className="p-1.5 hover:bg-sky-100 text-sky-600 transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>

                                <span className="w-8 text-center text-sm font-bold text-sky-700">
                                    {product.quantity}
                                </span>

                                <button
                                    onClick={() => handleQuantityChange("+", product.id)}
                                    className="p-1.5 hover:bg-sky-100 text-sky-600 transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleQuantityChange("+", product.id)}
                                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:shadow-md active:scale-95 transition-all"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}