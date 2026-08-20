// =========================================================
// PIECE SOUND SYSTEM
// =========================================================

const pieceSounds = {
    end: new Audio("piecesound/game-end.mp3"),
    capture: new Audio("piecesound/capture.mp3"),
    whiteMove: new Audio("piecesound/move-white.mp3"),
    blackMove: new Audio("piecesound/move-black.mp3"),
    promote: new Audio("piecesound/promote.mp3"),
    check: new Audio("piecesound/check.mp3")
};


function playPieceSound(sound) {
    if (!sound) return;

    console.log("🔊 Playing sound:", sound.src);

    sound.currentTime = 0;

    sound.play().catch(() => {
        console.warn("⚠️ Sound playback was blocked:", sound.src);
    });
}


// =========================================================
// PUBLIC SOUND FUNCTIONS
// =========================================================

function playGameEndSound() {
    playPieceSound(pieceSounds.end);
}

function playCaptureSound() {
    playPieceSound(pieceSounds.capture);
}

function playWhiteMoveSound() {
    playPieceSound(pieceSounds.whiteMove);
}

function playBlackMoveSound() {
    playPieceSound(pieceSounds.blackMove);
}

function playPromoteSound() {
    playPieceSound(pieceSounds.promote);
}

function playCheckSound() {
    playPieceSound(pieceSounds.check);
}


// =========================================================
// CHECKMATE SOUND
// =========================================================
//
// Check sound
//      ↓
// Wait 400 milliseconds
//      ↓
// Game-end sound
//

function playCheckmateSound() {
    playCheckSound();

    setTimeout(() => {
        playGameEndSound();
    }, 400);
}


// =========================================================
// STALEMATE SOUND
// =========================================================
//
// Game-end sound only
//

function playStalemateSound() {
    playGameEndSound();
}