import React from "react";
import useGameState from "../../hooks/useGameState";

const Game: React.FC = () => {
  const { playerState } = useGameState();
  return <div>Game Room Player: {JSON.stringify(playerState)}</div>;
};

export default Game;
