// Плавные объекты
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-up');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.001,
            rootMargin: '100px',
        }
    );
    const elements = document.querySelectorAll('[data-animate] > *');
    elements.forEach((element) => observer.observe(element));
});

// Плавный переход к секции Infrastructure без якоря 
const SCROLL_DURATION = 3000; // скорость
const SCROLL_OFFSET = -1000;    // высота

function smoothScrollToElementWithOffset(element, duration = 3000, offset = 0) {
    if (!element) {
        console.log('smoothScrollToElementWithOffset: element is null');
        return;
    }
    const targetY = element.getBoundingClientRect().top + window.pageYOffset + offset;
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    console.log('smoothScrollToElementWithOffset:', {startY, targetY, diff, duration, offset});
    let start;
    function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        window.scrollTo(0, startY + diff * percent);
        console.log('step:', {time, percent, scrollY: startY + diff * percent});
        if (percent < 1) {
            requestAnimationFrame(step);
        } else {
            console.log('Animation finished');
        }
    }
    requestAnimationFrame(step);
}
// увеличенная задержка
function scrollToSectionWithOffset(section) {
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
        window.scrollBy({ top: SCROLL_OFFSET, left: 0, behavior: 'instant' });
    }, 4000); 
}
document.addEventListener('DOMContentLoaded', function() {
    var infraLink = document.getElementById('infra-link');
    if (infraLink) {
        infraLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') {
                var section = document.getElementById('infrastructure');
                console.log('Click: on main page, section:', section);
                scrollToSectionWithOffset(section);
            } else {
                console.log('Click: not on main, set flag and go to index.html');
                localStorage.setItem('scrollToInfrastructure', '1');
                window.location.href = 'index.html';
            }
        });
    }
    function scrollToInfrastructureSection(attemptsLeft) {
        var section = document.getElementById('infrastructure');
        if (section) {
            console.log('Auto-scroll: section found, calling scrollToSectionWithOffset');
            scrollToSectionWithOffset(section);
        } else if (attemptsLeft > 0) {
            console.log('Auto-scroll: section not found, attempts left:', attemptsLeft);
            setTimeout(function() {
                scrollToInfrastructureSection(attemptsLeft - 1);
            }, 200);
        } else {
            console.log('Auto-scroll: section not found, giving up');
        }
    }

    if (localStorage.getItem('scrollToInfrastructure') === '1') {
        localStorage.removeItem('scrollToInfrastructure');
        scrollToInfrastructureSection(10);
    }
});

// Модальное окно с телефоном
document.addEventListener('DOMContentLoaded', function() {
    // Tooltip для телефона
    const showPhoneModal = document.getElementById('show-phone-modal');
    const phoneModal = document.getElementById('phoneModal');
    const closePhoneModal = document.getElementById('closePhoneModal');

    function hidePhoneModal() {
        phoneModal.classList.remove('visible');
    }

    if (showPhoneModal && phoneModal && closePhoneModal) {
        showPhoneModal.addEventListener('click', function(e) {
            phoneModal.classList.add('visible');
        });
        closePhoneModal.addEventListener('click', hidePhoneModal);
        document.addEventListener('mousedown', function(e) {
            if (phoneModal.classList.contains('visible') && !phoneModal.contains(e.target) && e.target !== showPhoneModal) {
                hidePhoneModal();
            }
        });
        window.addEventListener('scroll', hidePhoneModal);
        window.addEventListener('resize', hidePhoneModal);
    }

    // Tooltip для email
    const filledIcon = document.querySelector(".K > img[src='public/filled.svg']");
    const emailModal = document.getElementById('emailModal');
    const closeEmailModal = document.getElementById('closeEmailModal');
    function hideEmailModal() {
        emailModal.classList.remove('visible');
    }
    if (filledIcon && emailModal && closeEmailModal) {
        filledIcon.parentElement.addEventListener('click', function(e) {
            emailModal.classList.add('visible');
        });
        closeEmailModal.addEventListener('click', hideEmailModal);
        document.addEventListener('mousedown', function(e) {
            if (emailModal.classList.contains('visible') && !emailModal.contains(e.target) && e.target !== filledIcon.parentElement) {
                hideEmailModal();
            }
        });
        window.addEventListener('scroll', hideEmailModal);
        window.addEventListener('resize', hideEmailModal);
    }
});