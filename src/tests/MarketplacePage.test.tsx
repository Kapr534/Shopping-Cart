import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MarketplacePage from "../pages/MarketplacePage.tsx";

const mockProducts = [
    { id: 1, title: 'iPhone', price: 1000, category: 'electronics', image: '', quantity: 0, description: '', rating: { rate: 4.5, count: 10 } },
    { id: 2, title: 'Backpack', price: 50, category: 'clothing', image: '', quantity: 0, description: '', rating: { rate: 4.0, count: 5 } }
];

const mockHandleQuantityChange = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useOutletContext: () => ({
            products: mockProducts,
            handleQuantityChange: mockHandleQuantityChange,
        }),
    };
});

describe("tests MarketplacePage component rendering", () => {
    it("should show all the products", () => {
        render(<MarketplacePage />);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent('2');
    });

    it("should filter products when a category button is clicked and unfilter when all is clicked", () => {
        render(<MarketplacePage />);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();

        const electronicsButton = screen.getByRole('button', { name: /electronics/i });
        fireEvent.click(electronicsButton);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent('1');

        const allButton = screen.getByRole('button', { name: /all/i });
        fireEvent.click(allButton);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();
    });

    it("should filter products using search bar", () => {
        render(<MarketplacePage />);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();

        const searchBar = screen.getByRole('textbox');
        fireEvent.change(searchBar, { target: { value: 'iPhone' } });

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent('1');
    });

    it("should find products regardless of case sensitivity (uppercase/lowercase)", () => {
        render(<MarketplacePage />);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();

        const searchBar = screen.getByRole('textbox');
        fireEvent.change(searchBar, { target: { value: 'IPhoNe' } });

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const counter = screen.getByText(/showing/i);
        expect(counter).toHaveTextContent('1');
    });

    it("should combine category and search filtering", () => {
        render(<MarketplacePage />);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Backpack")).toBeInTheDocument();

        const electronicsButton = screen.getByRole('button', { name: /electronics/i });
        fireEvent.click(electronicsButton);
        const searchBar = screen.getByRole('textbox');
        fireEvent.change(searchBar, { target: { value: 'IPhoNe' } });

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();

        const allButton = screen.getByRole('button', { name: /all/i });
        fireEvent.click(allButton);

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.queryByText("Backpack")).not.toBeInTheDocument();
    });


});





// 2. Stav „Nebylo nic nalezeno“ (Empty State)
// Zobrazení zprávy: Pokud hledání neodpovídá žádnému produktu, musí zmizet grid a objevit se tvoje „Nothing Found“ sekce.
//
//     Funkčnost resetu v empty statu: Tlačítko uvnitř této sekce musí správně vymazat search bar i aktivní kategorii.
//
// 3. Dynamické prvky (UI Logic)
// Počítadlo produktů: Text „Showing X Products“ se musí měnit podle toho, kolik karet je zrovna vidět.
//
//     Aktivní třídy (Active Classes): Test, zda má právě vybrané tlačítko kategorie specifickou CSS třídu (např. bg-sky-600), zatímco ostatní ne.
//
//     Tlačítko pro smazání vyhledávání (X): Ikona „X“ se v inputu nesmí objevit, pokud je prázdný, a musí fungovat na kliknutí.
//
// 4. Interakce s produktem (Mockování funkcí)
// Volání handleQuantityChange: Protože tuto funkci dostáváš přes Context, musíš otestovat, zda se při kliknutí na „Add“ nebo „+“ v ProductCard tato funkce skutečně zavolá se správným ID produktu a správnou operací.
//
// 5. Generování kategorií (useMemo logika)
// Unikátnost: Pokud máš v datech 5 produktů „Electronics“, v seznamu tlačítek se kategorie „Electronics“ smí objevit jen jednou.
//
//     Vždy přítomné „All“: I když nepřijdou žádná data, kategorie „All“ by měla být vidět.