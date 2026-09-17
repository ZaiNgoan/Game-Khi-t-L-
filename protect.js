// ==========================================
// BẢO VỆ CHỐNG F12 & XEM SOURCE CODE
// ==========================================
(function() {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.keyCode === 73 || e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.keyCode === 74 || e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.keyCode === 67 || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 85 || e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      return false;
    }
  });
  setInterval(function() {
    console.clear();
  }, 2000);
})();
