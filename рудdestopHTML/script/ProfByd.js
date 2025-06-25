function changeProf(direction) {
    const nextElement = document.querySelector('.flex-items-center img');
}
document.querySelector('.flex-items-center').addEventListener('mouseenter', function() {
    this.querySelector('img').src = './public/bel.svg';
});

document.querySelector('.flex-items-center').addEventListener('mouseleave', function() {
    this.querySelector('img').src = './public/arrow-right1.svg';
});
