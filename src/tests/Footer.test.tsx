import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer.tsx";


describe("tests Footer component rendering", () => {
    it("tests tech stack section rendering", () => {
        render(<Footer />);

        const builtUsingElement = screen.getByText(/built using/i);
        const reactElement = screen.getByText(/react & react router/i);
        const typeScriptTailwindElement = screen.getByText(/typescript & tailwind css/i);
        const fakeStoreAPIElement = screen.getByText(/fake store api/i);
        const vitestRTLElement = screen.getByText(/vitest & rtl/i);
        const heroiconsElement = screen.getByText(/heroicons/i);

        expect(builtUsingElement).toBeInTheDocument();
        expect(reactElement).toBeInTheDocument();
        expect(typeScriptTailwindElement).toBeInTheDocument();
        expect(fakeStoreAPIElement).toBeInTheDocument();
        expect(vitestRTLElement).toBeInTheDocument();
        expect(heroiconsElement).toBeInTheDocument();
    });

    it("tests inspiration section rendering", () => {
        render(<Footer />);

        const inspirationElement = screen.getByText(/inspiration/i);
        const inspiredByElement = screen.getByText(/design inspired by rando/i);
        const visitRandoElement = screen.getByText(/visit rando's page/i);

        expect(inspirationElement).toBeInTheDocument();
        expect(inspiredByElement).toBeInTheDocument();
        expect(visitRandoElement).toBeInTheDocument();
        expect(visitRandoElement).toHaveAttribute("href", "https://rando-mart.netlify.app/home");
    });

    it("tests project info section rendering", () => {
        render(<Footer />);

        const projectInfoElement = screen.getByText(/project info/i);
        const githubIconElement = screen.getByTestId("github-icon");
        const githubLink = screen.getByRole("link", { name: /view source code/i });

        expect(projectInfoElement).toBeInTheDocument();
        expect(githubIconElement).toBeInTheDocument();
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute("href", "https://github.com/Kapr534/Shopping-Cart");
    });
});