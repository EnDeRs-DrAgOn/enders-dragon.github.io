// king.js - Movement rules for: K

function getKingMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    [...orth, ...diag].forEach(d => addIfValid(r + d[0], c + d[1]));
}

