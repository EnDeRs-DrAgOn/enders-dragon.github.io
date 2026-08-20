// alfilrider.js - Movement rules for: AfR

function getAlfilriderMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    const alfilDirections = [[-2,-2], [-2,2], [2,-2], [2,2]];
                alfilDirections.forEach(d => {
                    let currR = r, currC = c, stepCount = 1, blocked = false;
                    while (!blocked) {
                        currR += Math.sign(d[0]); currC += Math.sign(d[1]);
                        if (!onBoard(currR, currC)) break;
                        const target = board[currR][currC];
                        if (stepCount % 2 === 0) {
                            if (!target) moves.push({row: currR, col: currC, isCapture: false});
                            else {
                                if (target.color !== piece.color) moves.push({row: currR, col: currC, isCapture: true});
                                blocked = true;
                            }
                        } else { if (target) blocked = true; }
                        stepCount++;
                    }
                });
}

