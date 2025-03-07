import { Routes, Route, Link } from "react-router-dom";
import ToDoLists from "./components/ToDoLists";
import Home from "./components/Home";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `"Cairo", "Roboto", "Arial", sans-serif`,
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <nav className="bg-blue-600 p-2 text-white font-bold text-4xl">
          <ul className="flex justify-between ">
            <li className="mx-4">
              <Link to="/">ToDo</Link>
            </li>
            <li>
              <Link to="/about">opinion</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ToDoLists />} />
          <Route path="/about" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
