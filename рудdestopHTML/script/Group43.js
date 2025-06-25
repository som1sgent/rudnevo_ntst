// Управление видео
let isPlaying = false;
function playVideo() {
    const video = document.getElementById('mainVideo');
    const playButton = document.getElementById('playButton');
    const img = playButton.querySelector('img');
    if (!video || !playButton || !img) return;

    if (video.paused) {
        video.play();
        isPlaying = true;
        img.src = "public/Pause.svg";
        img.alt = "Pause";
    } else {
        video.pause();
        isPlaying = false;
        img.src = "public/Play.svg";
        img.alt = "Play";
    }
}
// Анимация кнопки при нажатии
window.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    if (playButton) {
        playButton.addEventListener('mousedown', () => {
            const button = playButton.querySelector('.but-g');
            if (button) {
                button.style.transform = 'scale(0.95)';
                button.style.opacity = '0.7';
            }
        });
        playButton.addEventListener('mouseup', () => {
            const button = playButton.querySelector('.but-g');
            if (button) {
                button.style.transform = 'scale(1)';
                button.style.opacity = '1';
            }
        });
    }
});