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


document.addEventListener('DOMContentLoaded', function() {
    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
  
    function updateBatteryStatus() {
        const batteryLevelElement = document.getElementById('battery-level');
        batteryLevelElement.innerHTML = '<i class="fas fa-battery-full"></i>';
    }
    updateBatteryStatus();
  
    const addDeviceButton = document.querySelector('.add-device-button');
    const deviceFormContainer = document.querySelector('.device-form-container');
  
    addDeviceButton.addEventListener('click', function() {
        toggleAddDeviceForm();
    });
  
    function toggleAddDeviceForm() {
        deviceFormContainer.style.display = 'block'; 
    }
  
    const devices = document.querySelectorAll('.device');
  
    devices.forEach(device => {
        const switchInput = device.querySelector('input[type="checkbox"]');
        const deviceStatus = device.querySelector('.device-status');
        
        switchInput.addEventListener('change', function() {
            if (this.checked) {
                device.classList.remove('off');
                device.classList.add('on');
                switchInput.style.backgroundColor = 'rgba(43, 237, 179, 1)'; 
                device.style.backgroundColor = 'rgba(43, 237, 179, 0.2)'; 
            } else {
                device.classList.remove('on');
                device.classList.add('off');
                switchInput.style.backgroundColor = '#E5E5E5'; 
                device.style.backgroundColor = 'rgba(239, 237, 242, 1)'; 
            }
        });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
  
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
  });
  