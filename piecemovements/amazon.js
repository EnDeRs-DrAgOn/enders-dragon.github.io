// amazon.js - Movement rules for: A

function getAmazonMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    [...orth, ...diag].forEach(d => limitedHopRaycast(d[0], d[1], true)); 
                knightMoves.forEach(d => addIfValid(r + d[0], c + d[1]));
}

