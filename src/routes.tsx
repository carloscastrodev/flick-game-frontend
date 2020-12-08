import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Game from "./pages/Game";
import WaitingRoom from "./pages/WaitingRoom";
import About from "./pages/About";
import useGameState from "./hooks/useGameState";

const Routes: React.FC = () => {
  const { playerState } = useGameState();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <WaitingRoom />
        </Route>
        <Route path="/game/{:id}" exact>
          {playerState.name ? <Game /> : <Redirect to="/" />}
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
