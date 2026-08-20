// rose.js - Movement rules for: R

function getRoseMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    // A Rose is a 'Nightrider' that moves in circular paths.
        // There are 8 possible starting circles (directions).
        const roseDirections = [
            [[-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]], // Clockwise 1
            [[-2,-1], [-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2]], // Clockwise 2 (Offset)
            [[-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1], [-2,1]], // Clockwise 3 (Offset)
            [[1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1], [-2,1], [-1,2]], // Clockwise 4 (Offset)
            [[-2,-1], [-1,-2], [1,-2], [2,-1], [2,1], [1,2], [-1,2], [-2,1]], // Counter-Clockwise 1
            [[-1,-2], [1,-2], [2,-1], [2,1], [1,2], [-1,2], [-2,1], [-2,-1]], // Counter-Clockwise 2
            [[1,-2], [2,-1], [2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2]], // Counter-Clockwise 3
            [[2,-1], [2,1], [1,2], [-1,2], [-2,1], [-2,-1], [-1,-2], [1,-2]]  // Counter-Clockwise 4
        ];

        roseDirections.forEach(basePath => {
            let currR = r;
            let currC = c;
            let stepIndex = 0;

            // A 'Rider' continues until it hits something or the board edge
            // We use a high number or true, because onBoard/target logic handles the break.
            while (true) {
                // Use modulo (%) to loop the 8-step path indefinitely (Circular Rider)
                const step = basePath[stepIndex % 8];
                currR += step[0];
                currC += step[1];

                if (!onBoard(currR, currC)) break;

                const target = board[currR][currC];
                if (!target) {
                    moves.push({ row: currR, col: currC, isCapture: false });
                } else {
                    if (target.color !== piece.color) {
                        moves.push({ row: currR, col: currC, isCapture: true });
                    }
                    break; // Path is blocked by a piece
                }

                stepIndex++;
            
                // Safety: If it somehow returns to starting square, stop to prevent infinite loop
                if (currR === r && currC === c) break;
            }
        });
}

