const CARDS = {
  archer: {
    id: 'archer',
    name: 'Thẻ Xạ Thủ Nguyễn Hoa',
    enemyName: 'Decidueye Nguyễn Hoa',
    imgUrl: 'ASSET/mèo con.gif',
    desc: '+5 Tấn công. Mỗi đòn thứ 3 gây thêm 4% HP tối đa mục tiêu (ST Chuẩn).',
    atkBonus: 5,
    unlocked: false
  },
  mage: {
    id: 'mage',
    name: 'Thẻ Thuật Sư Đức Lương',
    enemyName: 'Gardevoir Đức Lương',
    imgUrl: 'asset/Thuật Sư.gif',
    desc: 'Mỗi 1s hồi 7 máu, lần hồi thứ 5 hồi gấp đôi (14 máu).',
    atkBonus: 0,
    unlocked: false
  },
  tank: {
    id: 'tank',
    name: 'Thẻ Phòng Ngự Dương Võ',
    enemyName: 'Blastoise Dương Võ',
    imgUrl: 'ASSET/phòng thủ.gif',
    desc: '30% Block đòn đánh, phản lại 50% sát thương đó.',
    atkBonus: 0,
    unlocked: false
  },
  phoenix: {
    id: 'phoenix',
    name: 'Thẻ Ngọn Lửa Hữu Phai',
    enemyName: 'Ho-Oh Hữu Phai',
    imgUrl: 'ASSET/main.gif',
    desc: 'Mỗi 1s thiêu đốt đối thủ mất 0.3% HP tối đa (ST chuẩn).',
    atkBonus: 0,
    unlocked: false
  },
  crit: {
    id: 'crit',
    name: 'Thẻ Chí Mạng Đăng Khang',
    enemyName: 'Scizor Đăng Khang',
    imgUrl: 'ASSET/bạo kích.gif',
    desc: 'Mỗi 1s tích 1 tầng (+0.5% crit, max 50 tầng). Đòn chí mạng gây x3 sát thương.',
    atkBonus: 0,
    unlocked: false
  },
  frenzy: {
    id: 'frenzy',
    name: 'Thẻ Tốc Đánh Phạm Đạt',
    enemyName: 'Greninja Phạm Đạt',
    imgUrl: 'ASSET/tốc đánh.gif',
    desc: 'Khi tung đòn có 12% đánh thêm 1 lần nữa và tăng tốc đánh lên x2 (1s/đòn) trong 4s.',
    atkBonus: 0,
    unlocked: false
  }
};

let player = {
  name: "Nhân Vật Chính",
  maxHp: 100,
  hp: 100,
  baseAtk: 5,
  atk: 5,
  def: 5,
  card: null,
  attackCount: 0,
  healCount: 0,
  critStacks: 0,
  frenzyTimer: 0,
  attackCooldown: 2
};

let enemy = null;
let battleTimer = null;
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

function startBattle(cardId) {
  if (battleTimer) clearInterval(battleTimer);
  tick = 0;
  document.getElementById('combat-log').innerHTML = '';

  player.hp = player.maxHp;
  player.atk = player.baseAtk + (player.card ? player.card.atkBonus : 0);
  player.attackCount = 0;
  player.healCount = 0;
  player.critStacks = 0;
  player.frenzyTimer = 0;
  player.attackCooldown = 2;

  const baseCard = CARDS[cardId];
  enemy = {
    id: cardId,
    name: baseCard.enemyName,
    imgUrl: baseCard.imgUrl,
    maxHp: 120,
    hp: 120,
    atk: 6 + baseCard.atkBonus,
    def: 5,
    card: baseCard,
    attackCount: 0,
    healCount: 0,
    critStacks: 0,
    frenzyTimer: 0,
    attackCooldown: 2
  };

  document.getElementById('e-img').src = enemy.imgUrl;
  log(`⚔️ Bắt đầu khiêu chiến với <b>${enemy.name}</b>!`, 'log-sys');
  updateUI();

  battleTimer = setInterval(battleTick, 1000);
}

