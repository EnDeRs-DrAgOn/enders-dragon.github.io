// movementUtils.js
// Shared helpers used by every piece movement module.

function onBoard(r, c) {
    return r >= 0 && r < boardSize && c >= 0 && c < boardSize;
}

function createMovementContext(r, c, piece, moves, movementType = piece.type) {
    const isWhite = piece.color === 'white';
    const dir = isWhite ? -1 : 1;

    function addIfValid(nr, nc) {
        if (!onBoard(nr, nc)) return;

        const target = board[nr][nc];

        if (!target) {
            moves.push({
                row: nr,
                col: nc,
                isCapture: false
            });
        } else if (target.color !== piece.color) {
            moves.push({
                row: nr,
                col: nc,
                isCapture: true
            });
        }
    }

    function raycast(dr, dc, jumpNonPawns = false) {
        let nr = r + dr;
        let nc = c + dc;

        while (onBoard(nr, nc)) {

            const target = board[nr][nc];

            if (!target) {
                moves.push({
                    row: nr,
                    col: nc,
                    isCapture: false
                });
            } else {

                const isPawn =
                    target.type === 'P' ||
                    target.type === '0P' ||
                    target.type === 'BP' ||
                    target.type === 'AP';

                if (isPawn || !jumpNonPawns) {

                    if (target.color !== piece.color) {
                        moves.push({
                            row: nr,
                            col: nc,
                            isCapture: true
                        });
                    }

                    break;
                }

                if (target.color !== piece.color) {
                    moves.push({
                        row: nr,
                        col: nc,
                        isCapture: true
                    });
                }
            }

            nr += dr;
            nc += dc;
        }
    }

    function limitedHopRaycast(dr, dc, ignorePawnsOnly = false) {
        let nr = r + dr;
        let nc = c + dc;
        let piecesHopped = 0;

        while (onBoard(nr, nc)) {

            const target = board[nr][nc];

            if (!target) {
                moves.push({
                    row: nr,
                    col: nc,
                    isCapture: false
                });
            } else {

                const isPawn =
                    target.type === 'P' ||
                    target.type === '0P' ||
                    target.type === 'BP' ||
                    target.type === 'AP';

                if (ignorePawnsOnly && isPawn) {

                    if (
                        target.color !== piece.color &&
                        piecesHopped === 0
                    ) {
                        moves.push({
                            row: nr,
                            col: nc,
                            isCapture: true
                        });
                    }

                    break;
                }

                if (piecesHopped === 0) {

                    if (target.color !== piece.color) {
                        moves.push({
                            row: nr,
                            col: nc,
                            isCapture: true
                        });
                    }

                    piecesHopped++;

                } else {

                    if (target.color !== piece.color) {
                        moves.push({
                            row: nr,
                            col: nc,
                            isCapture: true
                        });
                    }

                    break;
                }
            }

            nr += dr;
            nc += dc;
        }
    }

    return {
        r,
        c,
        piece,
        moves,
        movementType,

        isWhite,
        dir,

        addIfValid,
        raycast,
        limitedHopRaycast,

        orth: [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ],

        diag: [
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ],

        knightMoves: [
            [-2, -1],
            [-2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2],
            [2, -1],
            [2, 1]
        ]
    };
}