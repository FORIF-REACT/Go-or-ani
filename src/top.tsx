import React from "react";
import { Link } from "react-router-dom";

function Top() {
  return (
    <div>
        <nav className="flex items-center justify-between flex-wrap bg-background-black-950 p-6">
            <div className="App">
                <div className="flex items-center flex-shrink-0 text-primary-green-300 mr-6">
                    <span className="font-semibold text-xl tracking-tight">Go-or-Ani</span>
                    <Link to="/">Go-or-Ani</Link>
                </div>
            </div>
            <div className="NowBetting">
                <Link to="/betting">NowBetting</Link> @수정필요
            </div>
            <div className="BettingResult">
                <Link to="result">BettingResult</Link> @수정필요
            </div>
        </nav>
    </div>
  );
}

export default Top;