// movements.js
// Dispatcher only. Individual movement rules live in their own files.

const movementGenerators = {
    P: getStandardPawnMoves,
    '0P': getOriginalPawnMoves,
    BP: getBerolinaPawnMoves,
    AP: getArrowPawnMoves,

    K: getKingMoves,
    B: getBishopMoves,
    E: getElephantMoves,
    A: getAmazonMoves,
    Ch: getChancellorMoves,
    Ab: getArchbishopMoves,
    Ba: getBaronetMoves,
    Ca: getCastleMoves,
    Ex: getExecutionerMoves,
    Af: getAlfilMoves,
    Al: getAlibabaMoves,
    Am: getAmazonianMoves,
    J: getJesterMoves,
    ZN: getZigzagNightriderMoves,
    AfR: getAlfilriderMoves,
    AlR: getAlibabariderMoves,
    R: getRoseMoves,
    M: getMortarMoves,

    '0Q': getOriginalQueenMoves,
    '0R': getOriginalRookMoves,
    '0N': getOriginalKnightMoves,
    '0B': getOriginalBishopMoves
};

function getPseudoLegalMoves(r, c) {
    const piece = board[r][c];
    if (!piece || piece.type === '?') return [];

    const operationalType =
        piece.type === 'J'
            ? (lastMovedPieceType || 'K')
            : piece.type;

    const generator = movementGenerators[operationalType];
    if (typeof generator !== 'function') {
        console.warn(`No movement generator registered for piece type "${operationalType}"`);
        return [];
    }

    const moves = [];
    generator(r, c, piece, moves, operationalType);
    return moves;
}
