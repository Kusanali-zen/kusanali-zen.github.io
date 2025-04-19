document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.awards-container');
    const cards = document.querySelectorAll('.award-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentPosition = 0;
    const cardWidth = cards[0].offsetWidth + 32; // width + gap
    const visibleCards = 3;
    const maxPosition = -(cardWidth * (cards.length - visibleCards));

    function moveCarousel(direction) {
        if (direction === 'next' && currentPosition > maxPosition) {
            currentPosition -= cardWidth;
        } else if (direction === 'prev' && currentPosition < 0) {
            currentPosition += cardWidth;
        }
        
        container.style.transform = `translateX(${currentPosition}px)`;
        updateButtons();
    }

    function updateButtons() {
        prevBtn.style.opacity = currentPosition === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentPosition <= maxPosition ? '0.5' : '1';
        prevBtn.style.cursor = currentPosition === 0 ? 'default' : 'pointer';
        nextBtn.style.cursor = currentPosition <= maxPosition ? 'default' : 'pointer';
    }

    prevBtn.addEventListener('click', () => moveCarousel('prev'));
    nextBtn.addEventListener('click', () => moveCarousel('next'));

    // Initialize button states
    updateButtons();

    // Handle window resize
    window.addEventListener('resize', () => {
        // Reset position and update card width
        currentPosition = 0;
        container.style.transform = `translateX(0)`;
        updateButtons();
    });
});