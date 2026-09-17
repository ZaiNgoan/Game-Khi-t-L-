// ==========================================
// 1. TẤT CẢ THẺ BÀI TRONG GAME (11 THẺ ĐẦY ĐỦ)
// ==========================================
const CARDS = {
  // 3 THẺ CƠ BẢN
  basic_atk: {
    id: 'basic_atk',
    name: 'Thẻ Tấn Công Cơ Bản',
    tier: 'basic',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/muscle-band.png',
    desc: 'Tăng thêm 2 Tấn công vào chỉ số gốc.',
    atkBonus: 2, hpBonus: 0, defBonus: 0
  },
  basic_hp: {
    id: 'basic_hp',
    name: 'Thẻ Sinh Lực Cơ Bản',
    tier: 'basic',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leftovers.png',
    desc: 'Tăng thêm 15 Máu tối đa vào chỉ số gốc.',
    atkBonus: 0, hpBonus: 15, defBonus: 0
  },
  basic_def: {
    id: 'basic_def',
    name: 'Thẻ Phòng Thủ Cơ Bản',
    tier: 'basic',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/iron.png',
    desc: 'Tăng thêm 8 Giáp vào chỉ số gốc.',
    atkBonus: 0, hpBonus: 0, defBonus: 8
  },

  // 7 ELITE BOSS (120 HP - 10 ATK - 10 DEF)
  archer: {
    id: 'archer',
    name: 'Thẻ Xạ Thủ Nguyễn Hoa',
    enemyName: 'Decidueye Nguyễn Hoa',
    tier: 'elite',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/724.gif',
    desc: '+5 Tấn công. Mỗi đòn thứ 3 gây thêm 4% HP tối đa mục tiêu (ST Chuẩn).',
    atkBonus: 5, hpBonus: 0, defBonus: 0
  },
  mage: {
    id: 'mage',
    name: 'Thẻ Thuật Sư Đức Lương',
    enemyName: 'Gardevoir Đức Lương',
    tier: 'elite',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/282.gif',
    desc: 'Mỗi 1s hồi 7 máu, nhịp hồi thứ 5 hồi gấp đôi (14 máu).',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  tank: {
    id: 'tank',
    name: 'Thẻ Phòng Ngự Dương Võ',
    enemyName: 'Blastoise Dương Võ',
    tier: 'elite',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/9.gif',
    desc: '30% Block đòn đánh, phản lại 50% sát thương đó.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  phoenix: {
    id: 'phoenix',
    name: 'Thẻ Ngọn Lửa Hữu Phai',
    enemyName: 'Ho-Oh Hữu Phai',
    tier: 'elite',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/250.gif',
    desc: 'Mỗi 1s thiêu đốt đối thủ mất 0.3% HP tối đa (ST chuẩn).',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  crit: {
    id: 'crit',
    name: 'Thẻ Chí Mạng Đăng Khang',
    enemyName: 'Scizor Đăng Khang',
    tier: 'elite',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/212.gif',
    desc: 'Mỗi 1s tích 1 tầng (+0.5% crit, max 50 tầng). Đòn chí mạng gây x3 sát thương.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  frenzy: {
    id: 'frenzy',
    name: 'Thẻ Tốc Đánh Phạm Đạt',
    enemyName: 'Greninja Phạm Đạt',
    tier: 'elite',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/658.gif',
    desc: 'Khi tung đòn có 12% đánh thêm 1 lần và tăng tốc đánh lên x2 (1s/đòn) trong 4s.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  cruise: {
    id: 'cruise',
    name: 'Thẻ Triều Cường',
    enemyName: 'Triều Cường',
    tier: 'elite',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/130.gif',
    desc: 'Mỗi 2s tăng +1 Thủ (max +15). Khi đạt +15 Thủ lập tức đánh liên hoàn 7 lần (mỗi lần 50% Thủ) 1 lần duy nhất.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },

  // 3 SIÊU BOSS
  mora: {
    id: 'mora',
    name: 'Thẻ Hấp Thụ Mora',
    enemyName: 'Xà Vương Mora',
    tier: 'super',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/497.gif',
    desc: 'Khi bị đánh có 14% hồi lại 50% sát thương nhận vào. Cứ 2 lần hồi thành công sẽ +2 Công vĩnh viễn (max +96).',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  atula: {
    id: 'atula',
    name: 'Thẻ Huyết Hồn Atula',
    enemyName: 'Chiến Thần Atula',
    tier: 'super',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/487.gif',
    desc: 'Khi bị đánh có 9% tích 150% giá trị vào Huyết Hồn. Khi Huyết Hồn đủ kết liễu mục tiêu sẽ xả toàn bộ gây sát thương chuẩn.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  kolos: {
    id: 'kolos',
    name: 'Thẻ Hư Vô Kolos',
    enemyName: 'Bạo Chúa Kolos',
    tier: 'super',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/644.gif',
    desc: 'Khi chịu sát thương có 20% khóa toàn bộ thẻ nội tại của đối phương trong 2s, đồng thời hút 30 HP của đối phương.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },

  // FINAL BOSS
  bles: {
    id: 'bles',
    name: 'Thẻ Tối Thượng Ultra BLES',
    enemyName: 'Chúa Tể Ultra BLES',
    tier: 'final',
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/384.gif',
    desc: 'Không thể đánh thường. Cứ mỗi 3s tung Trảm Sát gây 135% sát thương theo ATK hiện tại và tự tăng 30 ATK (max 10 lần).',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  }
};

// ==========================================
// 2. KHỞI TẠO BỘ NHỚ LOCALSTORAGE
// ==========================================
const DEFAULT_POOL = ['basic_atk', 'basic_hp', 'basic_def'];

let poolAvailableCards = JSON.parse(localStorage.getItem('poolAvailableCards')) || [...DEFAULT_POOL];
let unlockedCards = JSON.parse(localStorage.getItem('unlockedCards')) || [];
let equippedCardIds = JSON.parse(localStorage.getItem('equippedCardIds')) || [];
let rollTickets = (localStorage.getItem('rollTickets') !== null) ? parseInt(localStorage.getItem('rollTickets')) : 10;
let currentCardFilter = 'all';

// Đảm bảo 3 thẻ cơ bản luôn có mặt trong Pool
DEFAULT_POOL.forEach(id => {
  if (!poolAvailableCards.includes(id)) poolAvailableCards.push(id);
});

function saveData() {
  localStorage.setItem('poolAvailableCards', JSON.stringify(poolAvailableCards));
  localStorage.setItem('unlockedCards', JSON.stringify(unlockedCards));
  localStorage.setItem('equippedCardIds', JSON.stringify(equippedCardIds));
  localStorage.setItem('rollTickets', rollTickets);
}

const BASE_STATS = { hp: 100, atk: 5, def: 5 };
let player = {
  name: "Nhân Vật Chính",
  maxHp: BASE_STATS.hp,
  hp: BASE_STATS.hp,
  atk: BASE_STATS.atk,
  def: BASE_STATS.def,
  attackCount: 0,
  healCount: 0,
  critStacks: 0,
  frenzyTimer: 0,
  attackCooldown: 2,
  bloodSoul: 0,
  moraHealCount: 0,
  moraBonusAtk: 0,
  silenceTimer: 0,
  cruiseDefStacks: 0,
  cruiseTriggered: false
};

let enemy = null;
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

function showSkillBanner(targetType, skillName, color = '#f59e0b') {
  const container = document.getElementById(targetType === 'player' ? 'card-p' : 'card-e');
  const banner = document.createElement('div');
  banner.className = 'skill-banner';
  banner.style.borderColor = color;
  banner.style.color = color;
  banner.innerText = skillName;
  container.appendChild(banner);
  setTimeout(() => banner.remove(), 1000);
}

function log(msg, type = '') {
  const box = document.getElementById('combat-log');
  const cls = type ? `class="${type}"` : '';
  box.innerHTML += `<div ${cls}>[${tick}s] ${msg}</div>`;
  box.scrollTop = box.scrollHeight;
}

function calcDamage(atk, def) {
  const defenseReduction = Math.floor(def / 2);
  const finalDamage = atk - defenseReduction;
  return Math.max(1, finalDamage);
}

function getMaxEquipLimit() {
  if (!enemy || enemy.id === 'training') return 3;
  if (enemy.tier === 'elite') return 1;
  if (enemy.tier === 'final') return 5;
  return 3;
}

function calculatePlayerStats(refillHp = false) {
  let bonusAtk = 0, bonusHp = 0, bonusDef = 0;
  equippedCardIds.forEach(id => {
    if (CARDS[id]) {
      bonusAtk += CARDS[id].atkBonus || 0;
      bonusHp += CARDS[id].hpBonus || 0;
      bonusDef += CARDS[id].defBonus || 0;
    }
  });

  player.maxHp = BASE_STATS.hp + bonusHp;
  player.atk = BASE_STATS.atk + bonusAtk;
  player.def = BASE_STATS.def + bonusDef;

  if (refillHp || !isFighting) {
    player.hp = player.maxHp;
  }
}

// ==========================================
// 3. CHỌN ĐỐI THỦ & VÀO TRẬN
// ==========================================
function selectEnemy(targetId) {
  if (isFighting) {
    if (!confirm("Trận đấu đang diễn ra, bạn có muốn hủy trận hiện tại để chọn đối thủ mới?")) return;
    clearInterval(battleTimer);
    isFighting = false;
  }

  const soulBox = document.getElementById('atula-soul-box');
  soulBox.style.display = 'none';

  if (targetId === 'training') {
    enemy = {
      id: 'training',
      name: 'Bù Nhìn Tập Luyện',
      tier: 'basic',
      rewardTickets: 1,
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
      maxHp: 60, hp: 60, atk: 4, def: 2, cards: [], attackCooldown: 3
    };
  } else if (targetId === 'mora') {
    enemy = {
      id: 'mora',
      name: 'Boss Mora',
      tier: 'super',
      rewardTickets: 4,
      imgUrl: CARDS.mora.imgUrl,
      maxHp: 750, hp: 750, atk: 4, def: 6,
      cards: ['mora'],
      attackCooldown: 2,
      moraHealCount: 0,
      moraBonusAtk: 0
    };
  } else if (targetId === 'atula') {
    enemy = {
      id: 'atula',
      name: 'Boss Atula',
      tier: 'super',
      rewardTickets: 4,
      imgUrl: CARDS.atula.imgUrl,
      maxHp: 1200, hp: 1200, atk: 10, def: 8,
      cards: ['atula'],
      attackCooldown: 2,
      bloodSoul: 0
    };
    soulBox.style.display = 'block';
    document.getElementById('atula-soul-txt').innerText = '0';
    document.getElementById('atula-soul-bar').style.width = '0%';
  } else if (targetId === 'kolos') {
    enemy = {
      id: 'kolos',
      name: 'Boss Kolos',
      tier: 'super',
      rewardTickets: 4,
      imgUrl: CARDS.kolos.imgUrl,
      maxHp: 1000, hp: 1000, atk: 12, def: 8,
      cards: ['kolos'],
      attackCooldown: 2
    };
  } else if (targetId === 'bles') {
    enemy = {
      id: 'bles',
      name: 'Ultra BLES',
      tier: 'final',
      rewardTickets: 10,
      imgUrl: CARDS.bles.imgUrl,
      maxHp: 10000, hp: 10000, atk: 65, def: 30,
      cards: ['bles'],
      attackCooldown: 3,
      blesStacks: 0,
      blesBonusAtk: 0
    };
  } else {
    // 7 ELITE BOSS (120 HP - 10 ATK - 10 DEF)
    const baseCard = CARDS[targetId];
    enemy = {
      id: targetId,
      name: baseCard.enemyName,
      tier: 'elite',
      rewardTickets: 3,
      imgUrl: baseCard.imgUrl,
      maxHp: 120, hp: 120,
      atk: 10,
      def: 10,
      cards: [targetId],
      attackCooldown: 2,
      cruiseDefStacks: 0,
      cruiseTriggered: false
    };
  }

  const maxLimit = getMaxEquipLimit();
  if (equippedCardIds.length > maxLimit) {
    equippedCardIds = equippedCardIds.slice(0, maxLimit);
    calculatePlayerStats(true);
    saveData();
    log(`⚠️ <b>[QUY TẮC]</b> Đấu ${enemy.name}: Bạn chỉ được giữ lại ${maxLimit} thẻ bài!`, 'log-sys');
  }

  document.getElementById('e-name').innerText = enemy.name;
  document.getElementById('e-status').innerText = 'Đã chọn - Sẵn sàng';
  document.getElementById('e-img').src = enemy.imgUrl;
  document.getElementById('e-hp-bar').style.width = '100%';
  document.getElementById('e-hp-txt').innerText = `HP: ${enemy.hp} / ${enemy.maxHp}`;
  document.getElementById('e-equipped').innerText = (enemy.cards.length > 0) ? enemy.cards.map(id => CARDS[id].name).join(', ') : 'Không có';

  updateUI();
  renderCards();
}

function triggerStartBattle() {
  if (!enemy || isFighting) return;

  const maxLimit = getMaxEquipLimit();
  if (equippedCardIds.length > maxLimit) {
    alert(`LỖI: Bạn đang mang ${equippedCardIds.length} thẻ! Với đối thủ này bạn chỉ được mang tối đa ${maxLimit} thẻ.`);
    return;
  }

  isFighting = true;
  tick = 0;
  document.getElementById('combat-log').innerHTML = '';

  calculatePlayerStats(true);
  player.attackCount = 0;
  player.healCount = 0;
  player.critStacks = 0;
  player.frenzyTimer = 0;
  player.attackCooldown = 2;
  player.bloodSoul = 0;
  player.moraHealCount = 0;
  player.moraBonusAtk = 0;
  player.silenceTimer = 0;
  player.cruiseDefStacks = 0;
  player.cruiseTriggered = false;

  enemy.hp = enemy.maxHp;
  enemy.attackCount = 0;
  enemy.healCount = 0;
  enemy.critStacks = 0;
  enemy.frenzyTimer = 0;
  enemy.bloodSoul = 0;
  enemy.moraHealCount = 0;
  enemy.moraBonusAtk = 0;
  enemy.blesStacks = 0;
  enemy.blesBonusAtk = 0;
  enemy.silenceTimer = 0;
  enemy.cruiseDefStacks = 0;
  enemy.cruiseTriggered = false;

  document.getElementById('e-status').innerText = 'Đang giao tranh';
  const btnStart = document.getElementById('btn-start-battle');
  btnStart.disabled = true;
  btnStart.innerText = `⚔️ ĐANG CHIẾN ĐẤU VỚI ${enemy.name.toUpperCase()}...`;

  log(`🚨 <b>TRẬN ĐẤU BẮT ĐẦU!</b> (Phần thưởng nếu thắng: +${enemy.rewardTickets} vé Roll)`, 'log-sys');
  updateUI();

  battleTimer = setInterval(battleTick, 1000);
}

function battleTick() {
  tick++;

  if (player.silenceTimer > 0) {
    player.silenceTimer--;
    if (player.silenceTimer === 0) {
      log("🔓 Bạn đã giải trừ trạng thái Khóa Thẻ.", 'log-sys');
    }
  }

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

  const pActiveCards = (player.silenceTimer > 0) ? [] : equippedCardIds;
  applyPerSecond(player, enemy, pActiveCards, 'player', 'enemy', 'log-p');
  applyPerSecond(enemy, player, enemy.cards, 'enemy', 'player', 'log-e');

  if (tick % 2 === 0) {
    applyCruisePassive(player, enemy, pActiveCards, 'player', 'Bạn', 'log-p');
    applyCruisePassive(enemy, player, enemy.cards, 'enemy', enemy.name, 'log-e');
  }

  if (checkCombatEnd()) return;

  if (tick % player.attackCooldown === 0) {
    executeStrikeSeries(player, enemy, pActiveCards, 'player', 'enemy', 'Bạn', 'log-p');
    if (checkCombatEnd()) return;
  }

  if (enemy.id === 'bles') {
    if (tick % 3 === 0) {
      executeBlesUltimate();
      if (checkCombatEnd()) return;
    }
  } else {
    if (tick % enemy.attackCooldown === 0) {
      executeStrikeSeries(enemy, player, enemy.cards, 'enemy', 'player', enemy.name, 'log-e');
      if (checkCombatEnd()) return;
    }
  }

  updateUI();
}

function applyCruisePassive(obj, opponent, cardIds, objType, objName, logCls) {
  if (!cardIds.includes('cruise')) return;

  if (obj.cruiseDefStacks < 15) {
    obj.cruiseDefStacks++;
    showSkillBanner(objType, `🛡️ +1 THỦ (${obj.cruiseDefStacks}/15)`, '#0284c7');
    log(`🌊 [${obj.name}] hấp thu triều cường tăng <b>+1 DEF</b> (Tổng: ${obj.def + obj.cruiseDefStacks}).`, logCls);

    if (obj.cruiseDefStacks === 15 && !obj.cruiseTriggered) {
      obj.cruiseTriggered = true;
      showSkillBanner(objType, `🌊 BẠO PHÁT TRIỀU CƯỜNG (7 ĐÒN)!`, '#0284c7');
      log(`🌊🌊🌊 <b>[${objName}] BẠO PHÁT TRIỀU CƯỜNG! Tung 7 đòn liên hoàn (mỗi đòn 50% Thủ)!</b>`, 'log-crit');

      let currentTotalDef = obj.def + obj.cruiseDefStacks;
      let strikeDamage = Math.max(1, Math.round(currentTotalDef * 0.5));

      for (let i = 1; i <= 7; i++) {
        setTimeout(() => {
          if (opponent.hp <= 0) return;
          let realDamage = calcDamage(strikeDamage, opponent.def);
          opponent.hp = Math.max(0, opponent.hp - realDamage);
          showPopup((objType === 'player' ? 'enemy' : 'player'), `-${realDamage}`, 'dmg-norm');
          log(`🌊 [Triều Cường Đòn ${i}/7] gây <b>${realDamage}</b> sát thương lên ${opponent.name}!`, logCls);
          updateUI();
          checkCombatEnd();
        }, i * 150);
      }
    }
  }
}

function executeBlesUltimate() {
  enemy.attackCount++;
  let currentAtk = enemy.atk + (enemy.blesBonusAtk || 0);
  let rawDmg = Math.round(currentAtk * 1.35);
  let realDmg = calcDamage(rawDmg, player.def);

  player.hp = Math.max(0, player.hp - realDmg);
  showPopup('player', `💥 -${realDmg}`, 'dmg-crit');
  showSkillBanner('enemy', '👑 TRẢM SÁT 135% SÁT THƯƠNG!', '#f59e0b');
  log(`👑 <b>[ULTRA BLES]</b> Kích hoạt TRẢM SÁT gây <b>${realDmg}</b> sát thương lên Bạn!`, 'log-crit');

  if ((enemy.blesStacks || 0) < 10) {
    enemy.blesStacks = (enemy.blesStacks || 0) + 1;
    enemy.blesBonusAtk = (enemy.blesBonusAtk || 0) + 30;
    showSkillBanner('enemy', `⚔️ +30 ATK (${enemy.blesStacks}/10 TẦNG)`, '#ef4444');
    log(`🔥 <b>[ULTRA BLES]</b> Tăng thêm <b>+30 ATK</b> vĩnh viễn (Hiện tại: ${enemy.atk + enemy.blesBonusAtk} ATK)!`, 'log-crit');
  }
}

function applyPerSecond(source, target, cardIds, srcType, tarType, logCls) {
  if (cardIds.includes('mage')) {
    source.healCount++;
    let heal = (source.healCount % 5 === 0) ? 14 : 7;
    let old = source.hp;
    source.hp = Math.min(source.maxHp, source.hp + heal);
    showPopup(srcType, `+${source.hp - old}`, 'dmg-heal');
    showSkillBanner(srcType, '✨ THUẬT SƯ HỒI MÁU!', '#4ade80');
    log(`✨ [${source.name}] hồi <b>+${source.hp - old} HP</b>.`, logCls);
  }

  if (cardIds.includes('phoenix')) {
    let burn = Math.max(1, Math.round(target.maxHp * 0.003));
    target.hp = Math.max(0, target.hp - burn);
    showPopup(tarType, `-${burn}`, 'dmg-true');
    showSkillBanner(tarType, '🔥 THIÊU ĐỐT!', '#fb923c');
    log(`🔥 [${source.name}] thiêu đốt đối thủ mất <b>${burn}</b> ST chuẩn.`, logCls);
  }

  if (cardIds.includes('crit') && source.critStacks < 50) {
    source.critStacks++;
  }
}

function executeStrikeSeries(atkObj, defObj, cardIds, atkType, defType, atkName, logCls) {
  strikeOnce(atkObj, defObj, cardIds, atkType, defType, atkName, logCls);
  if (defObj.hp <= 0 || atkObj.hp <= 0) return;

  if (cardIds.includes('frenzy') && Math.random() < 0.12) {
    showSkillBanner(atkType, '⚡ PHẠM ĐẠT CUỒNG NỘ!', '#38bdf8');
    log(`⚡ <b>[${atkName}] KÍCH HOẠT TỐC ĐÁNH PHẠM ĐẠT!</b> Đánh thêm 1 đòn & tăng tốc 1s/đòn trong 4s!`, 'log-frenzy');
    atkObj.frenzyTimer = 4;
    atkObj.attackCooldown = 1;
    strikeOnce(atkObj, defObj, cardIds, atkType, defType, atkName, logCls);
  }
}

function strikeOnce(atkObj, defObj, cardIds, atkType, defType, atkName, logCls) {
  atkObj.attackCount++;
  let effectiveAtk = atkObj.atk + (atkObj.moraBonusAtk || 0);
  let effectiveDef = defObj.def + (defObj.cruiseDefStacks || 0);
  let raw = calcDamage(effectiveAtk, effectiveDef);

  let isCrit = false;
  if (cardIds.includes('crit')) {
    let rate = (atkObj.critStacks * 0.5) / 100;
    if (Math.random() < rate) {
      isCrit = true;
      raw *= 3;
    }
  }

  const defCardIds = (defObj === player) 
    ? ((player.silenceTimer > 0) ? [] : equippedCardIds)
    : defObj.cards;

  if (defCardIds.includes('tank') && Math.random() < 0.3) {
    let reflect = Math.round(raw * 0.5);
    atkObj.hp = Math.max(0, atkObj.hp - reflect);
    showPopup(defType, `BLOCK!`, 'dmg-true');
    showPopup(atkType, `-${reflect}`, 'dmg-norm');
    showSkillBanner(defType, '🛡️ BLOCK & PHẢN ĐÒN!', '#facc15');
    log(`🛡️ [${defObj.name}] BLOCK & phản lại <b>${reflect}</b> sát thương!`, 'log-sys');
    return;
  }

  if (defCardIds.includes('mora') && Math.random() < 0.14) {
    let healAmount = Math.max(1, Math.round(raw * 0.5));
    defObj.hp = Math.min(defObj.maxHp, defObj.hp + healAmount);
    defObj.moraHealCount = (defObj.moraHealCount || 0) + 1;
    showPopup(defType, `+${healAmount}`, 'dmg-heal');
    showSkillBanner(defType, '🐍 MORA HẤP THỤ!', '#0d9488');
    log(`🐍 [${defObj.name}] kích hoạt Hấp Thụ hồi lại <b>+${healAmount} HP</b>.`, 'log-sys');

    if (defObj.moraHealCount % 2 === 0 && (defObj.moraBonusAtk || 0) < 96) {
      defObj.moraBonusAtk = Math.min(96, (defObj.moraBonusAtk || 0) + 2);
      showSkillBanner(defType, `⚔️ +2 ATK MORA! (${defObj.moraBonusAtk}/96)`, '#f59e0b');
      log(`🔥 [${defObj.name}] tăng vĩnh viễn <b>+2 ATK</b>!`, 'log-crit');
    }
  }

  if (defCardIds.includes('atula') && Math.random() < 0.09) {
    let soulAdd = Math.round(raw * 1.5);
    defObj.bloodSoul = (defObj.bloodSoul || 0) + soulAdd;
    showSkillBanner(defType, `🩸 +${soulAdd} HUYẾT HỒN!`, '#f43f5e');
    log(`🩸 [${defObj.name}] tích tụ <b>+${soulAdd} Huyết Hồn</b> (Tổng: ${defObj.bloodSoul}).`, 'log-crit');

    if (defObj.bloodSoul >= atkObj.hp) {
      let executeDmg = defObj.bloodSoul;
      atkObj.hp = 0;
      defObj.bloodSoul = 0;
      showPopup(atkType, `💀 -${executeDmg}`, 'dmg-crit');
      showSkillBanner(defType, '☠️ TUYỆT KỸ: HUYẾT HỒN BẠO KÍCH!', '#b91c1c');
      log(`☠️ <b>[ATULA TUYỆT KỸ]</b> Xả toàn bộ ${executeDmg} Huyết Hồn kết liễu đối phương lập tức!`, 'log-crit');
      return;
    }
  }

  if (defCardIds.includes('kolos') && Math.random() < 0.20) {
    atkObj.silenceTimer = 2;
    let drainHp = Math.min(30, atkObj.hp);
    atkObj.hp = Math.max(0, atkObj.hp - 30);
    defObj.hp = Math.min(defObj.maxHp, defObj.hp + drainHp);

    showPopup(atkType, `-30`, 'dmg-true');
    showPopup(defType, `+${drainHp}`, 'dmg-heal');
    showSkillBanner(defType, '💀 KOLOS: KHÓA NỘI TẠI & HÚT 30 HP!', '#7c3aed');
    log(`💀 <b>[KOLOS HƯ VÔ]</b> Khóa toàn bộ nội tại của ${atkName} trong 2s và hút 30 HP!`, 'log-crit');
  }

  defObj.hp = Math.max(0, defObj.hp - raw);
  if (isCrit) {
    showPopup(defType, `💥 -${raw}`, 'dmg-crit');
    showSkillBanner(atkType, '💥 CHÍ MẠNG x3!', '#ef4444');
    log(`💥 <b>[CHÍ MẠNG x3]</b> ${atkName} gây <b>${raw}</b> ST!`, 'log-crit');
  } else {
    showPopup(defType, `-${raw}`, 'dmg-norm');
    log(`🗡️ ${atkName} gây <b>${raw}</b> sát thương.`, logCls);
  }

  if (cardIds.includes('archer') && atkObj.attackCount % 3 === 0) {
    let trueDmg = Math.max(1, Math.round(defObj.maxHp * 0.04));
    defObj.hp = Math.max(0, defObj.hp - trueDmg);
    setTimeout(() => {
      showPopup(defType, `🎯 -${trueDmg}`, 'dmg-true');
      showSkillBanner(atkType, '🎯 NGUYỄN HOA XUYÊN GIÁP!', '#a855f7');
    }, 120);
    log(`🎯 [${atkObj.name}] Xạ Thủ: Bắn xuyên giáp <b>+${trueDmg}</b> ST Chuẩn!`, 'log-sys');
  }
}

function checkCombatEnd() {
  const btnStart = document.getElementById('btn-start-battle');

  if (player.hp <= 0) {
    clearInterval(battleTimer);
    isFighting = false;
    log("💀 <b>Bạn đã thất bại! Hãy thử đổi chiến thuật hoặc nâng cấp thêm thẻ bài.</b>", 'log-e');
    btnStart.disabled = false;
    btnStart.innerText = `⚔️ TÁI ĐẤU VỚI ${enemy.name.toUpperCase()}`;
    updateUI();
    return true;
  }
  if (enemy && enemy.hp <= 0) {
    clearInterval(battleTimer);
    isFighting = false;
    
    const gainedTickets = enemy.rewardTickets || 1;
    rollTickets += gainedTickets;

    // MỞ KHÓA THẺ VÀO POOL ROLL VĨNH VIỄN
    if (enemy.id !== 'training' && !poolAvailableCards.includes(enemy.id)) {
      poolAvailableCards.push(enemy.id);
      log(`🌟 <b>CHIẾN CÔNG HIỂN HÁCH!</b> Mở khóa <b>${CARDS[enemy.id].name}</b> vào Bể Roll!`, 'log-crit');
    }

    saveData();
    log(`🎉 <b>Bạn đã đánh bại ${enemy.name}! Nhận được +${gainedTickets} vé Roll thẻ bài!</b>`, 'log-sys');
    btnStart.disabled = false;
    btnStart.innerText = `⚔️ TÁI ĐẤU VỚI ${enemy.name.toUpperCase()}`;
    renderCards();
    updateUI();
    return true;
  }
  return false;
}

// ==========================================
// 4. ROLL GACHA
// ==========================================
function rollCard(times) {
  if (rollTickets < times) {
    alert(`Bạn cần có ít nhất ${times} vé! Hãy đánh bại đối thủ để nhận thêm vé.`);
    return;
  }

  rollTickets -= times;
  const results = [];

  for (let i = 0; i < times; i++) {
    if (Math.random() < 0.25) {
      const randomKey = poolAvailableCards[Math.floor(Math.random() * poolAvailableCards.length)];
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

  const modal = document.getElementById('gacha-modal');
  const container = document.getElementById('gacha-content');
  container.innerHTML = '';

  results.forEach(res => {
    const item = document.createElement('div');
    item.className = `gacha-item ${res.win ? 'win' : ''}`;
    item.innerHTML = res.win 
      ? `⭐ ${res.name} <br><small>${res.isNew ? '(MỚI NHẬN!)' : '(Đã sở hữu)'}</small>`
      : `💨 Trượt`;
    container.appendChild(item);
  });

  modal.style.display = 'flex';
}

function closeGachaModal() {
  document.getElementById('gacha-modal').style.display = 'none';
}

function setCardFilter(filter, element) {
  currentCardFilter = filter;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (element) element.classList.add('active');
  renderCards();
}

function toggleEquip(cardId) {
  if (!unlockedCards.includes(cardId)) return;

  const idx = equippedCardIds.indexOf(cardId);
  const maxLimit = getMaxEquipLimit();

  if (idx > -1) {
    equippedCardIds.splice(idx, 1);
    log(`Đã gỡ thẻ: ${CARDS[cardId].name}`, 'log-sys');
  } else {
    if (equippedCardIds.length >= maxLimit) {
      alert(`Với đối thủ này, bạn chỉ được phép trang bị tối đa ${maxLimit} thẻ! Hãy gỡ bớt thẻ trước.`);
      return;
    }
    equippedCardIds.push(cardId);
    log(`Đã trang bị: ${CARDS[cardId].name}`, 'log-sys');
  }

  calculatePlayerStats(true);
  saveData();
  renderCards();
  updateUI();
}

// HIỂN THỊ ĐỦ 100% CÁC THẺ TRONG GAME
function renderCards() {
  const pool = document.getElementById('roll-pool');
  pool.innerHTML = '';

  for (let key in CARDS) {
    const c = CARDS[key];

    if (currentCardFilter === 'basic' && c.tier !== 'basic') continue;
    if (currentCardFilter === 'elite' && c.tier !== 'elite') continue;
    if (currentCardFilter === 'super' && c.tier !== 'super' && c.tier !== 'final') continue;

    const isInPool = poolAvailableCards.includes(key);
    const isUnlocked = unlockedCards.includes(key);
    const isEquipped = equippedCardIds.includes(key);

    const cardDiv = document.createElement('div');
    cardDiv.className = `roll-card ${isUnlocked ? '' : 'locked'} ${isEquipped ? 'active' : ''}`;
    
    let statusBadge = '';
    if (!isInPool) {
      statusBadge = `<div style="font-size: 10px; color: #ef4444; margin-bottom: 4px;">🔒 Cần thắng boss để mở vào Pool</div>`;
    } else if (!isUnlocked) {
      statusBadge = `<div style="font-size: 10px; color: #38bdf8; margin-bottom: 4px;">🎲 Đã có trong Pool (Chưa Roll trúng)</div>`;
    } else {
      statusBadge = `<div style="font-size: 10px; color: #4ade80; margin-bottom: 4px;">✅ Đã sở hữu</div>`;
    }

    cardDiv.innerHTML = `
      <div>
        <img src="${c.imgUrl}" alt="${c.name}">
        <h4>${c.name}</h4>
        ${statusBadge}
        <p>${c.desc}</p>
      </div>
      <div>
        ${isUnlocked 
          ? `<button onclick="toggleEquip('${c.id}')" style="background: ${isEquipped ? '#dc2626' : '#2563eb'}">
              ${isEquipped ? 'Gỡ Bỏ' : 'Trang Bị'}
             </button>`
          : `<span style="font-size: 11px; color: #64748b;">Chưa sở hữu</span>`
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
  document.getElementById('p-stats').innerText = `Tấn công: ${player.atk} | Giáp: ${player.def + (player.cruiseDefStacks || 0)} | Tốc: ${player.attackCooldown}s/đòn`;

  const pBadge = document.getElementById('p-silence-badge');
  if (player.silenceTimer > 0) {
    pBadge.style.background = '#7c3aed';
    pBadge.innerText = `Bị Khóa Thẻ (${player.silenceTimer}s)`;
  } else {
    pBadge.style.background = '#2563eb';
    pBadge.innerText = 'Người chơi';
  }

  const maxLimit = getMaxEquipLimit();
  document.getElementById('p-equip-limit-txt').innerText = enemy ? `(Tối đa ${maxLimit} thẻ)` : `(Chọn đối thủ để xác định)`;

  const eqList = document.getElementById('p-equipped-list');
  if (equippedCardIds.length === 0) {
    eqList.innerHTML = `<span style="color: #64748b;">Chưa trang bị thẻ nào (Tối đa ${maxLimit})</span>`;
  } else {
    eqList.innerHTML = equippedCardIds.map(id => `<span class="equipped-tag">${CARDS[id].name}</span>`).join(' ');
  }

  const btnStart = document.getElementById('btn-start-battle');
  if (enemy && !isFighting) {
    if (equippedCardIds.length > maxLimit) {
      btnStart.disabled = true;
      btnStart.innerText = `⚠️ BẠN ĐANG MANG QUÁ ${maxLimit} THẺ (GỠ BỚT ĐỂ ĐẤU)`;
    } else {
      btnStart.disabled = false;
      btnStart.innerText = `⚔️ BẮT ĐẦU CHIẾN ĐẤU VỚI ${enemy.name.toUpperCase()}!`;
    }
  }

  if (enemy) {
    document.getElementById('e-hp-bar').style.width = Math.max(0, (enemy.hp / enemy.maxHp * 100)) + '%';
    document.getElementById('e-hp-txt').innerText = `HP: ${enemy.hp} / ${enemy.maxHp}`;
    
    let enemyAtkText = `${enemy.atk}`;
    if (enemy.id === 'mora') {
      enemyAtkText = `${enemy.atk + (enemy.moraBonusAtk || 0)} (+${enemy.moraBonusAtk || 0}/96 ATK)`;
    } else if (enemy.id === 'bles') {
      enemyAtkText = `${enemy.atk + (enemy.blesBonusAtk || 0)} (+${enemy.blesBonusAtk || 0} ATK)`;
    }

    let enemyDefText = `${enemy.def}`;
    if (enemy.id === 'cruise') {
      enemyDefText = `${enemy.def + (enemy.cruiseDefStacks || 0)} (+${enemy.cruiseDefStacks || 0}/15 DEF)`;
    }

    document.getElementById('e-stats').innerText = `Tấn công: ${enemyAtkText} | Giáp: ${enemyDefText} | Tốc: ${enemy.attackCooldown}s/đòn`;

    if (enemy.id === 'atula') {
      document.getElementById('atula-soul-txt').innerText = `${enemy.bloodSoul} / Cần ${player.hp} để trảm`;
      let soulPercent = Math.min(100, (enemy.bloodSoul / player.maxHp * 100));
      document.getElementById('atula-soul-bar').style.width = `${soulPercent}%`;
    }
  }
}

function resetGame() {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu để chơi lại từ đầu? Bạn sẽ được nhận lại 10 vé roll khởi đầu!")) {
    localStorage.clear();
    location.reload();
  }
}

calculatePlayerStats(true);
renderCards();
updateUI();
