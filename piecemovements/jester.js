// jester.js
// Jester copies the movement profile of the last moved piece.
// If there is no previous move, the original engine falls back to King.
// If the previous piece is itself a Jester, the original switch has no J case,
// so it produces no moves; this preserves that behavior.

function getJesterMoves(r, c, piece, moves, movementType = 'J') {
    if (!lastMovedPieceType) {
        return getKingMoves(r, c, piece, moves, 'K');
    }

    if (lastMovedPieceType === 'J') {
        return;
    }

    const generator = movementGenerators[lastMovedPieceType];
    if (typeof generator !== 'function') {
        return;
    }

    generator(r, c, piece, moves, lastMovedPieceType);
}
