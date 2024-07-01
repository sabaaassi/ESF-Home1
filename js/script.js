/*script.js for index page*/
document.addEventListener("DOMContentLoaded", function() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            // Populate user info
            document.querySelector('.user-photo').src = data.user.photo;
            document.querySelector('.user-details h1').textContent = data.user.name;

            // Populate energy usage
            document.querySelector('.date').textContent = data.energyUsage.date;
            document.querySelector('.stat-today h3').textContent = data.energyUsage.today;
            document.querySelector('.stat-month h3').textContent = data.energyUsage.thisMonth;

            // Populate rooms
            const roomsSection = document.querySelector('.rooms');
            data.rooms.forEach(room => {
                const roomDiv = document.createElement('div');
                roomDiv.classList.add('room');
                roomDiv.innerHTML = `
                    <img src="${room.image}" alt="${room.name}">
                    <h3>${room.name}</h3>
                `;
                roomsSection.appendChild(roomDiv);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

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
