import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header totalInCart={0}/>

            <main>
                <h2>Oops, this link doesn't exist</h2>
                <Link to="/" className="text-sky-600 underline underline-offset-4 hover:text-sky-500 transition-colors">
                    Go home
                </Link>
            </main>

            <Footer />
        </div>
    )
}