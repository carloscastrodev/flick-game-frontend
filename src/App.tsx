import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GameStateProvider } from "./providers/GameStateProvider";
import { IOProvider } from "./providers/IOProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import Routes from "./routes";

const App: React.FC = () => {
  return (
    <IOProvider>
      <GameStateProvider>
        <ThemeProvider>
          <Routes />
          <ToastContainer />
        </ThemeProvider>
      </GameStateProvider>
    </IOProvider>
  );
};

export default App;
