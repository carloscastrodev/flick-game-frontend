import IGameInvite from "./IGameInvite";

export default interface IPlayer {
  id: string | null;
  name: string | null;
  currentGame: Number | null;
  currentScore: Number | null;
  currentMouseX: Number | null;
  currentMouseY: Number | null;
  currentInvite: IGameInvite | null;
}
