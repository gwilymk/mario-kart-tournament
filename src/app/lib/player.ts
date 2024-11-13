export interface Player {
  id: number;
  name: string;
  scores: number[];
}

const GROUP_SIZES: { [key: number]: number[] | undefined } = {
  7: [7],
  8: [8],
  9: [5, 4],
  10: [5, 5],
  11: [6, 5],
  12: [4, 4, 4],
  13: [5, 4, 4],
  14: [6, 4, 4],
  15: [6, 5, 4],
  16: [6, 6, 4],
  17: [6, 6, 5],
  18: [6, 6, 6],
};

for (const [size, split] of Object.entries(GROUP_SIZES)) {
  if (split == null || split.reduce((x, a) => x + a, 0) != +size) {
    throw new Error("Invalid group size " + size);
  }
}

export function allocateGroups(players: Player[]): Player[][] {
  if (players.length < 7) {
    throw new Error("Tournament is invalid with fewer than 7 players.");
  }

  const sortedPlayers = players.toSorted((a, b) => {
    const totalDifference = totalScore(b) - totalScore(a);

    if (totalDifference !== 0) {
      return totalDifference;
    }

    return scoreTieBreaker(b) - scoreTieBreaker(a);
  });
  const groups: Player[][] = [];

  const groupSizes = GROUP_SIZES[players.length];
  if (groupSizes == null) {
    throw new Error("Unsupported group size " + players.length);
  }

  for (const groupSize of groupSizes) {
    groups.push(sortedPlayers.splice(0, groupSize));
  }

  if (sortedPlayers.length > 0) {
    throw new Error(
      "logic error, should not have any players left after assigning groups"
    );
  }

  return groups;
}

export function totalScore(player: Player) {
  return player.scores.reduce((prev, curr) => prev + curr, 0);
}

function scoreTieBreaker(player: Player) {
  return player.scores.reduce((prev, curr) => prev + curr * curr, 0);
}
