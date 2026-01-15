import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {


  return (
      <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">
              <Outlet />
          </main>

          <Footer />
      </div>
  )
}

