// ==========================================
// 1. DỮ LIỆU CÁC THẺ BÀI
// 👉 Lưu ý: Nếu ảnh bạn up nằm trong thư mục nào thì chỉnh imgUrl đúng như vậy.
// Ví dụ: 'GAME GIẢ TƯỞNG/1a.gif' hoặc 'assets/1a.gif'
// ==========================================
const CARDS = {
  archer: {
    id: 'archer',
    name: 'Thẻ Xạ Thủ Nguyễn Hoa',
    enemyName: 'Decidueye Nguyễn Hoa',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/724.gif',
    desc: '+5 Tấn công. Mỗi đòn thứ 3 gây thêm 4% HP tối đa mục tiêu (ST Chuẩn).',
    atkBonus: 5
  },
  mage: {
    id: 'mage',
    name: 'Thẻ Thuật Sư Đức Lương',
    enemyName: 'Gardevoir Đức Lương',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/282.gif',
    desc: 'Mỗi 1s hồi 7 máu, lần hồi thứ 5 hồi gấp đôi (14 máu).',
    atkBonus: 0
  },
  tank: {
    id: 'tank',
    name: 'Thẻ Phòng Ngự Dương Võ',
    enemyName: 'Blastoise Dương Võ',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/9.gif',
    desc: '30% Block đòn đánh, phản lại 50% sát thương đó.',
    atkBonus: 0
  },
  phoenix: {
    id: 'phoenix',
    name: 'Thẻ Ngọn Lửa Hữu Phai',
    enemyName: 'Ho-Oh Hữu Phai',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/250.gif',
    desc: 'Mỗi 1s thiêu đốt đối thủ mất 0.3% HP tối đa (ST chuẩn).',
    atkBonus: 0
  },
  crit: {
    id: 'crit',
    name: 'Thẻ Chí Mạng Đăng Khang',
    enemyName: 'Scizor Đăng Khang',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/212.gif',
    desc: 'Mỗi 1s tích 1 tầng (+0.5% crit, max 50 tầng). Đòn chí mạng gây x3 sát thương.',
    atkBonus: 0
  },
  frenzy: {
    id: 'frenzy',
    name: 'Thẻ Tốc Đánh Phạm Đạt',
    enemyName: 'Greninja Phạm Đạt',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/658.gif',
    desc: 'Khi tung đòn có 12% đánh thêm 1 lần và tăng tốc đánh lên x2 (1s/đòn) trong 4s.',
    atkBonus: 0
  }
};

// ==========================================
// 2. LƯU TRỮ TRÊN TRÌNH DUYỆT (LOCALSTORAGE)
// ==========================================
let unlockedCards = JSON.parse(localStorage.getItem('unlockedCards')) || [];
let equippedCardIds = JSON.parse(localStorage.getItem('equippedCardIds')) || [];
let rollTickets = (localStorage.getItem('rollTickets') !== null) ? parseInt(localStorage.getItem('rollTickets')) : 10;

function saveData() {
  localStorage.setItem('unlockedCards', JSON.stringify(unlockedCards));
  localStorage.setItem('equippedCardIds', JSON.stringify(equippedCardIds));
  localStorage.setItem('rollTickets', rollTickets);
}

let player = {
  name: "Nhân Vật Chính",
  maxHp: 150,
  hp: 150,
  baseAtk: 8,
  atk: 8,
  def: 6,
  attackCount: 0,
  healCount: 0,
  critStacks: 0,
  frenzyTimer: 0,
  attackCooldown: 2
};

let enemy = null;
let selectedEnemyTarget = null;
let battleTimer = null;
let isFighting = false;
let tick = 0;

function showPopup(targetType, text, cls) {
  const container = document.getElementById(targetType === 'player' ? 'card-p' : 'card-e');
  const img = document.getElementById(targetType === 'player' ? 'p-img' : 'e-img');
  
  if (cls !== 'dmg-heal') {
    img.classList.remove('shake-hit');
    void img.offsetWidth;
    img.classList.add('shake-hit');
  }

  const pop = document.createElement('div');
  pop.className = `dmg-pop ${cls}`;
  pop.innerText = text;
  container.appendChild(pop);
  setTimeout(() => pop.remove(), 800);
}

function log(msg, type = '') {
  const box = document.getElementById('combat-log');
  const cls = type ? `class="${type}"` : '';
  box.innerHTML += `<div ${cls}>[${tick}s] ${msg}</div>`;
  box.scrollTop = box.scrollHeight;
}

function calcDamage(atk, def) {
  const red = 100 / (100 + def);
  return Math.max(1, Math.round(atk * red));
}

