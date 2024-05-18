import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl">React-TailwindCSS-Typescript-Vite-shadcn/ui</h1>
      <h1 className="text-2xl">Repo for Go-or-Ani Project</h1>
      <h1 className="text-5xl font-bold">{count}</h1>
      <div className="flex flex-row gap-5">
        <Button size={"icon"} onClick={() => setCount((count) => count + 1)}>
          +
        </Button>
        <Button size={"icon"} onClick={() => setCount((count) => count - 1)}>
          -
        </Button>
      </div>
      <Outlet/>
    </div>
  );
}


export default App;