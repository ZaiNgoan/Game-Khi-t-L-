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
* { box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0b0f19; color: #f8fafc; margin: 0; padding: 20px; }
.container { max-width: 920px; margin: 0 auto; }
h1 { text-align: center; color: #38bdf8; margin-bottom: 20px; font-size: 24px; text-transform: uppercase; letter-spacing: 1px; }

.arena { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 12px; }
.card { background: #161f30; padding: 16px; border-radius: 12px; border: 1px solid #283548; box-shadow: 0 8px 16px rgba(0,0,0,0.4); text-align: center; position: relative; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.card-title { font-size: 17px; font-weight: bold; color: #e2e8f0; }
.badge { padding: 2px 8px; border-radius: 9999px; font-size: 11px; background: #2563eb; }

.avatar-wrap { 
  width: 130px; height: 130px; margin: 0 auto 10px auto; 
  display: flex; align-items: center; justify-content: center; 
  background: radial-gradient(circle, #1e293b 0%, #0b0f19 100%); 
  border-radius: 12px; border: 2px solid #38bdf8; overflow: hidden; position: relative;
}
.avatar-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }

.shake-hit { animation: shake 0.25s cubic-bezier(.36,.07,.19,.97) both; filter: brightness(1.6) drop-shadow(0 0 10px #ef4444) !important; }
@keyframes shake {
  10%, 90% { transform: translate3d(-3px, 0, 0); }
  20%, 80% { transform: translate3d(4px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
  40%, 60% { transform: translate3d(6px, 0, 0); }
}

.dmg-pop {
  position: absolute; left: 50%; top: 40%; transform: translate(-50%, -50%);
  font-weight: 900; font-size: 22px; pointer-events: none;
  animation: floatUp 0.8s ease-out forwards;
}
@keyframes floatUp {
  0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
  50% { transform: translate(-50%, -30px) scale(1.3); }
  100% { opacity: 0; transform: translate(-50%, -55px) scale(0.9); }
}
.dmg-norm { color: #f87171; text-shadow: 0 0 4px #000; }
.dmg-crit { color: #facc15; font-size: 26px; text-shadow: 0 0 6px #ef4444; }
.dmg-true { color: #f8fafc; text-shadow: 0 0 6px #38bdf8; }
.dmg-heal { color: #4ade80; text-shadow: 0 0 5px #15803d; }

.bar-wrap { background: #283548; height: 14px; border-radius: 7px; overflow: hidden; margin: 8px 0; }
.bar-fill { height: 100%; transition: width 0.2s ease-in-out; }
.hp-player { background: #22c55e; }
.hp-enemy { background: #ef4444; }

.stats { font-size: 13px; color: #94a3b8; line-height: 1.5; }
.equipped-box { background: #0b0f19; border: 1px solid #334155; border-radius: 8px; padding: 8px; margin-top: 10px; text-align: left; font-size: 12px; min-height: 50px; }
.equipped-tag { display: inline-block; background: #1e3a8a; color: #93c5fd; padding: 2px 6px; border-radius: 4px; margin: 2px; font-size: 11px; }

/* Log nằm ngay dưới sàn đấu */
#combat-log { background: #050811; border: 1px solid #1e293b; border-radius: 8px; padding: 12px; height: 150px; overflow-y: auto; font-family: monospace; font-size: 12px; color: #cbd5e1; margin-bottom: 16px; }
.log-p { color: #38bdf8; }
.log-e { color: #f87171; }
.log-sys { color: #fbbf24; font-weight: bold; }
.log-crit { color: #f43f5e; font-weight: bold; }
.log-frenzy { color: #a855f7; font-weight: bold; }

.controls { background: #161f30; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #283548; }
.btn-group { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
button { background: #2563eb; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; }
button:hover { opacity: 0.9; }
button:disabled { background: #475569 !important; cursor: not-allowed; }

.roll-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 12px; }
.roll-card { background: #0b0f19; border: 1px solid #283548; border-radius: 10px; padding: 12px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; }
.roll-card.active { border-color: #f59e0b; box-shadow: 0 0 8px rgba(245, 158, 11, 0.4); }
.roll-card img { width: 75px; height: 75px; margin: 0 auto 6px auto; object-fit: contain; }
.roll-card.locked { opacity: 0.4; filter: grayscale(1); }
.roll-card h4 { margin: 0 0 6px 0; font-size: 13px; color: #f59e0b; }
.roll-card p { font-size: 11px; color: #94a3b8; margin: 0 0 10px 0; min-height: 50px; text-align: left; line-height: 1.4; }
