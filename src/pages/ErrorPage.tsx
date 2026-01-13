import Header from "../components/Header.tsx";
import {Link} from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="grid grid-rows-3 grid-cols-1">
            <Header />
            <main>Oops, this link doesn't exist</main>
            <Link to="/">Go home</Link>
        </div>
    )
}