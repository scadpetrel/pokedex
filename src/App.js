import NewPullPoke from "./Pokedex";
import "./scss/App.scss";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Pokedex</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Pokedex />} />
          <Route path='/:pokemonId' element={<Pokemon />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
