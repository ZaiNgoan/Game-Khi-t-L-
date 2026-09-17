// ==========================================
// 1. DỮ LIỆU TẤT CẢ CÁC THẺ BÀI
// ==========================================
const CARDS = {
  // --- 3 THẺ CƠ BẢN (MẶC ĐỊNH SỞ HỮU TỪ ĐẦU) ---
  basic_atk: {
    id: 'basic_atk',
    name: 'Thẻ Tấn Công Cơ Bản',
    isBoss: false,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/muscle-band.png',
    desc: 'Tăng thêm 2 Tấn công vào chỉ số gốc.',
    atkBonus: 2, hpBonus: 0, defBonus: 0
  },
  basic_hp: {
    id: 'basic_hp',
    name: 'Thẻ Sinh Lực Cơ Bản',
    isBoss: false,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/leftovers.png',
    desc: 'Tăng thêm 15 Máu tối đa vào chỉ số gốc.',
    atkBonus: 0, hpBonus: 15, defBonus: 0
  },
  basic_def: {
    id: 'basic_def',
    name: 'Thẻ Phòng Thủ Cơ Bản',
    isBoss: false,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/iron.png',
    desc: 'Tăng thêm 8 Giáp vào chỉ số gốc.',
    atkBonus: 0, hpBonus: 0, defBonus: 8
  },

  // --- 6 THẺ BOSS TIÊU CHUẨN ---
  archer: {
    id: 'archer',
    name: 'Thẻ Xạ Thủ Nguyễn Hoa',
    enemyName: 'Decidueye Nguyễn Hoa',
    isBoss: true,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/724.gif',
    desc: '+5 Tấn công. Mỗi đòn thứ 3 gây thêm 4% HP tối đa mục tiêu (ST Chuẩn).',
    atkBonus: 5, hpBonus: 0, defBonus: 0
  },
  mage: {
    id: 'mage',
    name: 'Thẻ Thuật Sư Đức Lương',
    enemyName: 'Gardevoir Đức Lương',
    isBoss: true,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/282.gif',
    desc: 'Mỗi 1s hồi 7 máu, nhịp hồi thứ 5 hồi gấp đôi (14 máu).',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  tank: {
    id: 'tank',
    name: 'Thẻ Phòng Ngự Dương Võ',
    enemyName: 'Blastoise Dương Võ',
    isBoss: true,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/9.gif',
    desc: '30% Block đòn đánh, phản lại 50% sát thương đó.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  phoenix: {
    id: 'phoenix',
    name: 'Thẻ Ngọn Lửa Hữu Phai',
    enemyName: 'Ho-Oh Hữu Phai',
    isBoss: true,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/250.gif',
    desc: 'Mỗi 1s thiêu đốt đối thủ mất 0.3% HP tối đa (ST chuẩn).',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  crit: {
    id: 'crit',
    name: 'Thẻ Chí Mạng Đăng Khang',
    enemyName: 'Scizor Đăng Khang',
    isBoss: true,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/212.gif',
    desc: 'Mỗi 1s tích 1 tầng (+0.5% crit, max 50 tầng). Đòn chí mạng gây x3 sát thương.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  frenzy: {
    id: 'frenzy',
    name: 'Thẻ Tốc Đánh Phạm Đạt',
    enemyName: 'Greninja Phạm Đạt',
    isBoss: true,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/658.gif',
    desc: 'Khi tung đòn có 12% đánh thêm 1 lần và tăng tốc đánh lên x2 (1s/đòn) trong 4s.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },

  // --- 2 THẺ SIÊU BOSS ---
  mora: {
    id: 'mora',
    name: 'Thẻ Hấp Thụ Mora',
    enemyName: 'Xà Vương Mora',
    isBoss: true,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/497.gif',
    desc: 'Khi bị đánh có 14% hồi lại 50% sát thương nhận vào. Cứ 2 lần hồi thành công sẽ +2 Công vĩnh viễn (max +96).',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  },
  atula: {
    id: 'atula',
    name: 'Thẻ Huyết Hồn Atula',
    enemyName: 'Chiến Thần Atula',
    isBoss: true,
    imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/487.gif',
    desc: 'Khi bị đánh có 9% tích 150% giá trị vào Huyết Hồn. Khi Huyết Hồn đủ kết liễu mục tiêu sẽ xả toàn bộ gây sát thương chuẩn.',
    atkBonus: 0, hpBonus: 0, defBonus: 0
  }
};

// ==========================================
// 2. LƯU TRỮ VÀ KHỞI TẠO BỘ NHỚ
// ==========================================
// 3 thẻ cơ bản luôn có sẵn từ đầu
const DEFAULT_CARDS = ['basic_atk', 'basic_hp', 'basic_def'];

let poolAvailableCards = JSON.parse(localStorage.getItem('poolAvailableCards')) || [...DEFAULT_CARDS];
let unlockedCards = JSON.parse(localStorage.getItem('unlockedCards')) || [...DEFAULT_CARDS];
let equippedCardIds = JSON.parse(localStorage.getItem('equippedCardIds')) || [];
let rollTickets = (localStorage.getItem('rollTickets') !== null) ? parseInt(localStorage.getItem('rollTickets')) : 3;

// Đảm bảo 3 thẻ cơ bản luôn có sẵn trong túi đồ và trong Pool
DEFAULT_CARDS.forEach(cId => {
  if (!poolAvailableCards.includes(cId)) poolAvailableCards.push(cId);
  if (!unlockedCards.includes(cId)) unlockedCards.push(cId);
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
  moraBonusAtk: 0
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

// ==========================================
// 3. CHỌN BOSS & TRẬN ĐẤU
// ==========================================
function selectEnemy(targetId) {
  if (isFighting) {
    if (!confirm("Trận đấu đang diễn ra, bạn có muốn hủy trận hiện tại để chọn đối thủ mới?")) return;
    clearInterval(battleTimer);
    isFighting = false;
  }

  const btnStart = document.getElementById('btn-start-battle');
  const soulBox = document.getElementById('atula-soul-box');
  soulBox.style.display = 'none';

  if (targetId === 'training') {
    enemy = {
      id: 'training',
      name: 'Bù Nhìn Tập Luyện',
      imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
      maxHp: 60, hp: 60, atk: 4, def: 2, cards: [], attackCooldown: 3
    };
  } else if (targetId === 'mora') {
    // Siêu Boss Mora: Có thể kèm thẻ hỗ trợ nếu cần
    enemy = {
      id: 'mora',
      name: 'Boss Mora',
      imgUrl: CARDS.mora.imgUrl,
      maxHp: 750, hp: 750, atk: 4, def: 6,
      cards: ['mora'],
      attackCooldown: 2,
      moraHealCount: 0,
      moraBonusAtk: 0
    };
  } else if (targetId === 'atula') {
    // Siêu Boss Atula
    enemy = {
      id: 'atula',
      name: 'Boss Atula',
      imgUrl: CARDS.atula.imgUrl,
      maxHp: 1200, hp: 1200, atk: 10, def: 8,
      cards: ['atula'],
      attackCooldown: 2,
      bloodSoul: 0
    };
    soulBox.style.display = 'block';
    document.getElementById('atula-soul-txt').innerText = '0';
    document.getElementById('atula-soul-bar').style.width = '0%';
  } else {
    const baseCard = CARDS[targetId];
    enemy = {
      id: targetId,
      name: baseCard.enemyName,
      imgUrl: baseCard.imgUrl,
      maxHp: 100, hp: 100,
      atk: 6 + baseCard.atkBonus,
      def: 4 + baseCard.defBonus,
      cards: [targetId], // Boss thường chỉ mang đúng 1 thẻ
      attackCooldown: 2
    };
  }

  document.getElementById('e-name').innerText = enemy.name;
  document.getElementById('e-status').innerText = 'Đã chọn - Sẵn sàng';
  document.getElementById('e-img').src = enemy.imgUrl;
  document.getElementById('e-hp-bar').style.width = '100%';
  document.getElementById('e-hp-txt').innerText = `HP: ${enemy.hp} / ${enemy.maxHp}`;
  document.getElementById('e-stats').innerText = `Tấn công: ${enemy.atk} | Giáp: ${enemy.def} | Tốc: ${enemy.attackCooldown}s/đòn`;
  document.getElementById('e-equipped').innerText = (enemy.cards.length > 0) ? enemy.cards.map(id => CARDS[id].name).join(', ') : 'Không có';

  btnStart.disabled = false;
  btnStart.innerText = `⚔️ BẮT ĐẦU CHIẾN ĐẤU VỚI ${enemy.name.toUpperCase()}!`;
  log(`🎯 Bạn đã chọn: <b>${enemy.name}</b>. Nhớ trang bị đủ 3 thẻ bài trước khi bấm bắt đầu!`, 'log-sys');
}

function calculatePlayerStats() {
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
}

function triggerStartBattle() {
  if (!enemy || isFighting) return;

  isFighting = true;
  tick = 0;
  document.getElementById('combat-log').innerHTML = '';

  calculatePlayerStats();
  player.hp = player.maxHp;
  player.attackCount = 0;
  player.healCount = 0;
  player.critStacks = 0;
  player.frenzyTimer = 0;
  player.attackCooldown = 2;
  player.bloodSoul = 0;
  player.moraHealCount = 0;
  player.moraBonusAtk = 0;

  enemy.hp = enemy.maxHp;
  enemy.attackCount = 0;
  enemy.healCount = 0;
  enemy.critStacks = 0;
  enemy.frenzyTimer = 0;
  enemy.bloodSoul = 0;
  enemy.moraHealCount = 0;
  enemy.moraBonusAtk = 0;

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

  // Áp dụng bùa lợi/hiệu ứng mỗi giây (người chơi được cộng dồn cả 3 thẻ mang theo)
  applyPerSecond(player, enemy, equippedCardIds, 'player', 'enemy', 'log-p');
  applyPerSecond(enemy, player, enemy.cards, 'enemy', 'player', 'log-e');

  if (checkCombatEnd()) return;

  // Lượt ra đòn
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
  let raw = calcDamage(effectiveAtk, defObj.def);

  let isCrit = false;
  if (cardIds.includes('crit')) {
    let rate = (atkObj.critStacks * 0.5) / 100;
    if (Math.random() < rate) {
      isCrit = true;
      raw *= 3;
    }
  }

  const defCardIds = (defObj === player) ? equippedCardIds : defObj.cards;

  // Thẻ Thủ Dương Võ
  if (defCardIds.includes('tank') && Math.random() < 0.3) {
    let reflect = Math.round(raw * 0.5);
    atkObj.hp = Math.max(0, atkObj.hp - reflect);
    showPopup(defType, `BLOCK!`, 'dmg-true');
    showPopup(atkType, `-${reflect}`, 'dmg-norm');
    showSkillBanner(defType, '🛡️ BLOCK & PHẢN ĐÒN!', '#facc15');
    log(`🛡️ [${defObj.name}] BLOCK & phản lại <b>${reflect}</b> sát thương!`, 'log-sys');
    return;
  }

  // Kỹ năng Boss Mora (Hấp thụ 50%, mỗi 2 lần +2 ATK)
  if (defCardIds.includes('mora') && Math.random() < 0.14) {
    let healAmount = Math.max(1, Math.round(raw * 0.5));
    defObj.hp = Math.min(defObj.maxHp, defObj.hp + healAmount);
    defObj.moraHealCount = (defObj.moraHealCount || 0) + 1;
    showPopup(defType, `+${healAmount}`, 'dmg-heal');
    showSkillBanner(defType, '🐍 MORA HẤP THỤ!', '#0d9488');
    log(`🐍 [${defObj.name}] kích hoạt Hấp Thụ hồi lại <b>+${healAmount} HP</b> (${defObj.moraHealCount} lần).`, 'log-sys');

    if (defObj.moraHealCount % 2 === 0 && (defObj.moraBonusAtk || 0) < 96) {
      defObj.moraBonusAtk = Math.min(96, (defObj.moraBonusAtk || 0) + 2);
      showSkillBanner(defType, `⚔️ +2 ATK MORA! (${defObj.moraBonusAtk}/96)`, '#f59e0b');
      log(`🔥 [${defObj.name}] tăng vĩnh viễn <b>+2 ATK</b> (Tổng công: ${defObj.atk + defObj.moraBonusAtk}).`, 'log-crit');
    }
  }

  // Kỹ năng Boss Atula (Tích Huyết Hồn, đủ thì xả kết liễu)
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

  defObj.hp = Math.max(0, defObj.hp - raw);
  if (isCrit) {
    showPopup(defType, `💥 -${raw}`, 'dmg-crit');
    showSkillBanner(atkType, '💥 CHÍ MẠNG x3!', '#ef4444');
    log(`💥 <b>[CHÍ MẠNG x3]</b> ${atkName} gây <b>${raw}</b> ST!`, 'log-crit');
  } else {
    showPopup(defType, `-${raw}`, 'dmg-norm');
    log(`🗡️ ${atkName} gây <b>${raw}</b> sát thương.`, logCls);
  }

  // Thẻ Xạ Thủ Nguyễn Hoa
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
    log("💀 <b>Bạn đã thất bại! Hãy thử đổi bộ 3 thẻ bài khác hoặc cường hóa thêm chỉ số.</b>", 'log-e');
    btnStart.disabled = false;
    btnStart.innerText = `⚔️ TÁI ĐẤU VỚI ${enemy.name.toUpperCase()}`;
    updateUI();
    return true;
  }
  if (enemy && enemy.hp <= 0) {
    clearInterval(battleTimer);
    isFighting = false;
    
    // Mỗi trận thắng nhận 1 vé
    rollTickets += 1;

    // Chỉ khi đánh bại Boss thì thẻ của Boss đó mới ĐƯỢC PHÉP VÀO POOL ROLL
    if (enemy.id !== 'training' && !poolAvailableCards.includes(enemy.id)) {
      poolAvailableCards.push(enemy.id);
      log(`🌟 <b>CHIẾN CÔNG!</b> Đã mở khóa <b>${CARDS[enemy.id].name}</b> vào Bể Roll!`, 'log-crit');
    }

    saveData();
    log(`🎉 <b>Bạn đã đánh bại ${enemy.name}! Nhận được +1 vé Roll thẻ bài!</b>`, 'log-sys');
    btnStart.disabled = false;
    btnStart.innerText = `⚔️ TÁI ĐẤU VỚI ${enemy.name.toUpperCase()}`;
    renderCards();
    updateUI();
    return true;
  }
  return false;
}

// ==========================================
// 4. ROLL GACHA (CHỈ ROLL TRONG POOL ĐÃ UNLOCK)
// ==========================================
function rollCard(times) {
  if (rollTickets < times) {
    alert(`Bạn cần có ít nhất ${times} vé! Đánh thắng đối thủ để nhận thêm vé.`);
    return;
  }

  rollTickets -= times;
  const results = [];

  for (let i = 0; i < times; i++) {
    // 25% trúng thẻ, 75% trượt
    if (Math.random() < 0.25) {
      // TUYỆT ĐỐI CHỈ LẤY TRONG DANH SÁCH poolAvailableCards (Không bao giờ lấy ngoài)
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

function toggleEquip(cardId) {
  if (!unlockedCards.includes(cardId)) return;

  const idx = equippedCardIds.indexOf(cardId);
  if (idx > -1) {
    equippedCardIds.splice(idx, 1);
    log(`Đã gỡ thẻ: ${CARDS[cardId].name}`, 'log-sys');
  } else {
    // Luôn cho phép trang bị tối đa 3 thẻ
    if (equippedCardIds.length >= 3) {
      alert("Bạn chỉ có thể mang tối đa 3 thẻ cùng lúc! Hãy gỡ bớt 1 thẻ trước.");
      return;
    }
    equippedCardIds.push(cardId);
    log(`Đã trang bị: ${CARDS[cardId].name}`, 'log-sys');
  }

  calculatePlayerStats();
  saveData();
  renderCards();
  updateUI();
}

function renderCards() {
  const pool = document.getElementById('roll-pool');
  pool.innerHTML = '';

  for (let key in CARDS) {
    const c = CARDS[key];
    const isInPool = poolAvailableCards.includes(key);
    const isUnlocked = unlockedCards.includes(key);
    const isEquipped = equippedCardIds.includes(key);

    const cardDiv = document.createElement('div');
    cardDiv.className = `roll-card ${isUnlocked ? '' : 'locked'} ${isEquipped ? 'active' : ''}`;
    
    let statusBadge = '';
    if (c.isBoss && !isInPool) {
      statusBadge = `<div style="font-size: 10px; color: #ef4444; margin-bottom: 4px;">🔒 Cần thắng boss để mở vào Pool</div>`;
    } else if (c.isBoss && !isUnlocked) {
      statusBadge = `<div style="font-size: 10px; color: #38bdf8; margin-bottom: 4px;">🎲 Đã có trong Pool (Chưa Roll trúng)</div>`;
    } else if (!c.isBoss) {
      statusBadge = `<div style="font-size: 10px; color: #4ade80; margin-bottom: 4px;">✨ Thẻ cơ bản (Có sẵn)</div>`;
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
    let enemyAtkText = enemy.atk + (enemy.moraBonusAtk || 0);
    document.getElementById('e-stats').innerText = `Tấn công: ${enemyAtkText} | Giáp: ${enemy.def} | Tốc: ${enemy.attackCooldown}s/đòn`;

    if (enemy.id === 'atula') {
      document.getElementById('atula-soul-txt').innerText = `${enemy.bloodSoul} / Cần ${player.hp} để trảm`;
      let soulPercent = Math.min(100, (enemy.bloodSoul / player.maxHp * 100));
      document.getElementById('atula-soul-bar').style.width = `${soulPercent}%`;
    }
  }
}

function resetGame() {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu để chơi lại từ đầu?")) {
    localStorage.clear();
    location.reload();
  }
}

calculatePlayerStats();
renderCards();
updateUI();
