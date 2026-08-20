// baronet.js - Movement rules for: Ba

function getBaronetMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    knightMoves.forEach(d => addIfValid(r + d[0], c + d[1])); [...orth, ...diag].forEach(d => addIfValid(r + d[0], c + d[1]));
}

