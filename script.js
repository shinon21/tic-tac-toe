
function createPlayer(name, symbol) {
    const getName = () => name;
    const getSymbol = () => symbol;
    return { getName, getSymbol }
}

function createGameboard(initialBoard = [null, null, null].fill([null, null, null], 0)) {
    const board = initialBoard;
    const placePlayer = (row, column, player) => board[row][column] = player;

    return { placePlayer }
}

function createGame(player1, player2, initialBoard) {
    const board = createGameboard(initialBoard);
    const players = [
        createPlayer(player1.name, player1.symbol),
        createPlayer(player2.name, player2.symbol)
    ];
}

createGame(
    { name: "player one", symbol: "x" },
    { name: "player two", symbol: "o" }
);