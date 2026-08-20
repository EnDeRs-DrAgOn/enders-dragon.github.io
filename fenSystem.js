<<<<<<< HEAD
// fenSystem.js - Isolated FEN State Engine for 16x16 Fairy Chess Variant

// Bi-directional mapping definitions to translate internal objects to string strings
const pieceToFenMap = {
    'white': { 'P':'P', 'BP':'BP', 'AP':'AP', 'K':'K', 'A':'A', 'R':'R', 'Ch':'Ch', 'Ab':'Ab', 'Ba':'Ba', 'Ca':'Ca', 'E':'E', 'Ex':'Ex', 'M':'M', 'ZN':'ZN', 'Af':'Af', 'AfR':'AfR', 'Al':'Al', 'AlR':'AlR', 'Am':'Am', 'J':'J', '0Q':'0Q', '0R':'0R', '0B':'0B', '0N':'0N', '0P':'0P' },
    'black': { 'P':'p', 'BP':'bp', 'AP':'ap', 'K':'k', 'A':'a', 'R':'r', 'Ch':'ch', 'Ab':'ab', 'Ba':'ba', 'Ca':'ca', 'E':'e', 'Ex':'ex', 'M':'m', 'ZN':'zn', 'Af':'af', 'AfR':'afr', 'Al':'al', 'AlR':'alr', 'Am':'am', 'J':'j', '0Q':'0q', '0R':'0r', '0B':'0b', '0N':'0n', '0P':'0p' }
};

const fenToPieceMap = {};
for (const color in pieceToFenMap) {
    for (const type in pieceToFenMap[color]) {
        fenToPieceMap[pieceToFenMap[color][type]] = { type, color };
    }
}

/**
 * Iterates across the 16x16 active matrix and converts piece placements into a FEN string.
 */
function getBoardFEN() {
    let rows = [];
    for (let r = 0; r < boardSize; r++) {
        let rowStr = "";
        let emptySpaces = 0;
        for (let c = 0; c < boardSize; c++) {
            const piece = board[r][c];
            if (!piece) {
                emptySpaces++;
            } else {
                if (emptySpaces > 0) {
                    rowStr += emptySpaces;
                    emptySpaces = 0;
                }
                const token = pieceToFenMap[piece.color][piece.type];
                // Bracket multi-character designations (e.g. (BP), (AlR)) to maintain text reading alignment
                rowStr += token.length > 1 ? `(${token})` : token;
            }
        }
        if (emptySpaces > 0) rowStr += emptySpaces;
        rows.push(rowStr);
    }
    const activeSide = currentTurn === 'white' ? 'w' : 'b';
    return rows.join('/') + ` ${activeSide}`;
}

/**
 * Pushes the live game FEN string value directly down to the text-input UI console element.
 */
function updateFenConsole() {
    const field = document.getElementById('fen-textbox');
    if (field && document.activeElement !== field) {
        field.value = getBoardFEN();
    }
}

/**
 * Translates an incoming FEN payload, clears the board state, and redraws the matrix positions.
 */
function applyFEN(fenString) {
    if (!fenString) return;
    
    // Wipe board matrix track safely
    for (let r = 0; r < boardSize; r++) {
        board[r] = Array(boardSize).fill(null);
    }

    const portions = fenString.trim().split(' ');
    const rows = portions[0].split('/');

    for (let r = 0; r < Math.min(rows.length, boardSize); r++) {
        let c = 0;
        let i = 0;
        const currentLine = rows[r];

        while (i < currentLine.length && c < boardSize) {
            const stepChar = currentLine[i];

            if (!isNaN(stepChar)) {
                let fullNum = stepChar;
                while (i + 1 < currentLine.length && !isNaN(currentLine[i + 1])) {
                    fullNum += currentLine[++i];
                }
                c += parseInt(fullNum, 10);
                i++;
            } else if (stepChar === '(') {
                let internalToken = "";
                i++;
                while (i < currentLine.length && currentLine[i] !== ')') {
                    internalToken += currentLine[i++];
                }
                i++; 
                if (fenToPieceMap[internalToken]) {
                    board[r][c] = { type: fenToPieceMap[internalToken].type, color: fenToPieceMap[internalToken].color };
                }
                c++;
            } else {
                if (fenToPieceMap[stepChar]) {
                    board[r][c] = { type: fenToPieceMap[stepChar].type, color: fenToPieceMap[stepChar].color };
                }
                c++;
                i++;
            }
        }
    }

    // Keep turn engine variables aligned
    if (portions.length > 1) {
        currentTurn = portions[1] === 'w' ? 'white' : 'black';
        if (typeof updateTurnIndicatorUI === 'function') updateTurnIndicatorUI();
    }

    // Clear dynamic UI overlays
    selectedSquare = null;
    legalMoves = [];
    
    if (typeof drawBoard === 'function') {
        drawBoard();
    }
}

// Global UI Input Listeners Setup on DOM Initialization
window.addEventListener('DOMContentLoaded', () => {
    const field = document.getElementById('fen-textbox');
    if (field) {
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                applyFEN(field.value);
                field.blur();
            }
        });
    }
