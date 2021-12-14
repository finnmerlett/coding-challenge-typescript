type Team = {
  name: string;
  points: number;
};

export const getResults = (division: Team[], n: number) => {
  if (!Number.isInteger(n)) throw new Error("n must be an integer");
  if (n <= 0) throw new Error("n must be greater than 0");

  // sort in descending points order (largest first)
  division.sort((teamA, teamB) => teamB.points - teamA.points);
  const toPromote = division.slice(0, n); // get top n teams
  const toRelegate = division.slice(-n); // get bottom n teams

  // check like this rather than using a calculation based on n, in
  // order to make test more generic and adaptable for future scope.
  if (toPromote.some((teamToPromote) => toRelegate.includes(teamToPromote))) {
    throw new Error("n is too large for the given division");
  }

  return `Promote:
${toPromote.map((t) => t.name).join("\n")}

Relegate:
${toRelegate.map((t) => t.name).join("\n")}`;
};
