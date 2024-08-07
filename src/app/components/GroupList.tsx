"use client";

import React from "react";
import { Player, totalScore } from "../lib/player";

import css from "./GroupList.module.css";

import classNames from "classnames";

interface CupImageProps {
  cupIndex: number;
}

const CUPS = [
  "shell",
  "banana",
  "leaf",
  "lightning",
  "mushroom",
  "flower",
  "star",
  "special",
];

const CupImage: React.FC<CupImageProps> = ({ cupIndex }) => {
  return (
    <img
      src={`cups/${CUPS[cupIndex]}.webp`}
      alt={`${CUPS[cupIndex]} cup`}
      className={css.cupIcon}
    />
  );
};

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
    <div className={css.groups}>
      {groups.map((group, index) => (
        <div
          key={index}
          className={classNames(css[`bg-group-${index + 1}`], css.group)}
        >
          <table className={css.table}>
            <thead>
              <tr>
                <th>Group {index + 1}</th>
                {Array.from(Array(8)).map((_, index) => (
                  <th key={index}>
                    <CupImage cupIndex={index} />
                  </th>
                ))}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {group.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  {player.scores.map((score, i) => (
                    <td key={i}>
                      <span
                        className={classNames(
                          css.scoreNumber,
                          i === player.scores.length - 1 && css.newScore
                        )}
                      >
                        {score}
                      </span>
                    </td>
                  ))}

                  {player.scores.length < 8 && (
                    <td>
                      <input
                        type="number"
                        placeholder="Score"
                        className={css.addScoreInput}
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
