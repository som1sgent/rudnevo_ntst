
document.querySelectorAll('.Knop-1').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.Knop-1').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});





// mini0: простое открытие/закрытие сайдбара
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
  });
  // mini6: аккордеон
  document.querySelectorAll('.accordion-header').forEach((btn, idx) => {
    btn.addEventListener('click', function() {
      const item = btn.parentElement;
      const content = item.querySelector('.accordion-content');
      const icon = btn.querySelector('.accordion-icon');
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        icon.textContent = '+';
      } else {
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-icon').textContent = '+';
        });
        item.classList.add('active');
        icon.textContent = '-';
      }
    });
  });