// ==========================================
// HỆ THỐNG ÂM THANH WEB AUDIO API NÂNG CẤP
// ==========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// 1. Tiếng chém thường
function playSlashSound() {
  initAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(300, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

// 2. Tiếng lửa cháy / Thiêu đốt
function playFireSound() {
  initAudio();
  if (!audioCtx) return;
  const bufferSize = audioCtx.sampleRate * 0.15;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, audioCtx.currentTime);
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  noise.start();
}

// 3. Tiếng Chí Mạng
function playCritSound() {
  initAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.25);
}

// 4. Tiếng Roll trúng thẻ xịn
function playWinSound() {
  initAudio();
  if (!audioCtx) return;
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.08);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + index * 0.08 + 0.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + index * 0.08);
    osc.stop(audioCtx.currentTime + index * 0.08 + 0.2);
  });
}

// 5. Tiếng Phóng Gai / Bắn liên tục (Triều Cường / Xạ thủ)
function playSpikeSound() {
  initAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(200, audioCtx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.08);
}

// 6. Tiếng Hồi Máu (Đức Lương / Mora)
function playHealSound() {
  initAudio();
  if (!audioCtx) return;
  const notes = [440, 554.37, 659.25]; // Âm hưởng phép thuật trong trẻo
  notes.forEach((freq, index) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.06);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime + index * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + index * 0.06 + 0.15);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + index * 0.06);
    osc.stop(audioCtx.currentTime + index * 0.06 + 0.15);
  });
}

// 7. Tiếng Gầm Của Rồng (Final Boss Khiết Nguyễn)
function playDragonRoarSound() {
  initAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  // Tần số trầm, vang mô phỏng tiếng gầm uy lực
  osc.frequency.setValueAtTime(100, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.6);
  gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.6);
}
