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
const initialState = [
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
];

export { steps, lineMap, initialState };
