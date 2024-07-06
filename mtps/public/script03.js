function saveProgress() {
    const progress = {
        coinCounter: document.getElementById('coin-counter').textContent,
        diomCounter: document.getElementById('diom-counter').textContent
    };
    localStorage.setItem('gameProgress', JSON.stringify(progress));
    localStorage.setItem('progress_updated', Date.now());
}

function loadProgress() {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        document.getElementById('coin-counter').textContent = progress.coinCounter;
        document.getElementById('diom-counter').textContent = progress.diomCounter;
    }
}

function toggleEvent(eventId) {
    const eventContent = document.getElementById(eventId);
    if (eventContent.style.display === 'block') {
        eventContent.style.display = 'none';
    } else {
        document.querySelectorAll('.event-content').forEach(content => {
            content.style.display = 'none';
        });
        eventContent.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    toggleEvent('event1');
});

window.onload = function () {
    loadProgress();
};

window.addEventListener('storage', function(event) {
    if (event.key === 'gameProgress') {
        loadProgress();
    }
});

function handleEventClick(eventId) {
    console.log("Clicked on: " + eventId);
    
}
