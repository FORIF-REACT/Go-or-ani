import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

function App() {
  return (
    <div className="w-full gap-4">
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className="w-full flex flex-col items-center pt-20">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
