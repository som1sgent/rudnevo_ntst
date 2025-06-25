document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach((item, idx) => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', function() {
            items.forEach((el, i) => {
                if (i === idx) {
                    el.classList.toggle('active');
                    // Меняем иконку
                    const icon = el.querySelector('.accordion-icon img');
                    if (icon) {
                        icon.src = el.classList.contains('active') ? 'public/Min.svg' : 'public/plus.svg';
                    }
            } else {
                    el.classList.remove('active');
                    // Меняем иконку
                    const icon = el.querySelector('.accordion-icon img');
                    if (icon) {
                        icon.src = 'public/plus.svg';
                    }
                }
            });
        });
    });
});
