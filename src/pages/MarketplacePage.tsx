import type { Product } from "../types.ts";
import {useMemo, useState} from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard.tsx";
import { ShoppingCart } from "lucide-react";

export default function MarketplacePage() {
    const { products, handleQuantityChange } = useOutletContext<{
        products: Product[],
        handleQuantityChange: (operation: string, id: number) => void,
    }>();

    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const categories: string[] = useMemo(() => {
        if (products.length === 0) return ["all"];

        return ["all", ...new Set(products.map(p => p.category))];
    }, [products]);

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory;

        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const totalProductShown = filteredProducts.length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
            <div className="flex flex-col items-center mb-10">
                <div className="w-full max-w-md mb-12 relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for items, brands and more..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                        >
                            <span className="text-xl">×</span>
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {categories.map((category) => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`
                            px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200
                            ${isActive
                                    ? "bg-sky-600 text-white shadow-md shadow-sky-200 scale-105"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-sky-400 hover:text-sky-600"
                                }
                        `}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                <div className="text-slate-500 text-sm font-medium bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                    Showing <span className="text-slate-900 font-bold">{totalProductShown}</span> Products
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} handleQuantityChange={handleQuantityChange}/>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                    <div className="bg-slate-50 p-6 rounded-full mb-4">
                        <ShoppingCart className="w-12 h-12 text-slate-300" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No products found</h3>
                    <p className="text-slate-500 mt-2 max-w-xs">
                        We couldn't find anything matching your search. Try different keywords or change the category.
                    </p>
                    <button
                        onClick={() => {
                            setActiveCategory("all");
                            setSearchQuery("");
                        }}
                        className="mt-6 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}