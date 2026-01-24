import { describe, expect, it, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import {render, screen} from "@testing-library/react";
import SuccessPage from "../pages/SuccessPage.tsx";

describe("tests SuccessPage component rendering", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render success icon", () => {
        render(<MemoryRouter><SuccessPage /></MemoryRouter>);

        expect(screen.getByTestId("success-icon")).toBeInTheDocument();
    })

    it("should display order confirmed", () => {
        render(<MemoryRouter><SuccessPage /></MemoryRouter>);

        expect(screen.getByText(/order confirmed!/i)).toBeInTheDocument();
        expect(screen.getByText(/thank you for your purchase. we've received your order and we're getting it ready for shipment./i))
            .toBeInTheDocument();
    });

    it("should link to marketplace after clicking Back to Marketplace", () => {
        render(<MemoryRouter><SuccessPage /></MemoryRouter>)

        const marketplaceLink = screen.getByRole("link", { name: /back to marketplace/i });

        expect(marketplaceLink).toHaveAttribute("href", "/marketplace");
    });
})