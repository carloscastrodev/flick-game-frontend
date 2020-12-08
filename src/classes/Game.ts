import { ICanvas, IGameState, IUpdateState } from "./../interfaces/IGame";
import IGame from "../interfaces/IGame";
import IPlayer from "../interfaces/IPlayer";
import ITarget from "../interfaces/ITarget";

class Game implements IGame {
  id: String;
  canvas: ICanvas;
  players: IPlayer[];
  target: ITarget;
  maxScore: Number;
  maxPlayers: Number = 2;

  constructor(
    id: String,
    canvas: ICanvas,
    players: IPlayer[],
    target: ITarget,
    maxScore: Number
  ) {
    this.id = id;
    this.canvas = canvas;
    this.players = players;
    this.target = target;
    this.maxScore = maxScore;
  }

  updateState: IUpdateState = (
    currentState: IGameState,
    nextState: IGameState
  ) => {
    return nextState;
  };
}

export default Game;
