import IPlayer from "./IPlayer";
import ITarget from "./ITarget";

export interface IGameState {
  maxPlayers: Number;
  players: IPlayer[];
  target: ITarget;
  maxScore: Number;
}

export interface IUpdateState {
  (currentState: IGameState, nextState: IGameState): IGameState;
}

export interface ICanvas {
  width: Number;
  height: Number;
}

export default interface IGame extends IGameState {
  id: String;
  canvas: ICanvas;
  updateState: IUpdateState;
}
