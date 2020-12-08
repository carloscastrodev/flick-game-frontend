import React from "react";
import { RiSwordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { INVITE_PLAYER } from "../../constants";
import useGameState from "../../hooks/useGameState";
import useIOService from "../../hooks/useIOService";
import IPlayer from "../../interfaces/IPlayer";
import "./styles.css";

interface IPlayerCard {
  player: IPlayer;
}

const PlayerCard = ({ player }: IPlayerCard) => {
  const { playerState } = useGameState();
  const { IOService } = useIOService();

  const handleChallengePlayer = () => {
    if (player.currentInvite) {
      toast.error("Jogador já está avaliando um convite.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      IOService.publish(INVITE_PLAYER, playerState, player);
    }
  };

  return (
    <div className="player-card">
      <h2>Jogar Contra</h2>
      <h3>NOME: {player.name}</h3>
      <button onClick={(_) => handleChallengePlayer()}>
        Desafiar <RiSwordFill />
      </button>
    </div>
  );
};

export default PlayerCard;
