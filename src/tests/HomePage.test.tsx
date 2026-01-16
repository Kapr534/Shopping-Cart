import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage.tsx";

describe("tests HomePage component rendering", () => {
    it("tests slogan rendering", () => {
        render(<MemoryRouter><HomePage /></MemoryRouter>);

        const sloganElement1 = screen.getByText(/don't just shop/i);
        const sloganElement2 = screen.getByText(/define your style/i);

        expect(sloganElement1).toBeInTheDocument();
        expect(sloganElement2).toBeInTheDocument();
    });

    it("tests if Explore Collection button link works", () => {
        render(<MemoryRouter><HomePage /></MemoryRouter>);

        const marketplaceLink = screen.getByRole("link", { name: /explore collection/i });

        expect(marketplaceLink).toHaveAttribute("href", "/marketplace");
    });

    it("tests if home-banner img has alt", () => {
        render(<MemoryRouter><HomePage /></MemoryRouter>);

        const heroImage = screen.getByAltText(/hero background/i);

        expect(heroImage).toBeInTheDocument();
    });
});