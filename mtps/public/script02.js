let fanLevelPage1 = 1;

function handleFanClick(event) {
    const coinCounter = document.getElementById('coin-counter');
    const incrementValue = 1 * fanLevelPage1;
    coinCounter.textContent = parseInt(coinCounter.textContent) + incrementValue;

    createFlyingNumber(incrementValue, event.clientX, event.clientY);

    saveFanLevelProgressPage1();
    saveCurrencyProgress();
}

function handleFanTouch(event) {
    event.preventDefault();
    const touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        const coinCounter = document.getElementById('coin-counter');
        const incrementValue = 1 * fanLevelPage1;
        coinCounter.textContent = parseInt(coinCounter.textContent) + incrementValue;

        createFlyingNumber(incrementValue, touch.clientX, touch.clientY);
    }

    saveFanLevelProgressPage1();
    saveCurrencyProgress();
}

function createFlyingNumber(value, x, y) {
    const flyingNumber = document.createElement('div');
    flyingNumber.textContent = `+${value}`;
    flyingNumber.className = 'flying-number';
    flyingNumber.style.left = `${x}px`;
    flyingNumber.style.top = `${y}px`;

    document.body.appendChild(flyingNumber);

    const target = document.getElementById('apli01').getBoundingClientRect();

    setTimeout(() => {
        flyingNumber.style.left = `${target.left + target.width / 2}px`;
        flyingNumber.style.top = `${target.top}px`;
        flyingNumber.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        flyingNumber.remove();
    }, 2000);
}

function createLevelUpObject() {
    const plusButton = document.getElementById('plus-button');
    plusButton.style.pointerEvents = 'none';

    const levelUpObject = document.createElement('div');
    levelUpObject.className = 'level-up';
    levelUpObject.style.left = '0px';
    levelUpObject.style.top = '0px';
    levelUpObject.onclick = function() {
        handleLevelUpClick(levelUpObject);
    };

    document.getElementById('bol').appendChild(levelUpObject);
}

function handleLevelUpClick(element) {
    if (!element.dataset.clicks) {
        element.dataset.clicks = '0';
    }
    element.dataset.clicks = parseInt(element.dataset.clicks) + 1;

    if (element.dataset.clicks >= fanLevelPage1) {
        document.getElementById('bol').removeChild(element);
        fanLevelPage1 += 1;
        updateLevelCounterPage1();
        document.getElementById('plus-button').style.pointerEvents = 'auto';
        saveFanLevelProgressPage1();
    } else {
        
        const bol = document.getElementById('bol');
        const newTop = Math.random() * (bol.offsetHeight - 60); // Учитываем высоту элемента
        element.style.top = `${newTop}px`;
    }
}

function updateLevelCounterPage1() {
    const levelCounter = document.getElementById('hrap');
    levelCounter.textContent = fanLevelPage1;
}

function saveFanLevelProgressPage1() {
    const progress = {
        fanLevel: fanLevelPage1
    };
    localStorage.setItem('fanLevelProgressPage1', JSON.stringify(progress));
}

function loadFanLevelProgressPage1() {
    const savedProgress = localStorage.getItem('fanLevelProgressPage1');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        fanLevelPage1 = progress.fanLevel || 1;
        updateLevelCounterPage1();
    }
}

function saveCurrencyProgress() {
    const currencyProgress = {
        coinCounter: document.getElementById('coin-counter').textContent,
        diomCounter: document.getElementById('diom-counter').textContent
    };
    localStorage.setItem('gameProgress', JSON.stringify(currencyProgress));
}

function loadCurrencyProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        document.getElementById('coin-counter').textContent = progress.coinCounter;
        document.getElementById('diom-counter').textContent = progress.diomCounter;
    }
}

window.onload = function () {
    loadFanLevelProgressPage1();
    loadCurrencyProgress();
};


document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        saveFanLevelProgressPage1();
        saveCurrencyProgress();
    }
});


window.addEventListener('pagehide', function() {
    saveFanLevelProgressPage1();
    saveCurrencyProgress();
});

window.addEventListener('beforeunload', function() {
    saveFanLevelProgressPage1();
    saveCurrencyProgress();
});
