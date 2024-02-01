function createBoard() {
    let board = [null, null, null, null, null, null, null, null, null];

    const canPlayPiece = (row, col) => {
        if (row > 3 || row < 1) return false;
        if (col > 3 || col < 1) return false;
        return board[(row - 1) * 3 + col - 1] === null;
    }

    const playPiece = (player, row, col) => {
        let index = (row - 1) * 3 + col - 1;
        board[index] = player;
        return;
    }

    const checkBoard = () => {
        // Check columns
        if ((board[0] !== null && (board[0] === board[3] && board[3] === board[6]))
        || (board[1] !== null && (board[1] === board[4] && board[4] === board[7]))
        || (board[2] !== null && (board[2] === board[5] && board[5] === board[8]))) {
            return "Win";
        }
        // Check rows
        if ((board[0] !== null && (board[0] === board[1] && board[1] === board[2]))
        || (board[3] !== null && (board[3] === board[4] && board[4] === board[5]))
        || (board[6] !== null && (board[6] === board[7] && board[7] === board[8]))) {
            return "Win";
        }
        // Check diagonals
        if ((board[0] !== null && (board[0] === board[4] && board[4] === board[8]))
        || (board[2] !== null && (board[2] === board[4] && board[4] === board[6]))) {
            return "Win";
        }

        if (isBoardFull()) {
            return "Draw";
        }

        return null;
    }

    const isBoardFull = () => {
        return !board.includes(null);
    }

    const getBoardState = () => {
        return `
            ${board[0]} ${board[1]} ${board[2]}\n
            ${board[3]} ${board[4]} ${board[5]}\n
            ${board[6]} ${board[7]} ${board[8]}`;
    }

    return { canPlayPiece, playPiece, checkBoard, getBoardState };
}

function createPlayer(name, symbol) {
    let pName = name;
    let pSymbol = symbol;

    const getSymbol = () => {
        return pSymbol;
    }

    const getName = () => {
        return pName;
    }

    return { getSymbol, getName };
}

function createGame() {
    const player1 = createPlayer("Player One", "X");
    const player2 = createPlayer("Player Two", "O");

    let currentPlayer = player1;

    const gameBoard = createBoard();

    const takeTurn = (row, col) => {
        // Put the piece into position
        if (gameBoard.canPlayPiece(row, col)) {
            gameBoard.playPiece(currentPlayer.getSymbol(), row, col);
        }

        // Check if game has ended
        let gameStatus = gameBoard.checkBoard();
        if (gameStatus !== null) {
            return gameStatus;
        }

        // Swap turn
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }

        return null;
    } 

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const printBoardState = () => {
        console.log(gameBoard.getBoardState());
    }

    return { takeTurn, getCurrentPlayer, printBoardState };
}

function displayHandler() {
    
}

let mainGame = createGame();