import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import MarketplacePage from "./pages/MarketplacePage.tsx";
import CartPage from "./pages/CartPage.tsx";




const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/marketplace", element: <MarketplacePage /> },
            { path: "/cart", element: <CartPage /> },
        ],
    },
    ]
)

export default router;