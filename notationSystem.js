<<<<<<< HEAD
// notationSystem.js - Live Spatial Move Log Generator for 16x16 Fairy Chess

let moveHistoryLog = [];
let totalMovesPlayed = 0; // Independent move tracker counting up sequentially: 1, 2, 3, 4...

/**
 * Converts zero-indexed array coordinates back into standard chess alpha-numeric labels (e.g., r15, c0 -> a2)
 */
function getSquareLabel(r, c) {
    const files = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];
    const rank = 16 - r;
    return `${files[c]}${rank}`;
}

/**
 * Formats a single turn event into your precise line notation standard.
 * Increments each individual action sequentially on its own line (1, 2, 3, 4...)
 */

function recordNotationMove(startRow, startCol, targetRow, targetCol, pieceMoved, capturedPiece, isArrowShoot, forcedPromoPieceType = null, originalTargetRow = null, originalTargetCol = null, isExecutionerStrike = false) {
    const startSquare = getSquareLabel(startRow, startCol);
    const landingSquare = getSquareLabel(targetRow, targetCol);
    
    let historicalPieceType = pieceMoved.type;
    if (historicalPieceType === '?' && forcedPromoPieceType) {
        historicalPieceType = forcedPromoPieceType;
    }

    const pieceNotation = `(${historicalPieceType})`;
    let moveString = `${pieceNotation}${startSquare}`;

if (capturedPiece) {
    moveString += "x";
    moveString += landingSquare;

    // Only show the victim's square when the victim is NOT
    // on the landing square. This is needed for special attacks
    // such as Arrow Pawn, Mortar, and Executioner.
    const hasSeparateVictimSquare =
        originalTargetRow !== null &&
        originalTargetCol !== null &&
        (
            originalTargetRow !== targetRow ||
            originalTargetCol !== targetCol
        );

    if (hasSeparateVictimSquare) {
        const victimSquare = getSquareLabel(originalTargetRow, originalTargetCol);
        moveString += `(${capturedPiece.type})${victimSquare}`;
    } else {
        moveString += `(${capturedPiece.type})`;
    }
} else {
    moveString += landingSquare;
}

// Handle Turn Tracking and UI Update
totalMovesPlayed++;

if (!turnRestrictedMode) {
    // SANDBOX MODE:
    // Every move gets its own sequential number.
    moveHistoryLog.push(`${totalMovesPlayed}. ${moveString} --XX--`);
} else {
    // TURN-BASED MODE:
    // White and Black share the same move number.
    const isWhiteTurn = pieceMoved.color === 'white';

    if (isWhiteTurn) {
        moveHistoryLog.push(`${Math.ceil(totalMovesPlayed / 2)}. ${moveString} --XX--`);
    } else {
        if (moveHistoryLog.length > 0) {
            moveHistoryLog[moveHistoryLog.length - 1] =
                moveHistoryLog[moveHistoryLog.length - 1].replace('--XX--', moveString);
        } else {
            moveHistoryLog.push(`${totalMovesPlayed}. --XX-- ${moveString}`);
        }
    }
}

updateNotationConsoleUI();
}

/**
 * Appends a promotion suffix code string onto the end of the last recorded movement sequence text line block
 * Format added: "=(SelectedPiece)"
 */
function appendPromotionToLastMove(selectedPieceType) {
    if (moveHistoryLog.length === 0) return;

    const formattedToken = `=(${selectedPieceType})`;
    const lastIndex = moveHistoryLog.length - 1;
    let activeLine = moveHistoryLog[lastIndex];

    const placeholderIndex = activeLine.indexOf(" --XX--");

    if (placeholderIndex !== -1) {
        activeLine =
            activeLine.slice(0, placeholderIndex) +
            formattedToken +
            activeLine.slice(placeholderIndex);
    } else {
        activeLine += formattedToken;
    }

    moveHistoryLog[lastIndex] = activeLine;
    updateNotationConsoleUI();
}

/**
 * Refreshes the display view container console with formatted scrolling data feeds
 */
function updateNotationConsoleUI() {
    const consoleBox = document.getElementById('notation-textbox');
    if (consoleBox) {
        consoleBox.value = moveHistoryLog.join('\n');
        consoleBox.scrollTop = consoleBox.scrollHeight;
    }
}

/**
 * Resets the history log clean when restarting or loading empty board presets
 */
