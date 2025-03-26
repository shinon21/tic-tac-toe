
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
    const placePlayer = (index) => {
        if (board.placePlayer(index)) {
            switchPlayer();
        }
    }

    return { getCurrentPlayer, placePlayer }
}



const DOMController = (function () {
    const game = createGame(
        { name: "player one", symbol: "x" },
        { name: "player two", symbol: "o" }
    );
})();