let coinRate = 0;
let diomRate = 0;
const MAX_OFFLINE_MINING_HOURS = 6;
const MS_PER_HOUR = 3600000;

function handleFanClick(event) {
    const coinCounter = document.getElementById('coin-counter');
    const incrementValue = 1;
    coinCounter.textContent = parseInt(coinCounter.textContent) + incrementValue;
    saveFanLevelProgressMining();
    saveProgress();
}

function handleFanTouch(event) {
    event.preventDefault();
    const touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        const coinCounter = document.getElementById('coin-counter');
        const incrementValue = 1;
        coinCounter.textContent = parseInt(coinCounter.textContent) + incrementValue;
    }
    saveFanLevelProgressMining();
    saveProgress();
}

function saveFanLevelProgressMining() {
    const progress = {
        coinRate: coinRate,
        diomRate: diomRate
    };
    localStorage.setItem('fanLevelProgressMining', JSON.stringify(progress));
}

function loadFanLevelProgressMining() {
    const savedProgress = localStorage.getItem('fanLevelProgressMining');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        coinRate = parseFloat(progress.coinRate) || 0;
        diomRate = parseFloat(progress.diomRate) || 0;
        document.querySelector('.counter01').textContent = (coinRate / 3600).toFixed(2) + '/s';
        document.querySelector('.counter02').textContent = (diomRate / 3600).toFixed(2) + '/s';
    }
}

function saveProgress() {
    const progress = {
        coinCounter: document.getElementById('coin-counter').textContent,
        diomCounter: document.getElementById('diom-counter').textContent,
        lastUpdated: Date.now(),
        coinRate: coinRate,
        diomRate: diomRate
    };
    localStorage.setItem('gameProgress', JSON.stringify(progress));
    saveProgressStap();
}

function saveProgressStap() {
    const progressStap = {
        stap3Value: document.getElementById('stap3').textContent,
        stap1Value: document.getElementById('stap1').textContent,
        stap2Value: document.getElementById('stap2').textContent
    };
    localStorage.setItem('gameProgressStap', JSON.stringify(progressStap));
}

function loadProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const currentTime = Date.now();
        const lastUpdated = progress.lastUpdated || currentTime;
        const elapsedHours = Math.min((currentTime - lastUpdated) / MS_PER_HOUR, MAX_OFFLINE_MINING_HOURS);

        const coinEarnings = coinRate * elapsedHours;
        const diomEarnings = diomRate * elapsedHours;

        document.getElementById('coin-counter').textContent = Math.floor(parseInt(progress.coinCounter) + coinEarnings);
        document.getElementById('diom-counter').textContent = Math.floor(parseInt(progress.diomCounter) + diomEarnings);

        coinRate = parseFloat(progress.coinRate) || 0;
        diomRate = parseFloat(progress.diomRate) || 0;

        document.querySelector('.counter01').textContent = (coinRate / 3600).toFixed(2) + '/s';
        document.querySelector('.counter02').textContent = (diomRate / 3600).toFixed(2) + '/s';

        showOfflineEarnings(coinEarnings, diomEarnings);

        loadProgressStap();
    }
}

function showOfflineEarnings(coinEarnings, diomEarnings) {
    const tapStContent = document.getElementById('tapSt-content');
    if (tapStContent) {
        const st1Element = tapStContent.querySelector('#st1');
        const st2Element = tapStContent.querySelector('#st2');

        if (st1Element && st2Element) {
            st1Element.textContent = coinEarnings.toFixed(2);
            st2Element.textContent = diomEarnings.toFixed(2);
            openModal('tapSt-content');
        } else {
            console.error('Elements st1 or st2 not found in tapSt-content.');
        }
    } else {
        console.error('Element tapSt-content not found in the DOM.');
    }
}

function loadProgressStap() {
    const savedProgressStap = localStorage.getItem('gameProgressStap');
    if (savedProgressStap) {
        const progressStap = JSON.parse(savedProgressStap);
        document.getElementById('stap3').textContent = progressStap.stap3Value || '1000';
        document.getElementById('stap1').textContent = progressStap.stap1Value || '10';
        document.getElementById('stap2').textContent = progressStap.stap2Value || '10000';
    } else {
        document.getElementById('stap3').textContent = '1000';
        document.getElementById('stap1').textContent = '10';
        document.getElementById('stap2').textContent = '10000';
    }
}

function updateCounters() {
    const progress = JSON.parse(localStorage.getItem('gameProgress'));
    if (progress) {
        document.getElementById('coin-counter').textContent = progress.coinCounter || '0';
        document.getElementById('diom-counter').textContent = progress.diomCounter || '0';
        coinRate = parseFloat(progress.coinRate) || 0;
        diomRate = parseFloat(progress.diomRate) || 0;
        document.querySelector('.counter01').textContent = (coinRate / 3600).toFixed(2) + '/s';
        document.querySelector('.counter02').textContent = (diomRate / 3600).toFixed(2) + '/s';
        loadProgressStap();
    }
}

function updateRates() {
    const coinCounter = document.getElementById('coin-counter');
    const diomCounter = document.getElementById('diom-counter');
    coinCounter.textContent = Math.floor(parseInt(coinCounter.textContent) + coinRate / 3600);
    diomCounter.textContent = Math.floor(parseInt(diomCounter.textContent) + diomRate / 3600);
    saveProgress();
}

