const catImages = {
    idle: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Number_1_in_green_rounded_square.svg/2048px-Number_1_in_green_rounded_square.svg.png',
    falling: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Number_2_in_light_blue_rounded_square.svg/1024px-Number_2_in_light_blue_rounded_square.svg.png',
    walking: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShzcig9q7uPR8rcb_IchTVPqS5JqGzzEojQw&s',
    dragging: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Number_4_in_yellow_rounded_square.svg/2048px-Number_4_in_yellow_rounded_square.svg.png'
};

const cats = [];

function randomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnCats() {
    const celebration = document.getElementById('celebration');
    if (!celebration.classList.contains('active')) return;

    let numCats = randomRange(5, 9);
    for (let i = 0; i < numCats; i++) {
        setTimeout(() => {
            createCat();
        }, i * 1000);
    }
}

function createCat() {
    const cat = document.createElement('div');
    cat.className = 'cat';

    const img = document.createElement('img');
    img.src = catImages.falling;
    cat.appendChild(img);

    const startX = Math.random() * (window.innerWidth - 60);
    cat.style.left = startX + 'px';
    cat.style.top = '-60px';

    document.getElementById('celebration').appendChild(cat);

    const catData = {
        element: cat,
        img: img,
        x: startX,
        y: -60,
        state: 'falling',
        velocityY: 2 + Math.random() * 2,
        walkSpeed: 1 + Math.random(),
        walkDirection: Math.random() > 0.5 ? 1 : -1,
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0
    };

    cats.push(catData);

    cat.addEventListener('mousedown', (e) => startDrag(e, catData));
    cat.addEventListener('touchstart', (e) => startDrag(e, catData));
}

function startDrag(e, catData) {
    e.preventDefault();
    catData.isDragging = true;
    catData.state = 'dragging';
    catData.img.src = catImages.dragging;
    catData.element.classList.add('dragging');

    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    catData.dragOffsetX = clientX - catData.x;
    catData.dragOffsetY = clientY - catData.y;

    const moveHandler = (e) => moveDrag(e, catData);
    const upHandler = () => endDrag(catData, moveHandler, upHandler);

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('mouseup', upHandler);
    document.addEventListener('touchend', upHandler);
}

function moveDrag(e, catData) {
    if (!catData.isDragging) return;

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    catData.x = clientX - catData.dragOffsetX;
    catData.y = clientY - catData.dragOffsetY;

    catData.element.style.left = catData.x + 'px';
    catData.element.style.top = catData.y + 'px';
}

function endDrag(catData, moveHandler, upHandler) {
    catData.isDragging = false;
    catData.element.classList.remove('dragging');

    document.removeEventListener('mousemove', moveHandler);
    document.removeEventListener('touchmove', moveHandler);
    document.removeEventListener('mouseup', upHandler);
    document.removeEventListener('touchend', upHandler);

    if (catData.y >= window.innerHeight - 80) {
        catData.state = 'idle';
        catData.img.src = catImages.idle;
        setTimeout(() => {
            if (catData.state === 'idle') {
                catData.state = 'walking';
                catData.img.src = catImages.walking;
            }
        }, 500);
    } else {
        catData.state = 'falling';
        catData.img.src = catImages.falling;
    }
}

function updateCats() {
    cats.forEach(catData => {
        if (catData.isDragging) return;

        if (catData.state === 'falling') {
            catData.y += catData.velocityY;

            if (catData.y >= window.innerHeight - 80) {
                catData.y = window.innerHeight - 80;
                catData.state = 'idle';
                catData.img.src = catImages.idle;

                setTimeout(() => {
                    if (catData.state === 'idle') {
                        catData.state = 'walking';
                        catData.img.src = catImages.walking;
                    }
                }, 500);
            }

            catData.element.style.top = catData.y + 'px';

        } else if (catData.state === 'walking') {
            catData.x += catData.walkSpeed * catData.walkDirection;

            if (catData.x <= 0 || catData.x >= window.innerWidth - 60) {
                catData.walkDirection *= -1;
                catData.element.style.transform = `scaleX(${catData.walkDirection})`;
            }

            if (Math.random() < 0.01) {
                catData.state = 'idle';
                catData.img.src = catImages.idle;

                setTimeout(() => {
                    if (catData.state === 'idle') {
                        catData.state = 'walking';
                        catData.img.src = catImages.walking;
                    }
                }, 1000 + Math.random() * 2000);
            }

            catData.element.style.left = catData.x + 'px';
        }
    });

    requestAnimationFrame(updateCats);
}

function initCats() {
    updateCats();
}

initCats();