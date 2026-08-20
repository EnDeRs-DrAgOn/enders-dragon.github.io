// mortar.js - Movement rules for: M
//
// MORTAR:
// 1. Moves exactly like a King.
// 2. Can fire shells at enemy pieces within
//    Manhattan distance <= 4.
// 3. Firing does NOT move the Mortar.
// 4. Friendly pieces do not block shells.
// 5. Enemy pieces block shells.
// 6. Only occupied enemy squares become shell captures.

function getMortarMoves(r, c, piece, moves, movementType = piece.type) {

    const {
        addIfValid
    } = createMovementContext(
        r,
        c,
        piece,
        moves,
        movementType
    );

    // =========================================================
    // 1. NORMAL MOVEMENT — KING STYLE
    // =========================================================

    const kingDirections = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1]
    ];

    for (const [dr, dc] of kingDirections) {
        addIfValid(r + dr, c + dc);
    }


    // =========================================================
    // 2. MORTAR SHELL RANGE
    // =========================================================
    //
    // Exact Manhattan-distance-4 diamond:
    //
    //         O
    //       O O O
    //     O O O O O
    //   O O O O O O O
    // O O O O M O O O O
    //   O O O O O O O
    //     O O O O O
    //       O O O
    //         O
    //
    // The Mortar itself NEVER moves when firing.
    //
    // row / col        = Mortar's current position
    // targetRow/Col    = shell's actual target

    for (let dr = -4; dr <= 4; dr++) {
        for (let dc = -4; dc <= 4; dc++) {

            // Don't target the Mortar itself.
            if (dr === 0 && dc === 0) continue;

            // Manhattan-distance diamond.
            if (Math.abs(dr) + Math.abs(dc) > 4) continue;

            const targetRow = r + dr;
            const targetCol = c + dc;

            if (!onBoard(targetRow, targetCol)) continue;

            const target = board[targetRow][targetCol];

            // Only occupied enemy squares can be shelled.
            if (!target) continue;
            if (target.color === piece.color) continue;

            // Enemy pieces block the shell.
            if (!mortarShellPathExists(
                r,
                c,
                targetRow,
                targetCol,
                piece.color
            )) {
                continue;
            }

            // Arrow-Pawn-style ranged capture.
            //
            // IMPORTANT:
            // row/col stay on the Mortar.
            // targetRow/targetCol identify what gets destroyed.
moves.push({
    row: r,
    col: c,

    targetRow: targetRow,
    targetCol: targetCol,

    isCapture: true,
    isMortarShot: true
});
        }
    }
}


// =============================================================
// MORTAR SHELL PATH
// =============================================================
//
// Friendly pieces can be fired OVER.
//
// Enemy pieces block the shell.
// The target enemy itself is allowed.
//

function mortarShellPathExists(
    startRow,
    startCol,
    targetRow,
    targetCol,
    friendlyColor
) {
    const dr = targetRow - startRow;
    const dc = targetCol - startCol;

    const absR = Math.abs(dr);
    const absC = Math.abs(dc);

    const stepR = Math.sign(dr);
    const stepC = Math.sign(dc);

    function search(currentRow, currentCol, remainingR, remainingC) {

        if (remainingR === 0 && remainingC === 0) {
            return true;
        }

        // Try moving vertically.
        if (remainingR !== 0) {

            const nextRow = currentRow + stepR;
            const nextCol = currentCol;

            const nextPiece = board[nextRow][nextCol];

            const isTarget =
                nextRow === targetRow &&
                nextCol === targetCol;

            if (
                !nextPiece ||
                nextPiece.color === friendlyColor ||
                isTarget
            ) {
                if (search(
                    nextRow,
                    nextCol,
                    remainingR - 1,
                    remainingC
                )) {
                    return true;
                }
            }
        }

        // Try moving horizontally.
        if (remainingC !== 0) {

            const nextRow = currentRow;
            const nextCol = currentCol + stepC;

            const nextPiece = board[nextRow][nextCol];

            const isTarget =
                nextRow === targetRow &&
                nextCol === targetCol;

            if (
                !nextPiece ||
                nextPiece.color === friendlyColor ||
                isTarget
            ) {
                if (search(
                    nextRow,
                    nextCol,
                    remainingR,
                    remainingC - 1
                )) {
                    return true;
                }
            }
        }

        return false;
    }

    return search(
        startRow,
        startCol,
        absR,
        absC
    );
}