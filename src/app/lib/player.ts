export interface Player {
  id: number;
  name: string;
  scores: number[];
}

export function allocateGroups(players: Player[]): Player[][] {
  if (players.length < 7) {
    throw new Error("Tournament is invalid with fewer than 7 players.");
  }

  const sortedPlayers = [...players].sort(
    (a, b) => totalScore(b) - totalScore(a)
  );
  const groups: Player[][] = [];

  // Top group with 5 players
  groups.push(sortedPlayers.slice(0, 5));

  const remainingPlayers = sortedPlayers.slice(5);

  while (remainingPlayers.length > 0) {
    if (remainingPlayers.length >= 5) {
      groups.push(remainingPlayers.splice(0, 5));
    } else {
      groups.push(remainingPlayers.splice(0, remainingPlayers.length));
    }
  }

  return groups;
}

export function totalScore(player: Player) {
  return player.scores.reduce((prev, curr) => prev + curr, 0);
}
