"use client";

import React, { useState } from "react";
import PlayerSetup from "./PlayerSetup";
import GroupList from "./GroupList";
import { allocateGroups, Player } from "../lib/player";

import css from "./App.module.css";

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isTournamentStarted, setIsTournamentStarted] =
    useState<boolean>(false);
  const [round, setRound] = useState<number>(1);
  const [pendingScores, setPendingScores] = useState<{
    [key: number]: number | null;
  }>({});

  const handlePlayersSet = (players: Player[]) => {
    setPlayers(players);
    setIsTournamentStarted(true);
  };

  const updatePendingScore = (id: number, score: number | null) => {
    setPendingScores((prevScores) => ({
      ...prevScores,
      [id]: score,
    }));
  };

  const handleNextRound = () => {
    const updatedPlayers = players.map((player) => ({
      ...player,
      scores: player.scores.concat(pendingScores[player.id] || 0),
    }));
    setPlayers(updatedPlayers);
    setPendingScores({});
    setRound(round + 1);
  };

  const groups = isTournamentStarted ? allocateGroups(players) : [];

  return (
    <div className="App">
      {!isTournamentStarted ? (
        <PlayerSetup onPlayersSet={handlePlayersSet} />
      ) : (
        <>
          <h2 className={css.roundCounter}>
            {round == 9 ? "Final results" : `Round ${round}`}
          </h2>
          <GroupList
            groups={groups}
            pendingScores={pendingScores}
            updateScore={updatePendingScore}
          />
          {round < 9 && (
            <button className={css.nextRoundButton} onClick={handleNextRound}>
              Next Round
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;
