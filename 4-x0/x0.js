// let boardSize = 3;
let xMoves = true;
let gameOver = false;
const DEBUGGING = true;

function debug(message){
  if(DEBUGGING == false) return;
    console.log(message);
}

function drawBoard(selector, size = 3) {
  const board = document.querySelector(selector);
  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("td");
      //   cell.setAttribute('id', `cell i${i}-${j}`);
      //   cell.setAttribute('data-row',i);
      cell.dataset.row = i;
      //   cell.setAttribute('data-col',j);
      cell.dataset.col = j;
      cell.dataset.active = "da";
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

function registerEvents() {
  const cells = document.querySelectorAll("td"); // TODO: make it depend on #game
  const elemLaMutare = document.getElementById("la_mutare");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function (event) {
      if(gameOver) return;
      const cell = event.target;
      if (cell.dataset.active != "da") return;

      // if(xMoves){
      // cell.innerText = 'X'
      // xMoves = false;
      // } else {
      //     cell.innerText = '0';
      //     xMoves = true;
      // }
      cell.innerText = xMoves ? "X" : "0";
      someoneWon();
      xMoves = !xMoves;
      elemLaMutare.innerText = xMoves == true ? "X" : "0";
      cell.dataset.active = false;
      
    });
  }
}

function someoneWon() {
    const cells = document.querySelectorAll("td"); // TODO: make it depend on #game
  // TODO: check lines
    for (let i = 0; i < 3; i++){
        // TODO : read board instead of 3
        // check line i
        const firstCell = i * 3;
        const secondCell = i * 3 + 1;
        const thirdCell = i * 3 + 2;

        let lineIsIdentical = checkThreeCells(cells,firstCell, secondCell, thirdCell, "linia", i);
        if (lineIsIdentical) {
          addGameOverClass();
            gameOver = true;
            return; // stop checking
        }
        // i, j => k[0;8]
        //linia 0: 0, 1, 2
        //linia 1: 3, 4, 5
        //linia 2: 6, 7, 8

        // start = i * 3;
    }
  // TODO : check columns
  for (let j = 0; j < 3; j++){
    const firstCell = j + 0 * 3; // 0, 3, 6
    const secondCell = j + 1 * 3; // 1, 4, 7
    const thirdCell = j + 2 * 3; // 2, 5

    let columnIsIdentical = checkThreeCells(cells,firstCell, secondCell, thirdCell, "coloana", j);
    if (columnIsIdentical) {
        addGameOverClass();
        gameOver = true;
        return; // stop checking
    }

    //col  j = 1:
    //firstCell = j * 3 = 3
    //secondCell = j * 3 + 1 = 4
    //thirdCell = j * 3 + 2 = 5
  }

  //Check main diagonal
  // 0, 4, 8
  let firstCell = 0;
  let secondCell = 4; // 4
  let thirdCell = 8; // 8
  let diagonalIsIdentical = checkThreeCells(cells,firstCell, secondCell, thirdCell, "diagonala", "principală");
  if (diagonalIsIdentical) {
    gameOver = true; // stop checking
    return;
  }
  //Check secondary diagonal
  // 2, 4, 6

  firstCell = 2; // 2
  secondCell = 4; // 4
  thirdCell = 6; // 6
  let secondaryIsIdentical = checkThreeCells(cells,firstCell, secondCell, thirdCell, "diagonala", "secundară");
  if (secondaryIsIdentical) {
    addGameOverClass();
    gameOver = true; // stop checking
  }

  function addGameOverClass() {
    const elemGame = document.getElementById("game");
    elemGame.classList.add("over");
  }

  // TODO : check diagonals
  function checkThreeCells(cells,firstCell, secondCell, thirdCell, directie, indice) {
    if (
      cells[firstCell].innerText === '' ||
      cells[secondCell].innerText === '' ||
      cells[thirdCell].innerText === ''
    ) {
        return false; // skip this line
    }
    if (
      cells[firstCell].innerText === cells[secondCell].innerText && 
      cells[secondCell].innerText === cells[thirdCell].innerText
    ){
        debug(`${directie} ${indice} a castigat!`);
        alert(`${xMoves ? 'X' : '0'} a castigat!`);
        return true;
    }
  }
}