function battleTick() {
  tick++;

  if (player.frenzyTimer > 0) {
    player.frenzyTimer--;
    if (player.frenzyTimer === 0) {
      player.attackCooldown = 2;
      log("⏳ Bạn đã kết thúc trạng thái Tăng Tốc Đánh.", 'log-sys');
    }
  }
  if (enemy.frenzyTimer > 0) {
    enemy.frenzyTimer--;
    if (enemy.frenzyTimer === 0) {
      enemy.attackCooldown = 2;
      log(`⏳ ${enemy.name} kết thúc trạng thái Tăng Tốc Đánh.`, 'log-sys');
    }
  }

  applyPerSecondEffects(player, enemy, 'player', 'enemy', 'log-p');
  applyPerSecondEffects(enemy, player, 'enemy', 'player', 'log-e');

  if (checkCombatEnd()) return;

  if (tick % player.attackCooldown === 0) {
    executeAttack(player, enemy, 'player', 'enemy', 'Bạn', 'log-p');
    if (checkCombatEnd()) return;
  }

  if (tick % enemy.attackCooldown === 0) {
    executeAttack(enemy, player, 'enemy', 'player', enemy.name, 'log-e');
    if (checkCombatEnd()) return;
  }

  updateUI();
}

function applyPerSecondEffects(source, target, sourceType, targetType, logClass) {
  if (!source.card) return;

  if (source.card.id === 'mage') {
    source.healCount++;
    let healAmount = (source.healCount % 5 === 0) ? 14 : 7;
    let oldHp = source.hp;
    source.hp = Math.min(source.maxHp, source.hp + healAmount);
    showPopup(sourceType, `+${source.hp - oldHp}`, 'dmg-heal');
    log(`✨ [${source.name}] hồi <b>+${source.hp - oldHp} HP</b> (${source.healCount % 5 === 0 ? 'Hồi x2' : 'Hồi 7'}).`, logClass);
  }

  if (source.card.id === 'phoenix') {
    let burnDmg = Math.max(1, Math.round(target.maxHp * 0.003));
    target.hp = Math.max(0, target.hp - burnDmg);
    showPopup(targetType, `-${burnDmg}`, 'dmg-true');
    log(`🔥 [${source.name}] thiêu đốt đối thủ mất <b>${burnDmg}</b> ST chuẩn.`, logClass);
  }

  if (source.card.id === 'crit' && source.critStacks < 50) {
    source.critStacks++;
    if (source.critStacks % 5 === 0 || source.critStacks === 50) {
      log(`🎯 [${source.name}] tích tầng Chí Mạng: <b>${source.critStacks}/50</b> (${(source.critStacks * 0.5).toFixed(1)}%).`, 'log-crit');
    }
  }
}

function executeAttack(attacker, defender, attackerType, defenderType, attackerName, logClass) {
  triggerStrike(attacker, defender, attackerType, defenderType, attackerName, logClass);
  if (defender.hp <= 0) return;

  if (attacker.card && attacker.card.id === 'frenzy') {
    if (Math.random() < 0.12) {
      log(`⚡ <b>[${attackerName}] KÍCH HOẠT TỐC ĐÁNH PHẠM ĐẠT!</b> Đánh thêm 1 đòn & tăng tốc 1s/đòn trong 4s!`, 'log-frenzy');
      attacker.frenzyTimer = 4;
      attacker.attackCooldown = 1;
      triggerStrike(attacker, defender, attackerType, defenderType, attackerName, logClass);
    }
  }
}

function triggerStrike(attacker, defender, attackerType, defenderType, attackerName, logClass) {
  attacker.attackCount++;
  let rawDmg = calcDamage(attacker.atk, defender.def);

  let isCrit = false;
  if (attacker.card && attacker.card.id === 'crit') {
    let critRate = (attacker.critStacks * 0.5) / 100;
    if (Math.random() < critRate) {
      isCrit = true;
      rawDmg = rawDmg * 3;
    }
  }

  if (defender.card && defender.card.id === 'tank') {
    if (Math.random() < 0.3) {
      let reflectDmg = Math.round(rawDmg * 0.5);
      attacker.hp = Math.max(0, attacker.hp - reflectDmg);
      showPopup(defenderType, `BLOCK!`, 'dmg-true');
      showPopup(attackerType, `-${reflectDmg}`, 'dmg-norm');
      log(`🛡️ [${defender.name}] <b>BLOCK thành công!</b> Phản <b>${reflectDmg}</b> sát thương lên ${attackerName}!`, 'log-sys');
      return;
    }
  }

  defender.hp = Math.max(0, defender.hp - rawDmg);
  if (isCrit) {
    showPopup(defenderType, `💥 -${rawDmg}`, 'dmg-crit');
    log(`💥 <b>[CHÍ MẠNG x3]</b> ${attackerName} gây bạo kích <b>${rawDmg}</b> sát thương!`, 'log-crit');
  } else {
    showPopup(defenderType, `-${rawDmg}`, 'dmg-norm');
    log(`🗡️ ${attackerName} tấn công gây <b>${rawDmg}</b> sát thương.`, logClass);
  }

  if (attacker.card && attacker.card.id === 'archer' && attacker.attackCount % 3 === 0) {
    let trueDmg = Math.max(1, Math.round(defender.maxHp * 0.04));
    defender.hp = Math.max(0, defender.hp - trueDmg);
    setTimeout(() => showPopup(defenderType, `🎯 -${trueDmg}`, 'dmg-true'), 150);
    log(`🎯 [${attacker.name}] Xạ Thủ (Đòn 3): Bắn xuyên giáp gây <b>+${trueDmg}</b> ST Chuẩn!`, 'log-sys');
  }
}

