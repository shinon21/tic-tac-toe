
function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol }
}

function createGameboard(initialBoard = new Array(9).fill(null)) {
    const board = initialBoard;
    const placePlayer = (index, player) => {
        console.log(board[index])
        if (board[index]) {
            return false;
        }
        board[index] = player;
        return true;
    }
    const checkWin = () => {
        const winningPositions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [6, 4, 2]
        ]
        for (const [x, y, z] of winningPositions) {
            if (!board[x]) continue;
            if (board[x] === board[y] && board[y] === board[z]) {
                return true;
            }
        }
        return false;
    }
    return { placePlayer, checkWin }
}

function createGame(player1, player2, initialBoard) {
    const board = createGameboard(initialBoard);
    const players = [
        createPlayer(player1.name, player1.symbol),
        createPlayer(player2.name, player2.symbol)
    ];
    let currentPlayer = 0;
    const switchPlayer = () => {
        currentPlayer = currentPlayer === 0 ? 1 : 0;
    }
    const getCurrentPlayer = () => players[currentPlayer];


    return {
        getCurrentPlayer,
        placePlayer: board.placePlayer,
        switchPlayer,
        checkWin: board.checkWin
    }
}

const DOMController = (function () {
    const game = createGame(
        { name: "player one", symbol: "x" },
        { name: "player two", symbol: "o" }
    );
    const cells = document.querySelectorAll(".cell");
    const handleCellClick = () => {
        for (const cell of cells) {
            cell.addEventListener("click", placeDOMPlayer);
        }
    }

    const placeDOMPlayer = (e) => {
        const index = e.target.dataset.index;
        if (game.placePlayer(index, game.getCurrentPlayer())) {
            e.target.textContent = game.getCurrentPlayer().getSymbol();
            if (game.checkWin()) {
                handleGameOver();
                return;
            }
            game.switchPlayer();
            announcePlayerTurn();
        }
    }

    const handleGameOver = () => {
        for (const cell of cells) {
            cell.disabled = true;
        }
        announceWinner();
    }

    const announceWinner = () => {
        const player = game.getCurrentPlayer();
        updateFeedback(`${player.getName()} has won the game!`);
    }

    const announcePlayerTurn = () => {
        const currentPlayer = game.getCurrentPlayer();
        updateFeedback(`It is ${currentPlayer.getName()} (${currentPlayer.getSymbol()}) turn.`);
    }

    const updateFeedback = (text) => {
        const p = document.querySelector(".feedback");
        p.textContent = text;
    }
    handleCellClick();
    announcePlayerTurn();
})();