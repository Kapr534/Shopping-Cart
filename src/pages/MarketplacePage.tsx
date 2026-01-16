import type { Product } from "../App.tsx";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../components/ProductCard.tsx";

export default function MarketplacePage() {
    const { products, handleQuantityChange } = useOutletContext<{
        products: Product[],
        handleQuantityChange: (operation: string, id: number) => void
    }>()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-8">
            {
                products.map(product => (
                    <ProductCard key={product.id} product={product} handleQuantityChange={handleQuantityChange}/>
                ))
            }
        </div>
    )
}