function checkCombatEnd() {
  if (player.hp <= 0) {
    clearInterval(battleTimer);
    log("💀 <b>Bạn đã thất bại! Hãy thử đổi chiến thuật.</b>", 'log-e');
    updateUI();
    return true;
  }
  if (enemy && enemy.hp <= 0) {
    clearInterval(battleTimer);
    log(`🎉 <b>Bạn đã đánh bại ${enemy.name}! Đã mở khóa Roll ${enemy.card.name}!</b>`, 'log-sys');
    CARDS[enemy.id].unlocked = true;
    renderRollPool();
    updateUI();
    return true;
  }
  return false;
}

function rollAndEquip(cardId) {
  const card = CARDS[cardId];
  if (!card.unlocked) return;

  player.card = card;
  player.atk = player.baseAtk + card.atkBonus;
  log(`🎲 Đã trang bị: <b>${card.name}</b>!`, 'log-sys');
  updateUI();
}

function renderRollPool() {
  const pool = document.getElementById('roll-pool');
  pool.innerHTML = '';
  for (let key in CARDS) {
    const c = CARDS[key];
    const cardDiv = document.createElement('div');
    cardDiv.className = `roll-card ${c.unlocked ? '' : 'locked'}`;
    cardDiv.innerHTML = `
      <div>
        <img src="${c.imgUrl}" alt="${c.name}">
        <h4>${c.name}</h4>
        <p>${c.desc}</p>
      </div>
      <button ${c.unlocked ? '' : 'disabled'} onclick="rollAndEquip('${c.id}')">
        ${c.unlocked ? 'Trang Bị Thẻ' : 'Khóa'}
      </button>
    `;
    pool.appendChild(cardDiv);
  }
}

function updateUI() {
  document.getElementById('p-hp-bar').style.width = (player.hp / player.maxHp * 100) + '%';
  document.getElementById('p-hp-txt').innerText = `HP: ${player.hp} / ${player.maxHp}`;
  document.getElementById('p-stats').innerText = `Tấn công: ${player.atk} | Phòng thủ: ${player.def} | Tốc đánh: ${player.attackCooldown}s/đòn`;
  document.getElementById('p-equipped').innerText = `Thẻ trang bị: ${player.card ? player.card.name : 'Chưa có'}`;

  if (enemy) {
    document.getElementById('e-name').innerText = enemy.name;
    document.getElementById('e-status').innerText = enemy.hp > 0 ? 'Đang đấu' : 'Đã gục';
    document.getElementById('e-hp-bar').style.width = Math.max(0, (enemy.hp / enemy.maxHp * 100)) + '%';
    document.getElementById('e-hp-txt').innerText = `HP: ${enemy.hp} / ${enemy.maxHp}`;
    document.getElementById('e-stats').innerText = `Tấn công: ${enemy.atk} | Phòng thủ: ${enemy.def} | Tốc đánh: ${enemy.attackCooldown}s/đòn`;
    document.getElementById('e-equipped').innerText = `Kỹ năng mang theo: ${enemy.card.name}`;
  }
}

renderRollPool();
updateUI();
// ==========================================
// 1. DỮ LIỆU CÁC THẺ BÀI
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
// 2. HỆ THỐNG LƯU TRỮ VĨNH VIỄN (LOCALSTORAGE)
// ==========================================
let unlockedCards = JSON.parse(localStorage.getItem('unlockedCards')) || [];
let equippedCardIds = JSON.parse(localStorage.getItem('equippedCardIds')) || [];
let rollTickets = parseInt(localStorage.getItem('rollTickets')) || 10; // Tặng sẵn 10 vé khởi đầu

