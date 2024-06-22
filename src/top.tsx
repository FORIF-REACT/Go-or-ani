import { Link } from "react-router-dom";

function Top() {

  const userId = '123'; //임시부여한 아이디

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-background-black-950 p-6">
        <div className="App">
          <div className="flex items-center flex-shrink-0 text-primary-green-300 mr-6">
            <span className="font-semibold text-xl tracking-tight">
              Go-or-Ani
            </span>
            <Link to="/">Go-or-Ani</Link>
          </div>
        </div>
        <div className="NowBetting">
          <Link to="/betting">NowBetting</Link> @수정필요
        </div>
        <div className="BettingResult">
          <Link to="result">BettingResult</Link> @수정필요
        </div>
        <div className="ProfileLink">
          <Link to={`/profile/${userId}`} className="text-primary-green-300 hover:text-green-500">
            Profile
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Top;
