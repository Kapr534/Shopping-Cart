import { useOutletContext, Link , useNavigate } from "react-router-dom";
import type { Product } from "../App.tsx";
import { CartItem } from "../components/CartItem.tsx";
import { useMemo } from "react";

export default function CartPage() {
    const navigate = useNavigate();
    const shippingThreshold = 500;
    const shippingCost = 6;

    const { products, handleQuantityChange } = useOutletContext<{
        products: Product[],
        handleQuantityChange: (operation: string, id: number) => void,
    }>();

    const subtotal = useMemo(() => {
        return products.reduce((acc, product) => acc + product.quantity * product.price, 0);
    }, [products]);

    const totalInCart = products.reduce((total, product) => total + product.quantity, 0);

    const shipping = subtotal > 500 || subtotal === 0 ? 0 : shippingCost;
    const total = subtotal + shipping;

    const handleCheckout = () => {
        products.forEach(product => {
            if (product.quantity > 0) handleQuantityChange('0', product.id);
        })

        navigate("/success");
    }

    if (totalInCart === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added any items to the cart yet.</p>
                <Link to="/marketplace" className="bg-sky-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200">
                    Explore Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalInCart})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                {/* List of products in cart */}
                <div className="lg:col-span-2 space-y-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {products.map(product => (
                        product.quantity > 0 && (
                            <CartItem key={product.id} item={product} handleQuantityChange={handleQuantityChange}/>
                        )
                    ))}
                </div>

                {/* SUMMARY SIDEBAR */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                    <div className="space-y-4 text-gray-600">
                        <div className="flex justify-between text-base">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        {shipping > 0 && (
                            <p className="text-xs text-blue-500 bg-blue-50 p-2 rounded-lg">
                                Tip: Add <b>${(shippingThreshold - subtotal).toFixed(2)}</b> more for Free Shipping!
                            </p>
                        )}

                        <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-end">
                            <span className="text-lg font-bold text-gray-900">Total Price</span>
                            <div className="text-right">
                                <p className="text-2xl font-black text-sky-600 leading-none">
                                    ${total.toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">including VAT</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="w-full mt-8 bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-gray-200 active:scale-[0.98]"
                    >
                        Checkout Now
                    </button>

                    <Link to="/marketplace" className="block text-center mt-4 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}