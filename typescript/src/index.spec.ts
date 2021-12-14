import { getResults, ParamTypeError } from ".";

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

const badDivision1 = [
  {
    name: "Rockets",
    points: -1,
  },
];

const badDivision2 = [
  {
    name: 4,
    points: 7,
  },
];

const badDivision3 = [
  {
    name: "Muskets",
    points: null,
  },
];

const mixedBadDivision = givenDivision.concat(badDivision1);

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

test("catches incorrect 'division' or 'n' parameters", () => {
  expect(() => getResults(badDivision1, 1)).toThrow(/parameter 'division'/);
  expect(() => getResults(badDivision2, 1)).toThrow(/parameter 'division'/);
  expect(() => getResults(badDivision3, 1)).toThrow(/parameter 'division'/);
  expect(() => getResults(mixedBadDivision, 3)).toThrow(/parameter 'division'/);
  expect(() => getResults(givenDivision, -2)).toThrow(/n must be 0 or greater/);
  expect(() => getResults(givenDivision, "oops")).toThrow(/parameter 'n'/);
  expect(() => getResults(givenDivision, 10)).toThrow(/n is too large/);
  expect(() =>
    getResults(Array(4).fill(givenDivision).flat(), 3)
  ).toThrow(/must contain between 2 and 16/);
  expect(() => getResults(givenDivision.slice(0, 1), 3)).toThrow(
    /must contain between 2 and 16/
  );
});
