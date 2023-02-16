// DECLARATIONS

  // Game State
  const ticState = {
    players: ['X','O'],
    currentBoard: [
        ['', 'O', 'O'],
        ['X', '', 'X'],
        ['O', 'X', 'O']
    ]
}

// dom variables
const tics = document.querySelectorAll('.ticdiv');
const message = document.querySelector('#winbox');
const reset = document.querySelector('#reset');

// HELPER FUNCTIONS

// getRow
const getRow = (matrixArr, coordY) => {
    let digit = 0;
    let result = [];
    for(i = 0; i < matrixArr[coordY].length; i++) {
      digit = matrixArr[coordY][i];
      result.push(digit)
    } return result
  }
  
  // getColumn
  const getColumn = (matrixArr, coordX) => {
    let digit = 0;
    let result = [];
    for(i = 0; i < matrixArr.length; i++) {
      digit = matrixArr[i][coordX];
      result.push(digit)
    } return result;
  }
  
//  Diag Array Funcs
  const leftDiag = (matrixArr) => {
    let digit = 0;
    let result = [];
    for(let i = 0; i < matrixArr.length; i++) {
      for(let j = i; j < i+1; j++) {
        digit = matrixArr[i][j];
        result.push(digit);
      }
    } return result
  }

  const rightDiag = (matrixArr) => {
    let digit = 0;
    let result = [];
    let inc = 0;
    let inc2 = 1;
    for(let i = 2; i >=0; i--) {
      for(let j = inc; j < inc2; j++) {
        digit = matrixArr[i][j];
        result.push(digit);
      }
        if(inc < 3)inc += 1;
        if(inc2 < 3)inc2 += 1;
    } return result
  }
  
  // Basic Win Function
  const win = (arr, player) => {
  let ticcheck = [];
  let checkarr = [];
  let dub = undefined;
      if(player === 'X') {
          ticcheck = ['X','X','X']
      } else if(player === 'O') {
          ticcheck = ['O','O','O']
      };
  
      for(i = 0; i < ticcheck.length; i++) {
          if(arr[i] === ticcheck[i]) {
              checkarr.push(arr[i])
          }
      }
      if(checkarr.length === 3) {
          dub = true;
      } else {dub = false}
  
    return dub;
  }

// Full Win Function
const fullWin = (arr) => {
  let p = ticState.currentBoard[0];
  let check = 0;
  let check2 = 0;
  let diagLeft = leftDiag(arr);
  let diagRight = rightDiag(arr);
  let wincheck = undefined;
  let samplerow = [];
  let samplecol = [];
    for(let i = 0; i < arr.length; i++) {
      let coord = i;
      samplerow = getRow(arr, coord)
      samplecol = getColumn(arr, coord)
  //  column & row check     
      if(win(samplerow, p) === true || win(samplecol, p) === true) {
        check+= 1;
      }
    }
  //   diagcheck
    if(win(diagLeft, p) === true || win(diagRight, p) === true) {
      check2 +=3
    }
  //   final check
    if(check || check2 > 0) {
      wincheck = true
    } else {wincheck = false};
    
    return wincheck;
  }

// Full Win X
const fullwinX = (arr) => {
  let p = 'X';
  let check = 0;
  let check2 = 0;
  let diagLeft = leftDiag(arr);
  let diagRight = rightDiag(arr);
  let wincheck = undefined;
  let samplerow = [];
  let samplecol = [];
    for(let i = 0; i < arr.length; i++) {
      let coord = i;
      samplerow = getRow(arr, coord)
      samplecol = getColumn(arr, coord)
  //  column & row check     
      if(win(samplerow, p) === true || win(samplecol, p) === true) {
        check+= 1;
      }
    }
  //   diagcheck
    if(win(diagLeft, p) === true || win(diagRight, p) === true) {
      check2 +=3
    }
  //   final check
    if(check || check2 > 0) {
      wincheck = true
    } else {wincheck = false};
    
    return wincheck;
  }

// Full Win O
const fullwinO = (arr) => {
  let p = 'O';
  let check = 0;
  let check2 = 0;
  let diagLeft = leftDiag(arr);
  let diagRight = rightDiag(arr);
  let wincheck = undefined;
  let samplerow = [];
  let samplecol = [];
    for(let i = 0; i < arr.length; i++) {
      let coord = i;
      samplerow = getRow(arr, coord)
      samplecol = getColumn(arr, coord)
  //  column & row check     
      if(win(samplerow, p) === true || win(samplecol, p) === true) {
        check+= 1;
      }
    }
  //   diagcheck
    if(win(diagLeft, p) === true || win(diagRight, p) === true) {
      check2 +=3
    }
  //   final check
    if(check || check2 > 0) {
      wincheck = true
    } else {wincheck = false};
    
    return wincheck;
  }



  // Open Spaces? Func > If there are any open spaces, function returns true
  const openSpace = (array) => {
    let check = 0;
      for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < 3; j++) {
          
          if(array[i][j] === ""){
            check += 1
          }
        }
      }
      if(check > 0) return true;
      if(check === 0) return false;
    }

  // Space Occupied? If space is open, returns false
  const spaceOcc = (event) => {
      let aim = event.target;
      let space = undefined;
      if(aim.value === undefined) {
        space = false;
      } else space = true;
    return space
   }

// Start Turn - this version is just to test. 
// When placed in the full function, event won't be a parameter. Also, board & aim
// will be declared outside this function.
const startTurn = (event) => {
  let board = ticState.currentBoard;
  let start1 = undefined;
  let start2 = undefined;
  const aim = event.target;

  if(fullwinX(board) === false && fullwinO(board) === false) {
    start1 = true;
  } else start1 = false;

  if(openSpace(board) === true && spaceOcc(event) === false) {
    start2 = true;
  } else start2 = false;
  
  console.log(start1, start2);
  if(start1 && start2 === true) return true;
  if(start1 || start2 === false) return false;
}

// Switch Players


// FullFunc
const play = (event) => {
  let board = ticState.currentBoard;
  const aim = event.target;
  const p = ticState.players[0];

  if(startTurn(event) === true) {
    aim.innerText = p;
    board[0] = [tics[0].innerText, tics[1].innerText, tics[2].innerText];
    board[1] = [tics[3].innerText, tics[4].innerText, tics[5].innerText];
    board[2] = [tics[6].innerText, tics[7].innerText, tics[8].innerText];
    if(fullwinX(board) === true || fullwinO(board) === true) {
      message.innerText = `${p} Wins!!`
    } else if(fullWin(board) === false && openSpace(board) === true) {
      let players = ticState.players;
      [players[0],players[1]] = [players[1],players[0]];
    }
  } 
  console.log(board, fullWin(board));
}

// reset
const resetFunc = () => {
  for(let i = 0; i < 9; i++) {
    tics[i].innerText = "";
  }
  message.innerText = `Who Will Win?!`;
  board[0] = [tics[0].innerText, tics[1].innerText, tics[2].innerText];
  board[1] = [tics[3].innerText, tics[4].innerText, tics[5].innerText];
  board[2] = [tics[6].innerText, tics[7].innerText, tics[8].innerText];
  ticState.players = ['X','O'];
}


// EVENT LISTENERS
tics.forEach((item) => {
  item.addEventListener('click', play)
});
reset.addEventListener('click', resetFunc);


