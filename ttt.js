function createBoard() {
    let board = [null, null, null, null, null, null, null, null, null];

    const canPlayPiece = (index) => {
        if (index < 0 || index > 8) return false;
        return board[index] === null;
    }

    const playPiece = (player, index) => {
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

    const resetBoard = () => {
        board = [null, null, null, null, null, null, null, null, null];
    }

    return { canPlayPiece, playPiece, checkBoard, getBoardState, resetBoard };
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

    const canTakeTurn = (index) => {
        return gameBoard.canPlayPiece(index);
    }

    const takeTurn = (index) => {
        // Put the piece into position
        gameBoard.playPiece(currentPlayer.getSymbol(), index);

        // Check if game has ended
        let gameStatus = gameBoard.checkBoard();
        if (gameStatus !== null) {
            return gameStatus;
        }
        return null;
    } 

    const swapTurn = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const resetGame = () => {
        currentPlayer = player1;
        gameBoard.resetBoard();
    }

    const printBoardState = () => {
        console.log(gameBoard.getBoardState());
    }

    return { canTakeTurn, takeTurn, getCurrentPlayer, swapTurn, printBoardState, resetGame };
}

function displayHandler() {
    const mainGame = createGame();
    const gameButtons = document.querySelectorAll('.board-square');
    const statusMessage = document.querySelector('.game-status h4');
    const resetButton = document.querySelector('#reset-game');

    resetButton.addEventListener('click', (e) => {
        resetGame();
    });

    const resetGame = () => {
        mainGame.resetGame();
        gameButtons.forEach(element => {
            element.textContent = "";
            element.classList.add("clickable");
            element.addEventListener('click', (e) => {
                takeTurn(e.target);
            })
        });
        statusMessage.textContent = `It is ${mainGame.getCurrentPlayer().getSymbol()}'s turn`
    }

    const takeTurn = (square) => {
        let index = square.dataset.index;
        if (mainGame.canTakeTurn(index - 1)) {
            let result = mainGame.takeTurn(index - 1);
            square.textContent = mainGame.getCurrentPlayer().getSymbol();
            if (result !== null) {
                handleGameEnd(result);
                return;
            }
            mainGame.swapTurn();
            statusMessage.textContent = `It is ${mainGame.getCurrentPlayer().getSymbol()}'s turn`
            square.classList.remove("clickable");
            square.removeEventListener('click', takeTurn);
        }
    }

    const handleGameEnd = (result) => {
        if (result === "Draw") {
            statusMessage.textContent = "The game is a draw!";
        }
        else {
            statusMessage.textContent = `${mainGame.getCurrentPlayer().getName()} (${mainGame.getCurrentPlayer().getSymbol()}) has won!`;
        }
        gameButtons.forEach(element => {
            element.classList.remove("clickable");
            element.removeEventListener('click', takeTurn);
        });
        
    }

    resetGame();
}

let start = displayHandler();