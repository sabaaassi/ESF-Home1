document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);

    navigator.getBattery().then(function(battery) {
        updateBattery(battery);
        battery.addEventListener('levelchange', function() {
            updateBattery(battery);
        });
    });
});

function updateClock() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let timeString = hours + ':' + minutes;
    document.getElementById('clock').textContent = timeString;
}

function updateBattery(battery) {
    let batteryLevel = battery.level * 100;
    let batteryLevelElement = document.getElementById('battery-level');
    batteryLevelElement.style.width = batteryLevel + '%';
}