function autoSaveProgress() {
    saveProgress();
    saveFanLevelProgressMining();
}

window.onload = function() {
    loadProgress();
    loadFanLevelProgressMining();
    setInterval(updateRates, 1000);
    setInterval(autoSaveProgress, 5000);

    const tapStContent = document.getElementById('tapSt-content');
    if (tapStContent) {
        const st1Element = tapStContent.querySelector('#st1');
        const st2Element = tapStContent.querySelector('#st2');
        if (st1Element && st2Element) {
            st1Element.textContent = '0.00';
            st2Element.textContent = '0.00';
        }
    }
};

window.addEventListener('storage', function(event) {
    if (event.key === 'gameProgress') {
        updateCounters();
    } else if (event.key === 'gameProgressStap') {
        loadProgressStap();
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('bliz3-button').addEventListener('click', handleBliz3Click);
    document.getElementById('bliz1-button').addEventListener('click', handleBliz1Click);
    document.getElementById('bliz2-button').addEventListener('click', handleBliz2Click);
});

window.addEventListener('beforeunload', function() {
    saveFanLevelProgressMining();
    saveProgress();
});

window.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        loadFanLevelProgressMining();
        loadProgress();
    } else {
        saveFanLevelProgressMining();
        saveProgress();
    }
});

function handleBlizClick(spanId, callback, costIncrement) {
    const spanElement = document.getElementById(spanId);
    const currentValue = parseInt(spanElement.textContent);
    const counter = spanId === 'stap1' ? document.getElementById('diom-counter') : document.getElementById('coin-counter');
    const counterValue = parseInt(counter.textContent);

    if (counterValue >= currentValue) {
        counter.textContent = counterValue - currentValue;

        if (callback) callback();
        saveFanLevelProgressMining();
        saveProgress();
    } else {
        document.getElementById(`error-message-${spanId.slice(-1)}`).style.display = 'block';
    }
}

function handleBliz3Click() {
    handleBlizClick('stap3', function() {
        coinRate += 100;
        document.querySelector('.counter01').textContent = (coinRate / 3600).toFixed(2) + '/s';
        saveFanLevelProgressMining();
    }, 0);
}

function handleBliz1Click() {
    handleBlizClick('stap1', function() {
        diomRate += 10;
        document.querySelector('.counter02').textContent = (diomRate / 3600).toFixed(2) + '/s';
        saveFanLevelProgressMining();
    }, 0);
}

function handleBliz2Click() {
    const coinCounter = document.getElementById('coin-counter');
    const diomCounter = document.getElementById('diom-counter');
    const stap2Value = parseInt(document.getElementById('stap2').textContent);
    const currentCoinValue = parseInt(coinCounter.textContent);

    if (currentCoinValue >= stap2Value) {
        coinCounter.textContent = currentCoinValue - stap2Value;
        diomCounter.textContent = parseInt(diomCounter.textContent) + 1;
        saveFanLevelProgressMining();
        saveProgress();
    } else {
        document.getElementById('error-message-2').style.display = 'block';
    }
}

function openModal(contentId) {
    const content = document.getElementById(contentId);
    if (content) {
        document.getElementById('modal-content').innerHTML = content.innerHTML;
        document.getElementById('modal').style.display = 'flex';

        if (contentId === 'tap3-content') {
            checkTap3Conditions();
        } else if (contentId === 'tap1-content') {
            checkTap1Conditions();
        } else if (contentId === 'tap2-content') {
            checkTap2Conditions();
        }
    } else {
        console.error(`Content with id ${contentId} not found.`);
    }
}

function closeModal(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
}

function checkTap3Conditions() {
    const coinCounter = parseInt(document.getElementById('coin-counter').textContent);
    const stap3Value = parseInt(document.getElementById('stap3').textContent);

    const bliz3Button = document.getElementById('bliz3-button');
    if (coinCounter >= stap3Value) {
        bliz3Button.disabled = false;
        document.getElementById('error-message-3').style.display = 'none';
    } else {
        bliz3Button.disabled = true;
        document.getElementById('error-message-3').style.display = 'block';
    }
}

function checkTap1Conditions() {
    const diomCounter = parseInt(document.getElementById('diom-counter').textContent);
    const stap1Value = parseInt(document.getElementById('stap1').textContent);

    const bliz1Button = document.getElementById('bliz1-button');
    if (diomCounter >= stap1Value) {
        bliz1Button.disabled = false;
        document.getElementById('error-message-1').style.display = 'none';
    } else {
        bliz1Button.disabled = true;
        document.getElementById('error-message-1').style.display = 'block';
    }
}

function checkTap2Conditions() {
    const coinCounter = parseInt(document.getElementById('coin-counter').textContent);
    const stap2Value = parseInt(document.getElementById('stap2').textContent);

    const bliz2Button = document.getElementById('bliz2-button');
    if (coinCounter >= stap2Value) {
        bliz2Button.disabled = false;
        document.getElementById('error-message-2').style.display = 'none';
    } else {
        bliz2Button.disabled = true;
        document.getElementById('error-message-2').style.display = 'block';
    }
}

function handleClick(tapId) {
    openModal(`${tapId}-content`);
}

// Закрытие модального окна по клику вне его области
document.getElementById('modal').addEventListener('click', closeModal);

// Закрытие модального окна по клику на кнопку закрытия
document.getElementById('modal-close-button').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});
