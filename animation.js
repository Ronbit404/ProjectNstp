document.addEventListener('DOMContentLoaded', () => {
    const contextSections = document.querySelectorAll('.context-section');  // Now targeting only context-section for both
    const cards = document.querySelectorAll('.card');
    const counters = document.querySelectorAll('.counter');

    // Animate elements on scroll (including both context and trivia sections)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    contextSections.forEach(section => {
        section.classList.add('fade-in');  // Add fade-in class for fading effect
        observer.observe(section);  // Observe both context sections
    });

    cards.forEach(card => observer.observe(card));

    // Animate counters
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const isCurrency = counter.textContent.includes('B');
        const isPercentage = counter.textContent.includes('%');
        let count = 0;

        const animate = () => {
            const increment = target / 100;
            if (count < target) {
                count += increment;
                const displayCount = isCurrency ? `${(count / 1000).toFixed(1)}` : 
                                                 isPercentage ? Math.floor(count) : Math.floor(count);
                counter.textContent = isCurrency ? `${displayCount}B` :
                                     isPercentage ? `${displayCount}%` : displayCount;
                requestAnimationFrame(animate);
            } else {
                counter.textContent = isCurrency ? `${(target / 1000).toFixed(1)}B` :
                                     isPercentage ? `${target}%` : target.toLocaleString();
            }
        };

        // Start animation when card is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counterObserver.observe(counter.parentElement);
    });
});