// ==========================================
// 3. CHỌN ĐỐI THỦ & BẤM NÚT BẮT ĐẦU CHIẾN ĐẤU
// ==========================================
function selectEnemy(targetId) {
  if (isFighting) {
    if (!confirm("Trận đấu đang diễn ra, bạn có muốn hủy trận hiện tại để chọn đối thủ mới?")) return;
    clearInterval(battleTimer);
    isFighting = false;
  }

  selectedEnemyTarget = targetId;
  const btnStart = document.getElementById('btn-start-battle');

  if (targetId === 'training') {
    enemy = {
      id: 'training',
      name: 'Bù Nhìn Tập Luyện',
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
      maxHp: 80,
      hp: 80,
      atk: 4,
      def: 2,
      cards: [],
      attackCooldown: 3
    };
  } else {
    const baseCard = CARDS[targetId];
    enemy = {
      id: targetId,
      name: baseCard.enemyName,
      imgUrl: baseCard.imgUrl,
      maxHp: 110,
      hp: 110,
      atk: 7 + baseCard.atkBonus,
      def: 5,
      cards: [targetId],
      attackCooldown: 2
    };
  }

  document.getElementById('e-name').innerText = enemy.name;
  document.getElementById('e-status').innerText = 'Đã chọn - Chờ lệnh đấu';
  document.getElementById('e-img').src = enemy.imgUrl;
  document.getElementById('e-hp-bar').style.width = '100%';
  document.getElementById('e-hp-txt').innerText = `HP: ${enemy.hp} / ${enemy.maxHp}`;
  document.getElementById('e-stats').innerText = `Tấn công: ${enemy.atk} | Giáp: ${enemy.def} | Tốc: ${enemy.attackCooldown}s/đòn`;
  document.getElementById('e-equipped').innerText = (enemy.cards.length > 0) ? CARDS[enemy.cards[0]].name : 'Không';

  btnStart.disabled = false;
  btnStart.innerText = `⚔️ BẮT ĐẦU CHIẾN ĐẤU VỚI ${enemy.name.toUpperCase()}!`;
  log(`🎯 Bạn đã chọn mục tiêu: <b>${enemy.name}</b>. Hãy nhấn nút đỏ bên trên để bắt đầu!`, 'log-sys');
}

function triggerStartBattle() {
  if (!enemy || isFighting) return;

  isFighting = true;
  tick = 0;
  document.getElementById('combat-log').innerHTML = '';

  let totalBonusAtk = 0;
  equippedCardIds.forEach(id => {
    if (CARDS[id]) totalBonusAtk += CARDS[id].atkBonus;
  });

  player.hp = player.maxHp;
  player.atk = player.baseAtk + totalBonusAtk;
  player.attackCount = 0;
  player.healCount = 0;
  player.critStacks = 0;
  player.frenzyTimer = 0;
  player.attackCooldown = 2;

  enemy.hp = enemy.maxHp;
  enemy.attackCount = 0;
  enemy.healCount = 0;
  enemy.critStacks = 0;
  enemy.frenzyTimer = 0;

  document.getElementById('e-status').innerText = 'Đang giao tranh';
  const btnStart = document.getElementById('btn-start-battle');
  btnStart.disabled = true;
  btnStart.innerText = `⚔️ ĐANG CHIẾN ĐẤU VỚI ${enemy.name.toUpperCase()}...`;

  log(`🚨 <b>TRẬN ĐẤU BẮT ĐẦU!</b>`, 'log-sys');
  updateUI();

  battleTimer = setInterval(battleTick, 1000);
}

function battleTick() {
  tick++;

  if (player.frenzyTimer > 0) {
    player.frenzyTimer--;
    if (player.frenzyTimer === 0) {
      player.attackCooldown = 2;
      log("⏳ Bạn kết thúc trạng thái Tăng Tốc Đánh.", 'log-sys');
    }
  }
  if (enemy.frenzyTimer > 0) {
    enemy.frenzyTimer--;
    if (enemy.frenzyTimer === 0) {
      enemy.attackCooldown = 2;
      log(`⏳ ${enemy.name} kết thúc trạng thái Tăng Tốc Đánh.`, 'log-sys');
    }
  }

  applyPerSecond(player, enemy, equippedCardIds, 'player', 'enemy', 'log-p');
  applyPerSecond(enemy, player, enemy.cards, 'enemy', 'player', 'log-e');

  if (checkCombatEnd()) return;

  if (tick % player.attackCooldown === 0) {
    executeStrikeSeries(player, enemy, equippedCardIds, 'player', 'enemy', 'Bạn', 'log-p');
    if (checkCombatEnd()) return;
  }

  if (tick % enemy.attackCooldown === 0) {
    executeStrikeSeries(enemy, player, enemy.cards, 'enemy', 'player', enemy.name, 'log-e');
    if (checkCombatEnd()) return;
  }

  updateUI();
}

