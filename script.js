
function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol }
}

function createGameboard(initialBoard = new Array(9).fill(null)) {
    const board = initialBoard;
    const placePlayer = (row, column, player) => board[3 * row + column] = player;
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

    const getCellSymbol = (row, column) => {
        const player = board[3 * row + column];
        return player ? player.getSymbol() : " ";
    }

    const printBoard = () => {
        for (let i = 0; i < 3; i++) {
            console.log(`${getCellSymbol(i, 0)} | ${getCellSymbol(i, 1)} | ${getCellSymbol(i, 2)}`);
            if (i !== 2) {
                console.log("---------")
            }
        }
    }

    return { placePlayer, checkWin, printBoard }
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
    let winner;
    do {
        console.log(`It is ${getCurrentPlayer().getName()}'s turn`);
        const move = prompt("What is your move?: ");
        const cords = move.split(",");
        board.placePlayer(Number(cords[0]), Number(cords[1]), getCurrentPlayer());
        board.printBoard();
        if (board.checkWin()) {
            winner = getCurrentPlayer();
            break;
        }
        switchPlayer();
    } while (!winner);
}

createGame(
    { name: "player one", symbol: "x" },
    { name: "player two", symbol: "o" }
);