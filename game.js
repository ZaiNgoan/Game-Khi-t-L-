<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đấu Trường Thẻ Bài Chiến Thuật</title>
  <link rel="stylesheet" href="style.css">
  <!-- Nhúng file bảo vệ chống F12 -->
  <script src="protect.js"></script>
</head>
<body>
  <div class="container">
    <h1>⚔️ ĐẤU TRƯỜNG THẺ BÀI CHIẾN THUẬT</h1>

    <!-- 1. SÀN ĐẤU -->
    <div class="arena">
      <!-- Người chơi -->
      <div class="card" id="card-p">
        <div class="card-header">
          <span class="card-title">Nhân Vật Chính</span>
          <span class="badge" id="p-silence-badge" style="background:#2563eb;">Người chơi</span>
        </div>
        <div class="avatar-wrap">
          <img id="p-img" src="https://play.pokemonshowdown.com/sprites/ani/pikachu.gif" alt="Player">
        </div>
        <div class="bar-wrap"><div id="p-hp-bar" class="bar-fill hp-player" style="width: 100%;"></div></div>
        <div id="p-hp-txt" style="font-weight: bold; font-size: 13px;">HP: 100 / 100</div>
        <div class="stats" id="p-stats">Tấn công: 10 | Giáp: 0 | Tốc: 2s/đòn</div>
        <div class="equipped-box">
          <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px;">
            Thẻ đang mang: <span id="p-equip-limit-txt" style="color:#f59e0b;">(Chọn đối thủ để xác định)</span>
          </div>
          <div id="p-equipped-list">Chưa trang bị thẻ nào</div>
        </div>
      </div>

      <!-- Đối thủ -->
      <div class="card" id="card-e">
        <div class="card-header">
          <span class="card-title" id="e-name">Chưa chọn đối thủ</span>
          <span class="badge" id="e-status">Chờ chọn</span>
        </div>
        <div class="avatar-wrap">
          <img id="e-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Enemy">
        </div>
        <div class="bar-wrap"><div id="e-hp-bar" class="bar-fill hp-enemy" style="width: 100%;"></div></div>
        <div id="e-hp-txt" style="font-weight: bold; font-size: 13px;">HP: 0 / 0</div>

        <!-- Thanh Huyết Hồn cho Boss Atula -->
        <div id="atula-soul-box" style="display: none; margin-top: 4px;">
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #f43f5e; font-weight: bold;">
            <span>🩸 Huyết Hồn:</span>
            <span id="atula-soul-txt">0</span>
          </div>
          <div class="bar-wrap" style="height: 8px; background: #3f1d24; margin: 2px 0 6px 0;">
            <div id="atula-soul-bar" class="bar-fill" style="background: #f43f5e; width: 0%;"></div>
          </div>
        </div>

        <div class="stats" id="e-stats">Tấn công: 0 | Giáp: 0 | Tốc: 2s/đòn</div>
        <div class="equipped-box">
          <div style="font-weight: bold; font-size: 12px; margin-bottom: 4px;">Kỹ năng mang theo:</div>
          <div id="e-equipped">Không</div>
        </div>
      </div>
    </div>

    <!-- NÚT BẮT ĐẦU CHIẾN ĐẤU -->
    <div class="battle-actions">
      <button id="btn-start-battle" class="btn-start" onclick="triggerStartBattle()" disabled>
        ⚔️ CHỌN ĐỐI THỦ PHÍA DƯỚI ĐỂ CHIẾN ĐẤU
      </button>
    </div>

    <!-- KHUNG LOG CHIẾN ĐẤU -->
    <div id="combat-log"></div>

    <!-- KHU VỰC CHỌN BOSS -->
    <div class="controls">
      <div style="font-weight: bold; margin-bottom: 8px; color: #94a3b8;">1. TẬP SỰ (+1 Vé Roll):</div>
      <div class="btn-group" style="margin-bottom: 12px;">
        <button onclick="selectEnemy('training')">🎯 Bù Nhìn Tập Luyện</button>
      </div>

      <div style="font-weight: bold; margin-bottom: 8px; color: #38bdf8;">2. ELITE BOSS (120 HP - 10 ATK - 4 DEF | Mang tối đa 2 THẺ | +3 Vé Roll):</div>
      <div class="btn-group" style="margin-bottom: 12px;">
        <button onclick="selectEnemy('archer')">🏹 Nguyễn Hoa</button>
        <button onclick="selectEnemy('mage')">🔮 Đức Lương</button>
        <button onclick="selectEnemy('tank')">🛡️ Dương Võ</button>
        <button onclick="selectEnemy('phoenix')">🔥 Hữu Phai</button>
        <button onclick="selectEnemy('crit')">💥 Đăng Khang</button>
        <button onclick="selectEnemy('frenzy')">⚡ Phạm Đạt</button>
        <button onclick="selectEnemy('cruise')" style="background: #0284c7;">🌊 Triều Cường</button>
      </div>

      <div style="font-weight: bold; margin-bottom: 8px; color: #e11d48;">3. SIÊU BOSS (Mang tối đa 3 THẺ | +4 Vé Roll):</div>
      <div class="btn-group" style="margin-bottom: 12px;">
        <button onclick="selectEnemy('mora')" style="background: #0d9488;">🐍 Boss Mora (750 HP)</button>
        <button onclick="selectEnemy('atula')" style="background: #b91c1c;">👹 Boss Atula (1200 HP)</button>
        <button onclick="selectEnemy('kolos')" style="background: #7c3aed;">💀 Boss Kolos (1000 HP)</button>
        <button onclick="selectEnemy('ayanokouji')" style="background: #be185d;">♟️ Ayanokouji-kun (50 HP - 50 ATK)</button>
      </div>

      <div style="font-weight: bold; margin-bottom: 8px; color: #f59e0b;">4. FINAL BOSS (ĐƯỢC MANG 5 THẺ | +10 Vé Roll):</div>
      <div class="btn-group">
        <button onclick="selectEnemy('bles')" style="background: linear-gradient(135deg, #f59e0b 0%, #b45309 100%); font-weight: bold;">
          👑 KHIẾT NGUYỄN (10.000 HP - 65 ATK - 0 DEF)
        </button>
      </div>
    </div>

    <!-- MÁY ROLL VÀ KHO THẺ -->
    <div class="controls">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div style="font-weight: bold;">
          🎲 Máy Roll Thẻ Bài: <span id="roll-tickets" style="color: #f59e0b; font-size: 18px;">10</span> vé
        </div>
        <div style="display: flex; gap: 8px;">
          <button onclick="rollCard(1)" style="background: #10b981;">🎲 Roll 1 Lần</button>
          <button onclick="rollCard(10)" style="background: #f59e0b;">✨ Roll 10 Lần</button>
          <button onclick="resetGame()" style="background: #475569; font-size: 11px;">🔄 Chơi lại</button>
        </div>
      </div>
      <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Tỉ lệ: 25% trúng thẻ mới | 75% trượt. Không bao giờ roll trùng thẻ đã sở hữu!</div>

      <!-- BỘ LỌC THẺ BÀI -->
      <div style="margin-top: 16px;">
        <div style="font-weight: bold; margin-bottom: 8px;">Kho thẻ bài:</div>
        <div class="filter-tabs">
          <button class="tab-btn active" onclick="setCardFilter('all', this)">🌟 Tất Cả (12)</button>
          <button class="tab-btn" onclick="setCardFilter('basic', this)">🟢 Mặc Định (3)</button>
          <button class="tab-btn" onclick="setCardFilter('elite', this)">🔵 Boss Elite (7)</button>
          <button class="tab-btn" onclick="setCardFilter('super', this)">🟣 Siêu Boss & Final (5)</button>
        </div>
      </div>

      <div class="roll-section" id="roll-pool"></div>
    </div>

    <!-- 5. BẢNG XẾP HẠNG PHÁ ĐẢO -->
    <div class="hall-of-fame">
      <h3 style="margin: 0 0 8px 0; color: #f59e0b; text-align: center;">🏆 BẢNG XẾP HẠNG ANH HÙNG PHÁ ĐẢO 🏆</h3>
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0 0 12px 0;">Vinh danh những chiến thần đã đánh bại Final Boss Khiết Nguyễn</p>
      <table class="hall-table">
        <thead>
          <tr>
            <th style="width: 15%;">Hạng</th>
            <th style="width: 45%;">Tên Người Chơi</th>
            <th style="width: 40%;">Thời Gian</th>
          </tr>
        </thead>
        <tbody id="hall-list"></tbody>
      </table>
    </div>
  </div>

  <!-- MODAL POPUP ROLL GACHA -->
  <div id="gacha-modal" class="modal-overlay">
    <div class="modal-box">
      <h3 id="gacha-title">🎉 KẾT QUẢ ROLL</h3>
      <div id="gacha-content" class="gacha-grid"></div>
      <button class="btn-close-modal" onclick="closeGachaModal()">Nhận và Đóng</button>
    </div>
  </div>

  <!-- MODAL NHẬP TÊN CHIẾN THẮNG -->
  <div id="victory-modal" class="modal-overlay">
    <div class="victory-modal-box">
      <h2 style="color: #f59e0b; margin-top: 0;">👑 PHÁ ĐẢO TRÒ CHƠI! 👑</h2>
      <p style="font-size: 13px; color: #e2e8f0;">Chúc mừng bạn đã hạ gục <b>Khiết Nguyễn (Ultra BLES)</b> và hoàn thành game! Hãy khắc ghi tên mình vào Bảng Xếp Hạng:</p>
      <input type="text" id="winner-name-input" class="victory-input" placeholder="Nhập tên hoặc biệt danh của bạn..." maxlength="25">
      <br>
      <button class="btn-close-modal" onclick="submitVictoryName()">Gửi & Vinh Danh</button>
    </div>
  </div>

  <script src="game.js"></script>
</body>
</html>
