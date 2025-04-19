document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.awards-container');
    const cards = container.querySelectorAll('.award-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    const cardsPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;

    // Create dots
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        const offset = -(currentIndex * (100 / cardsPerView));
        container.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        }
    });

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50 && currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > 50 && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });
});