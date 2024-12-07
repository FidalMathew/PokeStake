// import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import GameId from "./GameId";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game/:gameId" element={<GameId />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
