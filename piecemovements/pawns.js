// pawns.js - Movement rules for: P, 0P, BP, AP

function getStandardPawnMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    let basePawnLimit = piece.moves === 0 ? 3 : (piece.moves === 1 ? 2 : 1);
                for (let i = 1; i <= basePawnLimit; i++) {
                    let nr = r + (dir * i);
                    if (onBoard(nr, c) && !board[nr][c]) {
                        moves.push({row: nr, col: c, isCapture: false});
                    } else break;
                }
                const standardDiagOffsets = [[dir, -1], [dir, 1]];
                standardDiagOffsets.forEach(d => {
                    let nr = r + d[0], nc = c + d[1];
                    if (onBoard(nr, nc)) {
                        const target = board[nr][nc];
                        if (target && target.color !== piece.color) {
                            moves.push({row: nr, col: nc, isCapture: true});
                        }
                    }
                });
                if (enPassantTarget && enPassantTarget.type === 'P') {
                    if (r + dir === enPassantTarget.row && Math.abs(c - enPassantTarget.col) === 1) {
                        moves.push({ row: enPassantTarget.row, col: enPassantTarget.col, isEnPassant: true, isCapture: true });
                    }
                }
}

function getOriginalPawnMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    let regularPawnLimit = piece.moves === 0 ? 2 : 1;
                for (let i = 1; i <= regularPawnLimit; i++) {
                    let nr = r + (dir * i);
                    if (onBoard(nr, c) && !board[nr][c]) {
                        moves.push({row: nr, col: c, isCapture: false});
                    } else break;
                }
                const regDiagOffsets = [[dir, -1], [dir, 1]];
                regDiagOffsets.forEach(d => {
                    let nr = r + d[0], nc = c + d[1];
                    if (onBoard(nr, nc)) {
                        const target = board[nr][nc];
                        if (target && target.color !== piece.color) {
                            moves.push({row: nr, col: nc, isCapture: true});
                        }
                    }
                });
                if (enPassantTarget && enPassantTarget.type === 'AP') {
                    if (r + dir === enPassantTarget.row && Math.abs(c - enPassantTarget.col) === 1) {
                        moves.push({ row: enPassantTarget.row, col: enPassantTarget.col, isEnPassant: true, isCapture: true });
                    }
                }
}

function getBerolinaPawnMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    let berolinaStepLimit = piece.moves === 0 ? 3 : (piece.moves === 1 ? 2 : 1);
                const forwardDiagonals = [[dir, -1], [dir, 1]];
                forwardDiagonals.forEach(d => {
                    for (let i = 1; i <= berolinaStepLimit; i++) {
                        let nr = r + (d[0] * i);
                        let nc = c + (d[1] * i);
                        if (onBoard(nr, nc) && !board[nr][nc]) {
                            moves.push({row: nr, col: nc, isCapture: false, stepCount: i});
                        } else break;
                    }
                });
                if (onBoard(r + dir, c)) {
                    const target = board[r + dir][c];
                    if (target && target.color !== piece.color) {
                        moves.push({row: r + dir, col: c, isCapture: true});
                    }
                }
                if (enPassantTarget && enPassantTarget.type === 'BP') {
                    if (r + dir === enPassantTarget.row && c === enPassantTarget.col) {
                        moves.push({ row: enPassantTarget.row, col: enPassantTarget.col, isEnPassant: true, isCapture: true });
                    }
                }
}

function getArrowPawnMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    let arrowStepLimit = piece.moves === 0 ? 3 : 2;
                for (let i = 1; i <= arrowStepLimit; i++) {
                    if (onBoard(r + (dir * i), c) && !board[r + (dir * i)][c]) {
                        moves.push({row: r + (dir * i), col: c, isCapture: false});
                    } else break;
                }
                const arrowDiags = [[dir, -1], [dir, 1]];
                arrowDiags.forEach(d => {
                    let targetR = r + (d[0] * 2);
                    let targetC = c + (d[1] * 2);
                    let landR = r + d[0];
                    let landC = c + d[1];
                    if (onBoard(targetR, targetC) && onBoard(landR, landC)) {
                        const enemy = board[targetR][targetC];
                        const landSquare = board[landR][landC];
                        if (enemy && enemy.color !== piece.color && (!landSquare || landSquare === enemy)) {
                            moves.push({row: landR, col: landC, isCapture: true, isArrowShoot: true, targetRow: targetR, targetCol: targetC});
                        }
                    }
                });
                if (enPassantTarget && enPassantTarget.type === '0P') {
                    if (r + dir === enPassantTarget.row && Math.abs(c - enPassantTarget.col) === 1) {
                        moves.push({ row: enPassantTarget.row, col: enPassantTarget.col, isEnPassant: true, isCapture: true });
                    }
                }
}

