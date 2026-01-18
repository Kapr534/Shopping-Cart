import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard.tsx";

describe("tests ProductCard component rendering and calling props functions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("tests if it renders all the information about the product", () => {
        const mockHandle = vi.fn();

        render(<ProductCard product={{
            id: 1,
            title: "testItem",
            price: 200,
            image: "img",
            category: "test",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 0}}
            handleQuantityChange={mockHandle}
        />)

        const titleElement = screen.getByText(/testitem/i);
        const priceElement = screen.getByText(/price/i);
        const priceElement2 = screen.getByText(/200/i);
        const imgElement = screen.getByAltText(/testitem/i);
        const categoryElement = screen.getByText("test");
        const ratingElement = screen.getByText(/4.5/i);

        expect(titleElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
        expect(priceElement2).toBeInTheDocument();
        expect(imgElement).toBeInTheDocument();
        expect(categoryElement).toBeInTheDocument();
        expect(ratingElement).toBeInTheDocument();

    });

    it("tests buttons and if they call + props function", () => {
        const mockHandle = vi.fn();
        const productId = 1;

        render(<ProductCard product={{
            id: productId,
            title: "testItem",
            price: 200,
            image: "img",
            category: "test",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 0}}
                            handleQuantityChange={mockHandle}
        />)

        const addButton = screen.getByRole("button", { name: /add/i });

        fireEvent.click(addButton);

        expect(mockHandle).toHaveBeenCalledWith("+", productId);
        expect(mockHandle).toHaveBeenCalledTimes(1);
    });

    it("tests buttons and if they call + and - props function", () => {
        const mockHandle = vi.fn();
        const productId = 1;

        render(<ProductCard product={{
            id: productId,
            title: "testItem",
            price: 200,
            image: "img",
            category: "test",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 5}}
                            handleQuantityChange={mockHandle}
        />)

        expect(screen.getByText("5")).toBeInTheDocument();

        const plusButton = screen.getByLabelText(/increase quantity/i);
        const minusButton = screen.getByLabelText(/decrease quantity/i);

        fireEvent.click(plusButton);
        expect(mockHandle).toHaveBeenCalledWith("+", 1);

        fireEvent.click(minusButton);
        expect(mockHandle).toHaveBeenCalledWith("-", 1);
    });

});