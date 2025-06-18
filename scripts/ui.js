import { getLevelConfig, LEVELS } from './levels.js';
import { generateBoard } from './board.js';
import {
  findGroup,
  removeAndCascade,
  applyMove,
  checkWin,
  checkLose
} from './game.js';


const COLOR_NAMES = { 0: 'Rojo', 1: 'Azul', 2: 'Amarillo', 3: 'Verde', 4: 'Morado', 5: 'Naranja' };



let state = { level: null, config: null, board: null, score: 0, moves: 0, piecesCollected: {} };


const gameEl = document.getElementById('game');
const scoreEl = document.getElementById('score');
const movesEl = document.getElementById('moves');
const objectiveEl = document.getElementById('objective');
const restartEl = document.getElementById('restart');
const levelSel = document.getElementById('level');


const modalOverlay = document.createElement('div');
modalOverlay.id = 'modal-overlay';
modalOverlay.style.cssText =
  'position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);';

const modalBox = document.createElement('div');
modalBox.id = 'modal-box';
modalBox.style.cssText =
  'background:#fff;padding:24px;border-radius:12px;max-width:280px;width:80%;text-align:center;box-shadow:0 8px 20px rgba(0,0,0,0.15);transform:scale(0.8);animation:popIn 0.3s ease forwards;';

const modalMessage = document.createElement('p');
modalMessage.id = 'modal-message';
modalMessage.style.cssText = 'font-size:1.2rem;margin-bottom:16px;color:#333;';

const btnRestart = document.createElement('button');
btnRestart.textContent = 'Reiniciar nivel';
btnRestart.style.cssText = 'background:#e74c3c;color:#fff;border:none;padding:10px 16px;border-radius:6px;font-size:0.95rem;cursor:pointer;margin:0 8px;';

const btnNext = document.createElement('button');
btnNext.textContent = 'Siguiente nivel';
btnNext.style.cssText = 'background:#27ae60;color:#fff;border:none;padding:10px 16px;border-radius:6px;font-size:0.95rem;cursor:pointer;margin:0 8px;';

btnRestart.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
  initLevel(state.level);
});
btnNext.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
  const next = Math.min(state.level + 1, LEVELS.length);
  initLevel(next);
});

modalBox.append(modalMessage, btnRestart, btnNext);
modalOverlay.appendChild(modalBox);
document.body.appendChild(modalOverlay);

function hasAvailableMoves(board) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (findGroup(board, r, c).length >= 3) return true;
    }
  }
  return false;
}


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
  } else {
    objectiveEl.innerHTML = state.config.targetPieces
      .map(({ typeIndex, count }) => {
        const have = state.piecesCollected[typeIndex] || 0;
        return `<span class="objective-item">` +
               `<span class="color-box bg-${typeIndex}"></span> ` +
               `${COLOR_NAMES[typeIndex]}: ${have}/${count}</span>`;
      })
      .join(' | ');
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
  state.board = generateBoard(
    state.config.rows,
    state.config.cols,
    state.config.types
  );
  state.score = 0;
  state.moves = state.config.moves;
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

    const before = state.board;
    state.board = removeAndCascade(before, group, state.config.types);

    if (state.config.objectiveType === 'pieces') {
      group.forEach(({ r: rr, c: cc }) => {
        const v = before[rr][cc];
        state.piecesCollected[v] = (state.piecesCollected[v] || 0) + 1;
      });
    }

    Object.assign(
      state,
      applyMove({ score: state.score, moves: state.moves }, group.length)
    );

    renderBoard(state.board);
    renderInfo();

    
    if (checkWin(state, state.config)) {
      modalMessage.textContent = '¡Nivel completado!';
      btnNext.style.display = 'inline-block';
      modalOverlay.style.display = 'flex';
    } else if (state.moves <= 0 || !hasAvailableMoves(state.board)) {
      modalMessage.textContent = '¡Has perdido!';
      btnNext.style.display = 'none';
      modalOverlay.style.display = 'flex';
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
