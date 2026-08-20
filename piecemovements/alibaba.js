// alibaba.js - Movement rules for: Al

function getAlibabaMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    const alibabaLeaps = [[-2,-2], [-2,2], [2,-2], [2,2], [-2,0], [2,0], [0,-2], [0,2]];
                alibabaLeaps.forEach(d => addIfValid(r + d[0], c + d[1]));
}

