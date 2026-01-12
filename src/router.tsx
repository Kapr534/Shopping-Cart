import { createBrowserRouter } from "react-router";
import App from "./App.tsx";




const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            // errorElement: <ErrorPage />,
        },
    ]
)

export default router;