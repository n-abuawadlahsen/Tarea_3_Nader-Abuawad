import { getLevelConfig, LEVELS } from './levels.js';
import { generateBoard } from './board.js';
import {
  findGroup,
  removeAndCascade,
  applyMove,
  checkWin,
  checkLose
} from './game.js';


const COLOR_NAMES = {
  0: 'Rojo',
  1: 'Azul',
  2: 'Amarillo',
  3: 'Verde',
  4: 'Morado',
  5: 'Naranja'
};


const state = {
  level: null,
  config: null,
  board: null,
  score: 0,
  moves: 0,
  piecesCollected: {}
};


const gameEl      = document.getElementById('game');
const scoreEl     = document.getElementById('score');
const movesEl     = document.getElementById('moves');
const objectiveEl = document.getElementById('objective');
const restartEl   = document.getElementById('restart');
const levelSel    = document.getElementById('level');


function renderBoard(board) {
  gameEl.innerHTML = '';
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      const div = document.createElement('div');
      div.className = `cell bg-${cell}`;
      div.dataset.r = r;
      div.dataset.c = c;
      gameEl.appendChild(div);
    });
  });
}


function renderInfo() {
  scoreEl.textContent = state.score;
  movesEl.textContent = state.moves;

  if (state.config.objectiveType === 'points') {
    objectiveEl.textContent = `${state.config.targetPoints} puntos`;
  } else if (state.config.objectiveType === 'pieces') {
    objectiveEl.innerHTML = state.config.targetPieces
      .map(({ typeIndex, count }) => {
        const have = state.piecesCollected[typeIndex] || 0;
        const colorName = COLOR_NAMES[typeIndex] || `Tipo ${typeIndex}`;
        return `
          <span class="objective-item">
            <span class="color-box bg-${typeIndex}"></span>
            ${colorName}: ${have}/${count}
          </span>
        `.trim();
      })
      .join(' | ');
  } else {
    objectiveEl.textContent = '-';
  }
}


function setupLevelSelector() {
  LEVELS.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.name;
    opt.textContent = `Nivel ${l.name}`;
    levelSel.appendChild(opt);
  });
  levelSel.addEventListener('change', () => initLevel(+levelSel.value));
}


export function initLevel(n) {
  state.level = n;
  state.config = getLevelConfig(n);
  state.board  = generateBoard(
    state.config.rows,
    state.config.cols,
    state.config.types
  );
  state.score  = 0;
  state.moves  = state.config.moves;
  state.piecesCollected = {};


  gameEl.style.setProperty('--rows', state.config.rows);
  gameEl.style.setProperty('--cols', state.config.cols);

  renderBoard(state.board);
  renderInfo();
  levelSel.value = n;
}


function setupBoardClick() {
  gameEl.addEventListener('click', e => {
    if (!e.target.classList.contains('cell')) return;
    const r = +e.target.dataset.r;
    const c = +e.target.dataset.c;

    const group = findGroup(state.board, r, c);
    if (group.length < 3) return;

    const boardBefore = state.board;
    state.board = removeAndCascade(boardBefore, group, state.config.types);

    if (state.config.objectiveType === 'pieces') {
      group.forEach(({ r: rr, c: cc }) => {
        const val = boardBefore[rr][cc];
        state.piecesCollected[val] = (state.piecesCollected[val] || 0) + 1;
      });
    }

    const prev = { score: state.score, moves: state.moves };
    Object.assign(state, applyMove(prev, group.length));

    renderBoard(state.board);
    renderInfo();

    if (checkWin(state, state.config)) {
      alert('¡Nivel completado!');
    } else if (checkLose(state)) {
      alert('¡Has perdido!');
    }
  });
}


function setupRestart() {
  restartEl.addEventListener('click', () => initLevel(state.level));
}


document.addEventListener('DOMContentLoaded', () => {
  setupLevelSelector();
  setupBoardClick();
  setupRestart();
  initLevel(LEVELS[0].name);
});