import { randomInt } from './levels.js';

export const generateBoard = (rows, cols, types) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      randomInt(types)
    )
  );