function saveData() {
  localStorage.setItem('unlockedCards', JSON.stringify(unlockedCards));
  localStorage.setItem('equippedCardIds', JSON.stringify(equippedCardIds));
  localStorage.setItem('rollTickets', rollTickets);
}

// Thông số nhân vật chính (được tăng chỉ số ban đầu)
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
let battleTimer = null;
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
// 3. CHIẾN ĐẤU & KHIÊU CHIẾN
// ==========================================
function startBattle(targetId) {
  if (battleTimer) clearInterval(battleTimer);
  tick = 0;
  document.getElementById('combat-log').innerHTML = '';

  // Tính tổng bonus công từ các thẻ trang bị
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

  // Đối thủ: Bù nhìn tập luyện hoặc Pokémon
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
      attackCount: 0,
      healCount: 0,
      critStacks: 0,
      frenzyTimer: 0,
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
      attackCount: 0,
      healCount: 0,
      critStacks: 0,
      frenzyTimer: 0,
      attackCooldown: 2
    };
  }

  document.getElementById('e-img').src = enemy.imgUrl;
  log(`⚔️ Bắt đầu khiêu chiến với <b>${enemy.name}</b>!`, 'log-sys');
  updateUI();

  battleTimer = setInterval(battleTick, 1000);
}

function battleTick() {
  tick++;

  // Xử lý đếm lùi Frenzy (Phạm Đạt)
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

  // Hiệu ứng mỗi giây
  applyPerSecond(player, enemy, equippedCardIds, 'player', 'enemy', 'log-p');
  applyPerSecond(enemy, player, enemy.cards, 'enemy', 'player', 'log-e');

  if (checkCombatEnd()) return;

  // Lượt đánh
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
  // Thẻ Thuật Sư
  if (cardIds.includes('mage')) {
    source.healCount++;
    let heal = (source.healCount % 5 === 0) ? 14 : 7;
    let old = source.hp;
    source.hp = Math.min(source.maxHp, source.hp + heal);
    showPopup(srcType, `+${source.hp - old}`, 'dmg-heal');
    log(`✨ [${source.name}] hồi <b>+${source.hp - old} HP</b>.`, logCls);
  }

  // Thẻ Phượng Hoàng
  if (cardIds.includes('phoenix')) {
    let burn = Math.max(1, Math.round(target.maxHp * 0.003));
    target.hp = Math.max(0, target.hp - burn);
    showPopup(tarType, `-${burn}`, 'dmg-true');
    log(`🔥 [${source.name}] thiêu đốt đối thủ mất <b>${burn}</b> ST chuẩn.`, logCls);
  }

  // Thẻ Chí Mạng
  if (cardIds.includes('crit') && source.critStacks < 50) {
    source.critStacks++;
  }
}

function executeStrikeSeries(atkObj, defObj, cardIds, atkType, defType, atkName, logCls) {
  strikeOnce(atkObj, defObj, cardIds, atkType, defType, atkName, logCls);
  if (defObj.hp <= 0) return;

  // Thẻ Tốc Đánh (12% đánh thêm)
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

  // Tính Chí mạng
  let isCrit = false;
  if (cardIds.includes('crit')) {
    let rate = (atkObj.critStacks * 0.5) / 100;
    if (Math.random() < rate) {
      isCrit = true;
      raw *= 3;
    }
  }

  // Đối thủ có thẻ Thủ (30% block)
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

  // Thẻ Xạ Thủ (Đòn 3 thêm 4% max HP)
  if (cardIds.includes('archer') && atkObj.attackCount % 3 === 0) {
    let trueDmg = Math.max(1, Math.round(defObj.maxHp * 0.04));
    defObj.hp = Math.max(0, defObj.hp - trueDmg);
    setTimeout(() => showPopup(defType, `🎯 -${trueDmg}`, 'dmg-true'), 120);
    log(`🎯 [${atkObj.name}] Xạ Thủ: Bắn xuyên giáp <b>+${trueDmg}</b> ST Chuẩn!`, 'log-sys');
  }
}

