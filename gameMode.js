// gameMode.js - State Controller for Mechanical Lever Toggle

let currentTurn = 'white'; 
let turnRestrictedMode = false; // Off / Sandbox mode by default

function isCorrectTurn(pieceColor) {
    if (!turnRestrictedMode) return true; 
    return pieceColor === currentTurn;
}

function advanceTurnState() {
    if (!turnRestrictedMode) return; 
    currentTurn = (currentTurn === 'white') ? 'black' : 'white';
    updateTurnIndicatorUI();
}

function updateTurnIndicatorUI() {
    const knob = document.getElementById('lever-knob');
    if (!knob) return;

if (!turnRestrictedMode) {
        // OFF MODE (Sandbox) -> Slid down to the bottom
        knob.style.top = '55px';
        knob.innerText = 'S';
        knob.style.color = '#ffaa00'; 
    } else {
        // ON MODE (Turn Rules) -> Slid up to the top
        knob.style.top = '5px';
        knob.innerText = 'T';
        knob.style.color = '#66ccff'; 
    }
}

function toggleGameModeRules() {
    turnRestrictedMode = !turnRestrictedMode;
    if (turnRestrictedMode) {
        currentTurn = 'white';
    }
    
    selectedSquare = null;
    legalMoves = [];
    
    updateTurnIndicatorUI();
    if (typeof drawBoard === 'function') {
        drawBoard();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    updateTurnIndicatorUI();
});	