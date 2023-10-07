const button = document.getElementById('settings-button');
const popup = document.getElementById('popup');

button.addEventListener('click', () => {
  popup.classList.toggle('hidden');
});

document.addEventListener('click', (event) => {
  if (event.target !== popup && event.target !== button && !popup.contains(event.target)) {
    popup.classList.add('hidden');
  }
});



// Function to update the work and break times
function updateTimes() {
    const workDurationInput = document.getElementById('workDurationInput');
    const breakDurationInput = document.getElementById('breakDurationInput');
    workTime = workDurationInput.value * 60;
    breakTime = breakDurationInput.value * 60;
}

// Function to update the CSS variables for colors
function updateColors() {
    const foregroundColorInput = document.getElementById('foregroundColorInput');
    const backgroundColorInput = document.getElementById('backgroundColorInput');
    document.documentElement.style.setProperty('--second-color', foregroundColorInput.value);
    document.documentElement.style.setProperty('--first-color', backgroundColorInput.value);
}

// Add event listeners to the input fields
document.getElementById('workDurationInput').addEventListener('input', updateTimes);
document.getElementById('breakDurationInput').addEventListener('input', updateTimes);
document.getElementById('foregroundColorInput').addEventListener('input', updateColors);
document.getElementById('backgroundColorInput').addEventListener('input', updateColors);
