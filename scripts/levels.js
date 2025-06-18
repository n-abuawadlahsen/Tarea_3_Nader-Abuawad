
export const LEVELS = [
 
  { name:  1, rows: 10, cols: 12, types: 3, moves: 40, objectiveType: 'points', targetPoints: 100 },
  { name:  2, rows: 10, cols: 12, types: 3, moves: 38, objectiveType: 'points', targetPoints: 120 },
  { name:  3, rows: 10, cols: 12, types: 4, moves: 36, objectiveType: 'points', targetPoints: 140 },
  { name:  4, rows: 10, cols: 12, types: 4, moves: 34, objectiveType: 'points', targetPoints: 160 },

  
  { name:  5, rows:  8, cols: 10, types: 3, moves: 32, objectiveType: 'pieces', targetPieces: [ {typeIndex:0, count:10}, {typeIndex:1, count:10} ] },
  { name:  6, rows:  8, cols: 10, types: 3, moves: 30, objectiveType: 'pieces', targetPieces: [ {typeIndex:0, count:12}, {typeIndex:2, count:8} ] },
  { name:  7, rows:  8, cols: 10, types: 4, moves: 28, objectiveType: 'pieces', targetPieces: [ {typeIndex:1, count:12}, {typeIndex:2, count:10} ] },
  { name:  8, rows:  8, cols: 10, types: 5, moves: 26, objectiveType: 'pieces', targetPieces: [ {typeIndex:3, count:10}, {typeIndex:4, count:10} ] },

  
  { name:  9, rows:  6, cols:  6, types: 4, moves: 24, objectiveType: 'points', targetPoints: 180 },
  { name: 10, rows:  6, cols:  6, types: 4, moves: 22, objectiveType: 'points', targetPoints: 200 },
  { name: 11, rows:  6, cols:  6, types: 5, moves: 20, objectiveType: 'points', targetPoints: 220 },
  { name: 12, rows:  6, cols:  6, types: 6, moves: 18, objectiveType: 'points', targetPoints: 240 },

  
  { name: 13, rows: 10, cols: 12, types: 5, moves: 20, objectiveType: 'pieces', targetPieces: [ {typeIndex:0, count:15}, {typeIndex:4, count:10} ] },
  { name: 14, rows:  8, cols: 10, types: 6, moves: 18, objectiveType: 'points',  targetPoints: 260 },
  { name: 15, rows:  6, cols:  6, types: 3, moves: 16, objectiveType: 'pieces', targetPieces: [ {typeIndex:1, count:12}, {typeIndex:2, count:12} ] },
  { name: 16, rows: 10, cols: 12, types: 6, moves: 14, objectiveType: 'points',  targetPoints: 300 },
];

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getLevelConfig(name) {
  return LEVELS.find(l => l.name === name);
}

export function isPointsObjective(level) {
  return level.objectiveType === 'points';
}

export function isPiecesObjective(level) {
  return level.objectiveType === 'pieces';
}