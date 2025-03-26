
function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol }
}

function createGameboard(initialBoard = [null, null, null].fill([null, null, null], 0)) {
    const board = initialBoard;
    const placePlayer = (row, column, player) => {
        console.log(board);
        if (!board[row][column]) {
            board[row][column] = player;
            return true;
        }
        return false;
    }

    return { placePlayer }
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
        switchPlayer();

    } while (!winner);
}

createGame(
    { name: "player one", symbol: "x" },
    { name: "player two", symbol: "o" }
);