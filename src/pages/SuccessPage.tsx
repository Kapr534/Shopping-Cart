import { Link } from "react-router-dom";

export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <div data-testid="success-icon" className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                Thank you for your purchase. We've received your order and we're getting it ready for shipment.
            </p>
            <Link
                to="/marketplace"
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
            >
                Back to Marketplace
            </Link>
        </div>
    );
}