import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import { useState, useEffect } from "react";
import type {Product} from "./types.ts";
import { API_URL } from "./constants.ts";



export default function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    setError("Failed downloading data");
                    return;
                }

                const data = await response.json();

                const productsWithQuantity = data.map((product: Product) => ({
                    ...product,
                    quantity: 0
                }));

                setProducts(productsWithQuantity);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
            finally {
                setLoading(false);
            }

        }
        void fetchProducts();
    }, []);

    if (error) return <p>Error: {error}</p>;

    const handleQuantityChange = (operation: string, id: number) => {
        const newProducts = products.map((product: Product) => {
            if (product.id === id) {
                return {...product, quantity: operation === "+"
                        ? product.quantity + 1
                        : operation === "-"
                        ? product.quantity - 1
                        : 0
                }
            }
            return product;
        });
        setProducts(newProducts);
    }

    const totalInCart = products.reduce((total, product) => total + product.quantity, 0);

  return (
      <div className="flex flex-col min-h-screen">
          <Header totalInCart={totalInCart}/>

          <main className="flex-grow min-h-[70vh]">
              {loading ? (
                  <p className="text-center mt-10">Načítám produkty...</p>
              ) : (
                  <Outlet context={{ products, handleQuantityChange }} />
              )}
          </main>

          <Footer />
      </div>
  )
}

