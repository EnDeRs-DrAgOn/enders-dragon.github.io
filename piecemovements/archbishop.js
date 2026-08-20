// archbishop.js - Movement rules for: Ab

function getArchbishopMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    diag.forEach(d => raycast(d[0], d[1])); knightMoves.forEach(d => addIfValid(r + d[0], c + d[1]));
}

