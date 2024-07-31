"use client";

import React from "react";
import { Player, totalScore } from "../lib/player";

import css from "./GroupList.module.css";

interface GroupListProps {
  groups: Player[][];
  pendingScores: { [key: number]: number | null };
  updateScore: (id: number, score: number | null) => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  pendingScores,
  updateScore,
}) => {
  const handleScoreChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const score = value === "" ? null : parseInt(value);
    if (score === null || !isNaN(score)) {
      updateScore(id, score);
    }
  };

  const handleKeyPress = (
    id: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;
      const score = value === "" ? null : parseInt(value);
      if (score === null || !isNaN(score)) {
        updateScore(id, score);
      }
    }
  };

  return (
    <div>
      <h2>Groups</h2>
      {groups.map((group, index) => (
        <div key={index}>
          <h3>Group {index + 1}</h3>
          <table className={css.table}>
            <thead>
              <th>Player</th>
              <th>Shell Cup</th>
              <th>Banana Cup</th>
              <th>Leaf Cup</th>
              <th>Lightning Cup</th>
              <th>Mushroom Cup</th>
              <th>Flower Cup</th>
              <th>Star Cup</th>
              <th>Special Cup</th>
              <th>Total</th>
            </thead>
            <tbody>
              {group.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  {player.scores.map((score, i) => (
                    <td key={i}>{score}</td>
                  ))}

                  {player.scores.length < 8 && (
                    <td>
                      <input
                        type="number"
                        placeholder="Add Score"
                        value={pendingScores[player.id] ?? ""}
                        onChange={(e) => handleScoreChange(player.id, e)}
                        onKeyPress={(e) => handleKeyPress(player.id, e)}
                      />
                    </td>
                  )}

                  {player.scores.length < 8 &&
                    Array.from(Array(8 - player.scores.length - 1)).map(
                      (_, i) => <td key={i} />
                    )}

                  <td>{totalScore(player)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
