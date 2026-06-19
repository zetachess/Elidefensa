import { Chessground } from "./vendor/chessground/chessground.min.js";

(function () {
  "use strict";

  const STORAGE_KEY = "goblin-elimina-defensa-run";
  const allLevels = window.levels || [];
  const playableLevels = allLevels.filter((level) => level.fen && level.firstMove && !level.locked);

  const startScreen = document.getElementById("startScreen");
  const playScreen = document.getElementById("playScreen");
  const playButton = document.getElementById("playButton");
  const backButton = document.getElementById("backButton");
  const timeCounter = document.getElementById("timeCounter");
  const lifeCounter = document.getElementById("lifeCounter");
  const streakCounter = document.getElementById("streakCounter");
  const bestCounter = document.getElementById("bestCounter");
  const questionText = document.getElementById("questionText");
  const feedbackMsg = document.getElementById("feedbackMsg");
  const resultPanel = document.getElementById("resultPanel");
  const resultTitle = document.getElementById("resultTitle");
  const resultText = document.getElementById("resultText");
  const boardWrap = document.querySelector(".board-wrap");
  const boardElement = document.getElementById("board");
  const tutorialBadge = document.getElementById("tutorialBadge");
  const particleCanvas = document.getElementById("particles");
  const particleCtx = particleCanvas.getContext("2d");

  let ground = null;
  let audioCtx = null;
  let activeLevel = null;
  let activeIndex = 0;
  let activeMove = null;
  let targetSquare = null;
  let solved = false;
  let streak = 0;
  let timeLeft = 60;
  let timerId = null;
  let autoAdvanceId = null;
  let challengeStartedAt = 0;
  let particles = [];
  let progress = loadProgress();

  function loadProgress() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return {
        bestStreak: Number(stored?.bestStreak || 0),
        perfectSolved: Number(stored?.perfectSolved || 0)
      };
    } catch {
      return { bestStreak: 0, perfectSolved: 0 };
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }

  function updateHud() {
    timeCounter.textContent = String(timeLeft);
    lifeCounter.textContent = "1";
    streakCounter.textContent = String(streak);
    bestCounter.textContent = String(progress.bestStreak);
  }

  function ensureAudio() {
    if (!audioCtx) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return;
      audioCtx = new AudioCtor();
      const master = audioCtx.createGain();
      master.gain.value = 0.42;
      master.connect(audioCtx.destination);
      audioCtx._master = master;
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
  }

  function playTone(freq, duration, type, volume) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(audioCtx._master || audioCtx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  function playNoise(duration, volume, filterFreq) {
    if (!audioCtx) return;
    const sampleRate = audioCtx.sampleRate;
    const buffer = audioCtx.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const source = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    source.buffer = buffer;
    filter.type = "lowpass";
    filter.frequency.value = filterFreq;
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx._master || audioCtx.destination);
    source.start();
    source.stop(audioCtx.currentTime + duration);
  }

  function playSuccessSound() {
    playNoise(0.06, 0.12, 5200);
    playTone(520, 0.11, "triangle", 0.08);
    setTimeout(() => playTone(720, 0.1, "sine", 0.07), 70);
    setTimeout(() => playTone(960, 0.14, "sine", 0.06), 140);
  }

  function playErrorSound() {
    playNoise(0.13, 0.14, 1800);
    playTone(260, 0.12, "sawtooth", 0.07);
    setTimeout(() => playTone(118, 0.16, "square", 0.05), 90);
  }

  function computeFirstMove(level) {
    const chess = new Chess(level.fen);
    const move = chess.move(level.firstMove);
    if (!move || !move.to) {
      throw new Error(`No se pudo calcular la casilla objetivo del reto ${level.id}`);
    }
    return move;
  }

  function orientationFromFen(fen) {
    return fen.split(/\s+/)[1] === "b" ? "black" : "white";
  }

  function showStartScreen() {
    stopTimer();
    clearAutoAdvance();
    activeLevel = null;
    activeMove = null;
    targetSquare = null;
    solved = false;
    streak = 0;
    if (ground) {
      ground.destroy();
      ground = null;
    }
    startScreen.classList.remove("hidden");
    playScreen.classList.add("hidden");
    tutorialBadge.classList.add("hidden");
    feedbackMsg.className = "feedback-msg";
    timeLeft = 60;
    updateHud();
  }

  function startRun() {
    ensureAudio();
    streak = 0;
    timeLeft = 60;
    activeIndex = 0;
    startChallenge(activeIndex);
  }

  function startChallenge(index) {
    const level = playableLevels[index];
    if (!level) {
      resultTitle.textContent = "No hay retos preparados.";
      resultText.textContent = "Añade posiciones a levels.js para continuar.";
      return;
    }

    activeLevel = level;
    activeMove = computeFirstMove(level);
    targetSquare = activeMove.to;
    solved = false;
    challengeStartedAt = performance.now();
    particles = [];
    clearParticles();
    stopTimer();

    startScreen.classList.add("hidden");
    playScreen.classList.remove("hidden");
    tutorialBadge.classList.add("hidden");
    questionText.textContent = "Toca la pieza defensora.";
    resultTitle.textContent = "Toca la pieza defensora.";
    resultText.textContent = "";
    resultPanel.classList.remove("solved");
    feedbackMsg.className = "feedback-msg";
    clearPieceEffects();
    updateHud();

    if (ground) ground.destroy();
    ground = Chessground(boardElement, {
      fen: level.fen,
      orientation: orientationFromFen(level.fen),
      coordinates: true,
      viewOnly: false,
      selectable: { enabled: false },
      draggable: { enabled: false },
      movable: {
        color: undefined,
        free: false,
        showDests: false,
        dests: new Map()
      },
      highlight: {
        lastMove: false,
        check: false,
        custom: new Map()
      },
      drawable: {
        enabled: false,
        visible: true,
        brushes: {
          orange: { key: "orange", color: "#f4a340", opacity: 0.78, lineWidth: 10 }
        }
      },
      animation: { enabled: true, duration: 160 },
      events: {
        select: handleSquareClick
      }
    });

    applyTutorial();
    startTimer();
  }

  function startTimer() {
    updateHud();
    timerId = setInterval(() => {
      if (solved) return;
      timeLeft = Math.max(0, timeLeft - 1);
      updateHud();
      if (timeLeft <= 0) handleTimeout();
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function handleSquareClick(square) {
    if (!activeLevel || solved || !targetSquare) return;
    ensureAudio();

    if (square === targetSquare) {
      handleCorrect(square);
    } else {
      handleWrong(square);
    }
  }

  function handleCorrect(square) {
    solved = true;
    stopTimer();
    tutorialBadge.classList.add("hidden");
    streak += 1;
    const bonus = performance.now() - challengeStartedAt <= 3000 ? 5 : 2;
    timeLeft += bonus;
    progress.perfectSolved += 1;
    progress.bestStreak = Math.max(progress.bestStreak, streak);
    saveProgress();

    setHighlight(square, "correct-square");
    animatePiece(square, "piece-correct", 900);
    showFeedback(`✓ +${bonus}s`, true);
    playSuccessSound();
    spawnParticles(square, 42, "#91e6a5");
    boardWrap.classList.remove("pulse");
    void boardWrap.offsetWidth;
    boardWrap.classList.add("pulse");
    resultTitle.textContent = `Racha ${streak}`;
    resultText.textContent = "";
    updateHud();
    autoAdvanceId = setTimeout(continueRun, 760);
  }

  function handleWrong(square) {
    solved = true;
    stopTimer();
    tutorialBadge.classList.add("hidden");
    setHighlight(square, "wrong-square");
    animatePiece(square, "piece-wrong", 340);
    showFeedback("❌ Fallo", false);
    playErrorSound();
    boardWrap.classList.remove("shake");
    void boardWrap.offsetWidth;
    boardWrap.classList.add("shake");
    resultTitle.textContent = "❌ Fallo";
    resultText.textContent = "";
    streak = 0;
    timeLeft = 60;
    updateHud();
    setTimeout(() => {
      activeIndex = 0;
      startChallenge(activeIndex);
    }, 950);
  }

  function handleTimeout() {
    if (solved) return;
    solved = true;
    stopTimer();
    tutorialBadge.classList.add("hidden");
    showFeedback("⏱️ Tiempo", false);
    playErrorSound();
    boardWrap.classList.remove("shake");
    void boardWrap.offsetWidth;
    boardWrap.classList.add("shake");
    resultTitle.textContent = "⏱️ Tiempo agotado";
    resultText.textContent = "";
    streak = 0;
    timeLeft = 60;
    updateHud();
    setTimeout(() => {
      activeIndex = 0;
      startChallenge(activeIndex);
    }, 950);
  }

  function continueRun() {
    clearAutoAdvance();
    activeIndex += 1;
    if (activeIndex >= playableLevels.length) activeIndex = 0;
    startChallenge(activeIndex);
  }

  function clearAutoAdvance() {
    if (autoAdvanceId) {
      clearTimeout(autoAdvanceId);
      autoAdvanceId = null;
    }
  }

  function setHighlight(square, cssClass) {
    if (!ground) return;
    const custom = new Map();
    if (square && cssClass) custom.set(square, cssClass);
    ground.set({ highlight: { custom } });
  }

  function applyTutorial() {
    if (!ground || !activeLevel || activeLevel.id !== 1 || !activeMove) return;
    const tutorialShapes = [
      { orig: activeMove.from, dest: activeMove.to, brush: "green" },
      { orig: "h3", dest: "h7", brush: "orange" }
    ];
    ground.setAutoShapes(tutorialShapes);
    requestAnimationFrame(() => positionTutorialBadge(activeMove.to));
  }

  function positionTutorialBadge(square) {
    if (!square || activeLevel?.id !== 1) return;
    const point = squarePoint(square);
    tutorialBadge.style.left = `${point.x}%`;
    tutorialBadge.style.top = `${point.y}%`;
    tutorialBadge.classList.remove("hidden");
  }

  function clearPieceEffects() {
    boardElement.querySelectorAll("piece.piece-wrong, piece.piece-correct").forEach((piece) => {
      piece.classList.remove("piece-wrong", "piece-correct");
    });
  }

  function animatePiece(square, className, duration) {
    const piece = findPieceElement(square);
    if (!piece) return;
    syncTransformVars(piece);
    piece.classList.remove("piece-wrong", "piece-correct");
    void piece.offsetWidth;
    piece.classList.add(className);
    setTimeout(() => {
      if (piece.isConnected) piece.classList.remove(className);
    }, duration);
  }

  function findPieceElement(square) {
    return Array.from(boardElement.querySelectorAll("piece")).find((piece) => piece.cgKey === square);
  }

  function syncTransformVars(piece) {
    const transform = piece.style.transform || "";
    const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
    if (!match) return;
    piece.style.setProperty("--cg-tx", match[1].trim());
    piece.style.setProperty("--cg-ty", match[2].trim());
  }

  function showFeedback(message, correct) {
    feedbackMsg.textContent = message;
    feedbackMsg.className = `feedback-msg show ${correct ? "correct" : "wrong"}`;
    clearTimeout(window._goblinFeedbackTimer);
    window._goblinFeedbackTimer = setTimeout(() => {
      feedbackMsg.className = "feedback-msg";
    }, correct ? 1200 : 850);
  }

  function squareCenter(square) {
    const file = square.charCodeAt(0) - 97;
    const rank = Number(square[1]) - 1;
    const white = orientationFromFen(activeLevel.fen) === "white";
    const col = white ? file : 7 - file;
    const row = white ? 7 - rank : rank;
    const size = particleCanvas.width / 8;
    return {
      x: col * size + size / 2,
      y: row * size + size / 2
    };
  }

  function squarePoint(square) {
    const file = square.charCodeAt(0) - 97;
    const rank = Number(square[1]) - 1;
    const white = orientationFromFen(activeLevel.fen) === "white";
    const col = white ? file : 7 - file;
    const row = white ? 7 - rank : rank;
    return {
      x: ((col + 0.5) / 8) * 100,
      y: ((row + 0.5) / 8) * 100
    };
  }

  function resizeParticles() {
    const rect = particleCanvas.getBoundingClientRect();
    const size = Math.max(320, Math.round(rect.width * window.devicePixelRatio));
    if (particleCanvas.width !== size || particleCanvas.height !== size) {
      particleCanvas.width = size;
      particleCanvas.height = size;
    }
  }

  function spawnParticles(square, count, color) {
    resizeParticles();
    const center = squareCenter(square);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.2 + Math.random() * 5.2;
      particles.push({
        x: center.x,
        y: center.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.014 + Math.random() * 0.026,
        size: 3 + Math.random() * 6,
        color
      });
    }
  }

  function clearParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  }

  function tickParticles() {
    if (particles.length) {
      clearParticles();
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.08;
        particle.life -= particle.decay;
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        particleCtx.globalAlpha = particle.life;
        particleCtx.fillStyle = particle.color;
        particleCtx.beginPath();
        particleCtx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        particleCtx.fill();
      }
      particleCtx.globalAlpha = 1;
    }
    requestAnimationFrame(tickParticles);
  }

  playButton.addEventListener("click", startRun);
  backButton.addEventListener("click", showStartScreen);
  window.addEventListener("resize", resizeParticles);

  updateHud();
  tickParticles();
})();
