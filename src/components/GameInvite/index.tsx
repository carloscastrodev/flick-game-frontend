import React from "react";
import { createPortal } from "react-dom";
import { FaCog } from "react-icons/fa";
import { RiSwordFill } from "react-icons/ri";
import { REJECT_PLAYER_INVITE } from "../../constants";
import useGameState from "../../hooks/useGameState";
import useIOService from "../../hooks/useIOService";
import useTheme from "../../hooks/useTheme";
import IGameInvite from "../../interfaces/IGameInvite";
import "./styles.css";

interface IGameInviteProps {
  invite: IGameInvite;
}

const GameInvite = ({ invite }: IGameInviteProps) => {
  const { invitingPlayerName, invitedPlayerName } = invite;
  const { playerState } = useGameState();
  const targetDiv = document.getElementById("overlay") as HTMLElement;
  const { theme } = useTheme();
  const { IOService } = useIOService();

  const handleRejectInvite = () => {
    IOService.publish(REJECT_PLAYER_INVITE, invite, playerState.id);
  };

  const handleAcceptInvite = () => {};

  const InviteCard = () => (
    <div
      className={`game-invite ${
        theme === "dark-theme" ? "light-theme" : "dark-theme"
      }`}
    >
      <span role="img">
        <RiSwordFill size="1.5rem" />
      </span>
      <h3>{invitingPlayerName} te desafiou!</h3>
      <div>
        <button onClick={(_) => handleRejectInvite()}>Recusar</button>
        <button onClick={(_) => handleAcceptInvite()}>Aceitar</button>
      </div>
    </div>
  );

  const AwaitingInvite = () => {
    return (
      <div
        className={`game-invite ${
          theme === "dark-theme" ? "light-theme" : "dark-theme"
        }`}
      >
        <span role="img">
          <RiSwordFill size="1.5rem" />
        </span>
        <h3>Você desafiou {invitedPlayerName}!</h3>
        <p>Aguardando resposta...</p>
        <span role="img">
          <FaCog className="spinner" size="1.5rem" />
        </span>
        <button onClick={(_) => handleRejectInvite()}>Cancelar</button>
      </div>
    );
  };

  return createPortal(
    playerState.currentInvite?.invitingPlayerId !== playerState.id ? (
      <InviteCard />
    ) : (
      <AwaitingInvite />
    ),
    targetDiv
  );
};

export default GameInvite;
