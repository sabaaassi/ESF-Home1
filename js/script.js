/*script.js for index page*/
document.addEventListener("DOMContentLoaded", function() {
    fetch('./Data/data.json')
        .then(response => response.json())
        .then(data => {
            // Populate user info
            document.querySelector('.user-photo').src = data.user.photo;
            document.querySelector('.user-details h1').textContent = data.user.name;

            // Populate energy usage
            //get selected Date
             var date = document.querySelector('.energy-select')
             date.options[date.selectedIndex].text = data.energyUsage.date;
            document.querySelector('.stat-today h3').textContent = data.energyUsage.today;
            document.querySelector('.stat-month h3').textContent = data.energyUsage.thisMonth;

            // Populate rooms
            const roomsSection = document.querySelector('.rooms');
            data.rooms.forEach(room => {
                const roomDiv = document.createElement('div');
                roomDiv.classList.add('room');
                roomDiv.style.backgroundImage = `url(${room.image})`;
                roomDiv.style.backgroundSize = 'auto';
                roomDiv.dataset.roomName = room.name; // Store the room name
                roomDiv.innerHTML = `<h3>${room.name}</h3>`;

                roomsSection.appendChild(roomDiv);
                roomDiv.addEventListener('click', () => {
                    localStorage.setItem('selectedRoom', JSON.stringify(room));
                    if (room.name === "Living Room") {
                        window.location.href = "ListLivingRoom.html";
                    }
                    else {
                        // Disable click for other rooms
                        roomDiv.style.pointerEvents = 'none';
                    }
                }); 
            });
        })
        
});

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('data.json');
    const data = await response.json();

    // Update user info
    document.getElementById('userPhoto').src = data.user.photo;
    document.getElementById('userName').textContent = data.user.name;

    // Update energy usage
    const dateSelect = document.getElementById('dateSelect');
    const dateOption = dateSelect.querySelector('.date');
    dateOption.textContent = data.energyUsage.date;
    document.getElementById('todayUsage').textContent = data.energyUsage.today;
    document.getElementById('monthUsage').textContent = data.energyUsage.thisMonth;

    // Update rooms
    const roomsContainer = document.getElementById('roomsContainer');
    data.rooms.forEach(room => {
        const roomElement = document.createElement('div');
        roomElement.className = 'room';
        roomElement.innerHTML = `
            <img src="${room.image}" alt="${room.name}">
            <p>${room.name}</p>
        `;
        roomsContainer.appendChild(roomElement);
    });
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
  /*autlogs*/
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addDeviceBtn').addEventListener('click', () => {
        const deviceName = prompt('Enter device name:');
        if (deviceName) {
            addDevice(deviceName);
        }
    });
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
