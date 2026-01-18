import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header.tsx";


describe("tests Header component rendering", () => {
    it("tests fakeshop and its link to home page", () => {
        render(<MemoryRouter><Header totalInCart={0}/></MemoryRouter>);

        const fakeElement = screen.getByText(/fake/i);
        const shopElement = screen.getByText(/shop/i);
        const homePageLink = screen.getByRole("link", { name: /fakeshop/i });

        expect(fakeElement).toBeInTheDocument();
        expect(shopElement).toBeInTheDocument();
        expect(homePageLink).toHaveAttribute("href", "/");
    })

    it("tests marketplace button, its link to marketplace and isActive", () => {
        render(
            <MemoryRouter initialEntries={["/marketplace"]}>
                <Header totalInCart={0}/>
            </MemoryRouter>
        );

        const marketplaceElement = screen.getByText(/marketplace/i);
        const marketplaceLink = screen.getByRole("link", { name: /marketplace/i });

        expect(marketplaceElement).toBeInTheDocument();
        expect(marketplaceLink).toHaveAttribute("href", "/marketplace");
        expect(marketplaceLink).toHaveClass("aria-[current=page]:bg-emerald-800");
        expect(marketplaceLink).toHaveAttribute("aria-current", "page")
    });

    it("tests cart button, its link to cart and isActive", () => {
        render(
            <MemoryRouter initialEntries={["/cart"]}>
                <Header totalInCart={0}/>
            </MemoryRouter>
        );

        const cartLink = screen.getByRole("link", { name: /shopping cart/i });

        expect(cartLink).toBeInTheDocument();
        expect(cartLink).toHaveAttribute("href", "/cart");
        expect(screen.queryByTestId("icon-solid")).toBeInTheDocument();
        expect(screen.queryByTestId("icon-outline")).not.toBeInTheDocument();
    });

    it("tests number of items in cart", () => {
        render(
            <MemoryRouter initialEntries={["/cart"]}>
                <Header totalInCart={5}/>
            </MemoryRouter>
        );

        const itemsInCartElement = screen.getByText("5");

        expect(itemsInCartElement).toBeInTheDocument();
    });
})