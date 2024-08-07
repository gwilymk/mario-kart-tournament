export interface Player {
  id: number;
  name: string;
  scores: number[];
}

export function allocateGroups(players: Player[]): Player[][] {
  if (players.length < 7) {
    throw new Error("Tournament is invalid with fewer than 7 players.");
  }

  const sortedPlayers = [...players].sort((a, b) => {
    const totalDifference = totalScore(b) - totalScore(a);

    if (totalDifference !== 0) {
      return totalDifference;
    }

    return scoreTieBreaker(b) - scoreTieBreaker(a);
  });
  const groups: Player[][] = [];

  // Top group with 4 players
  groups.push(sortedPlayers.slice(0, 4));

  const remainingPlayers = sortedPlayers.slice(4);

  while (remainingPlayers.length > 0) {
    if (remainingPlayers.length >= 4) {
      groups.push(remainingPlayers.splice(0, 4));
    } else {
      groups.push(remainingPlayers.splice(0, remainingPlayers.length));
    }
  }

  if (groups[groups.length - 1].length < 3) {
    groups[groups.length - 2] = groups[groups.length - 2].concat(
      groups[groups.length - 1]
    );
    groups.length -= 1;
  }

  return groups;
}

export function totalScore(player: Player) {
  return player.scores.reduce((prev, curr) => prev + curr, 0);
}

function scoreTieBreaker(player: Player) {
  return player.scores.reduce((prev, curr) => prev + curr * curr, 0);
}
