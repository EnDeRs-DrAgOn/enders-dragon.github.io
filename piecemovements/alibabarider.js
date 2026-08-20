// alibabarider.js - Movement rules for: AlR

function getAlibabariderMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    const alibabaDirections = [[-2,-2], [-2,2], [2,-2], [2,2], [-2,0], [2,0], [0,-2], [0,2]];
                alibabaDirections.forEach(d => {
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

