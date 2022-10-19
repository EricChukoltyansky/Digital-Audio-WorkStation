const steps = 16;
const initialCellState = { triggered: false, activated: false };
const lineMap = [
  "CATHFS",
  "CATEF",
  "CATCS",
  "CATAF",
  "CATFS",
  "FS",
  "EF",
  "CS",
  "BF",
  "OH",
  "CH",
  "CP",
  "BD",
];

const initialState = lineMap.map(() => {
  return new Array(steps).fill(initialCellState);
});

export { steps, lineMap, initialState };