=======
// fenSystem.js - Isolated FEN State Engine for 16x16 Fairy Chess Variant

// Bi-directional mapping definitions to translate internal objects to string strings
const pieceToFenMap = {
    'white': { 'P':'P', 'BP':'BP', 'AP':'AP', 'K':'K', 'A':'A', 'R':'R', 'Ch':'Ch', 'Ab':'Ab', 'Ba':'Ba', 'Ca':'Ca', 'E':'E', 'Ex':'Ex', 'M':'M', 'ZN':'ZN', 'Af':'Af', 'AfR':'AfR', 'Al':'Al', 'AlR':'AlR', 'Am':'Am', 'J':'J', '0Q':'0Q', '0R':'0R', '0B':'0B', '0N':'0N', '0P':'0P' },
    'black': { 'P':'p', 'BP':'bp', 'AP':'ap', 'K':'k', 'A':'a', 'R':'r', 'Ch':'ch', 'Ab':'ab', 'Ba':'ba', 'Ca':'ca', 'E':'e', 'Ex':'ex', 'M':'m', 'ZN':'zn', 'Af':'af', 'AfR':'afr', 'Al':'al', 'AlR':'alr', 'Am':'am', 'J':'j', '0Q':'0q', '0R':'0r', '0B':'0b', '0N':'0n', '0P':'0p' }
};

const fenToPieceMap = {};
for (const color in pieceToFenMap) {
    for (const type in pieceToFenMap[color]) {
        fenToPieceMap[pieceToFenMap[color][type]] = { type, color };
    }
}

/**
 * Iterates across the 16x16 active matrix and converts piece placements into a FEN string.
 */
function getBoardFEN() {
    let rows = [];
    for (let r = 0; r < boardSize; r++) {
        let rowStr = "";
        let emptySpaces = 0;
        for (let c = 0; c < boardSize; c++) {
            const piece = board[r][c];
            if (!piece) {
                emptySpaces++;
            } else {
                if (emptySpaces > 0) {
                    rowStr += emptySpaces;
                    emptySpaces = 0;
                }
                const token = pieceToFenMap[piece.color][piece.type];
                // Bracket multi-character designations (e.g. (BP), (AlR)) to maintain text reading alignment
                rowStr += token.length > 1 ? `(${token})` : token;
            }
        }
        if (emptySpaces > 0) rowStr += emptySpaces;
        rows.push(rowStr);
    }
    const activeSide = currentTurn === 'white' ? 'w' : 'b';
    return rows.join('/') + ` ${activeSide}`;
}

/**
 * Pushes the live game FEN string value directly down to the text-input UI console element.
 */
function updateFenConsole() {
    const field = document.getElementById('fen-textbox');
    if (field && document.activeElement !== field) {
        field.value = getBoardFEN();
    }
}

/**
 * Translates an incoming FEN payload, clears the board state, and redraws the matrix positions.
 */
function applyFEN(fenString) {
    if (!fenString) return;
    
    // Wipe board matrix track safely
    for (let r = 0; r < boardSize; r++) {
        board[r] = Array(boardSize).fill(null);
    }

    const portions = fenString.trim().split(' ');
    const rows = portions[0].split('/');

    for (let r = 0; r < Math.min(rows.length, boardSize); r++) {
        let c = 0;
        let i = 0;
        const currentLine = rows[r];

        while (i < currentLine.length && c < boardSize) {
            const stepChar = currentLine[i];

            if (!isNaN(stepChar)) {
                let fullNum = stepChar;
                while (i + 1 < currentLine.length && !isNaN(currentLine[i + 1])) {
                    fullNum += currentLine[++i];
                }
                c += parseInt(fullNum, 10);
                i++;
            } else if (stepChar === '(') {
                let internalToken = "";
                i++;
                while (i < currentLine.length && currentLine[i] !== ')') {
                    internalToken += currentLine[i++];
                }
                i++; 
                if (fenToPieceMap[internalToken]) {
                    board[r][c] = { type: fenToPieceMap[internalToken].type, color: fenToPieceMap[internalToken].color };
                }
                c++;
            } else {
                if (fenToPieceMap[stepChar]) {
                    board[r][c] = { type: fenToPieceMap[stepChar].type, color: fenToPieceMap[stepChar].color };
                }
                c++;
                i++;
            }
        }
    }

    // Keep turn engine variables aligned
    if (portions.length > 1) {
        currentTurn = portions[1] === 'w' ? 'white' : 'black';
        if (typeof updateTurnIndicatorUI === 'function') updateTurnIndicatorUI();
    }

    // Clear dynamic UI overlays
    selectedSquare = null;
    legalMoves = [];
    
    if (typeof drawBoard === 'function') {
        drawBoard();
    }
}

// Global UI Input Listeners Setup on DOM Initialization
window.addEventListener('DOMContentLoaded', () => {
    const field = document.getElementById('fen-textbox');
    if (field) {
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                applyFEN(field.value);
                field.blur();
            }
        });
    }
>>>>>>> f6d8f27c080ecb1843df978856e573d29861fa2b
});