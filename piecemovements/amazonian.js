// amazonian.js - Movement rules for: Am

function getAmazonianMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    [...orth, ...diag].forEach(d => limitedHopRaycast(d[0], d[1], false));
                knightMoves.forEach(d => addIfValid(r + d[0], c + d[1]));
                const rosePaths = [
                    [[-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]],
                    [[-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1], [-2,1]],
                    [[1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1], [-2,1], [-1,2]],
                    [[2,1], [2,-1], [1,-2], [-1,-2], [-2,-1], [-2,1], [-1,2], [1,2]]
                ];
                rosePaths.forEach(path => {
                    let currR = r, currC = c;
                    for (let step of path) {
                        currR += step[0]; currC += step[1];
                        if (!onBoard(currR, currC)) break;
                        const target = board[currR][currC];
                        if (!target) moves.push({row: currR, col: currC, isCapture: false});
                        else if (target.color !== piece.color) moves.push({row: currR, col: currC, isCapture: true});
                    }
                });
}

