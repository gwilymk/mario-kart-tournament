"use client";

import React, { useState } from "react";
import { Player } from "../lib/player";

interface PlayerSetupProps {
  onPlayersSet: (players: Player[]) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onPlayersSet }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [isTournamentStarted, setIsTournamentStarted] =
    useState<boolean>(false);

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== "") {
      const newPlayer: Player = {
        id: players.length + 1,
        name: newPlayerName.trim(),
        scores: [],
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddPlayer();
    }
  };

  const handleNameChange = (id: number, name: string) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, name: name.trim() } : player
    );
    setPlayers(updatedPlayers);
  };

  const handleStartTournament = () => {
    if (players.length >= 7) {
      setIsTournamentStarted(true);
      onPlayersSet(players);
    } else {
      alert("You need at least 7 players to start the tournament.");
    }
  };

  return (
    <div>
      <h2>Player Setup</h2>
      {!isTournamentStarted && (
        <>
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleAddPlayer}>Add Player</button>
        </>
      )}
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {isTournamentStarted ? (
              player.name
            ) : (
              <input
                type="text"
                value={player.name}
                onChange={(e) => handleNameChange(player.id, e.target.value)}
              />
            )}
          </li>
        ))}
      </ul>
      {!isTournamentStarted && players.length >= 7 && (
        <button onClick={handleStartTournament}>Start Tournament</button>
      )}
    </div>
  );
};

export default PlayerSetup;
