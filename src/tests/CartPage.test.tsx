import { describe, expect, it, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react"; // fireEvent
import CartPage from "../pages/CartPage.tsx";
import type { ContextType } from "../types.ts";


const contextData: ContextType = {
    products: [],
    handleQuantityChange: vi.fn(),
};

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useOutletContext: () => contextData,
        useNavigate: () => mockNavigate,
    };
});

describe("tests ProductCard component rendering and calling props functions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("tests empty cart rendering", () => {
        contextData.products = [
            {
                id: 1,
                title: "iPhone",
                price: 1000,
                image: "",
                category: "electronics",
                rating: { rate: 4.5, count: 10 },
                quantity: 0
            },

        ];

        render(<MemoryRouter><CartPage /></MemoryRouter>);

        const bagIconSvg = screen.getByTestId("bag-icon");
        expect(bagIconSvg).toBeInTheDocument();
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        expect(screen.getByText(/looks like/i)).toBeInTheDocument();
    });

    it("tests link explore products when nothing in cart", () => {
        contextData.products = [
            {
                id: 1,
                title: "iPhone",
                price: 1000,
                image: "",
                category: "electronics",
                rating: { rate: 4.5, count: 10 },
                quantity: 0
            },

        ];

        render(<MemoryRouter><CartPage /></MemoryRouter>);

        const exploreLink = screen.getByRole("link", { name: /explore products/i });
        expect(exploreLink).toHaveAttribute("href", "/marketplace");
    });

    it("renders correct number of CartItem components (quantity > 0)", () => {
        contextData.products = [
            {id: 1, title: "iPhone", price: 1000, image: "", category: "electronics", rating: { rate: 4.5, count: 10 }, quantity: 1},
            {id: 2, title: "Backpack", price: 10000, image: "", category: "electronics", rating: { rate: 4.5, count: 10 }, quantity: 2},
            {id: 3, title: "Table", price: 10, image: "", category: "electronics", rating: { rate: 4.5, count: 10 }, quantity: 10},
            {id: 4, title: "Bread", price: 100, image: "", category: "electronics", rating: { rate: 4.5, count: 10 }, quantity: 0},
        ];

        render(<MemoryRouter><CartPage /></MemoryRouter>);

        const itemsInCart = screen.getAllByTestId("cart-item");
        expect(itemsInCart.length).toBe(3);
    });

    // it("")
});


