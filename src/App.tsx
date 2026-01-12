import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";

export default function App() {


  return (
    <div className="grid grid-rows-3 grid-cols-1">
      <Header />
        <p>fasfsfgsg</p>
      <Outlet />
    </div>
  )
}

