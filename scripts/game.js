import { randomInt } from './levels.js';

export function findGroup(board, startRow, startCol) {
  const rows = board.length;
  const cols = board[0]?.length || 0;
  const target = board[startRow]?.[startCol];
  if (target == null) return [];

  const visited = new Set();
  const queue = [{ r: startRow, c: startCol }];
  visited.add(`${startRow},${startCol}`);

  while (queue.length) {
    const { r, c } = queue.shift();
    
    [
      { dr: -1, dc:  0 },
      { dr:  1, dc:  0 },
      { dr:  0, dc: -1 },
      { dr:  0, dc:  1 },
    ].forEach(({ dr, dc }) => {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        board[nr][nc] === target &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push({ r: nr, c: nc });
      }
    });
  }

  const group = Array.from(visited, str => {
    const [r, c] = str.split(',').map(Number);
    return { r, c };
  });

  return group.length >= 3 ? group : [];
}


export function removeAndCascade(board, group, types) {
  const rows = board.length;
  const cols = board[0]?.length || 0;

  
  const newBoard = board.map(row => row.slice());

    
  group.forEach(({ r, c }) => {
    newBoard[r][c] = null;
  });

  
  const columns = Array.from({ length: cols }, (_, c) => {
    
    const nonNull = newBoard
      .map(row => row[c])
      .filter(cell => cell !== null);

    
    const missingCount = rows - nonNull.length;

    
    const replenished = Array.from(
      { length: missingCount },
      () => randomInt(types)
    ).concat(nonNull);

    return replenished; 
  });

  
  return Array.from({ length: rows }, (_, r) =>
    columns.map(col => col[r])
  );
}


export function calculateScore(n) {
  return 100 + (n - 3) * 60;
}

export function applyMove(state, groupSize) {
  const points = groupSize >= 3 ? calculateScore(groupSize) : 0;
  return {
    score: state.score + points,
    moves: state.moves - 1
  };
}


export function checkWin(state, levelConfig) {
  if (levelConfig.objectiveType === 'points') {
    return state.score >= (levelConfig.targetPoints ?? 0);
  }
  if (levelConfig.objectiveType === 'pieces') {
    return (levelConfig.targetPieces ?? []).every(({ typeIndex, count }) =>
      (state.piecesCollected?.[typeIndex] || 0) >= count
    );
  }

  return false;
}

export function checkLose(state) {
  return state.moves <= 0;
}
