const CARDS = {
  archer: {
    id: 'archer',
    name: 'Thẻ Xạ Thủ Nguyễn Hoa',
    enemyName: 'Decidueye Nguyễn Hoa',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/724.gif',
    desc: '+5 Tấn công. Mỗi đòn thứ 3 gây thêm 4% HP tối đa mục tiêu (ST Chuẩn).',
    atkBonus: 5,
    unlocked: false
  },
  mage: {
    id: 'mage',
    name: 'Thẻ Thuật Sư Đức Lương',
    enemyName: 'Gardevoir Đức Lương',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/282.gif',
    desc: 'Mỗi 1s hồi 7 máu, lần hồi thứ 5 hồi gấp đôi (14 máu).',
    atkBonus: 0,
    unlocked: false
  },
  tank: {
    id: 'tank',
    name: 'Thẻ Phòng Ngự Dương Võ',
    enemyName: 'Blastoise Dương Võ',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/9.gif',
    desc: '30% Block đòn đánh, phản lại 50% sát thương đó.',
    atkBonus: 0,
    unlocked: false
  },
  phoenix: {
    id: 'phoenix',
    name: 'Thẻ Ngọn Lửa Hữu Phai',
    enemyName: 'Ho-Oh Hữu Phai',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/250.gif',
    desc: 'Mỗi 1s thiêu đốt đối thủ mất 0.3% HP tối đa (ST chuẩn).',
    atkBonus: 0,
    unlocked: false
  },
  crit: {
    id: 'crit',
    name: 'Thẻ Chí Mạng Đăng Khang',
    enemyName: 'Scizor Đăng Khang',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/212.gif',
    desc: 'Mỗi 1s tích 1 tầng (+0.5% crit, max 50 tầng). Đòn chí mạng gây x3 sát thương.',
    atkBonus: 0,
    unlocked: false
  },
  frenzy: {
    id: 'frenzy',
    name: 'Thẻ Tốc Đánh Phạm Đạt',
    enemyName: 'Greninja Phạm Đạt',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/658.gif',
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