function clearNotationHistory() {
    moveHistoryLog = [];
    totalMovesPlayed = 0;
    updateNotationConsoleUI();
=======
// notationSystem.js - Live Spatial Move Log Generator for 16x16 Fairy Chess

let moveHistoryLog = [];
let totalMovesPlayed = 0; // Independent move tracker counting up sequentially: 1, 2, 3, 4...

/**
 * Converts zero-indexed array coordinates back into standard chess alpha-numeric labels (e.g., r15, c0 -> a2)
 */
function getSquareLabel(r, c) {
    const files = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];
    const rank = 16 - r;
    return `${files[c]}${rank}`;
}

/**
 * Formats a single turn event into your precise line notation standard.
 * Increments each individual action sequentially on its own line (1, 2, 3, 4...)
 */

function recordNotationMove(startRow, startCol, targetRow, targetCol, pieceMoved, capturedPiece, isArrowShoot, forcedPromoPieceType = null, originalTargetRow = null, originalTargetCol = null, isExecutionerStrike = false) {
    const startSquare = getSquareLabel(startRow, startCol);
    const landingSquare = getSquareLabel(targetRow, targetCol);
    
    let historicalPieceType = pieceMoved.type;
    if (historicalPieceType === '?' && forcedPromoPieceType) {
        historicalPieceType = forcedPromoPieceType;
    }

    const pieceNotation = `(${historicalPieceType})`;
    let moveString = `${pieceNotation}${startSquare}`;

if (capturedPiece) {
    moveString += "x";
    moveString += landingSquare;

    // Only show the victim's square when the victim is NOT
    // on the landing square. This is needed for special attacks
    // such as Arrow Pawn, Mortar, and Executioner.
    const hasSeparateVictimSquare =
        originalTargetRow !== null &&
        originalTargetCol !== null &&
        (
            originalTargetRow !== targetRow ||
            originalTargetCol !== targetCol
        );

    if (hasSeparateVictimSquare) {
        const victimSquare = getSquareLabel(originalTargetRow, originalTargetCol);
        moveString += `(${capturedPiece.type})${victimSquare}`;
    } else {
        moveString += `(${capturedPiece.type})`;
    }
} else {
    moveString += landingSquare;
}

// Handle Turn Tracking and UI Update
totalMovesPlayed++;

if (!turnRestrictedMode) {
    // SANDBOX MODE:
    // Every move gets its own sequential number.
    moveHistoryLog.push(`${totalMovesPlayed}. ${moveString} --XX--`);
} else {
    // TURN-BASED MODE:
    // White and Black share the same move number.
    const isWhiteTurn = pieceMoved.color === 'white';

    if (isWhiteTurn) {
        moveHistoryLog.push(`${Math.ceil(totalMovesPlayed / 2)}. ${moveString} --XX--`);
    } else {
        if (moveHistoryLog.length > 0) {
            moveHistoryLog[moveHistoryLog.length - 1] =
                moveHistoryLog[moveHistoryLog.length - 1].replace('--XX--', moveString);
        } else {
            moveHistoryLog.push(`${totalMovesPlayed}. --XX-- ${moveString}`);
        }
    }
}

updateNotationConsoleUI();
}

/**
 * Appends a promotion suffix code string onto the end of the last recorded movement sequence text line block
 * Format added: "=(SelectedPiece)"
 */
function appendPromotionToLastMove(selectedPieceType) {
    if (moveHistoryLog.length === 0) return;

    const formattedToken = `=(${selectedPieceType})`;
    const lastIndex = moveHistoryLog.length - 1;
    let activeLine = moveHistoryLog[lastIndex];

    const placeholderIndex = activeLine.indexOf(" --XX--");

    if (placeholderIndex !== -1) {
        activeLine =
            activeLine.slice(0, placeholderIndex) +
            formattedToken +
            activeLine.slice(placeholderIndex);
    } else {
        activeLine += formattedToken;
    }

    moveHistoryLog[lastIndex] = activeLine;
    updateNotationConsoleUI();
}

/**
 * Refreshes the display view container console with formatted scrolling data feeds
 */
function updateNotationConsoleUI() {
    const consoleBox = document.getElementById('notation-textbox');
    if (consoleBox) {
        consoleBox.value = moveHistoryLog.join('\n');
        consoleBox.scrollTop = consoleBox.scrollHeight;
    }
}

/**
 * Resets the history log clean when restarting or loading empty board presets
 */
function clearNotationHistory() {
    moveHistoryLog = [];
    totalMovesPlayed = 0;
    updateNotationConsoleUI();
>>>>>>> f6d8f27c080ecb1843df978856e573d29861fa2b
}