function applyPerSecond(source, target, cardIds, srcType, tarType, logCls) {
  if (cardIds.includes('mage')) {
    source.healCount++;
    let heal = (source.healCount % 5 === 0) ? 14 : 7;
    let old = source.hp;
    source.hp = Math.min(source.maxHp, source.hp + heal);
    showPopup(srcType, `+${source.hp - old}`, 'dmg-heal');
    log(`✨ [${source.name}] hồi <b>+${source.hp - old} HP</b>.`, logCls);
  }

  if (cardIds.includes('phoenix')) {
    let burn = Math.max(1, Math.round(target.maxHp * 0.003));
    target.hp = Math.max(0, target.hp - burn);
    showPopup(tarType, `-${burn}`, 'dmg-true');
    log(`🔥 [${source.name}] thiêu đốt đối thủ mất <b>${burn}</b> ST chuẩn.`, logCls);
  }

  if (cardIds.includes('crit') && source.critStacks < 50) {
    source.critStacks++;
  }
}

function executeStrikeSeries(atkObj, defObj, cardIds, atkType, defType, atkName, logCls) {
  strikeOnce(atkObj, defObj, cardIds, atkType, defType, atkName, logCls);
  if (defObj.hp <= 0) return;

  if (cardIds.includes('frenzy') && Math.random() < 0.12) {
    log(`⚡ <b>[${atkName}] KÍCH HOẠT TỐC ĐÁNH PHẠM ĐẠT!</b> Đánh thêm 1 đòn & tăng tốc 1s/đòn trong 4s!`, 'log-frenzy');
    atkObj.frenzyTimer = 4;
    atkObj.attackCooldown = 1;
    strikeOnce(atkObj, defObj, cardIds, atkType, defType, atkName, logCls);
  }
}

function strikeOnce(atkObj, defObj, cardIds, atkType, defType, atkName, logCls) {
  atkObj.attackCount++;
  let raw = calcDamage(atkObj.atk, defObj.def);

  let isCrit = false;
  if (cardIds.includes('crit')) {
    let rate = (atkObj.critStacks * 0.5) / 100;
    if (Math.random() < rate) {
      isCrit = true;
      raw *= 3;
    }
  }

  const defCardIds = (defObj === player) ? equippedCardIds : defObj.cards;
  if (defCardIds.includes('tank') && Math.random() < 0.3) {
    let reflect = Math.round(raw * 0.5);
    atkObj.hp = Math.max(0, atkObj.hp - reflect);
    showPopup(defType, `BLOCK!`, 'dmg-true');
    showPopup(atkType, `-${reflect}`, 'dmg-norm');
    log(`🛡️ [${defObj.name}] BLOCK & phản lại <b>${reflect}</b> sát thương!`, 'log-sys');
    return;
  }

  defObj.hp = Math.max(0, defObj.hp - raw);
  if (isCrit) {
    showPopup(defType, `💥 -${raw}`, 'dmg-crit');
    log(`💥 <b>[CHÍ MẠNG x3]</b> ${atkName} gây <b>${raw}</b> ST!`, 'log-crit');
  } else {
    showPopup(defType, `-${raw}`, 'dmg-norm');
    log(`🗡️ ${atkName} gây <b>${raw}</b> sát thương.`, logCls);
  }

  if (cardIds.includes('archer') && atkObj.attackCount % 3 === 0) {
    let trueDmg = Math.max(1, Math.round(defObj.maxHp * 0.04));
    defObj.hp = Math.max(0, defObj.hp - trueDmg);
    setTimeout(() => showPopup(defType, `🎯 -${trueDmg}`, 'dmg-true'), 120);
    log(`🎯 [${atkObj.name}] Xạ Thủ: Bắn xuyên giáp <b>+${trueDmg}</b> ST Chuẩn!`, 'log-sys');
  }
}

function checkCombatEnd() {
  const btnStart = document.getElementById('btn-start-battle');

  if (player.hp <= 0) {
    clearInterval(battleTimer);
    isFighting = false;
    log("💀 <b>Bạn đã thất bại! Hãy trang bị thêm thẻ bài hoặc luyện tập thêm.</b>", 'log-e');
    btnStart.disabled = false;
    btnStart.innerText = `⚔️ TÁI ĐẤU VỚI ${enemy.name.toUpperCase()}`;
    updateUI();
    return true;
  }
  if (enemy && enemy.hp <= 0) {
    clearInterval(battleTimer);
    isFighting = false;
    rollTickets += 10;
    saveData();
    log(`🎉 <b>Bạn đã đánh bại ${enemy.name}! Nhận được +10 vé Roll thẻ bài!</b>`, 'log-sys');
    btnStart.disabled = false;
    btnStart.innerText = `⚔️ TÁI ĐẤU VỚI ${enemy.name.toUpperCase()}`;
    updateUI();
    return true;
  }
  return false;
}

