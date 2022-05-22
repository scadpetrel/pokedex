import NewPullPoke from "./Pokedex";
import "./scss/App.scss";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
     <Container>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Pokedex />} />
          <Route path='/:pokemonId' element={<Pokemon />} />
          
        </Routes>
      </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
