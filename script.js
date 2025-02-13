
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns)
         {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c])
             {
                return board[a];
            }
        }

        return board.includes('') ? null : 'T'; 
    };

    const updateStatus = (message) => {
        status.textContent = message;
    };

    const handleClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] || checkWinner()) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner)
         {
            if (winner === 'T')
             {
                updateStatus("It's a Tie!");
            } else {
                updateStatus(`Player ${winner} wins!`);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus(`Player ${currentPlayer}'s turn`);
        }
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        updateStatus(`Player ${currentPlayer}'s turn`);
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetBtn.addEventListener('click', resetGame);

    resetGame(); 
});
