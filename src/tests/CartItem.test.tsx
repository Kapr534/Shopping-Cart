import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {CartItem} from "../components/CartItem.tsx";

describe("tests CartItem component rendering", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("tests item title and category rendering", () => {
        const mockHandle = vi.fn();

        render(<CartItem item={{
            id: 1,
            title: "testItem",
            price: 200,
            image: "img",
            category: "testCategory",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 0}}
            handleQuantityChange={mockHandle}
        />);

        const titleElement = screen.getByText(/testitem/i);
        const categoryElement = screen.getByText(/testcategory/i);

        expect(titleElement).toBeInTheDocument();
        expect(categoryElement).toBeInTheDocument();
    });

    it("tests correct price per piece and total price and correct formatting", () => {
        const mockHandle = vi.fn();

        render(<CartItem item={{
            id: 1,
            title: "testItem",
            price: 200,
            image: "img",
            category: "test",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 2}}
            handleQuantityChange={mockHandle}
        />);

        const pricePerPieceElement = screen.getByText(/\$200\.00/);
        const totalPieceElement = screen.getByText(/\$400\.00/);

        expect(pricePerPieceElement).toBeInTheDocument();
        expect(totalPieceElement).toBeInTheDocument();
    });

    it("tests if image has correct src and alt", () => {
        const mockHandle = vi.fn();

        render(<CartItem item={{
            id: 1,
            title: "testTitle",
            price: 200,
            image: "testImg",
            category: "test",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 2}}
            handleQuantityChange={mockHandle}
        />);

        const imgElement = screen.getByAltText(/testtitle/i);

        expect(imgElement).toHaveAttribute("alt", "testTitle");
        expect(imgElement).toHaveAttribute("src", "testImg");
    });

    it("tests if +, - and remove bin call function with the correct parameters", () => {
        const mockHandle = vi.fn();

        render(<CartItem item={{
            id: 1,
            title: "testItem",
            price: 200,
            image: "img",
            category: "test",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 2}}
            handleQuantityChange={mockHandle}
        />);

        const addButton = screen.getByText("+");
        const minusButton = screen.getByText(/[−-]/);
        const removeButton = screen.getByTitle(/remove item/i);

        fireEvent.click(addButton);
        expect(mockHandle).toHaveBeenCalledWith("+", 1);

        fireEvent.click(minusButton);
        expect(mockHandle).toHaveBeenCalledWith("-", 1);

        fireEvent.click(removeButton);
        expect(mockHandle).toHaveBeenCalledWith("0", 1);
    });

    it("tests if it renders product with very long title", () => {
        const mockHandle = vi.fn();

        render(<CartItem item={{
            id: 1,
            title: "Test title: sfsfrsfsfsff fsfsfsf fsfsf sfsfsgsg sfsfsf sfsfsfs fswf fsf fssf sfsf sfsfsf sfsf sfsfs ffs",
            price: 200,
            image: "img",
            category: "test",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 0}}
            handleQuantityChange={mockHandle}
        />);

        const titleElement = screen.getByText(/test title:/i);

        expect(titleElement).toBeInTheDocument();
    });

    it("tests product with price 0", () => {
        const mockHandle = vi.fn();

        render(<CartItem item={{
            id: 1,
            title: "testItem",
            price: 0,
            image: "img",
            category: "test",
            rating: {
                rate: 4.5,
                count: 120
            },
            quantity: 2}}
            handleQuantityChange={mockHandle}
        />);

        const pricesElements = screen.queryAllByText(/\$0\.00/);

        expect(pricesElements[0]).toBeInTheDocument();
        expect(pricesElements[1]).toBeInTheDocument();
    });
});
