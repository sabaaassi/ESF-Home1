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
  
  document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-device-button');
    const messageBox = document.querySelector('.message-box');
    const closeButton = document.querySelector('.close-button');
    const cancelButton = document.getElementById('cancel-button');
  
    addButton.addEventListener('click', function() {
      messageBox.classList.add('active');
    });
  
    closeButton.addEventListener('click', function() {
      messageBox.classList.remove('active');
    });
  
    cancelButton.addEventListener('click', function() {
      messageBox.classList.remove('active');
    });
  });
  

  /*autlogs*/
document.getElementById('addDeviceBtn').addEventListener('click', () => {
    const deviceName = prompt('Enter device name:');
    if (deviceName) {
        addDevice(deviceName);
    }
});

function addDevice(name) {
    const deviceList = document.getElementById('deviceList');
    const deviceItem = document.createElement('div');
    deviceItem.className = 'device-item';
    
    const deviceIcon = document.createElement('span');
    deviceIcon.className = 'device-icon';
    deviceIcon.innerHTML = '&#128161;'; // Default light bulb icon
    
    const deviceName = document.createElement('span');
    deviceName.className = 'device-name';
    deviceName.textContent = name;
    
    const switchLabel = document.createElement('label');
    switchLabel.className = 'switch';
    const switchInput = document.createElement('input');
    switchInput.type = 'checkbox';
    switchInput.checked = true;
    const slider = document.createElement('span');
    slider.className = 'slider';
    switchLabel.appendChild(switchInput);
    switchLabel.appendChild(slider);
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        const newName = prompt('Edit device name:', name);
        if (newName) {
            deviceName.textContent = newName;
        }
    });
    
    deviceItem.appendChild(deviceIcon);
    deviceItem.appendChild(deviceName);
    deviceItem.appendChild(switchLabel);
    deviceItem.appendChild(editBtn);
    
    deviceList.appendChild(deviceItem);
}