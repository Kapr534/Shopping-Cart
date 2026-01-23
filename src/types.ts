export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string,
    rating: {
        rate: number,
        count: number
    },
    quantity: number;
}

export interface CartItemProps {
    item: Product;
    handleQuantityChange: (operation: string, id: number) => void;
}

export interface HeaderProps {
    totalInCart: number;
}

export interface ProductCardProps {
    product: Product;
    handleQuantityChange: (operation: string, id: number) => void;
}


export interface TestProduct {
    id: number;
    title: string;
    price: number;
    image: string | null;
    category: string,
    rating: {
        rate: number,
        count: number
    },
    quantity: number;
}

export interface ContextType {
    products: TestProduct[];
    handleQuantityChange: (operation: string, id: number) => void;
}