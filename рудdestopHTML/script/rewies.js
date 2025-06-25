document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.review-form');
    const fioInput = document.getElementById('fio-input');
    const stars = document.querySelectorAll('.rating-stars .star');
    let selectedRating = 3; // Default rating (3 stars active initially)

    // FIO input validation: only letters and spaces allowed
    fioInput.addEventListener('input', () => {
        const regex = /^[А-Яа-яA-Za-z\s]*$/;
        if (!regex.test(fioInput.value)) {
            fioInput.value = fioInput.value.replace(/[^А-Яа-яA-Za-z\s]/g, '');
        }
    });

    // Star rating interaction
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            updateStars(selectedRating);
        });
    });

    function updateStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Form submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show thank you message
        const thankYouMessage = document.createElement('p');
        thankYouMessage.textContent = 'Большое спасибо за вашу оценку!';
        thankYouMessage.style.color = '#000';
        thankYouMessage.style.fontSize = '20px';
        thankYouMessage.style.fontWeight = '600';
        thankYouMessage.style.letterSpacing = '-2%';
        thankYouMessage.style.lineHeight = '140%';
        thankYouMessage.style.marginTop = '30px';
        thankYouMessage.style.textAlign = 'center';
        
        // Remove any existing thank you message
        const existingMessage = form.querySelector('p');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        form.appendChild(thankYouMessage);
        
        // Reset form
        form.reset();
        selectedRating = 3;
        updateStars(selectedRating);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            thankYouMessage.remove();
        }, 5000);
    });
});