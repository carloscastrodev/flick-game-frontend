import React, { useEffect, useState } from "react";
import { UPDATE_PLAYER } from "../constants";
import useIOService from "../hooks/useIOService";
import IPlayer from "../interfaces/IPlayer";
import IWaitingRoom from "../interfaces/IWaitingRoom";

const initialPlayerState: IPlayer = {
  id: null,
  name: null,
  currentMouseX: null,
  currentMouseY: null,
  currentGame: null,
  currentScore: null,
  currentInvite: null,
};

interface IGameStateContext {
  playerState: IPlayer;
  waitingRoom: IWaitingRoom;
  updatePlayerState: (nextState: IPlayer) => void;
  updateWaitingRoom: (nextState: IWaitingRoom) => void;
}

export const GameStateContext: React.Context<IGameStateContext> = React.createContext<IGameStateContext>(
  {
    playerState: initialPlayerState,
    waitingRoom: { players: [] },
    updatePlayerState: () => {},
    updateWaitingRoom: () => {},
  }
);

const { Provider } = GameStateContext;

export const GameStateProvider: React.FC = ({ children }) => {
  const [playerState, setPlayerState] = useState<IPlayer>(initialPlayerState);
  const [waitingRoom, setWaitingRoom] = useState<IWaitingRoom>({ players: [] });
  const { IOService } = useIOService();

  useEffect(() => {
    if (playerState.name && playerState.id) {
      IOService.publish(UPDATE_PLAYER, playerState);
    }
  }, [playerState]);

  const updatePlayerState = (nextState: IPlayer) => {
    console.log(nextState);
    console.log(playerState);
    if (JSON.stringify(nextState) !== JSON.stringify(playerState)) {
      setPlayerState(nextState);
    }
  };

  const updateWaitingRoom = (nextState: IWaitingRoom) => {
    if (JSON.stringify(nextState) !== JSON.stringify(waitingRoom)) {
      setWaitingRoom(nextState);
    }
  };

  return (
    <Provider
      value={{ playerState, updatePlayerState, waitingRoom, updateWaitingRoom }}
    >
      {children}
    </Provider>
  );
};
