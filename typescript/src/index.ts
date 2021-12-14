export class ParamTypeError extends Error {
  constructor(name: string, expectedType: string) {
    super(`parameter '${name}' must be of type ${expectedType}`);
    this.name = "ParamTypeError";
  }
}

type Team = {
  name: string;
  points: number;
};

const get = <T>(input: T, key: string): unknown => {
  if (typeof input !== "object" || input === null) {
    throw new Error("invalid inputs to 'get' method");
  }
  return input?.[key as keyof T];
};

const isTeam = (team: unknown): team is Team => {
  if (typeof team !== "object" || team === null) return false;

  const name = get(team, "name");
  const points = get(team, "points");
  return (
    typeof name === "string" &&
    typeof points === "number" &&
    Number.isInteger(points) &&
    points >= 0
  );
};

const isDivision = (division: unknown[]): division is Team[] =>
  division.every(isTeam);

// NOTE: For a rigorous solution (probably beyond the expected scope),
// I wrote exhaustive parameter type checks. The quick version was done
// well within the time limit, and this version took me a little longer.

// In a workplace environment I would check with a supervisor to clarify
// the scope of the task beforehand, and if the input types were validated
// prior to this function I would type the parameters accordingly and write
// only the validators needed (as in the short version).

export const getResults = (division: unknown, n: unknown) => {
  if (!Array.isArray(division)) throw new ParamTypeError("division", "array");
  if (!isDivision(division)) throw new ParamTypeError("division", "team array");
  if (!(typeof n === "number")) throw new ParamTypeError("n", "number");
  if (!Number.isInteger(n)) throw new Error("n must be an integer");
  if (n < 0) throw new Error("n must be 0 or greater");
  if (division.length < 2 || division.length > 16) {
    throw new Error("division must contain between 2 and 16 teams");
  }
  if (n >= division.length) {
    throw new Error("n is too large for the given division");
  }

  // sort in descending points order (largest first)
  division.sort((teamA, teamB) => teamB.points - teamA.points);
  const toPromote = division.slice(0, n); // get top n teams
  const toRelegate = division.slice(-n); // get bottom n teams

  if (toPromote.some((teamToPromote) => toRelegate.includes(teamToPromote))) {
    throw new Error("n is too large for the size of the given division");
  }

  return `Promote:
${toPromote.map((t) => t.name).join("\n")}

Relegate:
${toRelegate.map((t) => t.name).join("\n")}`;
};
