// castle.js - Movement rules for: Ca

function getCastleMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    orth.forEach(d => raycast(d[0], d[1])); [[0,-1], [0,1], [-1,-1], [-1,1], [1,-1], [1,1]].forEach(d => addIfValid(r + d[0], c + d[1]));
}

