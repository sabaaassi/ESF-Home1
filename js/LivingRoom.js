document.addEventListener("DOMContentLoaded", function () {
    fetch('data/data.json')
      .then(response => response.json())
      .then(data => {
        devicesData = data.devices; 
        initializeDevices(devicesData);
        populateOverview(data.overview.items);
        updateDeviceCount(devicesData.length); 
      })
      .catch(error => console.error('Error loading data:', error));
  });
  
  function initializeDevices(devices) {
    const devicesContainer = document.getElementById('devices-container');
    devicesContainer.innerHTML = ''; 
  
    devices.forEach(device => {
      devicesContainer.appendChild(createDeviceElement(device));
    });
  }
  
  function createDeviceElement(device) {
    const deviceDiv = document.createElement('div');
    deviceDiv.classList.add('device');
    deviceDiv.id = device.id;
  
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('device-icon');
    const iconImg = document.createElement('img');
    iconImg.src = device.icon;
    iconImg.alt = `${device.name} Icon`;
    iconDiv.appendChild(iconImg);
    deviceDiv.appendChild(iconDiv);
  
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('device-status');
  
    const switchLabel = document.createElement('label');
    switchLabel.classList.add('switch');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = device.isOn;
    const span = document.createElement('span');
    span.classList.add('slider', 'round');
    input.addEventListener('change', function() {
      device.isOn = input.checked;
      updateDeviceElementStyle(deviceDiv, device.isOn);
    });
  
    switchLabel.appendChild(input);
    switchLabel.appendChild(span);
  
    statusDiv.innerHTML = `${device.name}<br>`;
    statusDiv.appendChild(switchLabel);
  
    deviceDiv.appendChild(statusDiv);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', function() {
      deleteDevice(device.id);
    });
  
    deleteBtn.style.float = 'right';
  
    const switchContainer = document.createElement('div');
    switchContainer.classList.add('switch-container');
    switchContainer.appendChild(switchLabel);
  
    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('controls-container');
    controlsContainer.appendChild(deleteBtn);
    controlsContainer.appendChild(switchContainer);
  
    deviceDiv.appendChild(controlsContainer);
  
    updateDeviceElementStyle(deviceDiv, device.isOn);
  
    return deviceDiv;
  }
  
  function deleteDevice(deviceId) {
    const index = devicesData.findIndex(device => device.id === deviceId);
    if (index !== -1) {
      devicesData.splice(index, 1); 
      updateDeviceList(); 
      updateDeviceCount(devicesData.length); 
    }
  }
  
  function addNewDevice(newDevice) {
    devicesData.push(newDevice); 
    updateDeviceList(); 
    updateDeviceCount(devicesData.length); 
  }
  
  function updateDeviceList() {
    const devicesContainer = document.getElementById('devices-container');
    devicesContainer.innerHTML = '';
  
    devicesData.forEach(device => {
      devicesContainer.appendChild(createDeviceElement(device));
    });
  }
  
  function populateOverview(items) {
    const overviewContent = document.getElementById('overviewContent');
    overviewContent.innerHTML = ''; 
  
    items.forEach(item => {
      const div = document.createElement('div');
      const labelSpan = document.createElement('span');
      const br = document.createElement('br');
      const valueSpan = document.createElement('span');
  
      div.classList.add('overview-item');
  
      labelSpan.classList.add('overview-label');
      labelSpan.textContent = item.label;
  
      valueSpan.textContent = item.value;
  
      div.appendChild(labelSpan);
      div.appendChild(br);
      div.appendChild(valueSpan);
  
      if (item.label === 'This Month') {
        const flexContainer = document.createElement('div');
        flexContainer.style.display = 'flex';
        flexContainer.style.alignItems = 'center'; 
  
        const img = document.createElement('img');
        img.classList.add('img');
        img.src = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRF2o4qdbgxNaB0WCs3Gz7BH2j1oUQ4DaJOzEJB7OymOUIfft7N';
        img.alt = 'Icon';
  
        const percentageLabel = document.createElement('span');
        percentageLabel.classList.add('percentage-label');
        percentageLabel.textContent = '10%';
  
        flexContainer.appendChild(percentageLabel);
        flexContainer.appendChild(img);
        div.appendChild(flexContainer);
      }
  
      overviewContent.appendChild(div);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const addDeviceButton = document.querySelector('.add-device-button');
    const messageBox = document.querySelector('.message-box');
    const cancelButton = document.getElementById('cancel-button');
    const closeButton = document.querySelector('.close-button');
    const deviceForm = document.getElementById('device-form');
  
    addDeviceButton.addEventListener('click', function () {
      messageBox.style.display = 'block';
    });
  
    cancelButton.addEventListener('click', function () {
      messageBox.style.display = 'none';
    });
  
    closeButton.addEventListener('click', function () {
      messageBox.style.display = 'none';
    });
  
    deviceForm.addEventListener('submit', function (event) {
      event.preventDefault(); 
  
      const deviceName = document.getElementById('device-name').value;
      const deviceBrand = document.getElementById('device-brand').value;
  
      const newDevice = {
        id: generateUniqueId(), 
        name: deviceName,
        brand: deviceBrand,
        status: 'Off', 
        isOn: false 
      };
  
      addNewDevice(newDevice);
  
      deviceForm.reset();
  
      messageBox.style.display = 'none';
    });
  
    function generateUniqueId() {
      return 'device_' + Math.random().toString(36).substr(2, 9);
    }
  });
  
  function updateDeviceElementStyle(deviceElement, isOn) {
    if (isOn) {
      deviceElement.style.background = 'rgba(43, 237, 179, 0.2)';
      deviceElement.style.color = '#000'; 
    } else {
      deviceElement.style.background = 'rgba(239, 237, 242, 1)';
      deviceElement.style.color = '#000'; 
    }
  }
  
  function updateDeviceCount(count) {
    const deviceCountElement = document.getElementById('device-count');
    deviceCountElement.textContent = count;
  }
  
  function updateDeviceCount(count) {
    const deviceCountElement = document.getElementById('device-count');
    deviceCountElement.textContent = `${count} Devices`;
  }
  
  