// ==========================================
// 4. ROLL GACHA & HIỂN THỊ POPUP
// ==========================================
function rollCard(times) {
  if (rollTickets < times) {
    alert(`Bạn cần có ít nhất ${times} vé để quay! Hãy khiêu chiến thắng đối thủ để nhận thêm vé.`);
    return;
  }

  rollTickets -= times;
  const allCardKeys = Object.keys(CARDS);
  const results = [];

  for (let i = 0; i < times; i++) {
    if (Math.random() < 0.25) {
      const randomKey = allCardKeys[Math.floor(Math.random() * allCardKeys.length)];
      const isNew = !unlockedCards.includes(randomKey);
      if (isNew) {
        unlockedCards.push(randomKey);
      }
      results.push({ win: true, name: CARDS[randomKey].name, isNew: isNew });
    } else {
      results.push({ win: false, name: 'Trượt rồi...' });
    }
  }

  saveData();
  renderCards();
  updateUI();

  // Bật Popup kết quả
  const modal = document.getElementById('gacha-modal');
  const container = document.getElementById('gacha-content');
  container.innerHTML = '';

  results.forEach(res => {
    const item = document.createElement('div');
    item.className = `gacha-item ${res.win ? 'win' : ''}`;
    item.innerHTML = res.win 
      ? `⭐ ${res.name} <br><small>${res.isNew ? '(MỚI!)' : '(Trùng)'}</small>`
      : `💨 Trượt`;
    container.appendChild(item);
  });

  modal.style.display = 'flex';
}

function closeGachaModal() {
  document.getElementById('gacha-modal').style.display = 'none';
}

function toggleEquip(cardId) {
  if (!unlockedCards.includes(cardId)) return;

  const idx = equippedCardIds.indexOf(cardId);
  if (idx > -1) {
    equippedCardIds.splice(idx, 1);
    log(`Đã gỡ thẻ: ${CARDS[cardId].name}`, 'log-sys');
  } else {
    if (equippedCardIds.length >= 3) {
      alert("Bạn chỉ có thể mang tối đa 3 thẻ cùng lúc! Hãy gỡ bớt 1 thẻ trước.");
      return;
    }
    equippedCardIds.push(cardId);
    log(`Đã trang bị: ${CARDS[cardId].name}`, 'log-sys');
  }

  saveData();
  renderCards();
  updateUI();
}

function renderCards() {
  const pool = document.getElementById('roll-pool');
  pool.innerHTML = '';

  for (let key in CARDS) {
    const c = CARDS[key];
    const isUnlocked = unlockedCards.includes(key);
    const isEquipped = equippedCardIds.includes(key);

    const cardDiv = document.createElement('div');
    cardDiv.className = `roll-card ${isUnlocked ? '' : 'locked'} ${isEquipped ? 'active' : ''}`;
    cardDiv.innerHTML = `
      <div>
        <img src="${c.imgUrl}" alt="${c.name}">
        <h4>${c.name}</h4>
        <p>${c.desc}</p>
      </div>
      <div>
        ${isUnlocked 
          ? `<button onclick="toggleEquip('${c.id}')" style="background: ${isEquipped ? '#dc2626' : '#2563eb'}">
              ${isEquipped ? 'Gỡ Bỏ' : 'Trang Bị'}
             </button>`
          : `<span style="font-size: 11px; color: #64748b;">Chưa mở khóa</span>`
        }
      </div>
    `;
    pool.appendChild(cardDiv);
  }
}

function updateUI() {
  document.getElementById('roll-tickets').innerText = rollTickets;

  document.getElementById('p-hp-bar').style.width = (player.hp / player.maxHp * 100) + '%';
  document.getElementById('p-hp-txt').innerText = `HP: ${player.hp} / ${player.maxHp}`;
  document.getElementById('p-stats').innerText = `Tấn công: ${player.atk} | Giáp: ${player.def} | Tốc: ${player.attackCooldown}s/đòn`;

  const eqList = document.getElementById('p-equipped-list');
  if (equippedCardIds.length === 0) {
    eqList.innerHTML = '<span style="color: #64748b;">Chưa trang bị thẻ nào (Tối đa 3)</span>';
  } else {
    eqList.innerHTML = equippedCardIds.map(id => `<span class="equipped-tag">${CARDS[id].name}</span>`).join(' ');
  }

  if (enemy) {
    document.getElementById('e-hp-bar').style.width = Math.max(0, (enemy.hp / enemy.maxHp * 100)) + '%';
    document.getElementById('e-hp-txt').innerText = `HP: ${enemy.hp} / ${enemy.maxHp}`;
  }
}

function resetGame() {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ thẻ bài và vé để chơi lại từ đầu không?")) {
    localStorage.clear();
    location.reload();
  }
}

renderCards();
updateUI();
