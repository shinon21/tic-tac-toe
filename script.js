
function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol }
}

function createGameboard(initialBoard = new Array(9).fill(null)) {
    const board = initialBoard;
    const placePlayer = (index, player) => {
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

    const checkTie = () => {
        return board.every((value) => value !== null);
    }

    return { placePlayer, checkWin, checkTie }
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

    const checkGameOver = () => {
        if (board.checkTie()) {
            return "tie";
        } else if (board.checkWin()) {
            return "win";
        } else {
            return false;
        }
    }

    return {
        getCurrentPlayer,
        placePlayer: board.placePlayer,
        switchPlayer,
        checkGameOver
    }
}

const DOMController = (function () {
    let game = createGame(
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
            const result = game.checkGameOver();
            if (result) {
                handleGameOver(result);
                return;
            }
            game.switchPlayer();
            announcePlayerTurn();
        }
    }

    const handleGameOver = (result) => {
        for (const cell of cells) {
            cell.disabled = true;
        }
        if (result === "win") {
            announceWinner();
        } else {
            announceTie();
        }
    }

    const handleResetButton = () => {
        const button = document.querySelector(".reset");
        button.addEventListener("click", (e) => {
            for (const cell of cells) {
                cell.textContent = " ";
                cell.disabled = false;
            }
            game = createGame(
                { name: "player one", symbol: "x" },
                { name: "player two", symbol: "o" }
            );
            announcePlayerTurn();
        })
    }

    const announceTie = () => {
        updateFeedback("It is a tie!!")
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
    handleResetButton();
    announcePlayerTurn();
})();