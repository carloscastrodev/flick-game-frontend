import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaGamepad, FaInfoCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PlayerCard from "../../components/PlayerCard";
import ToggleThemeButton from "../../components/ToggleThemeButton";
import useGameState from "../../hooks/useGameState";
import useTheme from "../../hooks/useTheme";
import IPlayer from "../../interfaces/IPlayer";
import "./styles.css";
import useIOService from "../../hooks/useIOService";
import {
  DISCONNECTED_PLAYER,
  REJECT_PLAYER_INVITE,
  UPDATE_PLAYER,
  UPDATE_PLAYERS,
} from "../../constants";
import GameInvite from "../../components/GameInvite";
import { toast } from "react-toastify";

const WaitingRoom: React.FC = () => {
  const {
    playerState,
    updatePlayerState,
    updateWaitingRoom,
    waitingRoom,
  } = useGameState();
  const { IOService } = useIOService();
  const { theme } = useTheme();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [localName, setLocalName] = useState<string>(
    playerState.name as string
  );
  const subscriptions: Function[] = [];

  useEffect(() => {
    setLocalName(playerState.name as string);
  }, [playerState.name]);

  useEffect(() => {
    subscriptions.push(
      IOService.subscribe(UPDATE_PLAYER, (player: IPlayer) =>
        updatePlayerState(player)
      )
    );

    subscriptions.push(
      IOService.subscribe(UPDATE_PLAYERS, (players: IPlayer[]) => {
        updateWaitingRoom({ players });
      })
    );

    subscriptions.push(
      IOService.subscribe(REJECT_PLAYER_INVITE, (playerName: string) => {
        console.log(playerName);
        toast.error(`${playerName} recusou seu desafio.`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
    );

    subscriptions.push(
      IOService.subscribe(DISCONNECTED_PLAYER, (playerName: string) => {
        toast.error(`${playerName} desconectou.`, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
    );
    return function cleanup() {
      subscriptions.forEach((unsub) => unsub());
    };
  }, []);

  const toggleEditMode = (e: React.MouseEvent) => {
    setEditMode(!editMode);
    if (localName !== playerState.name) {
      updatePlayerState(Object.assign({}, playerState, { name: localName }));
    }
  };

  return (
    <section className={`container waiting-room ${theme}`}>
      <ToggleThemeButton />
      {playerState.currentInvite && (
        <GameInvite invite={playerState.currentInvite} />
      )}
      <header>
        <h2>Lobby</h2>
        <div>
          {editMode ? (
            <input
              onChange={(e) => setLocalName(e.target.value)}
              value={localName || ""}
            />
          ) : (
            <h3>Seu nick: {playerState.name}</h3>
          )}
          <button onClick={toggleEditMode}>
            {editMode ? <FaCheckCircle /> : <MdEdit />}
          </button>
        </div>
        <h4>
          {" "}
          Jogadores online: {Math.max(waitingRoom.players.length - 1, 0)}
        </h4>
      </header>
      <div>
        <ul>
          {waitingRoom.players.map((player: IPlayer) => (
            <React.Fragment key={player.id as string}>
              {player.id !== playerState.id ? (
                <li>
                  <PlayerCard player={player} />
                </li>
              ) : null}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <footer>
        <nav>
          <ul>
            <li>
              <Link to="/">
                Jogar <FaGamepad size="1rem" />
              </Link>
            </li>
            <li>
              <Link to="/about">
                Sobre <FaInfoCircle />
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </section>
  );
};

export default WaitingRoom;
