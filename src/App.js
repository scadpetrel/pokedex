// import NewPullPoke from "./Pokedex";
import "./scss/App.scss";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#e5ff9d",
      main: "#c8ffa1",
      dark: "#7ebc3b",
    },
    secondary: {
      light: "#b6fff7",
      main: "#82edc4",
      dark: "#4eba94",
    },
    poke: {
      main: "#82edc4",
    }
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container>
          <BrowserRouter forceRefresh >
            <Routes>
              <Route exact path="/" element={<Pokedex />} />
              <Route path="/:pokemonId" element={<Pokemon />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
