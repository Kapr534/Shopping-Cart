import type {CartItemProps} from "../types.ts";

export const CartItem = ({ item, handleQuantityChange }: CartItemProps) => {
    return (
        <div data-testid="cart-item" className="flex flex-col sm:flex-row items-center justify-between border-b py-6 sm:py-4 px-2 hover:bg-gray-50 transition-colors group gap-4 sm:gap-0">
            <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-white p-1 rounded shadow-sm flex-shrink-0"
                />
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 sm:line-clamp-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 capitalize">{item.category}</p>
                    <p className="text-sky-600 font-semibold mt-1 text-sm">${item.price.toFixed(2)} / pc</p>
                </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-2 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => handleQuantityChange('-', item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-red-50 hover:text-red-500 transition-all font-bold"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="w-6 sm:w-8 text-center font-bold text-gray-700 text-sm sm:text-base">{item.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange('+', item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-green-50 hover:text-green-500 transition-all font-bold"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-6 justify-end">
                    <div className="text-right min-w-[70px] sm:min-w-[100px]">
                        <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>

                    <button
                        onClick={() => handleQuantityChange('0', item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        title="Remove item"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};