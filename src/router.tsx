import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";




const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/marketplace",
        element: <App />,
    },
    {
        path: "/cart",
        element: <App />,
    },
    ]
)

export default router;