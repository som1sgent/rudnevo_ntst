let currentQuote = 1;
const maxQuotes = 5;

function changeQuote(direction) {
    const counterElement = document.querySelector('.nav-text span');
    
    if (direction === 'next' && currentQuote < maxQuotes) {
        currentQuote++;
    } else if (direction === 'prev' && currentQuote > 1) {
        currentQuote--;
    }
    
    counterElement.textContent = currentQuote.toString().padStart(2, '0');
}

document.querySelectorAll('.nav-button.left').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.querySelector('img').src = 'public/bel-left.svg';
    });
    btn.addEventListener('mouseleave', function() {
        this.querySelector('img').src = 'public/arrow-right.svg';
    });
});

document.querySelectorAll('.nav-button.right').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.querySelector('img').src = 'public/arrow-left.svg';
    });
    btn.addEventListener('mouseleave', function() {
        this.querySelector('img').src = 'public/bel.svg';
    });
});


// Анимация набора текста
async function typeText(element, text, speed = 20) {
    const flover = element.closest('.flover');
    for (let i = 0; i <= text.length; i++) {
        element.textContent = text.slice(0, i);
        if (flover) {
            flover.style.height = flover.scrollHeight + 'px';
        }
        await new Promise(r => setTimeout(r, speed));
    }
    if (flover) {
        setTimeout(() => {
            flover.style.height = '';
        }, 200); // чуть позже, чтобы transition доиграл
    }
}
// CSS-анимация затухания
function fadeOutText(element, duration = 300) {
    return new Promise(resolve => {
        element.classList.add('fade-out');
        setTimeout(() => {
            element.classList.remove('fade-out');
            element.textContent = '';
            resolve();
        }, duration);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const blocks = Array.from(document.querySelectorAll('.quote-block'));
    let current = 0;

    // Сохраняем оригинальный текст каждой цитаты в data-fulltext
    blocks.forEach(block => {
        const p = block.querySelector('.flover p');
        if (p && !p.dataset.fulltext) {
            p.dataset.fulltext = p.textContent;
        }
    });

    async function showBlockAnimated(idx, prevIdx) {
        // Плавно скрываем предыдущий текст
        if (typeof prevIdx === 'number' && blocks[prevIdx]) {
            const prevP = blocks[prevIdx].querySelector('.flover p');
            if (prevP) await fadeOutText(prevP, 300); // 300мс затухание
        }
        // Показываем нужный блок
        blocks.forEach((b, i) => b.classList.toggle('hidden', i !== idx));
        // Печатаем текст в новом блоке
        const newP = blocks[idx].querySelector('.flover p');
        if (newP) {
            let fullText = newP.dataset.fulltext || newP.textContent;
            newP.textContent = '';
            await typeText(newP, fullText, 1); // скорость набора
        }
    }

    // Навешиваем обработчики на все кнопки внутри .navigation
    blocks.forEach((block, idx) => {
        block.querySelector('.nav-button.left').addEventListener('click', async function() {
            const prev = current;
            current = (current - 1 + blocks.length) % blocks.length;
            await showBlockAnimated(current, prev);
        });
        block.querySelector('.nav-button.right').addEventListener('click', async function() {
            const prev = current;
            current = (current + 1) % blocks.length;
            await showBlockAnimated(current, prev);
        });
    });

    // Первое появление — просто показать без анимации
    blocks.forEach((b, i) => b.classList.toggle('hidden', i !== current));
});
