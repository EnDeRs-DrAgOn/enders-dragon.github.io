// zigzagNightrider.js - Movement rules for: ZN

function getZigzagNightriderMoves(r, c, piece, moves, movementType = piece.type) {
    const {
        isWhite, dir,
        isValidMortarTerritory,
        addIfValid,
        raycast,
        limitedHopRaycast,
        orth, diag, knightMoves
    } = createMovementContext(r, c, piece, moves, movementType);
    const znBases = [
                    {dr1: -2, dc1: 1,  dr2: -1, dc2: 2}, {dr1: -1, dc1: 2,  dr2: -2, dc2: 1},  
                    {dr1: 1,  dc1: 2,  dr2: 2,  dc2: 1}, {dr1: 2,  dc1: 1,  dr2: 1,  dc2: 2},  
                    {dr1: 2,  dc1: -1, dr2: 1,  dc2: -2}, {dr1: 1,  dc1: -2, dr2: 2,  dc2: -1}, 
                    {dr1: -1, dc1: -2, dr2: -2, dc2: -1}, {dr1: -2, dc1: -1, dr2: -1, dc2: -2}  
                ];
                znBases.forEach(path => {
                    let currR = r, currC = c, stepCount = 0, blocked = false;
                    while (!blocked) {
                        const dr = (stepCount % 2 === 0) ? path.dr1 : path.dr2;
                        const dc = (stepCount % 2 === 0) ? path.dc1 : path.dc2;
                        const rInc = Math.sign(dr), cInc = Math.sign(dc);
                        let checkR = currR, checkC = currC;
                    
                        while (checkR !== currR + dr || checkC !== currC + dc) {
                            if (checkR !== currR + dr) checkR += rInc;
                            if (checkC !== currC + dc) checkC += cInc;
                            if (!onBoard(checkR, checkC) || (board[checkR][checkC] && (checkR !== currR + dr || checkC !== currC + dc))) {
                                blocked = true; break;
                            }
                        }
                        if (blocked) break;
                        currR += dr; currC += dc;
                        const target = board[currR][currC];
                        if (!target) moves.push({row: currR, col: currC, isCapture: false});
                        else {
                            if (target.color !== piece.color) moves.push({row: currR, col: currC, isCapture: true});
                            blocked = true;
                        }
                        stepCount++;
                    }
                });
}

