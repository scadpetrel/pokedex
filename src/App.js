// import NewPullPoke from "./Pokedex";
import "./scss/App.scss";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Raleway from './fonts/Raleway-VariableFont_wght.ttf'


const theme = createTheme({
  typography: {
    fontFamily: 'Raleway, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), url(${Raleway}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
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
    pokered: {
      main: "#ac0031",
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