function checkCombatEnd() {
  if (player.hp <= 0) {
    clearInterval(battleTimer);
    log("💀 <b>Bạn đã thất bại! Hãy thử đổi chiến thuật hoặc luyện tập thêm.</b>", 'log-e');
    updateUI();
    return true;
  }
  if (enemy && enemy.hp <= 0) {
    clearInterval(battleTimer);
    rollTickets += 10;
    saveData();
    log(`🎉 <b>Bạn đã đánh bại ${enemy.name}! Nhận được +10 vé Roll thẻ bài!</b>`, 'log-sys');
    updateUI();
    return true;
  }
  return false;
}

// ==========================================
// 4. CƠ CHẾ GACHA ROLL VÀ TRANG BỊ 3 THẺ
// ==========================================
function rollCard(times) {
  if (rollTickets < times) {
    alert("Bạn không đủ vé Roll! Hãy khiêu chiến thắng đối thủ để nhận thêm vé.");
    return;
  }

  rollTickets -= times;
  const allCardKeys = Object.keys(CARDS);
  let winCount = 0;

  for (let i = 0; i < times; i++) {
    // 25% trúng thẻ, 75% trượt
    if (Math.random() < 0.25) {
      // Chọn ngẫu nhiên 1 thẻ trong danh sách
      const randomKey = allCardKeys[Math.floor(Math.random() * allCardKeys.length)];
      if (!unlockedCards.includes(randomKey)) {
        unlockedCards.push(randomKey);
        log(`🌟 [GACHA] <b>CHÚC MỪNG!</b> Bạn đã mở khóa thẻ mới: <b>${CARDS[randomKey].name}</b>!`, 'log-crit');
      } else {
        log(`✨ [GACHA] Bạn quay trúng [${CARDS[randomKey].name}] (Đã sở hữu trước đó).`, 'log-sys');
      }
      winCount++;
    } else {
      if (times === 1) log("💨 [GACHA] Rất tiếc, bạn đã không trúng thẻ nào!", 'log-e');
    }
  }

  if (times > 1) {
    log(`🎲 Kết quả Roll x${times}: Trúng <b>${winCount}</b> lần | Trượt <b>${times - winCount}</b> lần.`, 'log-sys');
  }

  saveData();
  renderCards();
  updateUI();
}

function toggleEquip(cardId) {
  if (!unlockedCards.includes(cardId)) return;

  const idx = equippedCardIds.indexOf(cardId);
  if (idx > -1) {
    // Nếu đang mang thì tháo ra
    equippedCardIds.splice(idx, 1);
    log(`Đã gỡ thẻ: ${CARDS[cardId].name}`, 'log-sys');
  } else {
    // Nếu chưa mang: kiểm tra giới hạn 3 thẻ
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
  // Vé roll
  document.getElementById('roll-tickets').innerText = rollTickets;

  // Cập nhật người chơi
  document.getElementById('p-hp-bar').style.width = (player.hp / player.maxHp * 100) + '%';
  document.getElementById('p-hp-txt').innerText = `HP: ${player.hp} / ${player.maxHp}`;
  document.getElementById('p-stats').innerText = `Tấn công: ${player.atk} | Giáp: ${player.def} | Tốc: ${player.attackCooldown}s/đòn`;

  // Danh sách 3 thẻ đang mang
  const eqList = document.getElementById('p-equipped-list');
  if (equippedCardIds.length === 0) {
    eqList.innerHTML = '<span style="color: #64748b;">Chưa trang bị thẻ nào (Tối đa 3)</span>';
  } else {
    eqList.innerHTML = equippedCardIds.map(id => `<span class="equipped-tag">${CARDS[id].name}</span>`).join(' ');
  }

  // Cập nhật đối thủ
  if (enemy) {
    document.getElementById('e-name').innerText = enemy.name;
    document.getElementById('e-status').innerText = enemy.hp > 0 ? 'Đang đấu' : 'Đã gục';
    document.getElementById('e-hp-bar').style.width = Math.max(0, (enemy.hp / enemy.maxHp * 100)) + '%';
    document.getElementById('e-hp-txt').innerText = `HP: ${enemy.hp} / ${enemy.maxHp}`;
    document.getElementById('e-stats').innerText = `Tấn công: ${enemy.atk} | Giáp: ${enemy.def} | Tốc: ${enemy.attackCooldown}s/đòn`;
    
    if (enemy.cards && enemy.cards.length > 0) {
      document.getElementById('e-equipped').innerText = enemy.cards.map(id => CARDS[id].name).join(', ');
    } else {
      document.getElementById('e-equipped').innerText = 'Không có kỹ năng';
    }
  }
}

// Khởi chạy ban đầu
renderCards();
updateUI();
