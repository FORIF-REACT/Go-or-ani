import "./App.css";
import { Outlet } from "react-router-dom";
import Top from "./top";

function App() {
  return (
    <div className="w-screen gap-4">
      <div className="fixed top-0 w-full">
        <Top />
      </div>

      <div className="w-full flex flex-col items-center mt-20">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
