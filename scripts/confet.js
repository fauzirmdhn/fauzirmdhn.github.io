const cakeContainer = document.getElementById('cake-container');
const flame = document.getElementById('flame');
const smoke = document.getElementById('smoke');
const stage = document.getElementById('stage');
const celebration = document.getElementById('celebration');

cakeContainer.addEventListener('click', () => {
    flame.classList.add('out');

    setTimeout(() => {
        smoke.classList.add('active');
        setTimeout(() => {
            cakeContainer.style.opacity = '0';
        }, 300);
        setTimeout(() => {
            cakeContainer.classList.add('hidden');
            setTimeout(() => {
                celebration.classList.add('active');
                createConfetti();
                spawnCats();
            }, 500);
        }, 800);
    }, 300);
});

function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            celebration.appendChild(confetti);

            setTimeout(() => {
                confetti.classList.add('active');
            }, 10);
        }, i * 30);
    }
}

function spewConfettiFromImage() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
    const photo = document.getElementById('photo');
    const photoBtn = document.getElementById('photo-btn');
    const rect = photoBtn.getBoundingClientRect();
    const celebrationRect = celebration.getBoundingClientRect();

    const centerX = rect.left - celebrationRect.left + rect.width / 2;
    const centerY = rect.top - celebrationRect.top + rect.height / 2;

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.position = 'absolute';
            confetti.style.left = centerX + 'px';
            confetti.style.top = centerY + 'px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';

            celebration.appendChild(confetti);

            const angle = (Math.random() * Math.PI * 2);
            const velocity = 3 + Math.random() * 8;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity;

            let x = centerX;
            let y = centerY;
            let opacity = 1;

            const animateConfetti = () => {
                x += vx;
                y += vy;
                vy += 0.15;
                opacity -= 0.01;

                confetti.style.left = x + 'px';
                confetti.style.top = y + 'px';
                confetti.style.opacity = Math.max(0, opacity);

                if (opacity > 0) {
                    requestAnimationFrame(animateConfetti);
                } else {
                    confetti.remove();
                }
            };

            requestAnimationFrame(animateConfetti);
        }, i * 5);
    }
}

const photoBtn = document.getElementById('photo-btn');
if (photoBtn) {
    photoBtn.addEventListener('click', spewConfettiFromImage);
}