import { getResults } from ".";

const givenDivision = [
  {
    name: "Rockets",
    points: 64,
  },
  {
    name: "Cardinals",
    points: 77,
  },
  {
    name: "Bruisers",
    points: 51,
  },
  {
    name: "Renegades",
    points: 37,
  },
  {
    name: "Porpoises",
    points: 52,
  },
];

test("returns one team to promote and one team to relegate", () => {
  const resultString = `Promote:
Cardinals

Relegate:
Renegades`;

  expect(getResults(givenDivision, 1)).toBe(resultString);
});

test("returns two teams to promote and two teams to relegate", () => {
  const resultString = `Promote:
Cardinals
Rockets

Relegate:
Bruisers
Renegades`;

  expect(getResults(givenDivision, 2)).toBe(resultString);
});

test("catches an 'n' value too large for the given division", () => {
  expect(() => getResults(givenDivision, 4)).toThrow(/n is too large/);
});

test("catches an 'n' value too small or non integer", () => {
  expect(() => getResults(givenDivision, 0)).toThrow(/n must be greater than 0/);
  expect(() => getResults(givenDivision, -5)).toThrow(/n must be greater than 0/);
  expect(() => getResults(givenDivision, 4.3)).toThrow(/n must be an integer/);
});
