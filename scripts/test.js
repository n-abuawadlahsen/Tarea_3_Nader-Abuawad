import { generateBoard } from './board.js';    


const rows  = 5;
const cols  = 6;
const types = 4;

// Genera el tablero
const board = generateBoard(rows, cols, types);


console.table(board);


if (board.length !== rows) throw new Error(`Esperaba ${rows} filas, obtuve ${board.length}`);
board.forEach((row, i) => {
  if (row.length !== cols) throw new Error(`Fila ${i}: esperaba ${cols} columnas, obtuvo ${row.length}`);
  row.forEach((cell, j) => {
    if (cell < 0 || cell >= types) {
      throw new Error(`Valor fuera de rango en [${i},${j}]: ${cell}`);
    }
  });
});
console.log('✅ generateBoard pasa todas las pruebas.');
