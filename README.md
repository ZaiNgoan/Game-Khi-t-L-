# Game-Khi-t-L-
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đấu Trường Thẻ Bài Pokémon</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { text-align: center; color: #38bdf8; margin-bottom: 20px; font-size: 24px; }
    
    .arena { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .card { background: #1e293b; padding: 16px; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .card-title { font-size: 18px; font-weight: bold; color: #e2e8f0; }
    .badge { padding: 2px 8px; border-radius: 9999px; font-size: 11px; background: #3b82f6; }
    
    .bar-wrap { background: #334155; height: 14px; border-radius: 7px; overflow: hidden; margin: 8px 0; }
    .bar-fill { height: 100%; transition: width 0.2s ease-in-out; }
    .hp-player { background: #22c55e; }
    .hp-enemy { background: #ef4444; }
    
    .stats { font-size: 13px; color: #94a3b8; line-height: 1.6; }
    .equipped-card { background: #0f172a; border-left: 3px solid #f59e0b; padding: 6px 10px; margin-top: 10px; font-size: 12px; border-radius: 4px; }
    
    .controls { background: #1e293b; border-radius: 12px; padding: 16px; margin-bottom: 20px; border: 1px solid #334155; }
    .btn-group { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
    button { background: #2563eb; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 500; }
    button:hover { background: #1d4ed8; }
    button:disabled { background: #475569; cursor: not-allowed; }
    
    .roll-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; margin-top: 10px; }
    .roll-card { background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 10px; text-align: center; }
    .roll-card.locked { opacity: 0.5; filter: grayscale(1); }
    .roll-card h4 { margin: 0 0 6px 0; font-size: 14px; color: #f59e0b; }
    .roll-card p { font-size: 11px; color: #94a3b8; margin: 0 0 8px 0; min-height: 38px; }
    
    #combat-log { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 12px; height: 160px; overflow-y: auto; font-family: monospace; font-size: 12px; color: #cbd5e1; }
    .log-p { color: #38bdf8; }
    .log-e { color: #f87171; }
    .log-sys { color: #fbbf24; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>⚔️ ĐẤU TRƯỜNG THẺ BÀI POKÉMON</h1>

    <div class="arena">
      <!-- Nhân vật chính -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Nhân Vật Chính</span>
          <span class="badge">Người chơi</span>
        </div>
        <div class="bar-wrap"><div id="p-hp-bar" class="bar-fill hp-player" style="width: 100%;"></div></div>
        <div id="p-hp-txt" style="font-weight: bold; font-size: 13px;">HP: 100 / 100</div>
        <div class="stats" id="p-stats">Tấn công: 5 | Phòng thủ: 5 | Tốc đánh: 2s/đòn</div>
        <div class="equipped-card" id="p-equipped">Thẻ trang bị: Chưa có</div>
      </div>

      <!-- Đối thủ khiêu chiến -->
      <div class="card">
        <div class="card-header">
          <span class="card-title" id="e-name">Chưa chọn đối thủ</span>
          <span class="badge" id="e-status">Chờ đấu</span>
        </div>
        <div class="bar-wrap"><div id="e-hp-bar" class="bar-fill hp-enemy" style="width: 100%;"></div></div>
        <div id="e-hp-txt" style="font-weight: bold; font-size: 13px;">HP: 0 / 0</div>
        <div class="stats" id="e-stats">Tấn công: 0 | Phòng thủ: 0 | Tốc đánh: 2s/đòn</div>
        <div class="equipped-card" id="e-equipped">Kỹ năng mang theo: Không</div>
      </div>
    </div>

    <!-- Khu vực Khiêu chiến và Roll thẻ -->
    <div class="controls">
      <div style="font-weight: bold; margin-bottom: 8px;">1. Chọn Pokémon khiêu chiến để mở khóa Roll:</div>
      <div class="btn-group">
        <button onclick="startBattle('archer')">Đấu Decidueye (Xạ Thủ)</button>
        <button onclick="startBattle('mage')">Đấu Gardevoir (Thuật Sư)</button>
        <button onclick="startBattle('tank')">Đấu Blastoise (Thủ)</button>
        <button onclick="startBattle('phoenix')">Đấu Ho-Oh (Ngọn Lửa PH)</button>
      </div>

      <div style="font-weight: bold; margin-top: 16px; margin-bottom: 4px;">2. Khu vực Roll thẻ bài (Đánh bại mới mở khóa):</div>
      <div class="roll-section" id="roll-pool">
        <!-- Được tạo tự động bởi JavaScript -->
      </div>
    </div>

    <div id="combat-log"></div>
  </div>

  <script>
    // 1. DỮ LIỆU THẺ BÀI RARE
    const CARDS = {
      archer: {
        id: 'archer',
        name: 'Thẻ Xạ Thủ',
        enemyName: 'Decidueye',
        desc: '+5 Tấn công. Mỗi đòn thứ 3 gây thêm 4% HP tối đa mục tiêu (Chuẩn).',
        atkBonus: 5,
        unlocked: false
      },
      mage: {
        id: 'mage',
        name: 'Thẻ Thuật Sư',
        enemyName: 'Gardevoir',
        desc: 'Mỗi 1s hồi 7 máu, nhịp hồi thứ 5 hồi x2 (14 máu).',
        atkBonus: 0,
        unlocked: false
      },
      tank: {
        id: 'tank',
        name: 'Thẻ Thủ',
        enemyName: 'Blastoise',
        desc: '30% Block đòn đánh, phản lại 50% sát thương đó.',
        atkBonus: 0,
        unlocked: false
      },
      phoenix: {
        id: 'phoenix',
        name: 'Thẻ Ngọn Lửa Phượng Hoàng',
        enemyName: 'Ho-Oh',
        desc: 'Mỗi 1s thiêu đốt đối thủ mất 0.3% HP tối đa (Sát thương chuẩn).',
        atkBonus: 0,
        unlocked: false
      }
    };

    // 2. THÔNG SỐ NHÂN VẬT GỐC
    let player = {
      name: "Nhân Vật Chính",
      maxHp: 100,
      hp: 100,
      baseAtk: 5,
      atk: 5,
      def: 5,
      card: null,
      attackCount: 0,
      healCount: 0
    };

    let enemy = null;
    let battleTimer = null;
    let tick = 0;

    function log(msg, type = '') {
      const box = document.getElementById('combat-log');
      const cls = type ? `class="${type}"` : '';
      box.innerHTML += `<div ${cls}>[${tick}s] ${msg}</div>`;
      box.scrollTop = box.scrollHeight;
    }

    // Tính toán sát thương vật lý qua giáp
    function calcDamage(atk, def) {
      const red = 100 / (100 + def);
      return Math.max(1, Math.round(atk * red));
    }

    // 3. KHỞI TẠO ĐỐI THỦ VÀ TRẬN ĐẤU
    function startBattle(cardId) {
      if (battleTimer) clearInterval(battleTimer);
      tick = 0;
      document.getElementById('combat-log').innerHTML = '';

      // Reset chỉ số người chơi
      player.hp = player.maxHp;
      player.atk = player.baseAtk + (player.card ? player.card.atkBonus : 0);
      player.attackCount = 0;
      player.healCount = 0;

      const baseCard = CARDS[cardId];
      enemy = {
        id: cardId,
        name: baseCard.enemyName,
        maxHp: 120,
        hp: 120,
        atk: 6 + baseCard.atkBonus,
        def: 5,
        card: baseCard,
        attackCount: 0,
        healCount: 0
      };

      log(`⚔️ Bắt đầu khiêu chiến với <b>${enemy.name}</b>!`, 'log-sys');
      updateUI();

      // Vòng lặp chiến đấu chạy mỗi 1 giây (1 tick)
      battleTimer = setInterval(battleTick, 1000);
    }

    // 4. LOGIC MỖI GIÂY (COMBAT TICK)
    function battleTick() {
      tick++;

      // --- HIỆU ỨNG THỜI GIAN (HỒI MÁU & THIÊU ĐỐT) MỖI 1 GIÂY ---
      applyPassivePerSecond(player, enemy, 'log-p');
      applyPassivePerSecond(enemy, player, 'log-e');

      if (checkCombatEnd()) return;

      // --- TỐC ĐỘ ĐÁNH 2s / 1 ĐÒN (Đánh vào các giây chẵn: 2, 4, 6...) ---
      if (tick % 2 === 0) {
        // Người chơi đánh đối thủ
        performAttack(player, enemy, 'Bạn', 'log-p');
        if (checkCombatEnd()) return;

        // Đối thủ đánh trả người chơi
        performAttack(enemy, player, enemy.name, 'log-e');
        if (checkCombatEnd()) return;
      }

      updateUI();
    }

    // Xử lý hiệu ứng mỗi giây: Thuật Sư & Phượng Hoàng
    function applyPassivePerSecond(source, target, logClass) {
      if (!source.card) return;

      // 1. Thẻ Thuật Sư: hồi máu mỗi giây, nhịp thứ 5 hồi x2 (14 máu)
      if (source.card.id === 'mage') {
        source.healCount++;
        let healAmount = (source.healCount % 5 === 0) ? 14 : 7;
        let oldHp = source.hp;
        source.hp = Math.min(source.maxHp, source.hp + healAmount);
        log(`✨ [${source.name}] kích hoạt Thuật Sư hồi <b>+${source.hp - oldHp} HP</b> (${source.healCount % 5 === 0 ? 'Hồi x2' : 'Hồi 7'}).`, logClass);
      }

      // 2. Thẻ Ngọn Lửa Phượng Hoàng: Thiêu đốt 0.3% máu tối đa mỗi giây (Sát thương chuẩn)
      if (source.card.id === 'phoenix') {
        let burnDmg = Math.max(1, Math.round(target.maxHp * 0.003));
        target.hp = Math.max(0, target.hp - burnDmg);
        log(`🔥 [${source.name}] ngọn lửa thiêu đốt đối phương chịu <b>${burnDmg}</b> ST chuẩn.`, logClass);
      }
    }

    // Xử lý đòn đánh thường: Xạ Thủ & Thẻ Thủ
    function performAttack(attacker, defender, attackerName, logClass) {
      attacker.attackCount++;
      let rawDmg = calcDamage(attacker.atk, defender.def);

      // Thẻ Thủ: 30% Block toàn bộ và phản lại 50% sát thương
      if (defender.card && defender.card.id === 'tank') {
        if (Math.random() < 0.3) {
          let reflectDmg = Math.round(rawDmg * 0.5);
          attacker.hp = Math.max(0, attacker.hp - reflectDmg);
          log(`🛡️ [${defender.name}] <b>BLOCK thành công</b> đòn đánh! Phản lại <b>${reflectDmg}</b> sát thương lên ${attackerName}!`, 'log-sys');
          return;
        }
      }

      // Gây sát thương cơ bản
      defender.hp = Math.max(0, defender.hp - rawDmg);
      log(`🗡️ ${attackerName} tấn công gây <b>${rawDmg}</b> sát thương.`, logClass);

      // Thẻ Xạ Thủ: Đòn đánh thứ 3 gây thêm 4% HP tối đa thành ST Chuẩn
      if (attacker.card && attacker.card.id === 'archer' && attacker.attackCount % 3 === 0) {
        let trueDmg = Math.max(1, Math.round(defender.maxHp * 0.04));
        defender.hp = Math.max(0, defender.hp - trueDmg);
        log(`🎯 [${attacker.name}] kích hoạt Xạ Thủ (Đòn 3): Bắn xuyên giáp gây <b>+${trueDmg}</b> ST Chuẩn!`, 'log-sys');
      }
    }

    // Kiểm tra kết thúc trận
    function checkCombatEnd() {
      if (player.hp <= 0) {
        clearInterval(battleTimer);
        log("💀 <b>Bạn đã thất bại! Hãy thử lại hoặc đổi chiến thuật.</b>", 'log-e');
        updateUI();
        return true;
      }
      if (enemy && enemy.hp <= 0) {
        clearInterval(battleTimer);
        log(`🎉 <b>Bạn đã chiến thắng ${enemy.name}! Đã mở khóa Roll ${enemy.card.name}!</b>`, 'log-sys');
        CARDS[enemy.id].unlocked = true;
        renderRollPool();
        updateUI();
        return true;
      }
      return false;
    }

    // 5. CƠ CHẾ ROLL VÀ TRANG BỊ THẺ
    function rollAndEquip(cardId) {
      const card = CARDS[cardId];
      if (!card.unlocked) return;

      player.card = card;
      player.atk = player.baseAtk + card.atkBonus;
      log(`🎲 Đã Roll & Trang bị thành công: <b>${card.name}</b>!`, 'log-sys');
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
          <h4>${c.name}</h4>
          <p>${c.desc}</p>
          <button ${c.unlocked ? '' : 'disabled'} onclick="rollAndEquip('${c.id}')">
            ${c.unlocked ? 'Trang Bị Thẻ' : 'Khóa (Cần thắng)'}
          </button>
        `;
        pool.appendChild(cardDiv);
      }
    }

    function updateUI() {
      // Cập nhật người chơi
      document.getElementById('p-hp-bar').style.width = (player.hp / player.maxHp * 100) + '%';
      document.getElementById('p-hp-txt').innerText = `HP: ${player.hp} / ${player.maxHp}`;
      document.getElementById('p-stats').innerText = `Tấn công: ${player.atk} | Phòng thủ: ${player.def} | Tốc đánh: 2s/đòn`;
      document.getElementById('p-equipped').innerText = `Thẻ trang bị: ${player.card ? player.card.name : 'Chưa có'}`;

      // Cập nhật đối thủ
      if (enemy) {
        document.getElementById('e-name').innerText = enemy.name;
        document.getElementById('e-status').innerText = enemy.hp > 0 ? 'Đang đấu' : 'Đã gục';
        document.getElementById('e-hp-bar').style.width = Math.max(0, (enemy.hp / enemy.maxHp * 100)) + '%';
        document.getElementById('e-hp-txt').innerText = `HP: ${enemy.hp} / ${enemy.maxHp}`;
        document.getElementById('e-stats').innerText = `Tấn công: ${enemy.atk} | Phòng thủ: ${enemy.def} | Tốc đánh: 2s/đòn`;
        document.getElementById('e-equipped').innerText = `Kỹ năng mang theo: ${enemy.card.name}`;
      }
    }

    // Khởi tạo ban đầu
    renderRollPool();
    updateUI();
  </script>
</body>
</html>
