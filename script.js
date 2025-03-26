
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

createGameboard();