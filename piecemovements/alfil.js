// alfil.js - Movement rules for: Af

function getAlfilMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    [[-2,-2], [-2,2], [2,-2], [2,2]].forEach(d => addIfValid(r + d[0], c + d[1]));
}

