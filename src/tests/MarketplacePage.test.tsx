import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MarketplacePage from "../pages/MarketplacePage.tsx";

const mockProducts = [
    { id: 1, title: "iPhone", price: 1000, category: "electronics", image: null, quantity: 0, description: "", rating: { rate: 4.5, count: 10 } },
    { id: 2, title: "Backpack", price: 50, category: "clothing", image: null, quantity: 0, description: "", rating: { rate: 4.0, count: 5 } }
];

const mockHandleQuantityChange = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useOutletContext: () => ({
            products: mockProducts,
            handleQuantityChange: mockHandleQuantityChange,
        }),
    };
});

describe("tests MarketplacePage component rendering", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should show all the products", () => {
        render(<MarketplacePage />);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent("2");
    });

    it("should filter products when a category button is clicked and unfilter when all is clicked", () => {
        render(<MarketplacePage />);

        const electronicsButton = screen.getByRole("button", { name: /electronics/i });
        fireEvent.click(electronicsButton);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent("1");

        const allButton = screen.getByRole("button", { name: /all/i });
        fireEvent.click(allButton);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();
    });

    it("should filter products using search bar", () => {
        render(<MarketplacePage />);

        const searchBar = screen.getByRole("textbox");
        fireEvent.change(searchBar, { target: { value: "iPhone" } });

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent("1");
    });

    it("should find products regardless of case sensitivity (uppercase/lowercase)", () => {
        render(<MarketplacePage />);

        const searchBar = screen.getByRole("textbox");
        fireEvent.change(searchBar, { target: { value: "IPhoNe" } });

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent("1");
    });

    it("should combine category and search filtering", () => {
        render(<MarketplacePage />);

        const electronicsButton = screen.getByRole("button", { name: /electronics/i });
        fireEvent.click(electronicsButton);
        const searchBar = screen.getByRole("textbox");
        fireEvent.change(searchBar, { target: { value: "IPhoNe" } });

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const allButton = screen.getByRole("button", { name: /all/i });
        fireEvent.click(allButton);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();
    });

    it("should say No products found if nothing found and clear all filters should show all products", () => {
        render(<MarketplacePage />);

        expect(screen.queryByText(/no products found/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/we couldn't find anything matching your search/i)).not.toBeInTheDocument();

        const electronicsButton = screen.getByRole("button", { name: /electronics/i });
        fireEvent.click(electronicsButton);
        const searchBar = screen.getByRole("textbox");
        fireEvent.change(searchBar, { target: { value: "backpack" } });

        expect(screen.getByText(/no products found/i)).toBeInTheDocument();
        expect(screen.getByText(/we couldn't find anything matching your search/i)).toBeInTheDocument();
        expect(screen.queryByText("iPhone")).not.toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const clearButton = screen.getByRole("button", { name: /clear all filters/i });
        fireEvent.click(clearButton);

        expect(searchBar).toHaveValue("");
        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent("2");
    });

    it("should show 'Showing X products', depending on how many products are shown", () => {
        render(<MarketplacePage />);

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent("2");

        const electronicsButton = screen.getByRole("button", { name: /electronics/i });
        fireEvent.click(electronicsButton);

        expect(counter).toHaveTextContent("1");

        const searchBar = screen.getByRole("textbox");
        fireEvent.change(searchBar, { target: { value: "backpack" } });

        expect(counter).toHaveTextContent("0");
    });

    it("Active category should have class bg-sky-600", () => {
        render(<MarketplacePage />);

        const allButton = screen.getByRole("button", { name: /all/i });
        const electronicsButton = screen.getByRole("button", { name: /electronics/i });

        expect(allButton).toHaveClass("bg-sky-600");
        expect(electronicsButton).not.toHaveClass("bg-sky-600");

        fireEvent.click(electronicsButton);

        expect(allButton).not.toHaveClass("bg-sky-600");
        expect(electronicsButton).toHaveClass("bg-sky-600");
    });

    it("should call handleQuantityChange with correct arguments when interaction happens", () => {
        render(<MarketplacePage />);

        const addButtons = screen.getAllByRole("button", { name: /add/i });
        fireEvent.click(addButtons[0]);

        expect(mockHandleQuantityChange).toHaveBeenCalledWith("+", 1);
        expect(mockHandleQuantityChange).toHaveBeenCalledTimes(1);
    });

    it("should show only one button for each category", () => {
        render(<MarketplacePage />);

        const allButton = screen.getByRole("button", { name: /all/i });
        const electronicsButton = screen.getByRole("button", { name: /electronics/i });
        const clothingButton = screen.getByRole("button", { name: /clothing/i });

        expect(allButton).toBeInTheDocument();
        expect(electronicsButton).toBeInTheDocument();
        expect(clothingButton).toBeInTheDocument();
    });
});
