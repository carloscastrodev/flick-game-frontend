import { GameStateContext } from "./../providers/GameStateProvider";
import { useContext } from "react";

const useGameState = () => {
  const {
    playerState,
    updatePlayerState,
    updateWaitingRoom,
    waitingRoom,
  } = useContext(GameStateContext);

  return { playerState, updatePlayerState, updateWaitingRoom, waitingRoom };
};

export default useGameState;
